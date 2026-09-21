# Guía de estilo de código

Las reglas que se aplican en este proyecto. Mandan sobre cualquier valor por
defecto. Esto es **código**; lo visual (color, tipografía, escala) va en
`docs/design/design-system.md`.

> **Ojo:** el código actual **no cumple** algunas de estas reglas. Están
> acordadas, no aplicadas. El desfase está listado al final, en
> [Deuda pendiente](#deuda-pendiente).

## Idioma

- **Código en inglés**: nombres de archivo, variables, funciones, tipos y clases CSS.
- **Contenido y comentarios en castellano**: es lo que hay en `data/navigation.ts`
  y en las cabeceras de `variables.css`, y así se queda.
- Nunca mezclar los dos dentro de un mismo nombre (`getPlanes`, `navegacionLinks`).

## Nomenclatura

**Todo en kebab-case en disco**: carpetas, `.vue`, `.ts` y `.css`.

```
src/components/ui/base-button/
  base-button.vue
  base-button.css
```

Al importar, el componente sí va en PascalCase, que es lo que Vue espera:

```ts
import BaseButton from '@/components/ui/base-button/base-button.vue'
```

El motivo no es estético: Windows no distingue `BaseButton` de `basebutton`, pero
el servidor Linux sí. Un rename que funciona en local y da 404 en `vps-prod` sale
justo de ahí. Como el despliegue va a Hetzner, esto importa.

El resto:

| Qué | Cómo | Ejemplo |
| --- | --- | --- |
| Variables y funciones | `camelCase`, función empieza por verbo | `closeMenu`, `activeId` |
| Booleanos | `is`, `has`, `should`, `can` | `isMenuOpen`, `isScrolled` |
| Tipos e interfaces | `PascalCase` | `NavLink`, `IconName` |
| Constantes de módulo | `SCREAMING_SNAKE_CASE` | `MAX_MAILBOXES` |
| Composables | archivo `use-algo.ts`, export `useAlgo()` | `use-scroll-spy.ts` → `useScrollSpy()` |
| Clases CSS | `kebab-case`, en inglés | `.site-header`, `.nav-link` |
| Tokens CSS | prefijo `--hm-` | `--hm-color-primary` |
| Variables CSS internas de un componente | prefijo `--_` | `--_bg` en `base-button` |

Nombres que dicen qué son. Nada de `data`, `item`, `temp`, `handleClick`, `doStuff`.

## Imports

Alias `@/` siempre, nunca `../../`. Ya está configurado en `vite.config.ts` y en
`tsconfig.app.json`, así que funciona en el build y en el editor.

```ts
import { navLinks } from '@/data/navigation'      // sí
import { navLinks } from '../../data/navigation'  // no
```

## Componentes Vue

- `<script setup lang="ts">` siempre, Composition API.
- Orden dentro del archivo: `<script>`, `<template>`, `<style>`.
- Props tipadas con `defineProps<T>()` y `withDefaults` para los valores por
  defecto, como en `base-button` y `section-heading`. Nada de la sintaxis de
  objeto sin tipos.
- Las clases que dependen de props se componen en un `computed` que devuelve un
  array, no con concatenaciones dentro del template.
- Si un trozo de template pasa de ~40 líneas o tiene lógica propia, es un
  componente aparte.
- Lógica con estado reutilizable → `composables/`. Función pura → `utils/`.
- Contenido (textos, listas, planes) → `data/`, nunca escrito a mano en el template.

## CSS

**Un archivo `.css` por componente, al lado del `.vue`, enlazado con `<style src>`:**

```vue
<style src="./base-button.css"></style>
```

Nada de `<style scoped>` ni CSS inline. `scoped` mete un atributo en cada
elemento y complica sobreescribir desde el padre; el aislamiento lo da la clase
raíz única.

**Una clase raíz por componente y todo colgando de ella con nesting**, que
PostCSS ya soporta de forma nativa:

```css
.site-header {
  position: sticky;

  &.is-scrolled { }

  .nav-link {
    &.is-active { }
  }
}
```

**Sin prefijos repetidos**: dentro de `.site-header` va `.nav-link`, no
`.site-header__nav-link`. La raíz ya da el contexto. Los estados van con `is-`
(`.is-active`, `.is-open`), no con modificador BEM.

Y además:

- **Tokens siempre**, de `styles/variables.css`. Un `#268A60` suelto en un
  componente es deuda: cuando cambie la marca, no aparece.
- **Nada de `margin` para layout.** `flex`/`grid` + `gap` + `padding`. Excepciones
  válidas: resets, `margin-inline: auto` para centrar, y casos puntuales con un
  comentario que diga por qué.
- Las utilidades globales (`.hm-container`, `.hm-section`, `.hm-eyebrow`,
  `.hm-visually-hidden`) se reutilizan antes que reinventarlas.
- `z-index` solo desde la escala (`--hm-z-header`, `--hm-z-overlay`, `--hm-z-drawer`).
- Transiciones con los tokens de movimiento (`--hm-duration`, `--hm-ease`), nunca
  con valores sueltos.
- `!important` solo contra CSS de terceros, y con comentario.

## TypeScript

- `strict` está activado y se queda así.
- Nada de `any`, ni explícito ni implícito.
- `readonly` en los datos estáticos (`navLinks` ya lo hace) para que nadie los
  mute por accidente.
- Los composables devuelven `readonly(ref)` cuando el estado no debe tocarse
  desde fuera — como hacen `useScrollSpy` y `useStickyHeader`.
- Los tipos que se usan en más de un archivo van junto al dato que describen
  (`NavLink` en `data/navigation.ts`), no en un `types.ts` cajón de sastre.

## Accesibilidad — mínimos que no se negocian

- Todo botón o enlace sin texto visible lleva `aria-label`.
- Los `<svg>` decorativos, `aria-hidden="true"` y `focusable="false"` (lo hace ya
  `app-icon`).
- Los paneles desplegables llevan `aria-expanded` y `aria-controls`, y cierran
  con `Escape`.
- `:focus-visible` no se quita nunca.
- Cualquier animación respeta `prefers-reduced-motion`.

## Deuda pendiente

El código actual se desvía de la guía en estos puntos. Se arregla con una pasada
de Neo, no a mano y no ahora mismo:

> Los tres primeros chocan con lo que se pidió por escrito al montar el proyecto
> (carpetas `Header/Header.vue`, CSS importado desde el `<script setup>`). Antes
> de tocarlos hay que decidir cuál de las dos cosas manda.

| Regla | Qué hay ahora | Cómo se arregla |
| --- | --- | --- |
| kebab-case en disco | `components/ui/BaseButton/BaseButton.vue`, `Header/Header.vue` | `/neo fix-naming` |
| `<style src>` | El CSS se importa desde el script: `import './Header.css'` | `/neo fix-css` |
| Clase raíz + nesting | BEM plano: `.site-header__nav-link--active` | `/neo fix-css` |
| `Header/` en `components/` | Su sitio es `components/layout/` | `/neo fix-structure` |

El alias `@/` ya está aplicado en todo `src/`.
