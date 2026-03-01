---
name: full-cycle
description: Ejecuta el ciclo completo de 5 etapas en orden. Solo usar cuando se quiere hacer todo de una vez.
---

# /full-cycle — Ciclo Completo de 5 Etapas

## ⚠️ IMPORTANTE

Este workflow spawn múltiples agentes. Usar Agent Manager View.
Cada etapa DEBE completarse y verificarse antes de continuar a la siguiente.
Si una etapa falla, NO continuar — resolver el problema primero.

## Agente 1: Auditoría (independiente, sin modificaciones)

Ejecuta: /audit
Espera a que genere el Artifact "Audit Report" completo.
Revisa el reporte y aprueba antes de continuar.

## Agente 2: i18n (depende de Agente 1)

Prerequisito: Audit Report aprobado
Ejecuta: /i18n-fix
Criterio de éxito: 0 textos hardcodeados en grep final

## Agentes 3a y 3b: Features en Paralelo (dependen de Agente 2)

Despacha simultáneamente en Agent Manager:

- Agente 3a: /cv-feature
- Agente 3b: /admin-optimize

## Agente 4: Avatar (depende de Agente 3b — admin debe estar listo)

Ejecuta: /avatar-feature

## Agente 5: Career Features (depende de todos los anteriores)

Ejecuta: /career-features

## Verificación Final

Después de todos los agentes completados:

1. Ejecutar Lighthouse en el sitio
2. Verificar que scores cumplen targets del rules/05-ux-standards.md
3. Verificar 0 errores TypeScript: `npx tsc --noEmit`
4. Verificar 0 textos hardcodeados
5. Generar Artifact de "Release Summary" con:
   - Lista de todo lo implementado
   - Screenshots before/after de las secciones principales
   - Métricas de Lighthouse antes vs después
   - Pendientes para el próximo ciclo
