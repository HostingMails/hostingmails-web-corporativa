# TODO

Cosas que dependen de ti.

## Marca

- [ ] Logotipo definitivo. Ahora hay uno provisional hecho en SVG (sobre + wordmark)
      en `src/components/ui/BrandLogo/`. El favicon de `public/favicon.svg` usa la misma marca.
- [ ] Confirmar la paleta. Verde `#268A60` de marca, ámbar `#C8861A` de acento y
      pizarra `#2E3B42` para las bandas oscuras (ver `docs/design/design-system.md`).

## Precios — lo más urgente

La web ya muestra **29 / 59 / 99 € al año** con el aviso «Tarifas orientativas. Los
precios definitivos se publicarán al cerrar el servicio». Quitar ese aviso es borrar
el bloque `.pricing__footnote--warn` de `Pricing.vue`.

- [ ] **Calcular el margen antes de dar los precios por buenos**: VPS, discos, backups,
      SMTP saliente, monitorización y soporte. Sin eso, 50 GB por 99 €/año es una
      apuesta, no una tarifa.
- [ ] Escribir la **política de uso razonable**: «buzones y alias sin límite fijo» tiene
      que estar acotado por escrito (límites de conexiones y de envíos por hora).
      La web ya remite a ella pero el documento no existe.
- [ ] Confirmar los límites por plan: 5 GB / 1 dominio, 20 GB / 3 dominios,
      50 GB / 10 dominios.
- [ ] Confirmar los precios de los servicios adicionales: migración desde 39 € y
      configuración de dispositivos a 15 €/dispositivo.

## Contenido

- [ ] Correo de contacto real. Se usa `hola@hostingmails.com` como placeholder.
- [ ] Horario de atención (el CTA dice "pendiente de publicar").
- [ ] Servidores IMAP/SMTP reales. Ahora son `imap.hostingmails.com` y
      `smtp.hostingmails.com` con los puertos estándar 993 y 465.
- [ ] Textos legales: aviso legal, privacidad, cookies y condiciones. Los enlaces del
      pie existen pero apuntan a la sección de contacto.
- [ ] Revisar la lista de «Llegará más adelante» de la sección *Qué incluye*
      (contactos y calendario, panel de cliente, API). Anunciarlo es comprometerse.

## Decisiones pendientes

- [ ] Si la landing se queda en una sola página o las legales pasan a rutas propias
      (haría falta añadir Vue Router).
- [ ] Qué pasa al pulsar "Solicitar información": formulario propio, `mailto:` o un
      servicio externo. Ahora mismo el CTA final abre el cliente de correo.
- [ ] Si el webmail tendrá subdominio propio y a dónde debe apuntar el enlace del header.
- [ ] SMTP saliente del correo humano: directo desde la VPS o con relay autorizado.
      Resend se queda para formularios y aplicaciones, no para el correo de los clientes.

## Infraestructura

Va en **VPS propias de Hetzner**, no en Hostinger: `vps-dev` (desarrollo por SSH),
`vps-prod` (la web) y `vps-mail` (Mailcow, el producto). El paso a paso está en
[guides/vps-dev-setup.md](guides/vps-dev-setup.md) y
[guides/vps-prod-setup.md](guides/vps-prod-setup.md).

- [ ] Confirmar **Nginx** como servidor web. Las guías lo dan por hecho; si
      prefieres Caddy, dímelo y las reescribo (Caddy te ahorra Certbot).
- [ ] Dominio definitivo. Mientras tanto va en `hostingmails.demo.webscrafting.com`,
      que necesita un registro `A` donde esté gestionado el DNS de `webscrafting.com`.
- [ ] Crear el par de claves del deploy y cargar los 4 secretos en GitHub
      (`SSH_HOST`, `SSH_USER`, `SSH_KEY`, `DEPLOY_PATH`) — paso 8 y 9 de la guía de prod.
- [ ] Decidir si quieres ver el trabajo en curso solo por túnel SSH (lo montado)
      o expuesto en un `dev.` público.
