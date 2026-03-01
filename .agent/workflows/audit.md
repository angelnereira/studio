---
name: audit
description: Auditoría completa del proyecto angelnereira.com antes de cualquier cambio
---

# /audit — Auditoría Completa del Proyecto

## Modo: Planning (usar Gemini 3.1 Pro — Deep Think)

## Paso 1: Análisis de Arquitectura

- Mapea toda la estructura de carpetas del proyecto
- Identifica si sigue Feature-Based Architecture o está mezclada
- Lista todos los componentes duplicados o con responsabilidades solapadas
- Detecta lógica de negocio mezclada con lógica de UI
- Identifica uso incorrecto de Server Components vs Client Components
- Busca tipos `any` en TypeScript
- Busca `console.log` en código de producción
- Verifica separación correcta de capas (UI → hooks → services → API)

## Paso 2: Auditoría i18n

Ejecuta en terminal:

```bash
# Buscar textos hardcodeados visibles
grep -rn ">[A-Z][a-záéíóúñ]" src/ --include="*.tsx" | grep -v "//" | grep -v "test"
grep -rn '"[A-Z][a-z]' src/ --include="*.tsx" --include="*.ts" | grep -v "//.*" | grep -v ".test." | grep -v "className" | grep -v "import"
# Verificar si existe sistema i18n
ls -la src/i18n/ messages/ locales/ 2>/dev/null || echo "NO i18n SYSTEM FOUND"
find . -name "es.json" -o -name "en.json" 2>/dev/null
```

- Genera inventario exhaustivo de TODOS los textos hardcodeados con ubicación exacta (archivo:línea)
- Evalúa completitud del sistema i18n existente

## Paso 3: Auditoría del Admin Panel

- Lista todas las funcionalidades del admin
- Mide clicks requeridos para cada tarea frecuente
- Identifica formularios con campos redundantes
- Lista tareas que se repiten manualmente que podrían automatizarse
- Evalúa feedback visual en todas las acciones

## Paso 4: Auditoría de Performance y UX

Abre el browser en el sitio y:

- Ejecuta Lighthouse audit (Performance, Accessibility, Best Practices, SEO)
- Documenta todos los scores
- Lista imágenes sin optimizar
- Verifica estados hover/focus/active en elementos interactivos

## Paso 5: Auditoría de Seguridad

- Verifica que /public NO contiene archivos sensibles (PDFs de CV, etc.)
- Verifica headers de seguridad en next.config.js
- Verifica rate limiting en rutas sensibles
- Verifica que rutas de admin están protegidas

## Entregable: Artifact "Audit Report"

Genera un Implementation Plan Artifact con:

1. Mapa de arquitectura actual (diagrama Mermaid)
2. Lista priorizada de issues (Crítico/Alto/Medio/Bajo)
3. Inventario completo de textos hardcodeados con ruta:línea
4. Lista de redundancias detectadas
5. Scores de Lighthouse
6. Top 5 acciones de mayor impacto inmediato
