/**
 * Set de iconos minimalistas, todos sobre una caja de 24x24 y dibujados
 * solo con trazo para que compartan el mismo peso visual.
 */
export const icons = {
  mail: '<rect x="2.5" y="4.5" width="19" height="15" rx="3" /><path d="m3.6 8 7.3 4.9a2 2 0 0 0 2.2 0L20.4 8" />',
  inbox:
    '<rect x="2.5" y="4.5" width="19" height="15" rx="3" /><path d="M2.5 14h4l1.5 2.5h8L17.5 14h4" />',
  at: '<circle cx="12" cy="12" r="3.4" /><path d="M15.4 8.6v4.9a2.8 2.8 0 0 0 5.6 0V12a9 9 0 1 0-3.7 7.3" />',
  forward: '<path d="m14 5.5 6 6-6 6" /><path d="M20 11.5H9.5a5 5 0 0 0-5 5v2.5" />',
  database:
    '<ellipse cx="12" cy="6" rx="7.5" ry="3" /><path d="M4.5 6v6c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3V6" /><path d="M4.5 12v6c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3v-6" />',
  shield:
    '<path d="M12 3 5.2 5.9v5.4c0 4.05 2.8 7.35 6.8 9.2 4-1.85 6.8-5.15 6.8-9.2V5.9Z" /><path d="m9.3 12 2 2 3.5-3.6" />',
  browser:
    '<rect x="2.5" y="4.5" width="19" height="15" rx="3" /><path d="M2.5 9.2h19" /><path d="M6 6.85h.01M8.6 6.85h.01M11.2 6.85h.01" />',
  check: '<path d="m5.5 12.6 4.3 4.3 8.7-9.8" />',
  chevronDown: '<path d="m6.5 9.75 5.5 5.5 5.5-5.5" />',
  arrowRight: '<path d="M4 12h14.5" /><path d="m12.75 6.25 6 5.75-6 5.75" />',
  menu: '<path d="M4 7.5h16M4 12h16M4 16.5h11" />',
  close: '<path d="m6.5 6.5 11 11M17.5 6.5l-11 11" />',
  lock: '<rect x="4.5" y="10.2" width="15" height="10.3" rx="2.6" /><path d="M8 10.2V7.8a4 4 0 0 1 8 0v2.4" />',
  globe:
    '<circle cx="12" cy="12" r="8.8" /><path d="M3.2 12h17.6" /><path d="M12 3.2c2.2 2.4 3.4 5.5 3.4 8.8s-1.2 6.4-3.4 8.8c-2.2-2.4-3.4-5.5-3.4-8.8s1.2-6.4 3.4-8.8Z" />',
  users:
    '<circle cx="9.2" cy="8.2" r="3.4" /><path d="M2.8 19.8a6.4 6.4 0 0 1 12.8 0" /><path d="M16.2 5.4a3.4 3.4 0 0 1 0 5.6" /><path d="M17.8 14.6a6.4 6.4 0 0 1 3.4 5.2" />',
  smartphone:
    '<rect x="6.8" y="2.6" width="10.4" height="18.8" rx="2.6" /><path d="M10.6 18.4h2.8" />',
  laptop: '<path d="M5 6.5h14v9H5z" /><path d="M2.5 18.5h19" />',
  cloud: '<path d="M7.4 19a4.6 4.6 0 0 1-.7-9.16A6.1 6.1 0 0 1 18.3 11.2 3.9 3.9 0 0 1 17.6 19Z" />',
  filter: '<path d="M3.8 5.4h16.4l-6.4 7.6v6.8l-3.6-2.1V13Z" />',
  sparkle:
    '<path d="M11.5 3.2 13.2 8l4.8 1.7-4.8 1.7-1.7 4.8-1.7-4.8L5 9.7 9.8 8Z" /><path d="m18.4 15.4.85 2.15 2.15.85-2.15.85-.85 2.15-.85-2.15-2.15-.85 2.15-.85Z" />',
  plus: '<path d="M12 5.5v13M5.5 12h13" />',
  support:
    '<path d="M4.8 14.2v-2a7.2 7.2 0 0 1 14.4 0v2" /><rect x="2.4" y="13.4" width="4" height="6.4" rx="2" /><rect x="17.6" y="13.4" width="4" height="6.4" rx="2" />',
  link: '<path d="M10.6 13.4a4 4 0 0 0 5.66 0l2.3-2.3a4 4 0 1 0-5.66-5.66l-1.3 1.3" /><path d="M13.4 10.6a4 4 0 0 0-5.66 0l-2.3 2.3a4 4 0 1 0 5.66 5.66l1.3-1.3" />',
  sliders:
    '<path d="M3.5 8h9M17.5 8h3M3.5 16h4M12.5 16h8" /><circle cx="15" cy="8" r="2.2" /><circle cx="10" cy="16" r="2.2" />',
  building:
    '<path d="M4.5 20.5V5.6A1.6 1.6 0 0 1 6.1 4h6.8a1.6 1.6 0 0 1 1.6 1.6v14.9" /><path d="M14.5 10.5h3.9a1.6 1.6 0 0 1 1.6 1.6v8.4" /><path d="M2.5 20.5h19" /><path d="M7.6 8h3.8M7.6 12h3.8M7.6 16h3.8M16.8 14h1M16.8 17h1" />',
  zap: '<path d="M13.4 2.6 5.6 13.4h5.6l-.8 8 7.8-10.8h-5.6Z" />',
  clock: '<circle cx="12" cy="12" r="8.8" /><path d="M12 7.2V12l3.2 2" />',
  key: '<circle cx="8.2" cy="12" r="3.9" /><path d="M12.1 12h9.4" /><path d="M17.6 12v3.2M20.4 12v2.2" />',
} as const

export type IconName = keyof typeof icons
