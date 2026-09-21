# Montar vps-prod

Deja `vps-prod` sirviendo la web y recibiendo los despliegues automáticos desde
GitHub Actions. Se hace **una vez**.

**Supuestos** (cámbialos si no cuadran): Ubuntu 22.04 o 24.04, acceso con sudo,
y **Nginx** como servidor web. Nginx y no Caddy porque es lo estándar y porque,
si algún día el formulario de contacto necesita backend, el `proxy_pass` ya lo
tienes ahí.

| Dónde | Path |
| --- | --- |
| Archivos servidos | `/var/www/hostingmails` |
| Usuario de despliegue | `deploy` · home `/home/deploy` |
| Claves autorizadas del deploy | `/home/deploy/.ssh/authorized_keys` |
| Vhost de Nginx | `/etc/nginx/sites-available/hostingmails.conf` |
| Logs | `/var/log/nginx/hostingmails.access.log` y `.error.log` |

La VPS **no necesita Node ni el repositorio**: recibe el `dist/` ya construido.

---

## 1 · Conectar y actualizar

```bash
ssh root@<ip-de-vps-prod>
apt update && apt upgrade -y
```

---

## 2 · Usuario de despliegue

Un usuario solo para esto, **sin sudo**. Si un día se filtra la clave del
workflow, lo único que se puede tocar es la carpeta de la web.

```bash
adduser --disabled-password --gecos "" deploy
mkdir -p /home/deploy/.ssh
chmod 700 /home/deploy/.ssh
chown -R deploy:deploy /home/deploy/.ssh
```

---

## 3 · Carpeta de la web

```bash
mkdir -p /var/www/hostingmails
chown -R deploy:www-data /var/www/hostingmails
chmod -R 755 /var/www/hostingmails
```

`deploy` escribe, Nginx (`www-data`) lee. Nada más.

Una página provisional para comprobar que el servidor responde antes de tener
la web:

```bash
echo "<h1>HostingMails · en obras</h1>" > /var/www/hostingmails/index.html
chown deploy:www-data /var/www/hostingmails/index.html
```

---

## 4 · Nginx

```bash
apt install -y nginx
nano /etc/nginx/sites-available/hostingmails.conf
```

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name hostingmails.demo.webscrafting.com;

    root /var/www/hostingmails;
    index index.html;

    # One-page: cualquier ruta cae en el index
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Los assets de Vite llevan hash en el nombre: cachean para siempre
    location /assets/ {
        access_log off;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # El index nunca se cachea, o no verías los despliegues
    location = /index.html {
        add_header Cache-Control "no-cache";
    }

    gzip on;
    gzip_types text/css application/javascript image/svg+xml;
    gzip_min_length 1024;

    access_log /var/log/nginx/hostingmails.access.log;
    error_log  /var/log/nginx/hostingmails.error.log;
}
```

Activar y recargar:

```bash
ln -s /etc/nginx/sites-available/hostingmails.conf /etc/nginx/sites-enabled/
nginx -t                    # tiene que decir "syntax is ok"
systemctl reload nginx
```

---

## 5 · DNS

Registro `A` apuntando a la IP de vps-prod:

```
hostingmails.demo.webscrafting.com   A   <ip-de-vps-prod>
```

Se añade **donde esté gestionado el DNS de `webscrafting.com`**, no en Hetzner —
salvo que ese dominio ya use los nameservers de Hetzner.

Comprueba antes de seguir (la propagación puede tardar):

```bash
dig +short hostingmails.demo.webscrafting.com
```

Hasta que no devuelva la IP correcta, el paso 6 va a fallar.

---

## 6 · HTTPS

```bash
apt install -y certbot python3-certbot-nginx
certbot --nginx -d hostingmails.demo.webscrafting.com
```

Certbot edita el vhost solo y deja la renovación automática puesta. Verifica:

```bash
systemctl status certbot.timer
certbot renew --dry-run
```

---

## 7 · Cortafuegos

```bash
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw enable
ufw status
```

---

## 8 · Clave SSH para el despliegue

Genera el par **en tu portátil** (no en el servidor: la privada no debe pasar
por ahí):

```bash
ssh-keygen -t ed25519 -C "github-actions-hostingmails" -f ~/.ssh/hostingmails_deploy -N ""
```

La **pública** va al servidor:

```bash
# desde tu portátil
ssh-copy-id -i ~/.ssh/hostingmails_deploy.pub deploy@<ip-de-vps-prod>

# o a mano, en la VPS:
nano /home/deploy/.ssh/authorized_keys      # pegar el contenido del .pub
chmod 600 /home/deploy/.ssh/authorized_keys
chown deploy:deploy /home/deploy/.ssh/authorized_keys
```

Prueba que entra sin contraseña:

```bash
ssh -i ~/.ssh/hostingmails_deploy deploy@<ip-de-vps-prod> "ls -la /var/www/hostingmails"
```

---

## 9 · Secretos en GitHub

Repo → **Settings → Secrets and variables → Actions → New repository secret**:

| Secreto | Valor |
| --- | --- |
| `SSH_HOST` | IP de vps-prod |
| `SSH_USER` | `deploy` |
| `SSH_KEY` | contenido **completo** de `~/.ssh/hostingmails_deploy` (la privada, con las líneas `BEGIN`/`END`) |
| `DEPLOY_PATH` | `/var/www/hostingmails` |

La privada nunca se commitea ni se escribe en ningún `.md`.

---

## 10 · Workflow de despliegue

En el proyecto, `.github/workflows/deploy.yml`:

```yaml
name: Deploy a producción

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: npm

      - run: npm ci
      - run: npm run build

      - name: Preparar clave SSH
        run: |
          mkdir -p ~/.ssh
          echo "${{ secrets.SSH_KEY }}" > ~/.ssh/deploy_key
          chmod 600 ~/.ssh/deploy_key
          ssh-keyscan -H "${{ secrets.SSH_HOST }}" >> ~/.ssh/known_hosts

      - name: Subir dist a vps-prod
        run: |
          rsync -avz --delete \
            -e "ssh -i ~/.ssh/deploy_key" \
            dist/ "${{ secrets.SSH_USER }}@${{ secrets.SSH_HOST }}:${{ secrets.DEPLOY_PATH }}/"
```

Dos detalles que importan:

- **`dist/` con barra final.** Sin ella rsync copiaría la carpeta dentro del
  destino y acabarías con `/var/www/hostingmails/dist/`.
- **`--delete`** borra en el servidor lo que ya no está en el build. Es lo que
  quieres, pero significa que **todo lo que haya en `/var/www/hostingmails` y no
  venga del build desaparece**. No dejes ahí nada a mano.

El `npm run build` incluye `vue-tsc --noEmit`, así que un error de tipos para el
despliegue antes de tocar producción. Es a propósito.

---

## 11 · Primer despliegue

Haz push a `main` y mira la pestaña **Actions** del repo. Cuando termine:

```bash
curl -I https://hostingmails.demo.webscrafting.com
ls -la /var/www/hostingmails
```

Si algo no cuadra, el log está en `/var/log/nginx/hostingmails.error.log`.

---

## Si algo falla

| Síntoma | Qué mirar |
| --- | --- |
| 403 Forbidden | Permisos de `/var/www/hostingmails`: tiene que ser `deploy:www-data` y 755. |
| 404 en todo | El `root` del vhost no apunta donde crees, o el rsync dejó los archivos en `.../dist/`. |
| La Action falla en el rsync | `SSH_KEY` mal pegada (falta una línea o sobra un salto), o el `authorized_keys` no tiene permisos 600. |
| Despliega pero ves la versión vieja | Caché del navegador o del CDN. `Ctrl+Shift+R`. Si persiste, revisa el `Cache-Control` del `index.html`. |
| Certbot falla | El DNS todavía no resuelve a esta IP. Repite el paso 5 y espera. |

## Volver atrás

No hay versionado de releases: el `dist/` se sobreescribe. Para revertir, haz
`git revert` del commit malo y push — el workflow vuelve a desplegar. Tarda lo
mismo que un despliegue normal.

Si algún día quieres rollback instantáneo, el patrón es desplegar a
`/var/www/hostingmails/releases/<sha>` y mover un symlink `current`. Más piezas;
hoy no hace falta.
