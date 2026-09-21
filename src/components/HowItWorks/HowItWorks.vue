<script setup lang="ts">
import AppIcon from '@/components/ui/AppIcon/AppIcon.vue'
import BaseButton from '@/components/ui/BaseButton/BaseButton.vue'
import type { IconName } from '@/components/ui/AppIcon/icons'
import './HowItWorks.css'

interface Step {
  icon: IconName
  title: string
  description: string
}

const steps: readonly Step[] = [
  {
    icon: 'sliders',
    title: 'Eliges la configuración',
    description:
      'Nos dices cuántos buzones necesita tu equipo y qué espacio quieres para cada uno. Lo ajustamos contigo.',
  },
  {
    icon: 'link',
    title: 'Conectamos tu dominio',
    description:
      'Te pasamos los registros que hay que añadir en el DNS. Si el dominio ya está con nosotros, lo dejamos listo.',
  },
  {
    icon: 'users',
    title: 'Creas buzones y alias',
    description:
      'Das de alta las cuentas del equipo, defines los alias de área y los reenvíos que necesites.',
  },
  {
    icon: 'smartphone',
    title: 'Configuras tus dispositivos',
    description:
      'Sigues la guía para tu cliente de correo o entras directamente al webmail desde el navegador.',
  },
] as const

const dnsRecords = [
  { type: 'MX', host: '@', value: 'mail.hostingmails.com' },
  { type: 'TXT', host: '@', value: 'v=spf1 include:...' },
  { type: 'CNAME', host: 'webmail', value: 'webmail.hostingmails.com' },
] as const
</script>

<template>
  <section id="como-funciona" class="hm-section hm-section--alt how-it-works">
    <div class="hm-container how-it-works__inner">
      <aside class="how-it-works__aside">
        <div class="how-it-works__aside-inner">
          <p class="hm-eyebrow">Cómo funciona</p>
          <h2 class="how-it-works__title">De la contratación al primer correo, en cuatro pasos</h2>
          <p class="how-it-works__intro">
            Un proceso corto y acompañado. Tú decides la configuración y nosotros dejamos el
            servicio funcionando.
          </p>

          <div class="how-it-works__dns" aria-hidden="true">
            <p class="how-it-works__dns-title">
              <AppIcon name="globe" :size="15" />
              Registros DNS
            </p>
            <ul>
              <li v-for="record in dnsRecords" :key="record.type" class="how-it-works__dns-row">
                <span class="how-it-works__dns-type">{{ record.type }}</span>
                <span class="how-it-works__dns-host">{{ record.host }}</span>
                <span class="how-it-works__dns-value">{{ record.value }}</span>
              </li>
            </ul>
          </div>

          <BaseButton href="#contacto" variant="secondary" size="md">
            Te ayudamos con la migración
          </BaseButton>
        </div>
      </aside>

      <ol class="how-it-works__steps">
        <li
          v-for="(step, index) in steps"
          :key="step.title"
          v-reveal="index * 90"
          class="how-it-works__step"
        >
          <div class="how-it-works__marker">
            <span class="how-it-works__number">{{ String(index + 1).padStart(2, '0') }}</span>
          </div>

          <div class="how-it-works__step-body">
            <div class="how-it-works__step-head">
              <span class="how-it-works__step-icon"><AppIcon :name="step.icon" :size="18" /></span>
              <h3 class="how-it-works__step-title">{{ step.title }}</h3>
            </div>
            <p class="how-it-works__step-text">{{ step.description }}</p>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>
