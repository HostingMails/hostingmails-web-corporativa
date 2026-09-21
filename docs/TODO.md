# TODO

Cosas que dependen de ti.

## Marca

- [ ] Logotipo definitivo. Ahora hay uno provisional hecho en SVG (sobre + wordmark)
      en `src/components/ui/BrandLogo/`. El favicon de `public/favicon.svg` usa la misma marca.
- [ ] Confirmar la paleta. La propuesta se ha ajustado un poco para equilibrarla
      (ver `docs/design/design-system.md`); el verde principal sigue siendo `#268A60`.

## Contenido

- [ ] Tarifas de los planes. Ahora aparece un guion y el aviso "Tarifa pendiente de publicar".
- [ ] Qué incluye cada plan de verdad (buzones, GB por buzón, dominios).
- [ ] Nombres definitivos de los planes: ahora son Esencial, Profesional y Empresa.
- [ ] Correo de contacto real. Se usa `hola@hostingmails.com` como placeholder.
- [ ] Horario de atención (el CTA dice "pendiente de publicar").
- [ ] Servidores IMAP/SMTP reales. Ahora son `imap.hostingmails.com` y
      `smtp.hostingmails.com` con los puertos estándar 993 y 465.
- [ ] Textos legales: aviso legal, privacidad, cookies y condiciones. Los enlaces del
      pie existen pero apuntan a la sección de contacto.

## Decisiones pendientes

- [ ] Si la landing se queda en una sola página o las legales pasan a rutas propias
      (haría falta añadir Vue Router).
- [ ] Qué pasa al pulsar "Solicitar información": formulario propio, `mailto:` o un
      servicio externo. Ahora mismo el CTA final abre el cliente de correo.
- [ ] Si el webmail tendrá subdominio propio y a dónde debe apuntar el enlace del header.

## Infraestructura

- [ ] Dominio y hosting en Hostinger.
- [ ] CI/CD para desplegar el `dist/` en cada push.
