---
name: avatar-feature
description: Herramienta en el admin para generar avatar profesional con IA desde foto de LinkedIn/GitHub
---

# /avatar-feature — Generador de Avatar Profesional con IA

## Modo: Planning (Gemini 3.1 Pro)

## Referencias del Owner

- LinkedIn: <https://www.linkedin.com/in/angel-nereira-software-ingineer-and-devops/>
- GitHub: <https://github.com/angelnereira>
- Foto actual: disponible en ambas plataformas

## Paso 1: Página en Admin Panel

Crea `src/features/avatar/components/AvatarGenerator.tsx`
Ruta: /admin/avatar

Interfaz de 3 pasos (stepper visual):

### Step 1: "Fuente de imagen"

- Input URL (LinkedIn o GitHub)
- Botón "Importar foto de perfil"
- Preview de imagen importada (Canvas API o img element)
- Fallback: upload manual de imagen

Para importar foto de GitHub:

```
https://avatars.githubusercontent.com/u/[USER_ID]?v=4
# o via API:
https://api.github.com/users/angelnereira → campo "avatar_url"
```

### Step 2: "Generar con IA"

Opciones de estilo (4 estilos):

1. Profesional corporativo
2. Tech / desarrollador
3. Minimalista flat design
4. Ilustración artística

Servicio de generación recomendado (en orden de preferencia):

- Opción A: Replicate API — modelo `zsxkib/instant-id` o `fofr/face-to-sticker`
- Opción B: fal.ai — modelo `fal-ai/face-to-sticker`
- Opción C: Cloudinary AI Background Removal + Style Transfer

API call de ejemplo con Replicate:

```typescript
const output = await replicate.run(
  "zsxkib/instant-id:...",
  { input: { image: base64Image, style: selectedStyle } }
);
```

Muestra 3-4 variantes generadas para que el owner elija.
Estado de generación: loading con progress indicator.

### Step 3: "Aplicar al sitio"

- Preview del avatar seleccionado
- Botón "Aplicar como foto de perfil"
- Upload a Cloudinary con transformaciones automáticas:
  - Generar versiones: 48x48, 96x96, 192x192, 400x400
  - Formato: WebP con fallback JPEG
- Actualizar variable de entorno o DB con la nueva URL del avatar
- Hot-reload: todos los `<Image src={profileAvatar}>` del sitio usan la variable central

## Paso 2: Variable Central del Avatar

Crea `src/lib/config/site.ts`:

```typescript
export const siteConfig = {
  owner: {
    name: "Ángel Nereira",
    avatarUrl: process.env.NEXT_PUBLIC_OWNER_AVATAR_URL || "/default-avatar.jpg",
    linkedIn: "https://www.linkedin.com/in/angel-nereira-software-ingineer-and-devops/",
    github: "https://github.com/angelnereira",
    email: "contact@angelnereira.com"
  }
}
```

Todos los componentes que muestren la foto deben importar de aquí.

## Entregable: Artifacts

1. Screenshots del stepper en cada paso
2. Al menos 1 avatar generado de prueba (cualquier estilo)
3. Verificar que cambiar el avatar actualiza TODAS las instancias en el sitio
