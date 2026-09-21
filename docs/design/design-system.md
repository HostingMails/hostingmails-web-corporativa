# Sistema de diseño

Referencia estética: webs corporativas limpias y espaciosas tipo Odoo. Mucho blanco,
secciones amplias, sombras muy suaves y bordes discretos.

Tres familias de color: **verde** de marca, **ámbar** de acento y **pizarra** para las
bandas oscuras y los fondos fríos. El verde manda; el ámbar aparece poco y siempre
con intención; la pizarra solo hace de fondo.

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

### Ámbar · acento secundario

Escala `--hm-amber-50` … `--hm-amber-900`. Aparece en cuatro sitios y en ninguno más:
el distintivo del plan recomendado, la tarjeta de almacenamiento compartido, la
sección de servicios adicionales y los avisos.

| Token | Valor | Uso |
| --- | --- | --- |
| `--hm-amber-500` | `#c8861a` | Grafismo: barras, filetes, iconos grandes |
| `--hm-amber-700` | `#85570f` | **Texto sobre fondo claro.** El 500 no llega al contraste mínimo |
| `--hm-amber-600` | `#a96e12` | Fondo sólido con texto blanco encima |
| `--hm-amber-300` | `#e6bc63` | Texto e iconos sobre fondo oscuro |
| `--hm-amber-50` | `#fdf6e9` | Fondo de la sección de servicios |

Por eso hay dos gradientes: `--hm-gradient-accent` (claro, solo grafismo) y
`--hm-gradient-accent-deep` (oscuro, para cuando lleva texto blanco).

### Pizarra · bandas oscuras y fondos fríos

Escala `--hm-slate-50` … `--hm-slate-900`. Un gris azulado que, por ser más frío que
el verde, separa bloques sin parecer otra marca.

| Token | Valor | Uso |
| --- | --- | --- |
| `--hm-slate-50` | `#f2f4f3` | Fondo frío alterno (`--hm-color-bg-cool`) |
| `--hm-slate-800` | `#2e3b42` | Arranque de las bandas oscuras |
| `--hm-slate-900` | `#1e282d` | Fondo del pie y final del gradiente |

Se usan por su rol, no por su número: `--hm-color-primary`, `--hm-color-text`,
`--hm-color-border`, `--hm-color-bg-alt`…

Gradientes: `--hm-gradient-brand` (botones y marcas), `--hm-gradient-dark` (paneles
verdes oscuros), `--hm-gradient-slate` (bandas pizarra), `--hm-gradient-soft` (fondo
del hero) y los dos de acento ya citados.

## Ritmo de fondos

Ninguna sección repite el fondo de la anterior. Ese es el ritmo, de arriba abajo:

| Sección | Fondo | Clase |
| --- | --- | --- |
| Hero | Degradado verde | (propia) |
| ValueProps | Pizarra oscuro | (propia) |
| Features | Blanco | — |
| Included | Pizarra oscuro | (propia) |
| HowItWorks | Gris frío | `.hm-section--cool` |
| Compatibility | Blanco con panel verde oscuro | `.hm-section--edge-bottom` |
| Pricing | Verde claro | `.hm-section--mint` |
| AddOns | Ámbar suave | (propia) |
| FAQ | Blanco | — |
| CTA | Blanco con panel verde oscuro | (propia) |
| Footer | Pizarra muy oscuro | (propia) |

Las utilidades de fondo viven en `global.css`: `--alt`, `--cool`, `--mint`, `--accent`,
`--slate`, más `--edge-top` y `--edge-bottom` para poner un filete cuando dos fondos
claros se tocan.

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
| Hero | Dos columnas: texto + ventana de webmail con barra de almacenamiento y tarjetas flotantes |
| ValueProps | Tira oscura de tres columnas separadas por filetes |
| Features | Bento: una tarjeta grande, una media, tres compactas y una ancha |
| Included | Tres listas de verificación sobre oscuro + dos notas de lo que no entra |
| HowItWorks | Panel fijo a la izquierda, pasos numerados unidos por una línea |
| Compatibility | Rejilla de aplicaciones + panel oscuro con los datos de configuración |
| Pricing | Tres planes con el central destacado y selector de ciclo |
| AddOns | Tarifario: concepto, línea de puntos y precio a la derecha |
| FAQ | Introducción fija a la izquierda, acordeón a la derecha |
| CTA | Banda oscura a sangre con patrón y tarjeta de contacto |
| Footer | Bloque de marca + tres columnas de enlaces |

## Iconos

Un único set en `src/components/ui/AppIcon/icons.ts`: caja de 24×24, solo trazo,
grosor 1,75 y extremos redondeados. Añadir uno nuevo es añadir una entrada al objeto;
el tipo `IconName` se actualiza solo.
