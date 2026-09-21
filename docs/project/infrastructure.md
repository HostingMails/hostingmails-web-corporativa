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

| Servidor | Para qué |
| --- | --- |
| `vps-dev` | Desarrollo. Se trabaja **por SSH contra este servidor**, no en local: el proyecto no se monta en la máquina de Jordi. |
| `vps-prod` | Producción. Aquí vive la web publicada. |
| `vps-mail` | El servicio de correo que vende HostingMails. Stack: **Mailcow** (suite dockerizada: SMTP/IMAP, webmail SOGo, antispam y panel de admin). |

`vps-mail` es el producto, no la web. La landing solo lo vende.

**Nginx** sirve los estáticos y **Certbot** emite el TLS. Las guías de montaje lo
dan por hecho; está pendiente de que Jordi lo confirme (la alternativa sería
Caddy, que trae HTTPS automático y se ahorra Certbot).

Paso a paso de cada servidor:

- [guides/vps-dev-setup.md](../guides/vps-dev-setup.md) — Node, repo, túnel SSH y ciclo de trabajo.
- [guides/vps-prod-setup.md](../guides/vps-prod-setup.md) — Nginx, DNS, HTTPS, usuario de deploy y workflow.

## Dominio

Todavía **no hay dominio propio**. Mientras tanto se publica en un subdominio de
otro proyecto:

```
http://hostingmails.demo.webscrafting.com/
```

> **Pendiente de confirmar:** dominio definitivo. Al fijarlo hay que tocar el
> `canonical`, las `og:url` y las URL absolutas de `index.html`, además del DNS y
> el certificado.

## Despliegue

**GitHub Actions → SSH/rsync**: push a `main`, el workflow hace el build y sube
el `dist/` a `vps-prod`. Así la VPS no necesita Node ni el repo.

El repositorio ya está en git. **Falta crear `.github/workflows/deploy.yml`**: el
contenido está escrito y listo para copiar en el paso 10 de
[guides/vps-prod-setup.md](../guides/vps-prod-setup.md).

El resumen del ciclo: trabajas por SSH en `vps-dev` → push a `main` → Actions
construye y sube el `dist/` a `vps-prod` por rsync. `vps-dev` nunca despliega a
producción; es el entorno de trabajo, no un paso del despliegue.

Cuando se monte, hará falta como secretos de GitHub:

| Secreto | Para qué |
| --- | --- |
| `SSH_HOST` | IP o host de `vps-prod`. |
| `SSH_USER` | Usuario de despliegue (mejor uno dedicado, no root). |
| `SSH_KEY` | Clave privada del usuario de despliegue. |
| `DEPLOY_PATH` | Ruta del document root en el servidor. |

Los valores **nunca** se escriben aquí ni en el repo.

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

- **Servidor web**: Nginx, pendiente de que Jordi lo confirme (ver arriba).
- **Formulario de contacto**: los CTA apuntan a `#contacto` y todavía no se ha
  decidido qué habrá detrás — backend propio en la VPS, servicio externo tipo
  Formspree, o solo enlaces `mailto` y WhatsApp. La decisión cambia si este
  proyecto tiene capa de servidor o no.
- **Remoto de GitHub**: el repositorio local existe; falta crearlo en GitHub y
  añadir el remoto. Sin eso no hay Actions.
- **Prettier**: no hay configuración. Jordi lo usa en el resto de proyectos y
  Neo lo ejecuta sobre los archivos que toca, así que conviene fijar un
  `.prettierrc` para que el formato no baile.
