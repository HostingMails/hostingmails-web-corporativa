<script setup lang="ts">
import AppIcon from '../ui/AppIcon/AppIcon.vue'
import SectionHeading from '../ui/SectionHeading/SectionHeading.vue'
import type { IconName } from '../ui/AppIcon/icons'
import './Features.css'

interface Feature {
  icon: IconName
  title: string
  description: string
}

/** Tarjetas de la fila intermedia del bento. */
const features: readonly Feature[] = [
  {
    icon: 'at',
    title: 'Alias por buzón',
    description:
      'Crea direcciones de área como info@, ventas@ o soporte@ y recíbelas en el buzón que quieras.',
  },
  {
    icon: 'forward',
    title: 'Reenvíos automáticos',
    description:
      'Redirige el correo de una dirección a otra cuenta interna o externa, con copia opcional.',
  },
  {
    icon: 'database',
    title: 'Almacenamiento por buzón',
    description:
      'Cada buzón tiene su propio espacio, ampliable cuando el equipo o el archivo histórico crecen.',
  },
] as const

const mailboxes = [
  { address: 'hola@tudominio.com', role: 'Buzón principal' },
  { address: 'ventas@tudominio.com', role: 'Equipo comercial' },
  { address: 'soporte@tudominio.com', role: 'Atención al cliente' },
] as const

const protections = ['SPF', 'DKIM', 'DMARC', 'Antivirus'] as const

const webmailPoints = ['Acceso desde el navegador', 'Búsqueda en todo el buzón', 'Firmas y carpetas'] as const
</script>

<template>
  <section id="caracteristicas" class="hm-section features">
    <div class="hm-container">
      <SectionHeading
        eyebrow="Características"
        title="Todo lo que necesita el correo de una empresa"
        description="Las piezas básicas de un correo profesional, resueltas y listas para usar desde el primer día."
      />

      <div class="features__grid">
        <article v-reveal class="features__card features__card--hero">
          <div class="features__card-head">
            <span class="features__icon features__icon--solid"><AppIcon name="mail" :size="20" /></span>
            <div>
              <h3 class="features__title">Buzones con tu dominio</h3>
              <p class="features__text">
                Cuentas reales con el nombre de tu empresa, creadas y gestionadas desde un único
                sitio.
              </p>
            </div>
          </div>

          <ul class="features__mailboxes">
            <li v-for="mailbox in mailboxes" :key="mailbox.address" class="features__mailbox">
              <span class="features__mailbox-dot" aria-hidden="true"></span>
              <span class="features__mailbox-text">
                <strong>{{ mailbox.address }}</strong>
                <small>{{ mailbox.role }}</small>
              </span>
              <AppIcon name="check" :size="16" :stroke-width="2.4" />
            </li>
          </ul>
        </article>

        <article v-reveal="80" class="features__card features__card--security">
          <span class="features__icon features__icon--soft"><AppIcon name="shield" :size="20" /></span>
          <h3 class="features__title">Seguridad y antispam</h3>
          <p class="features__text">
            Filtrado del correo no deseado y autenticación del dominio para que tus mensajes lleguen
            donde tienen que llegar.
          </p>

          <ul class="features__chips">
            <li v-for="item in protections" :key="item" class="features__chip">{{ item }}</li>
          </ul>
        </article>

        <article
          v-for="(feature, index) in features"
          :key="feature.title"
          v-reveal="index * 70"
          class="features__card features__card--compact"
        >
          <span class="features__icon features__icon--outline">
            <AppIcon :name="feature.icon" :size="20" />
          </span>
          <h3 class="features__title features__title--sm">{{ feature.title }}</h3>
          <p class="features__text">{{ feature.description }}</p>
        </article>

        <article v-reveal class="features__card features__card--wide">
          <div class="features__wide-text">
            <span class="features__icon features__icon--soft">
              <AppIcon name="browser" :size="20" />
            </span>
            <h3 class="features__title">Webmail incluido</h3>
            <p class="features__text">
              Entra a tu correo desde cualquier navegador, sin instalar nada y con la misma bandeja
              que ves en el móvil.
            </p>
          </div>

          <ul class="features__points">
            <li v-for="point in webmailPoints" :key="point" class="features__point">
              <AppIcon name="check" :size="15" :stroke-width="2.4" />
              {{ point }}
            </li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>
