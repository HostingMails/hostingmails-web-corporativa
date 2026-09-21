<script setup lang="ts">
import { ref } from 'vue'
import AppIcon from '@/components/ui/AppIcon/AppIcon.vue'
import BaseButton from '@/components/ui/BaseButton/BaseButton.vue'
import './FAQ.css'

interface FaqItem {
  id: string
  question: string
  answer: string
}

const items: readonly FaqItem[] = [
  {
    id: 'buzones',
    question: '¿Cuántos buzones puedo crear?',
    answer:
      'No hay un número fijo. Contratas almacenamiento para la empresa y repartes las cuentas como quieras. Lo único que lo acota es una política de uso razonable, con límites técnicos de conexiones y de envíos por hora para evitar abusos.',
  },
  {
    id: 'almacenamiento',
    question: '¿Los GB son de cada buzón o de todos?',
    answer:
      'De todos. Si contratas 20 GB, esos 20 GB se reparten entre los buzones del plan. Es lo que permite tener diez cuentas sin pagar diez licencias: un buzón que casi no se usa deja sitio al que sí.',
  },
  {
    id: 'dominio',
    question: '¿Puedo usar el dominio que ya tengo?',
    answer:
      'Sí. Solo hay que apuntar unos registros en el DNS del dominio. Si está contratado en otro proveedor, te indicamos exactamente qué añadir; si quieres, lo hacemos nosotros.',
  },
  {
    id: 'migracion',
    question: '¿Se puede traer el correo que ya tenemos?',
    answer:
      'Sí, y es un servicio aparte que empieza en 39 €. El precio final depende del número de cuentas y del volumen de mensajes, así que lo presupuestamos después de ver qué hay que mover. La idea es hacer el cambio sin que nadie deje de recibir correo.',
  },
  {
    id: 'gmail',
    question: '¿Funciona con Gmail?',
    answer:
      'En el móvil sí: añades la cuenta por IMAP en la aplicación de Gmail y la usas con normalidad. En el Gmail del navegador, Google retira en enero de 2027 la opción de enviar como cuenta externa, así que para trabajar desde el ordenador te recomendamos Outlook, Apple Mail, Thunderbird o nuestro webmail.',
  },
  {
    id: 'alias',
    question: '¿Qué diferencia hay entre un buzón y un alias?',
    answer:
      'Un buzón es una cuenta independiente, con su contraseña y su bandeja. Un alias es una dirección adicional que entrega los mensajes en un buzón que ya existe: info@ y ventas@ pueden caer las dos en la misma cuenta.',
  },
  {
    id: 'espacio',
    question: '¿Qué pasa si me quedo sin espacio?',
    answer:
      'Te avisamos antes de llegar al límite. Puedes ampliar el almacenamiento o pasar al plan siguiente sin tocar la configuración: los buzones, los alias y los dispositivos siguen igual.',
  },
  {
    id: 'spam',
    question: '¿Cómo se gestiona el spam?',
    answer:
      'Los mensajes pasan por un filtro antivirus y antispam antes de llegar al buzón. Lo que se detecta como correo no deseado queda en su carpeta, donde puedes revisarlo cuando quieras.',
  },
] as const

const openId = ref<string | null>(items[0]?.id ?? null)

const toggle = (id: string) => {
  openId.value = openId.value === id ? null : id
}
</script>

<template>
  <section id="faq" class="hm-section faq">
    <div class="hm-container faq__inner">
      <header class="faq__intro">
        <p class="hm-eyebrow">Preguntas frecuentes</p>
        <h2 class="faq__title">Dudas habituales antes de contratar</h2>
        <p class="faq__text">
          Si lo que buscas no está aquí, escríbenos y te lo contamos sin compromiso.
        </p>
        <BaseButton href="#contacto" variant="secondary" size="md">Preguntar otra cosa</BaseButton>
      </header>

      <ul class="faq__list">
        <li
          v-for="(item, index) in items"
          :key="item.id"
          v-reveal="index * 50"
          class="faq__item"
          :class="{ 'faq__item--open': openId === item.id }"
        >
          <h3 class="faq__question-wrapper">
            <button
              :id="`faq-boton-${item.id}`"
              class="faq__question"
              type="button"
              :aria-expanded="openId === item.id"
              :aria-controls="`faq-panel-${item.id}`"
              @click="toggle(item.id)"
            >
              <span>{{ item.question }}</span>
              <span class="faq__chevron"><AppIcon name="chevronDown" :size="18" /></span>
            </button>
          </h3>

          <div
            :id="`faq-panel-${item.id}`"
            class="faq__panel"
            role="region"
            :aria-labelledby="`faq-boton-${item.id}`"
          >
            <div class="faq__panel-inner">
              <p class="faq__answer">{{ item.answer }}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
