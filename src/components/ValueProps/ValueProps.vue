<script setup lang="ts">
import AppIcon from '@/components/ui/AppIcon/AppIcon.vue'
import type { IconName } from '@/components/ui/AppIcon/icons'
import './ValueProps.css'

interface ValueProp {
  icon: IconName
  title: string
  description: string
}

/** Los tres argumentos que nos separan del resto de proveedores. */
const props: readonly ValueProp[] = [
  {
    icon: 'database',
    title: 'Pagas espacio, no empleados',
    description:
      'El plan incluye almacenamiento para toda la empresa. Reparte los buzones como quieras sin pagar una licencia por cada persona.',
  },
  {
    icon: 'sliders',
    title: 'Lo dejamos funcionando',
    description:
      'Los registros MX, SPF, DKIM y DMARC los configuramos nosotros. Tú no tienes que tocar un servidor de correo.',
  },
  {
    icon: 'support',
    title: 'Hablas con quien lo gestiona',
    description:
      'Sin centralita ni tickets que rebotan. Migración y configuración de dispositivos incluidas como servicio.',
  },
] as const
</script>

<template>
  <section class="value-props" aria-label="Por qué HostingMails">
    <div class="value-props__pattern" aria-hidden="true"></div>

    <div class="hm-container value-props__inner">
      <ul class="value-props__list">
        <li v-for="(prop, index) in props" :key="prop.title" v-reveal="index * 80" class="value-props__item">
          <span class="value-props__icon"><AppIcon :name="prop.icon" :size="20" /></span>
          <div class="value-props__text">
            <h2 class="value-props__title">{{ prop.title }}</h2>
            <p class="value-props__description">{{ prop.description }}</p>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
