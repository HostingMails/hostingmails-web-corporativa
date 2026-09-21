<script setup lang="ts">
import { ref, watch } from 'vue'
import AppIcon from '@/components/ui/AppIcon/AppIcon.vue'
import BaseButton from '@/components/ui/BaseButton/BaseButton.vue'
import BrandLogo from '@/components/ui/BrandLogo/BrandLogo.vue'
import { navLinks, sectionIds } from '@/data/navigation'
import { useScrollLock } from '@/composables/useScrollLock'
import { useScrollSpy } from '@/composables/useScrollSpy'
import { useStickyHeader } from '@/composables/useStickyHeader'
import './Header.css'

const isMenuOpen = ref(false)
const { isScrolled } = useStickyHeader()
const { activeId } = useScrollSpy(sectionIds)

useScrollLock(isMenuOpen)

const closeMenu = () => {
  isMenuOpen.value = false
}

watch(isMenuOpen, (open) => {
  if (!open) return
  const onKeydown = (event: KeyboardEvent) => {
    if (event.key !== 'Escape') return
    closeMenu()
    window.removeEventListener('keydown', onKeydown)
  }
  window.addEventListener('keydown', onKeydown)
})
</script>

<template>
  <header class="site-header" :class="{ 'site-header--scrolled': isScrolled }">
    <div class="hm-container site-header__inner">
      <BrandLogo />

      <nav class="site-header__nav" aria-label="Navegación principal">
        <ul class="site-header__nav-list">
          <li v-for="link in navLinks" :key="link.id">
            <a
              class="site-header__nav-link"
              :class="{ 'site-header__nav-link--active': activeId === link.id }"
              :href="`#${link.id}`"
            >
              {{ link.label }}
            </a>
          </li>
        </ul>
      </nav>

      <div class="site-header__actions">
        <a class="site-header__login" href="#contacto">
          <AppIcon name="lock" :size="16" />
          Webmail
        </a>
        <BaseButton href="#contacto" size="md">Solicitar información</BaseButton>
      </div>

      <button
        class="site-header__burger"
        type="button"
        :aria-expanded="isMenuOpen"
        aria-controls="menu-movil"
        :aria-label="isMenuOpen ? 'Cerrar menú' : 'Abrir menú'"
        @click="isMenuOpen = !isMenuOpen"
      >
        <AppIcon :name="isMenuOpen ? 'close' : 'menu'" :size="24" />
      </button>
    </div>

    <Transition name="site-header-panel">
      <div v-show="isMenuOpen" id="menu-movil" class="site-header__panel">
        <nav aria-label="Navegación móvil">
          <ul class="site-header__panel-list">
            <li v-for="link in navLinks" :key="link.id">
              <a class="site-header__panel-link" :href="`#${link.id}`" @click="closeMenu">
                <span>{{ link.label }}</span>
                <AppIcon name="arrowRight" :size="18" />
              </a>
            </li>
          </ul>
        </nav>

        <div class="site-header__panel-actions">
          <BaseButton href="#contacto" size="lg" block @click="closeMenu">
            Solicitar información
          </BaseButton>
          <BaseButton href="#contacto" variant="secondary" size="lg" block @click="closeMenu">
            Acceder al webmail
          </BaseButton>
        </div>
      </div>
    </Transition>
  </header>
</template>
