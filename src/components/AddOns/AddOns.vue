<script setup lang="ts">
import AppIcon from '@/components/ui/AppIcon/AppIcon.vue'
import BaseButton from '@/components/ui/BaseButton/BaseButton.vue'
import type { IconName } from '@/components/ui/AppIcon/icons'
import './AddOns.css'

interface AddOn {
  icon: IconName
  name: string
  description: string
  price: string
  included?: boolean
}

const addOns: readonly AddOn[] = [
  {
    icon: 'forward',
    name: 'Migración del correo',
    description: 'Traemos los buzones desde tu proveedor actual, sin cortes.',
    price: 'Desde 39 €',
  },
  {
    icon: 'smartphone',
    name: 'Configuración de dispositivos',
    description: 'Dejamos la cuenta lista en cada ordenador y cada móvil.',
    price: '15 € / dispositivo',
  },
  {
    icon: 'globe',
    name: 'Registro del dominio',
    description: 'Si aún no lo tienes, lo registramos y lo gestionamos.',
    price: 'Según extensión',
  },
  {
    icon: 'database',
    name: 'Ampliación de almacenamiento',
    description: 'Sube de plan o añade espacio cuando te haga falta.',
    price: 'Según capacidad',
  },
  {
    icon: 'sliders',
    name: 'Alta y configuración inicial',
    description: 'Dominio conectado, registros verificados y buzones creados.',
    price: 'Incluida',
    included: true,
  },
] as const
</script>

<template>
  <section id="servicios" class="add-ons">
    <div class="hm-container add-ons__inner">
      <header class="add-ons__head">
        <p class="hm-eyebrow add-ons__eyebrow">Servicios</p>
        <h2 class="add-ons__title">Lo que puedes añadir</h2>
        <p class="add-ons__intro">
          El plan cubre el correo. Estos servicios se contratan aparte, solo cuando los necesitas.
        </p>
        <BaseButton href="#contacto" variant="secondary" size="md">Pedir presupuesto</BaseButton>
      </header>

      <ul class="add-ons__list">
        <li
          v-for="(item, index) in addOns"
          :key="item.name"
          v-reveal="index * 60"
          class="add-ons__row"
          :class="{ 'add-ons__row--included': item.included }"
        >
          <span class="add-ons__icon"><AppIcon :name="item.icon" :size="19" /></span>

          <div class="add-ons__text">
            <h3 class="add-ons__name">{{ item.name }}</h3>
            <p class="add-ons__description">{{ item.description }}</p>
          </div>

          <span class="add-ons__leader" aria-hidden="true"></span>
          <span class="add-ons__price">{{ item.price }}</span>
        </li>
      </ul>

      <p class="add-ons__note">
        La migración se presupuesta según el número de cuentas y el volumen de mensajes.
      </p>
    </div>
  </section>
</template>
