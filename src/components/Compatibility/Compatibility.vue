<script setup lang="ts">
import AppIcon from '@/components/ui/AppIcon/AppIcon.vue'
import BaseButton from '@/components/ui/BaseButton/BaseButton.vue'
import type { IconName } from '@/components/ui/AppIcon/icons'
import './Compatibility.css'

interface MailApp {
  name: string
  platform: string
  icon: IconName
}

const apps: readonly MailApp[] = [
  { name: 'Outlook', platform: 'Windows y Mac', icon: 'mail' },
  { name: 'Apple Mail', platform: 'Mac, iPhone y iPad', icon: 'inbox' },
  { name: 'Gmail', platform: 'App para Android e iOS', icon: 'smartphone' },
  { name: 'Thunderbird', platform: 'Windows, Mac y Linux', icon: 'laptop' },
  { name: 'Correo de Android', platform: 'App del sistema', icon: 'at' },
  { name: 'Webmail', platform: 'Cualquier navegador', icon: 'browser' },
] as const

const servers = [
  { label: 'Entrante · IMAP', host: 'imap.hostingmails.com', detail: 'Puerto 993 · SSL/TLS' },
  { label: 'Saliente · SMTP', host: 'smtp.hostingmails.com', detail: 'Puerto 465 · SSL/TLS' },
] as const

const protocols = ['IMAP', 'SMTP', 'POP3'] as const
</script>

<template>
  <section id="compatibilidad" class="hm-section compatibility">
    <div class="hm-container compatibility__inner">
      <div class="compatibility__content">
        <p class="hm-eyebrow">Compatibilidad</p>
        <h2 class="compatibility__title">Funciona con el correo que ya usas</h2>
        <p class="compatibility__intro">
          No hace falta cambiar de aplicación ni aprender una herramienta nueva. Configuras la
          cuenta una vez y sigues trabajando igual que hasta ahora.
        </p>

        <ul class="compatibility__apps">
          <li v-for="(app, index) in apps" :key="app.name" v-reveal="index * 50" class="compatibility__app">
            <span class="compatibility__app-icon"><AppIcon :name="app.icon" :size="19" /></span>
            <span class="compatibility__app-text">
              <strong>{{ app.name }}</strong>
              <small>{{ app.platform }}</small>
            </span>
          </li>
        </ul>

        <BaseButton href="#contacto" variant="ghost" size="md">
          Ver guías de configuración
          <template #trailing><AppIcon name="arrowRight" :size="17" /></template>
        </BaseButton>
      </div>

      <aside class="compatibility__panel">
        <div class="compatibility__panel-head">
          <span class="compatibility__panel-icon"><AppIcon name="sliders" :size="18" /></span>
          <div>
            <h3 class="compatibility__panel-title">Datos de configuración</h3>
            <p class="compatibility__panel-subtitle">Los mismos para todos los clientes de correo</p>
          </div>
        </div>

        <ul class="compatibility__servers">
          <li v-for="server in servers" :key="server.label" class="compatibility__server">
            <p class="compatibility__server-label">{{ server.label }}</p>
            <p class="compatibility__server-host">{{ server.host }}</p>
            <p class="compatibility__server-detail">{{ server.detail }}</p>
          </li>
        </ul>

        <div class="compatibility__protocols">
          <p class="compatibility__protocols-label">Protocolos</p>
          <ul>
            <li v-for="protocol in protocols" :key="protocol">{{ protocol }}</li>
          </ul>
        </div>

        <p class="compatibility__note">
          <AppIcon name="lock" :size="15" />
          Conexión cifrada en todos los dispositivos.
        </p>
      </aside>
    </div>
  </section>
</template>
