<script setup lang="ts">
import { computed, ref } from 'vue'
import AppIcon from '@/components/ui/AppIcon/AppIcon.vue'
import BaseButton from '@/components/ui/BaseButton/BaseButton.vue'
import SectionHeading from '@/components/ui/SectionHeading/SectionHeading.vue'
import './Pricing.css'

type BillingCycle = 'monthly' | 'yearly'

interface Plan {
  id: string
  name: string
  summary: string
  features: readonly string[]
  featured?: boolean
  ctaLabel: string
}

/**
 * Estructura provisional. Los importes y los límites de cada plan se
 * definirán más adelante; aquí solo queda montada la composición.
 */
const plans: readonly Plan[] = [
  {
    id: 'esencial',
    name: 'Esencial',
    summary: 'Para empezar con el correo de tu dominio.',
    features: [
      'Buzones con tu dominio',
      'Alias y reenvíos',
      'Webmail incluido',
      'Antispam y antivirus',
    ],
    ctaLabel: 'Me interesa',
  },
  {
    id: 'profesional',
    name: 'Profesional',
    summary: 'Para equipos que viven dentro del correo.',
    features: [
      'Todo lo del plan Esencial',
      'Más almacenamiento por buzón',
      'Varios dominios en la misma cuenta',
      'Ayuda con la migración',
    ],
    featured: true,
    ctaLabel: 'Me interesa',
  },
  {
    id: 'empresa',
    name: 'Empresa',
    summary: 'Para estructuras con necesidades propias.',
    features: [
      'Todo lo del plan Profesional',
      'Configuración a medida',
      'Gestión de departamentos',
      'Acompañamiento en el alta',
    ],
    ctaLabel: 'Hablemos',
  },
] as const

const billing = ref<BillingCycle>('monthly')

const unit = computed(() => (billing.value === 'monthly' ? '/ buzón al mes' : '/ buzón al año'))
</script>

<template>
  <section id="planes" class="hm-section hm-section--alt pricing">
    <div class="hm-container">
      <SectionHeading
        eyebrow="Planes"
        title="Elige el tamaño que necesita tu equipo"
        description="Tres formas de contratar el servicio según el número de buzones y el espacio que necesites."
      />

      <div class="pricing__toggle" role="group" aria-label="Ciclo de facturación">
        <button
          type="button"
          class="pricing__toggle-option"
          :class="{ 'pricing__toggle-option--active': billing === 'monthly' }"
          :aria-pressed="billing === 'monthly'"
          @click="billing = 'monthly'"
        >
          Mensual
        </button>
        <button
          type="button"
          class="pricing__toggle-option"
          :class="{ 'pricing__toggle-option--active': billing === 'yearly' }"
          :aria-pressed="billing === 'yearly'"
          @click="billing = 'yearly'"
        >
          Anual
        </button>
      </div>

      <div class="pricing__grid">
        <article
          v-for="(plan, index) in plans"
          :key="plan.id"
          v-reveal="index * 80"
          class="pricing__card"
          :class="{ 'pricing__card--featured': plan.featured }"
        >
          <p v-if="plan.featured" class="pricing__tag">
            <AppIcon name="sparkle" :size="14" />
            Más habitual
          </p>

          <header class="pricing__card-head">
            <h3 class="pricing__plan">{{ plan.name }}</h3>
            <p class="pricing__summary">{{ plan.summary }}</p>
          </header>

          <div class="pricing__price">
            <span class="pricing__price-value" aria-hidden="true">—</span>
            <span class="pricing__price-unit">{{ unit }}</span>
          </div>
          <p class="pricing__price-note">Tarifa pendiente de publicar</p>

          <ul class="pricing__features">
            <li v-for="feature in plan.features" :key="feature" class="pricing__feature">
              <AppIcon name="check" :size="15" :stroke-width="2.4" />
              {{ feature }}
            </li>
          </ul>

          <BaseButton
            href="#contacto"
            :variant="plan.featured ? 'primary' : 'secondary'"
            size="lg"
            block
          >
            {{ plan.ctaLabel }}
          </BaseButton>
        </article>
      </div>

      <p class="pricing__disclaimer">
        <AppIcon name="clock" :size="16" />
        Los planes están en preparación. Escríbenos y te avisamos en cuanto publiquemos las tarifas.
      </p>
    </div>
  </section>
</template>
