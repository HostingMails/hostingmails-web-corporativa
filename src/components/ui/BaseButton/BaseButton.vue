<script setup lang="ts">
import { computed } from 'vue'
import './BaseButton.css'

type Variant = 'primary' | 'secondary' | 'ghost' | 'inverse' | 'outline-inverse'
type Size = 'sm' | 'md' | 'lg'

const props = withDefaults(
  defineProps<{
    variant?: Variant
    size?: Size
    href?: string
    type?: 'button' | 'submit'
    block?: boolean
  }>(),
  {
    variant: 'primary',
    size: 'md',
    href: undefined,
    type: 'button',
    block: false,
  },
)

const tag = computed(() => (props.href ? 'a' : 'button'))

const classes = computed(() => [
  'base-button',
  `base-button--${props.variant}`,
  `base-button--${props.size}`,
  { 'base-button--block': props.block },
])
</script>

<template>
  <component :is="tag" :class="classes" :href="href" :type="href ? undefined : type">
    <span class="base-button__label"><slot /></span>
    <span v-if="$slots.trailing" class="base-button__trailing"><slot name="trailing" /></span>
  </component>
</template>
