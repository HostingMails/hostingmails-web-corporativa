# Arquitectura

## Estructura

```text
src/
├── components/
│   ├── Header/          Header.vue + Header.css
│   ├── Hero/            Hero.vue + Hero.css
│   ├── ValueProps/      ValueProps.vue + ValueProps.css
│   ├── Features/        Features.vue + Features.css
│   ├── Included/        Included.vue + Included.css
│   ├── HowItWorks/      HowItWorks.vue + HowItWorks.css
│   ├── Compatibility/   Compatibility.vue + Compatibility.css
│   ├── Pricing/         Pricing.vue + Pricing.css
│   ├── AddOns/          AddOns.vue + AddOns.css
│   ├── FAQ/             FAQ.vue + FAQ.css
│   ├── CTA/             CTA.vue + CTA.css
│   ├── Footer/          Footer.vue + Footer.css
│   └── ui/              piezas reutilizables entre secciones
│       ├── AppIcon/         set de iconos de trazo (AppIcon.vue, AppIcon.css, icons.ts)
│       ├── BaseButton/      botón con variantes y tamaños
│       ├── BrandLogo/       logotipo, versión clara y oscura
│       └── SectionHeading/  eyebrow + título + descripción
│
├── composables/
│   ├── useScrollSpy.ts      marca la sección activa en la navegación
│   ├── useScrollLock.ts     bloquea el scroll con el menú móvil abierto
│   └── useStickyHeader.ts   compacta la cabecera al bajar
│
├── directives/
│   └── reveal.ts        v-reveal: aparición suave al entrar en pantalla
│
├── data/
│   └── navigation.ts    anclas de la one-page (las usan Header y Footer)
│
├── styles/
│   ├── variables.css    tokens de diseño
│   └── global.css       reset, base tipográfica y utilidades
│
├── App.vue
└── main.ts
```

## Convenciones

**Un componente, una carpeta.** El `.vue` y el `.css` se llaman igual que la carpeta.
El CSS se importa desde el propio `.vue`:

```vue
<script setup lang="ts">
import './Hero.css'
</script>
```

No hay `<style>` dentro de los `.vue`.

**Nombres de clase.** Cada componente usa su propio prefijo en estilo BEM
(`.hero__title`, `.features__card--hero`). Las utilidades compartidas van con prefijo
`hm-` (`.hm-container`, `.hm-section`, `.hm-eyebrow`). Los tokens globales, con `--hm-`.

**Contenido de cada sección.** Los textos y listas viven dentro de su propio componente,
tipados. Así se puede trabajar sección a sección sin tocar nada más.

**Anclas.** Los ids de sección (`caracteristicas`, `incluido`, `como-funciona`,
`compatibilidad`, `planes`, `servicios`, `faq`, `contacto`) salen de
`src/data/navigation.ts`. Si se añade una sección, se añade ahí y aparece sola en la
cabecera y en el pie. En el menú se muestran seis; `servicios` y `contacto` solo se
enlazan desde el pie y desde los botones.

**Fondos.** Cada sección lleva una utilidad de fondo (`.hm-section--cool`, `--mint`,
`--accent`, `--slate`) para que el ritmo claro-oscuro no se rompa al reordenarlas.
Está descrito en `docs/design/design-system.md`.

## Responsive

Mobile-first. Los saltos se escriben con sintaxis de rango (`@media (width >= 900px)`).

| Ancho | Qué cambia |
| --- | --- |
| < 560 px | Una columna en todo. Los CTA del hero y del cierre ocupan el ancho completo |
| ≥ 560 px | Dos columnas en la rejilla de apps y en el pie |
| ≥ 680 px | Bento de características a 6 columnas |
| ≥ 720 px | Barra lateral visible en la ventana del hero; planes a dos columnas |
| ≥ 900 px | Paneles laterales fijos en Cómo funciona y FAQ |
| ≥ 940 px | Qué incluye a tres columnas |
| ≥ 1000 px | Bento a 12 columnas; tres planes en línea |
| ≥ 1060 px | Navegación de escritorio (por debajo, menú móvil: son seis enlaces) |

Los tamaños de texto son fluidos con `clamp()` (ver `variables.css`).

## Accesibilidad

- Enlace de salto al contenido, visible al tabular.
- Menú móvil con `aria-expanded`, `aria-controls` y cierre con `Escape`.
- Acordeón de FAQ con `aria-expanded`, `aria-controls` y `role="region"`.
- Foco visible en todo lo interactivo.
- `prefers-reduced-motion` desactiva animaciones y el scroll suave.

## Detalles a tener en cuenta

- `body` usa `overflow-x: clip`, no `hidden`: `hidden` crea un contenedor de scroll y
  rompe el `position: sticky` de la cabecera.
- `useScrollLock` toca solo `overflow-y` por el mismo motivo.
- `v-reveal` añade `is-revealed` al entrar en pantalla. Si no hay `IntersectionObserver`
  o el usuario prefiere menos movimiento, el contenido se muestra directamente.
