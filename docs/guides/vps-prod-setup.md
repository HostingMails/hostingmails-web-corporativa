# Publicar en vps-prod con Coolify

Deja la web publicada en `vps-prod` y desplegándose sola en cada push. Se hace
**una vez**.

## Cómo leer esta guía

Cada bloque lleva encima una etiqueta que dice qué es:

- **[PowerShell]** — se pega en tu terminal de Windows.
- **[VPS]** — se pega en la VPS, después de conectarte por SSH.
- **[Panel]** — se hace con el ratón en la interfaz de Coolify, no en una terminal.

Si un bloque no lleva etiqueta, no es para copiar.

## Lo que ya hay montado

Comprobado el 21/09/2026 en el servidor:

| Qué | Valor |
| --- | --- |
| Host | `vps-prod-01` · `88.99.84.127` |
| Sistema | Ubuntu 24.04.4 LTS |
| Coolify | 4.3.23 |
| Proxy | Traefik v3.6, ocupando los puertos 80, 443 y 8080 |
| Acceso | `root` con tu clave `~/.ssh/id_ed25519`. **No hay usuario `jordi`** |
| Node / Nginx | No instalados: no hacen falta, el build va en un contenedor |

**Por eso no se monta Nginx a mano aquí.** Traefik ya tiene cogidos el 80 y el
443; meter otro servidor web al lado es pelearse por los puertos para acabar
haciendo lo que Coolify ya hace.

---

## 1 · Entrar al panel

Abre en el navegador:

```
http://88.99.84.127:8000
```

Si le tienes un dominio puesto al propio Coolify, entra por ahí. Si no responde,
comprueba desde tu portátil que el contenedor está vivo:

**[PowerShell]**

```powershell
ssh root@88.99.84.127 "docker ps --filter name=coolify"
```

---

## 2 · Conectar GitHub

El repo es privado y vive en una organización, así que Coolify necesita permiso.
Dos caminos; el primero es mejor porque trae el auto-deploy ya hecho.

**Opción A · GitHub App (recomendada)**

**[Panel]**

1. *Sources* → **+ Add** → **GitHub App**.
2. Nombre: `HostingMails`.
3. *Register a GitHub App* → te lleva a GitHub. Instálala en la organización
   **HostingMails**.
4. En *Repository access*, elige **Only select repositories** →
   `hostingmails-web-corporativa`.

Con esto Coolify recibe el webhook de cada push y despliega solo.

**Opción B · Deploy key**

**[Panel]**

1. *Sources* → **+ Add** → **Private Repository (with deploy key)**.
2. Coolify genera una clave pública: cópiala.
3. Pégala en
   https://github.com/HostingMails/hostingmails-web-corporativa/settings/keys
   (no hace falta *Allow write access*: Coolify solo lee).

Con deploy key **no hay webhook automático**: el auto-deploy hay que montarlo
aparte o desplegar a mano desde el panel.

---

## 3 · Crear el proyecto

**[Panel]**

1. *Projects* → **+ Add** → nombre `HostingMails`.
2. Dentro, **+ New Resource** → **Application** → la fuente del paso 2.
3. Repositorio: `HostingMails/hostingmails-web-corporativa`.
4. Branch: `main`.

---

## 4 · Configurar el build

Es una SPA estática de Vite: no hay servidor que levantar, solo archivos que
servir.

**[Panel]** · pestaña *General* de la aplicación

| Campo | Valor |
| --- | --- |
| Build Pack | `Static` |
| Install Command | `npm ci` |
| Build Command | `npm run build` |
| Publish / Output Directory | `dist` |
| Port | `80` (lo sirve el contenedor estático; no lo toques salvo que Coolify se queje) |

> Si tu versión del panel llama a esos campos de otra forma, el orden es el
> mismo: instalar, construir, y decirle dónde queda el resultado. El resultado de
> `npm run build` en este proyecto siempre es `dist/`.

Ojo: `npm run build` lanza `vue-tsc --noEmit` antes de compilar. Si hay un error
de tipos, el despliegue se para ahí y producción no se toca. Es a propósito.

---

## 5 · Dominio y DNS

**Esto hay que arreglarlo antes de desplegar.** Ahora mismo el subdominio existe
pero apunta a otro servidor:

```
hostingmails.demo.webscrafting.com   A   178.105.61.82   ← la VPS del CRM
```

Tiene que apuntar a vps-prod-01:

```
hostingmails.demo.webscrafting.com   A   88.99.84.127
```

El DNS de `webscrafting.com` está en **Hostinger** (los nameservers son
`ns1.dns-parking.com` y `ns2.dns-parking.com`), así que el registro se cambia en
el panel DNS de Hostinger, no en Hetzner ni en Coolify.

Comprueba desde tu portátil hasta que devuelva la IP nueva (puede tardar):

**[PowerShell]**

```powershell
Resolve-DnsName hostingmails.demo.webscrafting.com
```

Cuando resuelva bien, en el panel:

**[Panel]** · *General* → *Domains*

```
https://hostingmails.demo.webscrafting.com
```

Ponlo con **https://**: así Traefik pide el certificado de Let's Encrypt solo. Si
lo pones con `http://` no habrá certificado.

---

## 6 · Desplegar

**[Panel]** → botón **Deploy**.

Sigue el log en vivo en la pestaña *Deployments*. La primera vez tarda más porque
se descarga todo `node_modules`.

---

## 7 · Comprobar

**[PowerShell]**

```powershell
curl.exe -I https://hostingmails.demo.webscrafting.com
```

En PowerShell hay que llamar a `curl.exe`: `curl` a secas es un alias de
`Invoke-WebRequest` y no acepta `-I`. Tiene que responder `HTTP/2 200`.

---

## 8 · Auto-deploy en cada push

Con la **GitHub App** del paso 2 ya funciona: push a `main` → webhook → Coolify
construye y publica. Compruébalo en *Webhooks* dentro de la aplicación.

Si usaste **deploy key**, no hay webhook: entra al panel y pulsa *Deploy* cuando
quieras publicar.

---

## Si algo falla

| Síntoma | Qué mirar |
| --- | --- |
| El build falla en `npm ci` | El `package-lock.json` no está commiteado o no cuadra con el `package.json`. |
| El build falla en `vue-tsc` | Error de tipos real. Reprodúcelo con `npm run build` en vps-dev. |
| Despliega pero sale 404 | El *Output Directory* no es `dist`, o el build no generó nada. Mira el log del deploy. |
| Sin certificado / aviso de seguridad | El dominio se puso con `http://`, o el DNS todavía no apuntaba a esta IP cuando Traefik pidió el certificado. Arregla el DNS y vuelve a desplegar. |
| «too many certificates» de Let's Encrypt | Has reintentado demasiadas veces con el DNS mal. Hay que esperar; el límite es semanal. |
| El push no dispara nada | Estás con deploy key, no con GitHub App. O el webhook de GitHub está fallando: míralo en *Settings → Webhooks* del repo. |
| El panel no carga | `ssh root@88.99.84.127 "docker ps --filter name=coolify"` y, si hace falta, `docker restart coolify`. |

## Volver atrás

En *Deployments* tienes el historial: cada despliegue guarda su commit. Para
revertir, **Redeploy** sobre el despliegue anterior que funcionaba. Si prefieres
dejar el historial limpio, `git revert` del commit malo y push, que vuelve a
desplegar.

## Nota sobre el usuario `jordi`

En este servidor solo existe `root`. Con Coolify no hace falta más: no se sube
nada por SSH ni por rsync, lo hace todo el panel desde el repositorio. Si algún
día quieres un usuario sin privilegios para entrar a mirar, se crea con
`adduser`, pero no es un paso necesario para publicar.
