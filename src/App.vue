<script setup lang="ts">
import Header from './components/Header/Header.vue'
import Hero from './components/Hero/Hero.vue'
import Features from './components/Features/Features.vue'
import HowItWorks from './components/HowItWorks/HowItWorks.vue'
import Compatibility from './components/Compatibility/Compatibility.vue'
import Pricing from './components/Pricing/Pricing.vue'
import FAQ from './components/FAQ/FAQ.vue'
import CTA from './components/CTA/CTA.vue'
import Footer from './components/Footer/Footer.vue'
</script>

<template>
  <a class="hm-skip-link" href="#contenido">Saltar al contenido</a>

  <Header />

  <main id="contenido">
    <Hero />
    <Features />
    <HowItWorks />
    <Compatibility />
    <Pricing />
    <FAQ />
    <CTA />
  </main>

  <Footer />
</template>
