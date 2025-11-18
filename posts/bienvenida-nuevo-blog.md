---
title: "Bienvenida al Nuevo Blog"
date: "2025-11-18"
excerpt: "Introducción al nuevo sistema de blog construido con Next.js y Markdown, sin conflictos y fácil de mantener."
author: "Angel Nereira"
tags: ["Next.js", "Markdown", "Blog", "Web Development"]
coverImage: "https://picsum.photos/seed/blog-welcome/1200/630"
---

# Bienvenida al Nuevo Blog

¡Hola! Este es el primer artículo del blog completamente renovado.

## ¿Por qué un nuevo sistema?

Después de experimentar con varios enfoques, decidí implementar un sistema simple y efectivo:

- ✅ **Sin conflictos** - No usa MDX ni configuraciones complejas
- ✅ **Fácil de mantener** - Solo archivos `.md` normales
- ✅ **Rápido** - Construcción estática optimizada
- ✅ **Compatible** - Funciona perfectamente con Next.js 15

## Stack Tecnológico

El blog está construido con:

1. **Next.js 15.5.3** - Framework de React
2. **TypeScript** - Tipado estático
3. **Tailwind CSS** - Estilos utilitarios
4. **gray-matter** - Procesamiento de frontmatter
5. **react-markdown** - Renderizado de Markdown
6. **react-syntax-highlighter** - Resaltado de sintaxis

## Ejemplo de Código

Aquí puedes ver cómo se ve el código con syntax highlighting:

```typescript
// Función para obtener todos los posts
export function getAllPosts(): Omit<Post, 'content'>[] {
  const slugs = getAllPostSlugs();
  const posts = slugs
    .map(slug => getPostBySlug(slug))
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  return posts.map(({ content, ...post }) => post);
}
```

```javascript
// Ejemplo en JavaScript
const greeting = "¡Hola Mundo!";
console.log(greeting);
```

## Características del Blog

### 1. Markdown Simple

Escribo los artículos en Markdown normal, sin necesidad de componentes React complejos.

### 2. SEO Optimizado

Cada artículo tiene:
- Metadata dinámica (title, description, Open Graph)
- Generación estática de rutas
- URLs amigables

### 3. Artículos Relacionados

El sistema detecta artículos relacionados basándose en tags comunes.

### 4. Tiempo de Lectura

Calcula automáticamente el tiempo de lectura estimado.

## Lista de Características

- Resaltado de sintaxis para múltiples lenguajes
- Soporte para enlaces externos (se abren en nueva pestaña)
- Diseño responsivo
- Modo oscuro
- Animaciones suaves

## Conclusión

Este es solo el comienzo. Pronto publicaré artículos sobre:

1. **Case Studies** - Proyectos reales y lecciones aprendidas
2. **Tutoriales** - Guías paso a paso sobre desarrollo web
3. **Arquitectura** - Decisiones técnicas y patrones
4. **FinTech** - Experiencias en el sector financiero

¡Gracias por leer! Si tienes algún proyecto en mente, no dudes en [contactarme](/contact).

---

**¿Encontraste este artículo útil?** Compártelo con otros desarrolladores.
