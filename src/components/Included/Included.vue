<script setup lang="ts">
import AppIcon from '@/components/ui/AppIcon/AppIcon.vue'
import type { IconName } from '@/components/ui/AppIcon/icons'
import './Included.css'

interface Group {
  icon: IconName
  title: string
  items: readonly string[]
}

const groups: readonly Group[] = [
  {
    icon: 'mail',
    title: 'Correo',
    items: [
      'Dominio propio',
      'Varios dominios por plan',
      'Buzones independientes',
      'Alias de correo',
      'Reenvíos',
      'Respuestas automáticas',
      'Filtros y reglas',
    ],
  },
  {
    icon: 'browser',
    title: 'Acceso',
    items: [
      'IMAP y SMTP',
      'POP3',
      'Webmail',
      'Contraseña propia por buzón',
      'Cambio de contraseña',
      'Configuración en el móvil',
    ],
  },
  {
    icon: 'shield',
    title: 'Seguridad',
    items: [
      'Antispam',
      'Antivirus',
      'SPF, DKIM y DMARC',
      'Certificados TLS',
      'Conexión cifrada',
      'Copias de seguridad',
    ],
  },
] as const

const later = ['Contactos y calendario', 'Panel de administración', 'API de gestión'] as const

const never = ['Campañas de email marketing', 'Almacenamiento ilimitado'] as const
</script>

<template>
  <section id="incluido" class="included">
    <div class="included__glow" aria-hidden="true"></div>

    <div class="hm-container included__inner">
      <header class="included__head">
        <p class="hm-eyebrow included__eyebrow">Qué incluye</p>
        <h2 class="included__title">Todo el correo, sin extras escondidos</h2>
        <p class="included__intro">
          Las funciones de abajo entran en cualquier plan. La diferencia entre uno y otro es el
          almacenamiento y el número de dominios, nada más.
        </p>
      </header>

      <div class="included__groups">
        <article
          v-for="(group, index) in groups"
          :key="group.title"
          v-reveal="index * 80"
          class="included__group"
        >
          <div class="included__group-head">
            <span class="included__group-icon"><AppIcon :name="group.icon" :size="18" /></span>
            <h3 class="included__group-title">{{ group.title }}</h3>
          </div>

          <ul class="included__items">
            <li v-for="item in group.items" :key="item" class="included__item">
              <AppIcon name="check" :size="14" :stroke-width="2.6" />
              {{ item }}
            </li>
          </ul>
        </article>
      </div>

      <!-- Decir qué no hay es tan útil como decir qué hay -->
      <div class="included__notes">
        <div class="included__note included__note--later">
          <p class="included__note-label">
            <AppIcon name="clock" :size="15" />
            Llegará más adelante
          </p>
          <ul>
            <li v-for="item in later" :key="item">{{ item }}</li>
          </ul>
        </div>

        <div class="included__note">
          <p class="included__note-label">
            <AppIcon name="close" :size="15" />
            No lo ofrecemos
          </p>
          <ul>
            <li v-for="item in never" :key="item">{{ item }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
