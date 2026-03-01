---
name: quick-fixes
description: 4 correcciones urgentes identificadas en auditoría de producción. Sin riesgo, menos de 30 minutos.
---

# /quick-fixes — Correcciones Inmediatas

## Fix 1: URL de LinkedIn en footer

Buscar: linkedin.com/in/angel-nereira-software-ingineer/
Reemplazar: linkedin.com/in/angel-nereira-software-ingineer-and-devops/

## Fix 2: Toggle de idioma (remover temporalmente)

Buscar el componente "Toggle language" en el nav
Comentar o quitar hasta que /i18n-fix esté completado
Reason: El toggle activo que no hace nada daña la credibilidad más que no tenerlo

## Fix 3: Copyright dinámico

Buscar: "© 2026" en el footer
Reemplazar con: `© {new Date().getFullYear()} Ángel Nereira`

## Fix 4: FAQPage Structured Data

Añadir al componente FAQ del home:
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[pregunta 1]",
      "acceptedAnswer": { "@type": "Answer", "text": "[respuesta 1]" }
    }
    // ... resto de preguntas
  ]
}
</script>
