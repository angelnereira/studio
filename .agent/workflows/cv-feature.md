---
name: cv-feature
description: Implementa descarga segura del CV en PDF (ES + EN) con rate limiting
---

# /cv-feature — Sistema de Descarga Segura del CV

## Modo: Planning (Gemini 3.1 Pro)

## Paso 1: Preparar los Archivos PDF

```bash
# Crear directorio seguro (NUNCA en /public)
mkdir -p src/private/cv
# Los PDFs van aquí, NUNCA en /public:
# src/private/cv/cv-es.pdf  ← Angel_Nereira_CV_ATS.pdf
# src/private/cv/cv-en.pdf  ← Angel_Nereira_CV_ATS_EN.pdf
```

Verifica que .gitignore excluye src/private/ si los PDFs son sensibles.
Alternativamente, usar Vercel Blob Storage o similar para almacenamiento seguro.

## Paso 2: API Route con Rate Limiting

Crea `src/app/api/cv/download/route.ts`:

Requerimientos de la API:

- Parámetro: `?lang=es` o `?lang=en`
- Valida que lang es "es" o "en" (rechazar cualquier otro valor)
- Rate limiting: 10 requests/IP/hora (usar @upstash/ratelimit o similar)
- Lee el PDF del servidor (NO de /public)
- Headers de respuesta obligatorios:
  - Content-Type: application/pdf
  - Content-Disposition: attachment; filename="Angel_Nereira_CV_[LANG]_2025.pdf"
  - X-Content-Type-Options: nosniff
  - Cache-Control: no-store (prevenir caché de archivos privados)
- Log del evento: { timestamp, lang, ip_hash } (hash para privacidad, NO IP real)
- En caso de rate limit exceeded: 429 con mensaje internacionalizado

## Paso 3: Componente CVDownloadButton

Crea `src/features/cv/components/CVDownloadButton.tsx`:

Comportamiento:

- Detecta idioma activo del sistema i18n y descarga CV correspondiente automáticamente
- Opción de selector manual de idioma (ES | EN) si el usuario lo desea
- 3 estados visuales requeridos:
  - Idle: botón con ícono de descarga
  - Loading: spinner + texto "Preparando PDF..." (i18n)
  - Success: check verde + "¡Descarga iniciada!" (auto-dismiss 3s)
  - Error: ícono error + mensaje específico (rate limit vs error genérico)
- Texto del botón: key i18n `cv.download.button.label`
- Añadir en: sección Hero, sección "Sobre mí", Header (modo compacto)

## Paso 4: Integración i18n

Añadir a messages/es.json y messages/en.json:

```json
{
  "cv": {
    "download": {
      "button": {
        "label": "Descargar CV",
        "label_en": "Download CV",
        "loading": "Preparando PDF...",
        "loading_en": "Preparing PDF...",
        "success": "¡Descarga iniciada!",
        "success_en": "Download started!",
        "error_ratelimit": "Demasiadas descargas. Intenta en 1 hora.",
        "error_ratelimit_en": "Too many downloads. Try again in 1 hour.",
        "error_generic": "Error al descargar. Intenta de nuevo.",
        "error_generic_en": "Download failed. Please try again."
      },
      "select_language": "Seleccionar idioma del CV",
      "select_language_en": "Select CV language"
    }
  }
}
```

## Entregable: Artifacts

1. Screenshot del botón en sus 4 estados
2. Test manual: descarga en español + en inglés
3. Test de rate limiting: 11 solicitudes rápidas deben ser rechazadas
4. Diff completo de archivos creados/modificados
