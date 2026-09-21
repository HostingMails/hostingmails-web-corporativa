# Infraestructura

Todo lo externo al código: stack, scripts, servidores y despliegue.
Documento de consulta, no de lectura.

## Stack

| Pieza | Versión | Por qué |
| --- | --- | --- |
| Vue | ^3.5.13 | Composition API con `<script setup>`. Sin router ni Pinia: es una one-page sin estado global. |
| TypeScript | ~5.7.2 | `strict` activado, más `noUnusedLocals` y `noUnusedParameters`. |
| Vite | ^6.0.7 | Dev server y build. Alias `@` → `./src`. |
| vue-tsc | ^2.2.0 | Typecheck de los `.vue`, que `tsc` solo no hace. |
| @vitejs/plugin-vue | ^5.2.1 | Compila los SFC. |
| @types/node | ^22.10.5 | Necesario para `node:url` en `vite.config.ts`. |
| Node | 22.13.1 (local) | npm 11.12.1. No hay `.nvmrc`: si el CI usa otra mayor, fíjala. |

**No hay framework de CSS** (ni Tailwind ni nada): CSS plano con tokens propios y
nesting nativo. **No hay librería de iconos**: el set vive en `src/components/ui/AppIcon/icons.ts`.
**No hay linter ni Prettier** configurados — ver pendientes.

## Scripts

| Script | Qué hace |
| --- | --- |
| `npm run dev` | Servidor de desarrollo de Vite con HMR. |
| `npm run build` | `vue-tsc --noEmit` y luego `vite build` → `dist/`. |
| `npm run preview` | Sirve el `dist/` ya construido, para comprobarlo antes de subir. |
| `npm run typecheck` | Solo el typecheck, sin compilar. |

El build pasa en verde. `vue-tsc` corre antes de compilar, así que un error de
tipos para el despliegue antes de tocar producción.

## Servidores

Tres VPS en **Hetzner** (no Hostinger, a diferencia del resto de proyectos):

| Servidor | Host · IP | Para qué |
| --- | --- | --- |
| `vps-dev` | `vps-dev-01` · `178.105.61.82` | Desarrollo y proyectos. Se trabaja **por SSH contra este servidor**, no en local. Usuario `jordi` (con sudo). |
| `vps-prod` | `vps-prod-01` · `88.99.84.127` | Producción: solo webs y apps publicadas. Solo existe el usuario `root`. |
| `vps-mail` | *pendiente* | El servicio de correo que vende HostingMails. Stack: **Mailcow** (suite dockerizada: SMTP/IMAP, webmail SOGo, antispam y panel de admin). |

**El reparto es ese y conviene respetarlo:** en `vps-prod` solo lo que está
publicado; en `vps-dev`, el trabajo en curso. `vps-mail` es el producto, no la
web: la landing solo lo vende.

Las dos VPS son Ubuntu 24.04 y las dos llevan **Coolify con Traefik** ocupando los
puertos 80 y 443 — por eso no se instala Nginx a mano en ninguna.

| | `vps-dev` | `vps-prod` |
| --- | --- | --- |
| Coolify | 4.1.2 | 4.3.23 |
| RAM | 3,7 GB (~1,4 libres) | — |
| Disco | 75 GB al 65% | — |
| Node del sistema | v20.20.2 | no instalado |
| También corre | CRM, FacturaScripts de beply, Postgres, Portainer, GitLab Runner, RustFS y varias apps | otras apps de Coolify |

`vps-dev` va cargada: antes de levantar nada pesado ahí, mira `free -h`. Y el
Node del sistema es v20, así que el proyecto usa **nvm con Node 22** para el
usuario `jordi` y no se toca el del sistema, del que dependen las otras apps.

### Qué se publica y dónde

La web de HostingMails se publica **solo en `vps-prod`**. En `vps-dev` no hay
nada publicado: el trabajo se ve con `npm run dev` por túnel SSH, y el build real
con `npm run preview`.

Si algún día hace falta enseñar el avance sin túnel, la forma limpia es publicar
una rama `dev` en el Coolify de `vps-dev` bajo `hostingmails.dev.webscrafting.com`,
dejando `hostingmails.demo.webscrafting.com` para producción. Hoy no está montado
ni hace falta.

**La web la sirve Coolify**, que construye desde el repositorio y publica detrás
de su Traefik; el TLS de Let's Encrypt lo gestiona él. No hay Nginx ni Certbot
instalados a mano, y no deben instalarse: Traefik ya tiene cogidos el 80 y el 443.

Paso a paso de cada servidor:

- [guides/vps-dev-setup.md](../guides/vps-dev-setup.md) — usuario, Node, repo, túnel SSH y ciclo de trabajo.
- [guides/vps-prod-setup.md](../guides/vps-prod-setup.md) — Coolify: conectar GitHub, configurar el build, dominio y auto-deploy.

## Dominio

Todavía **no hay dominio propio**. Mientras tanto se publica en un subdominio de
otro proyecto:

```
http://hostingmails.demo.webscrafting.com/
```

**El DNS no apunta donde debe.** Hoy resuelve a `vps-dev`, y la web va en
`vps-prod`:

```
hostingmails.demo.webscrafting.com   A   178.105.61.82   ← hay que cambiarlo a 88.99.84.127
```

El DNS de `webscrafting.com` se gestiona en **Hostinger** (nameservers
`ns1.dns-parking.com` y `ns2.dns-parking.com`), así que el registro se toca allí.

> **Pendiente de confirmar:** dominio definitivo. Al fijarlo hay que tocar el
> `canonical`, las `og:url` y las URL absolutas de `index.html`, además del DNS.

## Despliegue

**Coolify**: push a `main` → webhook → Coolify clona, ejecuta `npm ci` y
`npm run build`, y publica el `dist/` detrás de Traefik con su certificado.

Repositorio: **[HostingMails/hostingmails-web-corporativa](https://github.com/HostingMails/hostingmails-web-corporativa)**.

Configuración de la aplicación en el panel:

| Campo | Valor |
| --- | --- |
| Build Pack | `Static` |
| Install Command | `npm ci` |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Domain | `https://hostingmails.demo.webscrafting.com` |

**Falta montarlo**: el repositorio no está conectado a Coolify todavía. Paso a
paso en [guides/vps-prod-setup.md](../guides/vps-prod-setup.md).

El resumen del ciclo: trabajas por SSH en `vps-dev` → push a `main` → Coolify
construye y publica. `vps-dev` nunca despliega a producción; es el entorno de
trabajo, no un paso del despliegue.

No hay secretos de despliegue en GitHub: con la GitHub App de Coolify, el permiso
vive en GitHub y el webhook lo crea él.

## Variables de entorno

Ninguna. El sitio es estático y no habla con ningún servicio. No hay `.env` ni
`.env.example`, y mientras no haya formulario ni analítica no hacen falta.

Recordatorio para cuando las haya: en Vite solo llega al cliente lo que empieza
por `VITE_`, y **todo lo que llega al cliente es público**. Una clave secreta no
puede ir ahí.

## Servicios externos

| Servicio | Para qué | Si se cae |
| --- | --- | --- |
| Google Fonts | Inter y Plus Jakarta Sans, cargadas desde `index.html` con `preconnect`. | El navegador usa la fuente de sistema del fallback. Se ve peor, no se rompe. |

No hay analítica, ni correo transaccional, ni CDN, ni pasarela de pago.

## Pendientes de infraestructura

- **IP de `vps-dev` y de `vps-mail`**: sin ellas no se puede cerrar el acceso ni
  documentar el entorno de trabajo.
- **Registro DNS**: `hostingmails.demo.webscrafting.com` apunta a la VPS del CRM,
  no a `vps-prod`. Se cambia en Hostinger (ver arriba).
- **Conectar el repo a Coolify**: nada publicado todavía.
- **Formulario de contacto**: los CTA apuntan a `#contacto` y todavía no se ha
  decidido qué habrá detrás — backend propio en la VPS, servicio externo tipo
  Formspree, o solo enlaces `mailto` y WhatsApp. La decisión cambia si este
  proyecto tiene capa de servidor o no.
- **Remoto de GitHub**: el repositorio local existe y el de GitHub también, pero
  falta `git remote add origin` y el primer push.
- **Prettier**: no hay configuración. Jordi lo usa en el resto de proyectos y
  Neo lo ejecuta sobre los archivos que toca, así que conviene fijar un
  `.prettierrc` para que el formato no baile.
