import { onBeforeUnmount, watch, type Ref } from 'vue'

/**
 * Evita el scroll de fondo mientras hay una capa abierta (menú móvil).
 * Solo toca el eje vertical para no pisar el `overflow-x: clip` del body.
 */
export function useScrollLock(locked: Ref<boolean>) {
  const apply = (value: boolean) => {
    document.body.style.overflowY = value ? 'hidden' : ''
  }

  watch(locked, apply)
  onBeforeUnmount(() => apply(false))
}
