---
name: career-features
description: Implementa features de gestión de carrera digital para profesional autodidacta
---

# /career-features — Features de Carrera Digital

## Modo: Planning (Gemini 3.1 Pro)

## Prerequisito: /audit + /i18n-fix completados

## Feature A: "Proof of Work" — Métricas Cuantificables

Las métricas de Sago One (ya en el CV) son el material inicial.

Datos verificados para cargar:

- 10,000+ facturas electrónicas procesadas
- 99.9% uptime mantenido
- 40% reducción en tiempos de respuesta
- 75% reducción en errores de deployment
- Ciclo de entrega: de 2 semanas a 3 días
- 60% mejora en tiempos de despliegue

### Implementar

Crea `src/features/proof-of-work/` con:

- Componente `MetricCard` con número, descripción, proyecto asociado
- Sección animada en el sitio (números que se incrementan al hacer scroll)
- Panel en admin para CRUD de métricas (sin tocar código)
- Modelo en DB: { metric_value, metric_label_es, metric_label_en, project_name, icon }
- Validación: el owner debe poder actualizar cualquier métrica sin redeploy

## Feature B: Blog / "Learning in Public"

### Implementar

- MDX para máxima flexibilidad de contenido
- Estructura: `content/blog/[slug]/index.mdx`
- Frontmatter: { title_es, title_en, date, tags, lang: "es"|"en"|"both", excerpt_es, excerpt_en }
- Categorías: Arquitectura, SaaS, FinTech, DevOps, Aprendizajes, Behind the Build
- Feed RSS automático: /rss.xml y /en/rss.xml
- SEO: Open Graph dinámico por artículo con imagen generada
- Crear 1 artículo de demo: "Cómo construí Sago One: arquitectura Offline-First para facturación electrónica"

## Feature C: "Open to Work" Toggle

### Implementar

- Toggle en admin: ON/OFF sin redeploy (guardar en DB o KV store)
- Cuando ON, mostrar badge en sitio: disponibilidad, tipo de trabajo, modalidad
- Campos gestionados desde admin:
  - Tipo: Freelance / Full-time / Consultoría / Colaboración
  - Disponibilidad: Inmediata / X semanas
  - Modalidad: Remoto / Híbrido
  - Compensación: rango opcional (oculto por defecto, activable)
- Completamente internacionalizado (ES + EN)

## Feature D: Formulario de Contacto Inteligente

### Implementar

Crea `src/features/contact/`:

- Campos: Nombre, Email, Tipo (Trabajo/Proyecto/Consultoría/Colaboración/Otro), Mensaje
- Validación con Zod (compartida cliente/servidor)
- Anti-spam: rate limiting (5/hora/IP) + honeypot field oculto
- Sin CAPTCHA intrusivo
- Notificación al owner: email con template profesional
- Respuesta automática de confirmación al remitente
- Panel en admin /admin/messages: ver todos los mensajes con filtros y estado (leído/no leído)

## Feature E: SEO y Structured Data

### Implementar

Añade JSON-LD a las páginas principales:

`/` → PersonSchema:

```json
{
  "@type": "Person",
  "name": "Ángel Nereira",
  "jobTitle": "Senior Full Stack Engineer & SaaS Architect",
  "url": "https://angelnereira.com",
  "sameAs": [
    "https://github.com/angelnereira",
    "https://www.linkedin.com/in/angel-nereira-software-ingineer-and-devops/"
  ],
  "knowsAbout": ["Next.js", "SaaS Architecture", "FinTech", "PostgreSQL"]
}
```

Cada proyecto → SoftwareApplication schema
Cada artículo → Article schema

Target keywords a verificar en meta tags:

- "Full Stack Engineer Panama"
- "SaaS Developer Panama"  
- "Next.js Developer FinTech"
- "Facturación electrónica DGI Panamá developer"
- "Angel Nereira"

También: sitemap.xml dinámico + robots.txt correctamente configurado

## Feature F: Analytics de Carrera

### Implementar usando Vercel Analytics (sin cookies, GDPR-friendly)

```bash
npm install @vercel/analytics
```

Añadir `<Analytics />` en el root layout.

Dashboard en admin /admin/analytics:

- Widget: visitas totales + trend (esta semana vs semana anterior)
- Widget: páginas más visitadas (¿sección de proyectos? ¿hero? ¿contacto?)
- Widget: descargas del CV (contador de la API + idioma)
- Widget: fuentes de tráfico (¿LinkedIn? ¿búsqueda orgánica? ¿directo?)
- Widget: mensajes de contacto recibidos (contador)

## Entregable: Artifacts

Para cada feature implementado:

1. Screenshot del componente en el sitio público
2. Screenshot del panel de admin correspondiente
3. Test de flujo completo en browser
4. Verificación de i18n (ambos idiomas funcionando)
