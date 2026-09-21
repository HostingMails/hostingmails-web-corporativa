export interface NavLink {
  id: string
  label: string
}

/** Anclas de la one-page. Las comparten la cabecera y el pie. */
export const navLinks: readonly NavLink[] = [
  { id: 'caracteristicas', label: 'Características' },
  { id: 'como-funciona', label: 'Cómo funciona' },
  { id: 'compatibilidad', label: 'Compatibilidad' },
  { id: 'planes', label: 'Planes' },
  { id: 'faq', label: 'Preguntas' },
] as const

export const sectionIds = navLinks.map((link) => link.id)
