<script setup lang="ts">
import AppIcon from '@/components/ui/AppIcon/AppIcon.vue'
import BaseButton from '@/components/ui/BaseButton/BaseButton.vue'
import './CTA.css'

const points = [
  'Te ayudamos a elegir la configuración',
  'Acompañamos la migración',
  'Sin compromiso',
] as const
</script>

<template>
  <section id="contacto" class="cta">
    <div class="hm-container">
      <div v-reveal class="cta__panel">
        <div class="cta__decoration" aria-hidden="true">
          <span class="cta__glow"></span>
          <span class="cta__pattern"></span>
        </div>

        <div class="cta__content">
          <p class="hm-eyebrow cta__eyebrow">Empezar</p>
          <h2 class="cta__title">¿Hablamos del correo de tu empresa?</h2>
          <p class="cta__text">
            Cuéntanos cuántos buzones necesitas y con qué dominio trabajas. Te respondemos con una
            propuesta concreta.
          </p>

          <div class="cta__actions">
            <BaseButton href="mailto:hola@hostingmails.com" variant="inverse" size="lg">
              Solicitar información
              <template #trailing><AppIcon name="arrowRight" :size="18" /></template>
            </BaseButton>
            <BaseButton href="#planes" variant="outline-inverse" size="lg">Ver planes</BaseButton>
          </div>

          <ul class="cta__points">
            <li v-for="point in points" :key="point" class="cta__point">
              <AppIcon name="check" :size="15" :stroke-width="2.4" />
              {{ point }}
            </li>
          </ul>
        </div>

        <div class="cta__card">
          <span class="cta__card-icon"><AppIcon name="mail" :size="22" /></span>
          <p class="cta__card-label">Escríbenos a</p>
          <a class="cta__card-mail" href="mailto:hola@hostingmails.com">hola@hostingmails.com</a>
          <p class="cta__card-note">Horario de atención pendiente de publicar.</p>
        </div>
      </div>
    </div>
  </section>
</template>
