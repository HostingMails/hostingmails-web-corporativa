# Montar vps-dev

Deja `vps-dev` listo para trabajar el proyecto por SSH. Se hace **una vez**.

## Cómo leer esta guía

Cada bloque lleva encima una etiqueta que dice qué es. Son tres:

- **[PowerShell]** — se pega en tu terminal de Windows.
- **[VPS]** — se pega en la VPS, después de conectarte por SSH.
- **[Archivo]** — **no se pega en la terminal.** Es el contenido de un archivo; el
  comando que lo abre o lo crea está justo antes.

Si un bloque no lleva etiqueta, no es para copiar.

**Supuestos** (cámbialos si no cuadran): Ubuntu 22.04 o 24.04, usuario `jordi`
con sudo, y tu portátil con Windows y PowerShell.

| Dónde | Path |
| --- | --- |
| Repo en la VPS | `/home/jordi/apps/hostingmails-web-corporativa` |
| Clave SSH de la VPS | `/home/jordi/.ssh/id_ed25519` |
| Node (vía nvm) | `/home/jordi/.nvm` |
| Config SSH en tu portátil | `C:\Users\jordi\.ssh\config` |

---

## 0 · Subir el repo a GitHub

El repositorio ya existe:
[HostingMails/hostingmails-web-corporativa](https://github.com/HostingMails/hostingmails-web-corporativa).
El proyecto está hoy en tu portátil (`C:\Users\jordi\Proyectos\HostingMails`) con
git iniciado pero sin remoto, así que no hay nada que clonar en la VPS todavía.

**[PowerShell]**

```powershell
cd C:\Users\jordi\Proyectos\HostingMails
git remote -v
```

Si no imprime nada, engánchalo y sube lo que tienes:

**[PowerShell]**

```powershell
git remote add origin git@github.com:HostingMails/hostingmails-web-corporativa.git
git branch -M main
git push -u origin main
```

Si ya imprime un `origin` que apunta a otro sitio, corrígelo en vez de añadirlo:

**[PowerShell]**

```powershell
git remote set-url origin git@github.com:HostingMails/hostingmails-web-corporativa.git
git push -u origin main
```

---

## 1 · Atajo de conexión

Para no escribir la IP cada vez. Crea la carpeta y abre el archivo de config:

**[PowerShell]**

```powershell
New-Item -ItemType Directory -Force "$env:USERPROFILE\.ssh" | Out-Null
notepad "$env:USERPROFILE\.ssh\config"
```

Notepad te preguntará si quieres crear el archivo: dile que sí. Pega esto **dentro
del editor**, guarda y cierra:

**[Archivo]** · `C:\Users\jordi\.ssh\config`

```
Host vps-dev
  HostName 178.105.61.82
  User root
  IdentityFile ~/.ssh/id_ed25519
```

Ese es `vps-dev-01`. Una vez creado tu usuario (paso 1b), el `User` pasa a ser
`jordi`, que es como está ahora en tu config.

> **User `root`, no `jordi`.** Una VPS recién creada en Hetzner solo trae el
> usuario `root`; si pones `jordi` antes de crearlo, `ssh` cae a pedir contraseña
> y falla con `Permission denied (publickey,password)`. Crear tu usuario es el
> paso 1b. Si al crear el servidor le asociaste tu clave SSH, `root` entra sin
> contraseña.

En el config ya está puesto el bloque de producción, que sí funciona:

```
Host vps-prod
  HostName 88.99.84.127
  User root
  IdentityFile ~/.ssh/id_ed25519
```

Comprueba que entra:

**[PowerShell]**

```powershell
ssh vps-dev
```

Si te pide contraseña y no la sabes: en Hetzner la de `root` se envía por correo
al crear el servidor, y se puede regenerar desde el panel (*Server → Rescue →
Reset root password*). Con la consola web del panel siempre se entra aunque el
SSH falle.

A partir de aquí estás **dentro de la VPS**: todo lo que sigue va ahí.

---

## 1b · Crear tu usuario

Solo si entraste como `root` y no existe `jordi` todavía. Compruébalo:

**[VPS]**

```bash
ls /home
```

Si no aparece `jordi`, créalo con sudo y copia tu clave para poder entrar
directamente:

**[VPS]**

```bash
adduser jordi
usermod -aG sudo jordi
rsync --archive --chown=jordi:jordi ~/.ssh /home/jordi
```

`adduser` pregunta una contraseña —póntela y guárdala, te la pedirá cada `sudo`—
y luego varios datos (nombre completo, teléfono...) que puedes dejar vacíos
pulsando Enter.

Ese `rsync` copia las claves autorizadas de `root` a tu usuario: por eso entrarás
con la misma clave y sin contraseña.

Ahora cambia el `User` del bloque `vps-dev` de tu config a `jordi`, sal de la
sesión (`exit`) y vuelve a entrar:

**[PowerShell]**

```powershell
ssh vps-dev
whoami
```

Tiene que responder `jordi`.

---

## 2 · Paquetes base

**[VPS]**

```bash
sudo apt update && sudo apt upgrade -y
sudo apt install -y git curl build-essential
```

---

## 3 · Node 22 con nvm

nvm y no el apt de Ubuntu por un motivo concreto en esta máquina: **ya hay un
Node v20 instalado en el sistema** del que dependen otras apps. nvm te pone el 22
solo para tu usuario, sin tocar ese.

**[VPS]**

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
source ~/.bashrc
nvm install 22
nvm alias default 22
node -v
```

Tiene que responder `v22.x`.

---

## 4 · Git y clave para GitHub

**[VPS]**

```bash
git config --global user.name "Jordi"
git config --global user.email "jordimolto15@gmail.com"
git config --global init.defaultBranch main
```

Clave de la VPS para poder hacer push. El `-N ""` final evita que pida
passphrase:

**[VPS]**

```bash
ssh-keygen -t ed25519 -C "vps-dev-hostingmails" -f ~/.ssh/id_ed25519 -N ""
cat ~/.ssh/id_ed25519.pub
```

Copia lo que imprime el `cat` —una sola línea que empieza por `ssh-ed25519`— y
pégala en GitHub. Como el repo vive en una organización, lo limpio es una
**deploy key** del propio repositorio y no una clave de tu cuenta personal:

**Repo → Settings → Deploy keys → Add deploy key**, marcando *Allow write access*
(sin eso, vps-dev podrá clonar pero no hacer push):

https://github.com/HostingMails/hostingmails-web-corporativa/settings/keys

Después comprueba:

**[VPS]**

```bash
ssh -T git@github.com
```

Con una deploy key responde algo así:

```
Hi HostingMails/hostingmails-web-corporativa! You've successfully authenticated,
but GitHub does not provide shell access.
```

Lo de «but GitHub does not provide shell access» es correcto, no es un error. Que
la primera vez pregunte si añade el host a `known_hosts` también es normal:
responde `yes`.

> Si prefieres usar tu clave personal en vez de una deploy key, va en **tu cuenta
> → Settings → SSH and GPG keys**, y entonces el saludo dirá `Hi TU-USUARIO!`.
> Da acceso a todos tus repos desde la VPS, por eso no es la opción recomendada.

---

## 5 · Clonar el proyecto

**[VPS]**

```bash
mkdir -p ~/apps
cd ~/apps
git clone git@github.com:HostingMails/hostingmails-web-corporativa.git
cd ~/apps/hostingmails-web-corporativa
npm install
```

---

## 6 · Levantar el servidor de desarrollo

**[VPS]**

```bash
cd ~/apps/hostingmails-web-corporativa
npm run dev
```

Vite queda escuchando en `localhost:5173` **dentro de la VPS**. Desde fuera
todavía no se ve. Deja esa terminal corriendo.

---

## 7 · Verlo en tu navegador

Abre **otra** ventana de PowerShell en tu portátil: la anterior la tiene ocupada
el `npm run dev`.

**[PowerShell]**

```powershell
ssh -L 5173:localhost:5173 vps-dev
```

Deja esa ventana abierta —el túnel vive mientras la sesión SSH esté viva— y abre
`http://localhost:5173` en el navegador. El HMR funciona igual que en local.

Es la opción recomendada: no expone nada a internet y no hay que tocar Nginx ni
certificados en dev.

---

## 8 · Editar el código

Lo cómodo es **VS Code con Remote - SSH**:

1. Instala la extensión *Remote - SSH*.
2. `Ctrl+Shift+P` → *Remote-SSH: Connect to Host* → `vps-dev`.
3. *File → Open Folder* → `/home/jordi/apps/hostingmails-web-corporativa`.

El editor va en tu máquina, los archivos y Node en la VPS. Con el túnel del paso
7 abierto, ves los cambios al guardar.

---

## 9 · El ciclo de trabajo

Mientras trabajas:

**[VPS]**

```bash
cd ~/apps/hostingmails-web-corporativa
npm run dev
```

Antes de subir nada:

**[VPS]**

```bash
npm run typecheck
npm run build
git add .
git commit -m "feat: seccion de planes"
git push
```

El push a `main` dispara el despliegue a producción: Coolify recibe el webhook,
construye y publica. Tú no tocas nada más. Ver
[vps-prod-setup.md](vps-prod-setup.md).

---

## Opcional · Enseñar el avance sin túnel

**No está montado y hoy no hace falta.** Con el túnel del paso 7 ves el trabajo en
curso, y con `npm run preview` compruebas el build real antes de publicar.

Si algún día necesitas que alguien más lo vea, **no montes Nginx en esta VPS**:
Traefik (el proxy de Coolify) ya tiene cogidos los puertos 80 y 443. Compruébalo:

**[VPS]**

```bash
sudo ss -tlnp | grep ':80 '
```

Si sale `docker-proxy` o `traefik`, el camino es publicar una app más en el
Coolify de esta máquina:

1. Rama `dev` en el repositorio.
2. Nueva aplicación en el Coolify de vps-dev apuntando a esa rama, con la misma
   configuración de build que producción (`npm ci`, `npm run build`, salida `dist`).
3. Dominio `https://hostingmails.dev.webscrafting.com`, con su registro `A` a
   `178.105.61.82`.

Así `hostingmails.demo.webscrafting.com` queda para producción y no se mezclan.
Cuesta un contenedor más en una máquina que anda con ~1,4 GB libres, así que
móntalo solo cuando lo necesites de verdad.

---

## Si algo falla

| Síntoma | Qué mirar |
| --- | --- |
| `Host : No se encuentra ningún parámetro...` en PowerShell | Estás pegando un bloque **[Archivo]** en la terminal. Ese contenido va dentro del archivo, no en el prompt. |
| `npm run dev` arranca pero el navegador no carga | ¿Tienes el túnel del paso 7 abierto en otra ventana de PowerShell? |
| `Permission denied (publickey)` al hacer push | La clave del paso 4 no está en GitHub, o clonaste con `https://` en vez de `git@`. |
| `node: command not found` al reconectar | nvm se carga desde `~/.bashrc`, que no entra en sesiones no interactivas. `source ~/.nvm/nvm.sh`. |
| `ssh vps-dev` pide contraseña y falla con `Permission denied (publickey,password)` | El usuario del config no existe en la VPS. Entra como `root` y haz el paso 1b. |
| `ssh vps-dev` pide contraseña siendo root | Al crear el servidor no le asociaste tu clave SSH. Usa la contraseña que Hetzner mandó por correo, o resetéala desde el panel, y luego copia tu clave con `ssh-copy-id` desde Git Bash o pegando tu `.pub` en `/root/.ssh/authorized_keys`. |
