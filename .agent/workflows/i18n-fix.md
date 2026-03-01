---
name: i18n-fix
description: Implementa o completa el sistema i18n global del sitio
---

# /i18n-fix — Sistema de Internacionalización Global

## Modo: Planning (Gemini 3.1 Pro)

## Prerequisito: Ejecutar /audit primero y tener el inventario de textos hardcodeados

## Paso 1: Setup del Sistema i18n (si no existe)

```bash
npm install next-intl
```

Crea los archivos de configuración:

- `src/i18n.ts` — configuración central de next-intl
- `src/middleware.ts` — detección automática de idioma + redirects
- `messages/es.json` — traducciones en español (fuente: CV en español)
- `messages/en.json` — traducciones en inglés (fuente: CV en inglés)

Configuración del middleware:

- Detectar idioma del browser vía Accept-Language header
- URLs localizadas: /es/... y /en/...
- Cookie: "NEXT_LOCALE" para persistencia (compatible con SSR)
- Fallback: español

## Paso 2: Migrar Textos Hardcodeados

Usando el inventario del /audit:

- Para cada texto hardcodeado, crear la key correspondiente en es.json y en.json
- Convención: section.component.element (ej: hero.cta.download_cv)
- Las traducciones EN deben estar alineadas con Angel_Nereira_CV_ATS_EN.pdf
- Las traducciones deben sonar naturales, no literales

## Paso 3: Componente LanguageSwitcher

Crea `src/components/LanguageSwitcher.tsx`:

- Muestra idioma activo claramente (ES | EN)
- Usa soft navigation (no recarga completa)
- Preserva la ruta actual al cambiar de idioma
- Accesible: ARIA labels + keyboard navigation
- Funcional en mobile (touch target ≥ 44px)
- Añadir al Header Y al Footer

## Paso 4: SEO Multilingüe

- Meta titles y descriptions dinámicas según idioma activo
- Atributo `<html lang="...">` dinámico
- hreflang tags para cada página en ambos idiomas
- Open Graph tags actualizados por idioma

## Paso 5: Verificación Exhaustiva

Abre el browser y navega por CADA sección en ambos idiomas verificando:

- ¿Todos los textos cambian correctamente?
- ¿Los alt de imágenes cambian?
- ¿Los mensajes de error/éxito cambian?
- ¿Los meta tags cambian?
- ¿El selector de idioma es visible en todas las páginas?

Ejecuta verificación final:

```bash
grep -rn ">[A-Z]" src/ --include="*.tsx" | grep -v "//\|className\|import\|test\|Error\|React\|Next" | wc -l
```

Si el resultado es > 0, la tarea NO está completa.

## Entregable: Artifacts

1. Diff de todos los archivos modificados
2. Screenshot del sitio en español y en inglés para comparación
3. Reporte de coverage: X/Y textos migrados (debe ser 100%)
