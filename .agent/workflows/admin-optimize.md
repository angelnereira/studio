---
name: admin-optimize
description: Optimiza el panel admin eliminando redundancias y simplificando flujos
---

# /admin-optimize — Optimización del Panel de Administración

## Modo: Planning (Gemini 3.1 Pro)

## Paso 1: Mapeo de Flujos Actuales

Navega por el admin usando el browser y documenta:

- Lista de todas las funcionalidades existentes
- Para cada funcionalidad: número de clics para completar la tarea principal
- Identifica las 3 tareas más frecuentes del owner
- Toma screenshot de cada sección del admin

## Paso 2: Identificar y Eliminar Redundancias

Para cada redundancia encontrada en /audit:

### Formularios duplicados

- Consolida en formulario único con variantes condicionales
- Implementa Zod schema compartido entre cliente y servidor

### Lógica repetida

- Extrae a custom hooks en `src/hooks/`
- Extrae a utils en `src/lib/utils/`
- Documenta en DECISIONS.md por qué se abstrajo

### Llamadas API duplicadas

- Implementa caché con SWR o React Query si no existe
- Las mismas API calls en múltiples lugares es una redundancia crítica

## Paso 3: Mejoras de UX del Admin

### Dashboard principal

Añade widget de métricas rápidas visible sin navegar:

- Visitas del día/semana (si hay analytics)
- Descargas del CV (contador de la API de descarga)
- Mensajes de contacto sin leer
- Estado del sitio (publicado/borrador)

### Búsqueda global

Implementa `src/features/admin/components/GlobalSearch.tsx`:

- Input visible en el header del admin (Cmd+K para abrir)
- Busca en proyectos, artículos, mensajes, configuración
- Resultados con preview y navegación directa

### Historial de cambios

Implementa log simple:

- Tabla `admin_activity_log` en DB: { action, entity, timestamp, details }
- Vista en el admin: últimas 50 acciones con filtro por fecha
- Acciones a logear: crear/editar/eliminar proyectos, publicar/despublicar, cambiar avatar, subir CV

### Upload de nuevo CV

Formulario simple en /admin/cv:

- Upload de PDF (ES) + Upload de PDF (EN) de forma independiente
- Validación: solo PDF, max 5MB
- Reemplaza automáticamente la versión anterior
- Confirma que la nueva versión es descargable antes de finalizar

## Paso 4: Editor de Contenido Bilingüe

Para formularios de proyectos, bio, etc.:
Implementa tab switcher [🇪🇸 ES] [🇺🇸 EN] en todos los campos de texto:

- El campo muestra contenido del idioma activo
- Al cambiar de tab, guarda el contenido del tab anterior
- Indicador visual si falta traducción en algún idioma
- Guardar guarda ambas versiones simultáneamente

## Paso 5: Sistema Draft/Publish

Si no existe:

- Añadir campo `status: "draft" | "published"` a entidades editables
- Preview mode: URL /preview/[id] que muestra el draft antes de publicar
- Publicar = un botón, sin friction
- Nunca mostrar borrador en el sitio público

## Entregable: Artifacts  

1. Diagrama: flujos antes vs después (screenshots comparativos)
2. Lista de redundancias eliminadas con justificación
3. Lista de automatizaciones implementadas
4. Demo en browser: flujo completo de actualizar CV (desde upload hasta descarga verificada)
