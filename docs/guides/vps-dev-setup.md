# Montar vps-dev

Deja `vps-dev` listo para trabajar el proyecto por SSH. Se hace **una vez**.

**Supuestos** (cámbialos si no cuadran): Ubuntu 22.04 o 24.04, usuario `jordi`
con sudo, y el repositorio ya creado en GitHub.

| Dónde | Path |
| --- | --- |
| Repo del proyecto | `/home/jordi/apps/hostingmails` |
| Clave SSH del servidor | `/home/jordi/.ssh/id_ed25519` |
| Node (vía nvm) | `/home/jordi/.nvm` |

---

## 1 · Atajo de conexión (en tu portátil, no en la VPS)

Para no escribir la IP cada vez. En tu máquina:

```bash
# ~/.ssh/config
Host vps-dev
  HostName 203.0.113.10        # IP real de vps-dev
  User jordi
  IdentityFile ~/.ssh/id_ed25519
```

A partir de aquí, `ssh vps-dev` y dentro.

```bash
ssh vps-dev
```

---

## 2 · Paquetes base

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y git curl build-essential
```

---

## 3 · Node 22 con nvm

nvm y no el apt de Ubuntu: así cambias de versión sin pelearte con el sistema, y
el proyecto va con la misma mayor que usas en local (22.x).

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc

nvm install 22
nvm alias default 22

node -v    # v22.x
npm -v
```

---

## 4 · Git y clave para GitHub

Identidad de los commits que salgan de esta máquina:

```bash
git config --global user.name "Jordi"
git config --global user.email "jordimolto15@gmail.com"
git config --global init.defaultBranch main
```

Clave del servidor para poder hacer push:

```bash
ssh-keygen -t ed25519 -C "vps-dev-hostingmails" -f ~/.ssh/id_ed25519 -N ""
cat ~/.ssh/id_ed25519.pub
```

Copia lo que imprime y pégalo en **GitHub → Settings → SSH and GPG keys → New SSH key**.
Comprueba:

```bash
ssh -T git@github.com    # "Hi jordi! You've successfully authenticated..."
```

> Si prefieres no dar acceso a toda tu cuenta desde la VPS, usa una **deploy key**
> del repo (Settings del repo → Deploy keys) con permiso de escritura. Misma clave,
> alcance de un solo repositorio.

---

## 5 · Clonar el proyecto

```bash
mkdir -p ~/apps
cd ~/apps
git clone git@github.com:<usuario>/hostingmails.git
cd ~/apps/hostingmails

npm install
```

---

## 6 · Levantar el servidor de desarrollo

```bash
cd ~/apps/hostingmails
npm run dev
```

Vite queda escuchando en `localhost:5173` **dentro de la VPS**. Desde fuera
todavía no se ve: eso es el paso siguiente.

---

## 7 · Verlo desde tu navegador (túnel SSH)

En **tu portátil**, en otra terminal:

```bash
ssh -L 5173:localhost:5173 vps-dev
```

Deja esa terminal abierta y abre `http://localhost:5173` en tu navegador. El HMR
funciona igual que en local.

Es la opción recomendada: no expone nada a internet y no hay que configurar
Nginx ni certificados en dev.

---

## 8 · Editar el código

Lo cómodo es **VS Code con Remote - SSH**: `Ctrl+Shift+P` → *Remote-SSH: Connect
to Host* → `vps-dev` → abre la carpeta `/home/jordi/apps/hostingmails`. El editor
va en tu máquina, los archivos y el Node en la VPS. Si tienes el túnel del paso 7
abierto, ves los cambios al guardar.

También puedes editar directo con `nano` o `vim` por SSH, pero para el día a día
Remote-SSH gana.

---

## 9 · El ciclo de trabajo

```bash
cd ~/apps/hostingmails

npm run dev          # mientras trabajas

npm run typecheck    # antes de commitear
npm run build        # comprueba que compila de verdad

git add .
git commit -m "feat: sección de planes"
git push
```

El push a `main` dispara el despliegue a producción. Ver
[vps-prod-setup.md](vps-prod-setup.md).

---

## Opcional · Exponer dev en un subdominio

Solo si necesitas enseñar el trabajo en curso a alguien sin túnel. Cuesta más y
deja la web a medias accesible, así que piénsatelo.

**1.** En `vite.config.ts` del proyecto, deja que Vite acepte el host:

```ts
export default defineConfig({
  // …
  server: {
    host: '127.0.0.1',
    port: 5173,
    allowedHosts: ['dev.hostingmails.demo.webscrafting.com'],
  },
})
```

**2.** Nginx en vps-dev como proxy:

```bash
sudo apt install -y nginx
sudo nano /etc/nginx/sites-available/hostingmails-dev.conf
```

```nginx
server {
    listen 80;
    server_name dev.hostingmails.demo.webscrafting.com;

    location / {
        proxy_pass http://127.0.0.1:5173;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;   # el HMR va por websocket
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
    }
}
```

```bash
sudo ln -s /etc/nginx/sites-available/hostingmails-dev.conf /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

**3.** Registro DNS `A` de `dev.hostingmails.demo` → IP de vps-dev, y protégelo
con `auth_basic` o deja el puerto 80 cerrado salvo a tu IP. Un dev server
público es un dev server que alguien va a encontrar.

---

## Si algo falla

| Síntoma | Qué mirar |
| --- | --- |
| `npm run dev` arranca pero el navegador no carga nada | ¿Tienes el túnel del paso 7 abierto en el portátil? |
| `Permission denied (publickey)` al hacer push | La clave del paso 4 no está en GitHub, o estás usando la URL `https://` en vez de `git@`. |
| `node: command not found` al reconectar por SSH | nvm se carga desde `~/.bashrc`; con sesiones no interactivas no entra. `source ~/.nvm/nvm.sh`. |
| El build falla con `Could not resolve "./App.vue"` | No es tu entorno: falta ese archivo en el proyecto. Ver `docs/project/architecture.md`. |
