# Sistema de diseño

Referencia estética: webs corporativas limpias y espaciosas tipo Odoo. Mucho blanco,
secciones amplias, sombras muy suaves, bordes discretos y verde como color de marca.

Todos los tokens están en `src/styles/variables.css`.

## Color

Verde natural, sin saturar. La escala completa va de `--hm-green-50` a `--hm-green-900`.

| Token | Valor | Uso |
| --- | --- | --- |
| `--hm-green-500` | `#268a60` | Color principal: botones, iconos, acentos |
| `--hm-green-600` | `#1f7150` | Hover del principal |
| `--hm-green-800` | `#174d39` | Paneles oscuros |
| `--hm-green-900` | `#103528` | Fondo del pie y del CTA |
| `--hm-green-100` | `#dcede3` | Fondos de icono, chips, resaltados |
| `--hm-green-50` | `#eef7f1` | Fondos suaves |
| `--hm-neutral-0` | `#ffffff` | Fondo principal |
| `--hm-neutral-50` | `#f7faf7` | Fondo de sección alterna |
| `--hm-neutral-200` | `#e4ebe6` | Bordes |
| `--hm-neutral-500` | `#66736b` | Texto secundario |
| `--hm-neutral-900` | `#202b25` | Texto principal |

Se usan por su rol, no por su número: `--hm-color-primary`, `--hm-color-text`,
`--hm-color-border`, `--hm-color-bg-alt`…

Gradientes: `--hm-gradient-brand` (botones y marcas), `--hm-gradient-dark` (paneles
oscuros), `--hm-gradient-soft` (fondo del hero).

## Tipografía

- **Plus Jakarta Sans** (`--hm-font-display`) para titulares.
- **Inter** (`--hm-font-sans`) para el cuerpo.
- Monoespaciada del sistema (`--hm-font-mono`) para datos técnicos: registros DNS,
  servidores, protocolos.

Escala fluida con `clamp()`, de `--hm-text-xs` a `--hm-text-5xl`. Los titulares llevan
`letter-spacing` negativo y `text-wrap: balance`.

## Espaciado

Escala de 4 px (`--hm-space-1` … `--hm-space-32`).

- `--hm-section-y`: ritmo vertical de las secciones, `clamp(4rem, 7vw, 7.5rem)`.
- `--hm-gutter`: margen lateral, `clamp(1.25rem, 4vw, 2.5rem)`.
- `--hm-container`: 1200 px. `--hm-container-narrow`: 820 px.

## Radios y sombras

Radios de `--hm-radius-xs` (6 px) a `--hm-radius-2xl` (36 px), más `--hm-radius-pill`.
Las tarjetas usan `lg` (20 px), los paneles grandes `xl`/`2xl` y los botones `pill`.

Sombras siempre suaves y con tinte verde:
`--hm-shadow-xs` para tarjetas en reposo, `--hm-shadow-md` en hover, `--hm-shadow-lg`
para elementos flotantes y `--hm-shadow-brand` para el botón principal.

## Movimiento

- `--hm-duration` 220 ms para interacciones, `--hm-duration-slow` 420 ms para apariciones.
- `--hm-ease` para hover, `--hm-ease-out` para entradas.
- Nada dura más de medio segundo y no hay rebotes.
- Todo se desactiva con `prefers-reduced-motion`.

## Composición de secciones

Cada sección tiene su propia estructura para que la página no sea una sucesión de
tarjetas iguales:

| Sección | Composición |
| --- | --- |
| Hero | Dos columnas: texto + ventana de webmail con tarjetas flotantes |
| Features | Bento: una tarjeta grande, una media, tres compactas y una ancha |
| HowItWorks | Panel fijo a la izquierda, pasos numerados unidos por una línea |
| Compatibility | Rejilla de aplicaciones + panel oscuro con los datos de configuración |
| Pricing | Tres planes con el central destacado y selector de ciclo |
| FAQ | Introducción fija a la izquierda, acordeón a la derecha |
| CTA | Banda oscura a sangre con patrón y tarjeta de contacto |
| Footer | Bloque de marca + tres columnas de enlaces |

## Iconos

Un único set en `src/components/ui/AppIcon/icons.ts`: caja de 24×24, solo trazo,
grosor 1,75 y extremos redondeados. Añadir uno nuevo es añadir una entrada al objeto;
el tipo `IconName` se actualiza solo.
