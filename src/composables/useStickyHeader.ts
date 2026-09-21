import { onBeforeUnmount, onMounted, readonly, ref } from 'vue'

/**
 * Indica si la página ha bajado del umbral para compactar la cabecera.
 */
export function useStickyHeader(threshold = 16) {
  const isScrolled = ref(false)

  const update = () => {
    isScrolled.value = window.scrollY > threshold
  }

  onMounted(() => {
    update()
    window.addEventListener('scroll', update, { passive: true })
  })

  onBeforeUnmount(() => window.removeEventListener('scroll', update))

  return { isScrolled: readonly(isScrolled) }
}
