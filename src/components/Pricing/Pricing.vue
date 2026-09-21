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
  audience: string
  storage: string
  domains: string
  monthly: number
  yearly: number
  features: readonly string[]
  featured?: boolean
}

/**
 * Tarifas orientativas mientras se cierran los costes de explotación.
 * El modelo sí es el definitivo: se vende almacenamiento compartido por
 * empresa, no una licencia por cada persona.
 */
const plans: readonly Plan[] = [
  {
    id: 'esencial',
    name: 'Esencial',
    audience: 'Autónomos y pequeños negocios',
    storage: '5 GB',
    domains: '1 dominio',
    monthly: 2.9,
    yearly: 29,
    features: [
      'Buzones y alias sin límite fijo',
      'IMAP, SMTP y webmail',
      'Antispam y antivirus',
      'SPF, DKIM y DMARC configurados',
      'Soporte por correo',
    ],
  },
  {
    id: 'empresa',
    name: 'Empresa',
    audience: 'Pequeñas empresas con equipo',
    storage: '20 GB',
    domains: 'Hasta 3 dominios',
    monthly: 5.9,
    yearly: 59,
    features: [
      'Todo lo del plan Esencial',
      'Buzones para todo el equipo',
      'Alias de área: info@, ventas@…',
      'Reenvíos y respuestas automáticas',
      'Soporte por correo',
    ],
    featured: true,
  },
  {
    id: 'business',
    name: 'Business',
    audience: 'Empresas y agencias',
    storage: '50 GB',
    domains: 'Hasta 10 dominios',
    monthly: 9.9,
    yearly: 99,
    features: [
      'Todo lo del plan Empresa',
      'Dominios de clientes en la misma cuenta',
      'Volumen de correo alto',
      'Prioridad en la migración',
      'Soporte por correo',
    ],
  },
] as const

const billing = ref<BillingCycle>('yearly')

const options = { style: 'currency', currency: 'EUR', maximumFractionDigits: 2 } as const
const euroExact = new Intl.NumberFormat('es-ES', { ...options, minimumFractionDigits: 2 })
const euroRound = new Intl.NumberFormat('es-ES', { ...options, minimumFractionDigits: 0 })

/** 29 € se escribe sin decimales; 2,90 € con ellos. */
const euro = (value: number) =>
  Number.isInteger(value) ? euroRound.format(value) : euroExact.format(value)

const isYearly = computed(() => billing.value === 'yearly')

const priceOf = (plan: Plan) => euro(isYearly.value ? plan.yearly : plan.monthly)

const periodLabel = computed(() => (isYearly.value ? 'al año' : 'al mes'))

/** Lo que se ahorra pagando un año por adelantado. */
const savingOf = (plan: Plan) => euro(plan.monthly * 12 - plan.yearly)

const alternativeOf = (plan: Plan) =>
  isYearly.value
    ? `o ${euro(plan.monthly)} al mes`
    : `o ${euro(plan.yearly)} al año pagando de una vez`
</script>

<template>
  <section id="planes" class="hm-section hm-section--mint pricing">
    <div class="hm-container">
      <SectionHeading
        eyebrow="Planes"
        title="Pagas por el espacio, no por cada persona"
        description="El almacenamiento es compartido entre todos los buzones de la empresa. Reparte las cuentas como te convenga."
      />

      <div class="pricing__toggle" role="group" aria-label="Ciclo de facturación">
        <button
          type="button"
          class="pricing__toggle-option"
          :class="{ 'pricing__toggle-option--active': !isYearly }"
          :aria-pressed="!isYearly"
          @click="billing = 'monthly'"
        >
          Mensual
        </button>
        <button
          type="button"
          class="pricing__toggle-option"
          :class="{ 'pricing__toggle-option--active': isYearly }"
          :aria-pressed="isYearly"
          @click="billing = 'yearly'"
        >
          Anual
          <span class="pricing__toggle-badge">más barato</span>
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
            El más contratado
          </p>

          <header class="pricing__card-head">
            <h3 class="pricing__plan">{{ plan.name }}</h3>
            <p class="pricing__audience">{{ plan.audience }}</p>
          </header>

          <div class="pricing__storage">
            <span class="pricing__storage-value">{{ plan.storage }}</span>
            <span class="pricing__storage-label">
              de almacenamiento<br />compartido · {{ plan.domains }}
            </span>
          </div>

          <div class="pricing__price">
            <span class="pricing__price-value">{{ priceOf(plan) }}</span>
            <span class="pricing__price-unit">{{ periodLabel }}</span>
          </div>
          <p class="pricing__price-note">
            <span v-if="isYearly" class="pricing__saving">Ahorras {{ savingOf(plan) }}</span>
            {{ alternativeOf(plan) }} · IVA no incluido
          </p>

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
            Contratar {{ plan.name }}
          </BaseButton>
        </article>
      </div>

      <div class="pricing__footnotes">
        <p class="pricing__footnote">
          <AppIcon name="database" :size="16" />
          Los GB son del plan entero, no de cada buzón. «Sin límite fijo» va sujeto a una política
          de uso razonable.
        </p>
        <p class="pricing__footnote pricing__footnote--warn">
          <AppIcon name="clock" :size="16" />
          Tarifas orientativas. Los precios definitivos se publicarán al cerrar el servicio.
        </p>
      </div>
    </div>
  </section>
</template>
