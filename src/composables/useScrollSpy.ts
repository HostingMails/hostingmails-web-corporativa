import { onBeforeUnmount, onMounted, readonly, ref } from 'vue'

/**
 * Marca como activa la sección visible en pantalla para resaltar su
 * enlace en la navegación.
 */
export function useScrollSpy(sectionIds: readonly string[]) {
  const activeId = ref<string>(sectionIds[0] ?? '')
  let observer: IntersectionObserver | undefined

  onMounted(() => {
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (!sections.length) return

    observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible) activeId.value = visible.target.id
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.6] },
    )

    sections.forEach((section) => observer?.observe(section))
  })

  onBeforeUnmount(() => observer?.disconnect())

  return { activeId: readonly(activeId) }
}
