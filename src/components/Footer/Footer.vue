<script setup lang="ts">
import BrandLogo from '@/components/ui/BrandLogo/BrandLogo.vue'
import AppIcon from '@/components/ui/AppIcon/AppIcon.vue'
import { navLinks } from '@/data/navigation'
import './Footer.css'

interface FooterColumn {
  title: string
  links: readonly { label: string; href: string }[]
}

const columns: readonly FooterColumn[] = [
  {
    title: 'Servicio',
    links: navLinks.map((link) => ({ label: link.label, href: `#${link.id}` })),
  },
  {
    title: 'Soporte',
    links: [
      { label: 'Servicios adicionales', href: '#servicios' },
      { label: 'Guías de configuración', href: '#compatibilidad' },
      { label: 'Preguntas frecuentes', href: '#faq' },
      { label: 'Contacto', href: '#contacto' },
      { label: 'Estado del servicio', href: '#contacto' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Aviso legal', href: '#contacto' },
      { label: 'Política de privacidad', href: '#contacto' },
      { label: 'Política de cookies', href: '#contacto' },
      { label: 'Condiciones del servicio', href: '#contacto' },
    ],
  },
] as const

const year = new Date().getFullYear()
</script>

<template>
  <footer class="site-footer">
    <div class="hm-container site-footer__inner">
      <div class="site-footer__brand">
        <BrandLogo tone="dark" />
        <p class="site-footer__claim">
          Correo profesional con tu propio dominio: buzones, alias, reenvíos y protección antispam.
        </p>
        <a class="site-footer__mail" href="mailto:hola@hostingmails.com">
          <AppIcon name="mail" :size="16" />
          hola@hostingmails.com
        </a>
      </div>

      <nav class="site-footer__nav" aria-label="Enlaces del pie de página">
        <div v-for="column in columns" :key="column.title" class="site-footer__column">
          <h2 class="site-footer__column-title">{{ column.title }}</h2>
          <ul>
            <li v-for="link in column.links" :key="link.label">
              <a class="site-footer__link" :href="link.href">{{ link.label }}</a>
            </li>
          </ul>
        </div>
      </nav>
    </div>

    <div class="hm-container site-footer__bottom">
      <p>© {{ year }} HostingMails. Todos los derechos reservados.</p>
      <p class="site-footer__legal-note">Contenido provisional en desarrollo.</p>
    </div>
  </footer>
</template>
