<script setup lang="ts">
import './BrandLogo.css'

withDefaults(
  defineProps<{
    tone?: 'light' | 'dark'
  }>(),
  { tone: 'light' },
)
</script>

<template>
  <a class="brand-logo" :class="`brand-logo--${tone}`" href="#inicio" aria-label="HostingMails, ir al inicio">
    <span class="brand-logo__mark" aria-hidden="true">
      <svg viewBox="0 0 32 32" fill="none">
        <rect x="4" y="7" width="24" height="18" rx="5" stroke="currentColor" stroke-width="2.1" />
        <path
          d="M7 11.5 14.6 17a2.4 2.4 0 0 0 2.8 0L25 11.5"
          stroke="currentColor"
          stroke-width="2.1"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </span>
    <span class="brand-logo__word">
      Hosting<span class="brand-logo__word-accent">Mails</span>
    </span>
  </a>
</template>
