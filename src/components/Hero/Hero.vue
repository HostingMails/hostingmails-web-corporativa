<script setup lang="ts">
import AppIcon from '@/components/ui/AppIcon/AppIcon.vue'
import BaseButton from '@/components/ui/BaseButton/BaseButton.vue'
import './Hero.css'

const highlights = [
  'Buzones con tu dominio',
  'Configuración guiada',
  'Webmail incluido',
] as const

interface PreviewMail {
  initials: string
  sender: string
  subject: string
  time: string
  unread?: boolean
}

const previewMails: readonly PreviewMail[] = [
  {
    initials: 'MC',
    sender: 'María Castillo',
    subject: 'Propuesta revisada para el nuevo catálogo',
    time: '09:24',
    unread: true,
  },
  {
    initials: 'AD',
    sender: 'Administración',
    subject: 'Resumen de facturación del trimestre',
    time: '08:51',
  },
  {
    initials: 'SR',
    sender: 'Sergio Ruiz',
    subject: 'Confirmación de la reunión del jueves',
    time: 'Ayer',
  },
] as const

const folders = [
  { icon: 'inbox', label: 'Recibidos', active: true },
  { icon: 'forward', label: 'Enviados', active: false },
  { icon: 'at', label: 'Alias', active: false },
  { icon: 'filter', label: 'Spam', active: false },
] as const
</script>

<template>
  <section id="inicio" class="hero">
    <div class="hero__backdrop" aria-hidden="true">
      <span class="hero__glow hero__glow--one"></span>
      <span class="hero__glow hero__glow--two"></span>
      <span class="hero__grid"></span>
    </div>

    <div class="hm-container hero__inner">
      <div class="hero__content">
        <p class="hm-eyebrow hm-eyebrow--pill hero__eyebrow">
          <AppIcon name="sparkle" :size="15" />
          Correo profesional para empresas
        </p>

        <h1 class="hero__title">
          El correo de tu empresa, con
          <span class="hero__title-accent">tu propio dominio</span>
        </h1>

        <p class="hero__subtitle">
          Buzones, alias, reenvíos y protección antispam en un servicio pensado para trabajar cada
          día. Configúralo una vez y úsalo desde el ordenador, el móvil y el webmail.
        </p>

        <div class="hero__actions">
          <BaseButton href="#contacto" size="lg">
            Solicitar información
            <template #trailing><AppIcon name="arrowRight" :size="18" /></template>
          </BaseButton>
          <BaseButton href="#planes" variant="secondary" size="lg">Ver planes</BaseButton>
        </div>

        <ul class="hero__highlights">
          <li v-for="item in highlights" :key="item" class="hero__highlight">
            <span class="hero__highlight-check"><AppIcon name="check" :size="13" :stroke-width="2.6" /></span>
            {{ item }}
          </li>
        </ul>
      </div>

      <div class="hero__visual">
        <div class="hero__window">
          <div class="hero__window-bar">
            <span class="hero__dots" aria-hidden="true"><i></i><i></i><i></i></span>
            <span class="hero__address">webmail.hostingmails.com</span>
          </div>

          <div class="hero__window-body">
            <aside class="hero__folders">
              <p class="hero__folders-title">Buzón</p>
              <ul>
                <li v-for="folder in folders" :key="folder.label">
                  <span class="hero__folder" :class="{ 'hero__folder--active': folder.active }">
                    <AppIcon :name="folder.icon" :size="16" />
                    {{ folder.label }}
                  </span>
                </li>
              </ul>
            </aside>

            <div class="hero__mails">
              <div class="hero__mails-head">
                <p class="hero__mails-title">Recibidos</p>
                <span class="hero__search" aria-hidden="true">Buscar en el correo</span>
              </div>

              <ul>
                <li
                  v-for="mail in previewMails"
                  :key="mail.subject"
                  class="hero__mail"
                  :class="{ 'hero__mail--unread': mail.unread }"
                >
                  <span class="hero__avatar">{{ mail.initials }}</span>
                  <span class="hero__mail-text">
                    <span class="hero__mail-sender">{{ mail.sender }}</span>
                    <span class="hero__mail-subject">{{ mail.subject }}</span>
                  </span>
                  <span class="hero__mail-time">{{ mail.time }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div class="hero__badge hero__badge--domain">
          <span class="hero__badge-icon hero__badge-icon--green">
            <AppIcon name="check" :size="15" :stroke-width="2.4" />
          </span>
          <span>
            <strong>hola@tudominio.com</strong>
            <small>Dominio verificado</small>
          </span>
        </div>

        <div class="hero__badge hero__badge--spam">
          <span class="hero__badge-icon hero__badge-icon--soft">
            <AppIcon name="shield" :size="16" />
          </span>
          <span>
            <strong>Antispam activo</strong>
            <small>Filtrado antes de llegar</small>
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
