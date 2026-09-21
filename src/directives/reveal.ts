import type { Directive } from 'vue'

/**
 * v-reveal · aparición suave al entrar en pantalla.
 * Uso: <div v-reveal> o <div v-reveal="150"> para retrasar 150 ms.
 */
export const vReveal: Directive<HTMLElement, number | undefined> = {
  mounted(el, binding) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReducedMotion || typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-revealed')
      return
    }

    el.classList.add('hm-reveal')
    if (binding.value) el.style.setProperty('--hm-reveal-delay', `${binding.value}ms`)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          el.classList.add('is-revealed')
          observer.disconnect()
        })
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.12 },
    )

    observer.observe(el)
  },
}
