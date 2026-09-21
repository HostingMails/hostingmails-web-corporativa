<script setup lang="ts">
import { ref } from 'vue'
import AppIcon from '../ui/AppIcon/AppIcon.vue'
import BaseButton from '../ui/BaseButton/BaseButton.vue'
import './FAQ.css'

interface FaqItem {
  id: string
  question: string
  answer: string
}

const items: readonly FaqItem[] = [
  {
    id: 'dominio',
    question: '¿Puedo usar el dominio que ya tengo?',
    answer:
      'Sí. Solo hay que apuntar unos registros en el DNS del dominio. Si está contratado en otro proveedor, te indicamos exactamente qué añadir.',
  },
  {
    id: 'migracion',
    question: '¿Se puede traer el correo que ya tenemos?',
    answer:
      'Sí, el contenido de los buzones actuales se puede migrar. Antes del cambio revisamos contigo qué cuentas hay que traer y cómo hacerlo sin cortes.',
  },
  {
    id: 'alias',
    question: '¿Qué diferencia hay entre un buzón y un alias?',
    answer:
      'Un buzón es una cuenta independiente, con su espacio y su contraseña. Un alias es una dirección adicional que entrega los mensajes en un buzón que ya existe.',
  },
  {
    id: 'buzones',
    question: '¿Cuántos buzones puedo crear?',
    answer:
      'Depende de la configuración que contrates. La estructura de planes está en preparación, así que de momento lo ajustamos caso por caso.',
  },
  {
    id: 'movil',
    question: '¿Funciona en el móvil?',
    answer:
      'Sí. Puedes configurar la cuenta en la aplicación de correo del teléfono o entrar desde el webmail con el navegador, sin instalar nada.',
  },
  {
    id: 'spam',
    question: '¿Cómo se gestiona el spam?',
    answer:
      'Los mensajes pasan por un filtro antes de llegar al buzón. Lo que se detecta como correo no deseado queda en su carpeta, donde puedes revisarlo cuando quieras.',
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
