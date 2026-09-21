<script setup lang="ts">
import Header from '@/components/Header/Header.vue'
import Hero from '@/components/Hero/Hero.vue'
import ValueProps from '@/components/ValueProps/ValueProps.vue'
import Features from '@/components/Features/Features.vue'
import Included from '@/components/Included/Included.vue'
import HowItWorks from '@/components/HowItWorks/HowItWorks.vue'
import Compatibility from '@/components/Compatibility/Compatibility.vue'
import Pricing from '@/components/Pricing/Pricing.vue'
import AddOns from '@/components/AddOns/AddOns.vue'
import FAQ from '@/components/FAQ/FAQ.vue'
import CTA from '@/components/CTA/CTA.vue'
import Footer from '@/components/Footer/Footer.vue'
</script>

<template>
  <a class="hm-skip-link" href="#contenido">Saltar al contenido</a>

  <Header />

  <!--
    El orden alterna fondos a propósito: claro, oscuro, claro, oscuro…
    para que ninguna sección se confunda con la anterior.
  -->
  <main id="contenido">
    <Hero />
    <ValueProps />
    <Features />
    <Included />
    <HowItWorks />
    <Compatibility />
    <Pricing />
    <AddOns />
    <FAQ />
    <CTA />
  </main>

  <Footer />
</template>
