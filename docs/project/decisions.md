# Decisiones

Por qué las cosas son como son. Una entrada por decisión, corta. Este documento
**solo crece**: si algo cambia, se añade una entrada nueva que lo sustituye, no
se reescribe la vieja.

---

### 2026-09-21 · Las VPS van en Hetzner, no en Hostinger

El resto de proyectos de Jordi están en Hostinger. HostingMails no: hay tres VPS
en Hetzner (`vps-dev`, `vps-prod`, `vps-mail`). El motivo es el producto — vender
buzones de correo necesita un servidor con control total del puerto 25, IP
dedicada y reputación propia, y eso un hosting compartido no lo da. Teniendo ya
las VPS, la web se queda en el mismo sitio.

---

### 2026-09-21 · Se desarrolla en vps-dev por SSH, no en local

El proyecto no se monta en la máquina de Jordi: se trabaja contra `vps-dev` por
SSH. Ventaja: un solo entorno, igual al de producción, sin «en mi máquina
funciona». Coste: hace falta conexión para tocar nada, y el editor va por remoto.

---

### 2026-09-21 · Mailcow como stack de correo

Para `vps-mail`. Es la suite dockerizada más rodada para revender buzones: trae
SMTP/IMAP, webmail (SOGo), antispam y panel de administración en un solo
despliegue. Alternativas que se miraron: Stalwart (más moderno y ligero, pero
menos camino recorrido) y Mailu.

---

### 2026-09-21 · Despliegue con GitHub Actions por SSH/rsync

Push a `main` → el workflow hace el build y sube el `dist/` a `vps-prod` por SSH.
Alternativa descartada: `git pull` y build en la propia VPS, que obliga a tener
Node y el repositorio en producción. Así la VPS solo sirve archivos estáticos.

---

### 2026-09-21 · La web solo se publica en vps-prod; en dev no hay nada publicado

El reparto de las VPS es: `vps-prod` para lo publicado, `vps-dev` para el
desarrollo y los proyectos en curso. Siguiéndolo, la landing se publica solo en
`vps-prod` y en `vps-dev` no se monta ninguna app.

Por qué no hay entorno de preview: el túnel SSH cubre el día a día y
`npm run preview` cubre probar el build antes de publicar. Jordi trabaja solo, así
que no hay nadie a quien enseñarle una URL. Añadir una app en el Coolify de
`vps-dev` cuesta un contenedor en una máquina que ya anda con ~1,4 GB libres.

Si hiciera falta, la forma acordada es una rama `dev` publicada bajo
`hostingmails.dev.webscrafting.com`, dejando `hostingmails.demo…` para producción.

---

### 2026-09-21 · Se despliega con Coolify, no con GitHub Actions

**Sustituye a la decisión anterior de Actions + rsync.** Al mirar el servidor
apareció que `vps-prod-01` ya tiene Coolify 4.3.23 con Traefik v3.6 ocupando los
puertos 80 y 443, y otras apps desplegadas. Montar Nginx y Certbot al lado
habría sido pelearse por los puertos para acabar haciendo lo mismo que Coolify
ya hace: clonar el repo, construir, servir y renovar el certificado.

Coste: el despliegue depende del panel, no de un archivo versionado en el repo.
Si algún día molesta, el camino manual (usuario `deploy`, rsync y vhost) sigue
siendo válido en una VPS sin Coolify.

---

### 2026-09-21 · kebab-case en disco y CSS con clase raíz y nesting

Acordado en `/neo init`. El código venía en PascalCase (`BaseButton/BaseButton.vue`)
con BEM plano y el CSS importado desde el script. Se fija el estándar de siempre
de Jordi: kebab-case en archivos y carpetas, `<style src="">` y clase raíz única
con nesting. Kebab evita el 404 por mayúsculas al desplegar en Linux, que aquí es
un riesgo real. El código está por migrar — ver la deuda en
[code-style-guide.md](code-style-guide.md).

---

### Reconstruidas del código

Decisiones ya tomadas que no estaban escritas en ningún sitio:

**Sin router ni Pinia.** Es una one-page: la navegación son anclas y el estado es
local o vive en un composable. Meter Vue Router para una sola página añade peso y
complejidad sin dar nada.

**CSS plano con tokens propios, sin Tailwind.** Toda la escala vive en
`styles/variables.css` con prefijo `--hm-`, y el nesting es el nativo de PostCSS.
Para un sitio de una página, una utilidad por clase sobra; los tokens dan lo que
hace falta y el CSS se lee.

**Set de iconos propio en vez de librería.** `ui/AppIcon/icons.ts` guarda solo el
interior de cada `<svg>` como string y el componente pone el resto. Son ~20
iconos: traer una librería entera para eso pesa más y obliga a que todos
compartan un estilo que no es el nuestro. El coste es dibujarlos a mano sobre la
caja de 24x24, solo con trazo.

**Inter + Plus Jakarta Sans desde Google Fonts.** Inter para el texto, Jakarta
para los titulares, con `preconnect` en `index.html`. Si algún día molesta la
dependencia externa, se autoalojan — es cambiar el `<link>` por un `@font-face`.

**Tipografía y espaciado fluidos con `clamp()`.** En vez de media queries por
cada tamaño. Menos puntos de ruptura que mantener y ningún salto brusco al
redimensionar.
