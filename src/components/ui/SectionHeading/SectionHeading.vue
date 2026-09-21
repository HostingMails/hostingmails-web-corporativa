<script setup lang="ts">
import { computed } from 'vue'
import './SectionHeading.css'

const props = withDefaults(
  defineProps<{
    eyebrow?: string
    title: string
    description?: string
    align?: 'start' | 'center'
    tone?: 'light' | 'dark'
    level?: 2 | 3
  }>(),
  {
    eyebrow: undefined,
    description: undefined,
    align: 'center',
    tone: 'light',
    level: 2,
  },
)

const titleTag = computed(() => `h${props.level}`)

const classes = computed(() => [
  'section-heading',
  `section-heading--${props.align}`,
  `section-heading--${props.tone}`,
])
</script>

<template>
  <header :class="classes">
    <p v-if="eyebrow" class="hm-eyebrow section-heading__eyebrow">{{ eyebrow }}</p>
    <component :is="titleTag" class="section-heading__title">{{ title }}</component>
    <p v-if="description" class="section-heading__description">{{ description }}</p>
    <div v-if="$slots.actions" class="section-heading__actions"><slot name="actions" /></div>
  </header>
</template>
