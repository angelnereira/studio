# Portfolio Profesional & Ecosystem - Ángel Nereira

**Ingeniero de Software** especializado en soluciones enterprise escalables para FinTech y GovTech.

## 🌐 [angelnereira.com](https://angelnereira.com)

[![Next.js 15+](https://img.shields.io/badge/Next.js-15+-black?logo=next.js)](https://nextjs.org/)
[![TypeScript 5](https://img.shields.io/badge/TypeScript-5.0+-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Prisma 6](https://img.shields.io/badge/Prisma-6+-2D3748?logo=prisma)](https://www.prisma.io/)
[![Google Genkit](https://img.shields.io/badge/Google-Genkit-4285F4?logo=google)](https://firebase.google.com/docs/genkit)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase)](https://supabase.com/)

---

> “Solucionar problemas para disfrutar la vida”

---

## 🚀 Visión General del Proyecto

Este no es solo un portfolio personal; es una **plataforma empresarial de demostración tecnológica** diseñada para demostrar la viabilidad de arquitecturas modernas en entornos de alto rendimiento. Integra flujos de trabajo asistidos por IA, persistencia robusta y una experiencia de usuario premium optimizada para la conversión.

### Diferenciadores Clave

- **AI-Driven Architecture**: Integración nativa con Google Genkit para procesamiento de lenguaje natural.
- **Enterprise Ready**: Estructura multi-tenant lista y flujos de validación de nivel bancario.
- **Edge-First Performance**: Uso extensivo de caché en el edge y optimizaciones de Lighthouse (95+ en todos los rubros).
- **Internationalization (i18n)**: Sistema global de localización dinámico.

---

## 🏗️ Geometría de Arquitectura

El sistema sigue un patrón de **Arquitectura en Capas Moderna**, optimizada para el despliegue en la nube (Vercel/GCP).

### 1. Capa de Presentación (Frontend)

- **Framework**: Next.js 15 con App Router (React 19 Server Components).
- **UI Engine**: Tailwind CSS 4 + ShadCN UI para una interfaz declarativa y modular.
- **Motion**: Framer Motion para micro-interacciones y transiciones de estado fluidas.
- **i18n**: Sistema de rutas dinámicas `/[locale]` con traducción de diccionarios JSON.

### 2. Capa de Lógica & AI (Business Logic)

- **Server Actions**: Procesamiento de formularios y mutaciones de datos sin APIs REST tradicionales.
- **AI Orchestration**: **Google Genkit** actúa como el orquestador de modelos de lenguaje (Gemini).
  - **Type-Safe Prompts**: Uso de Zod para garantizar que la IA devuelva estructuras de datos válidas.
  - **Handlebars Templating**: Plantillas de prompts dinámicas para personalización extrema.
- **Middleware**: Control de acceso, geolocalización y optimización de rutas en tiempo real.

### 3. Capa de Datos & Integración (Data Layer)

- **Persistencia**: PostgreSQL (vía Supabase) gestionado a través de **Prisma ORM 6**.
- **Edge Caching**: Vercel Edge Config para configuraciones de baja latencia.
- **Integraciones Externas**:
  - **Resend**: Gestión de comunicaciones transaccionales (SMTP alternativo).
  - **jsPDF**: Motor de generación de documentos dinámicos en el cliente.
  - **GitHub APIs**: Para métricas de repositorios en tiempo real.

---

## 🔄 Flujos de Trabajo (Workflows)

### 🧩 Flujo de Desarrollo Asistido por IA

1. **Definición de Esquema**: Se utiliza Zod para definir los contratos de entrada/salida.
2. **Refinamiento de Prompt**: Diseño de instrucciones en `src/ai/flows` usando Genkit.
3. **Validación Local**: Ejecución de `npm run genkit:dev` para probar los flujos en el Genkit Developer Toolkit.
4. **Integración**: Consumo del flujo desde un Server Action.

### 📬 Flujo de Captura de Leads (Contact)

- **Validación Multi-Nivel**: Zod en el cliente -> Zod en el servidor -> Restricciones de BD (Prisma).
- **Clasificación**: Motor interno que categoriza el lead (Cliente, Empleador, Colaborador).
- **Notificación**: Disparo de evento a Resend para notificación instantánea y confirmación al usuario.

### 🚢 Flujo de Despliegue (CI/CD)

- **Automated Checks**: Lints y tests antes de merge.
- **Vercel Pipeline**: Despliegue automático de ramas de feature en entornos de preview.
- **Edge Sync**: Sincronización automática de variables de configuración con el Edge.

---

## 🛠️ Stack Tecnológico Detallado

| Tecnología | Versión | Propósito |
| :--- | :--- | :--- |
| **Next.js** | 15.1.x | Core Framework & Routing |
| **React** | 19.x | UI Library (RC compatible) |
| **TypeScript** | 5.x | Type Safety Integral |
| **Tailwind CSS** | 4.x | Design System & Styling |
| **Prisma** | 6.x | ORM & DB Management |
| **Google Genkit** | Latest | AI Framework |
| **Zod** | 3.x | Schema Validation |
| **Auth.js** | v5 (Beta) | Authentication |
| **Framer Motion** | 11.x | Animations |
| **Resend** | SDK | Email Delivery |

---

## ✨ Implementaciones Destacadas

### 💰 Calculadora de Presupuestos Inteligente

Un wizard interactivo de 5 pasos que procesa variables complejas (complejidad, timeline, geolocalización) para generar una cotización profesional.

- **Features**: Exportación a PDF (jsPDF), envío directo al email y persistencia local.

### 🤖 Generador de Documentos con IA

Capacidad de generar CVs personalizados y cartas de presentación en formato Markdown/PDF analizando el perfil del usuario mediante Gemini 1.5 Pro.

### 📊 Panel de Administración Avanzado

Ubicado en `/admin`, permite la gestión total de la plataforma, análisis de métricas de contacto y monitoreo de integraciones de IA.

---

## 📂 Estructura del Sistema

```text
/
├── prisma/               # Esquema de base de datos y migraciones
├── src/
│   ├── ai/               # Orquestación de IA (Genkit Flows & Config)
│   ├── app/              # Rutas (App Router), incluye el sistema de locales [locale]
│   ├── components/       # Componentes atómicos y de negocio
│   ├── hooks/            # Lógica de estado reutilizable
│   ├── i18n/             # Configuración de internacionalización y diccionarios
│   ├── lib/              # Utilidades, constantes y lógica de BD (Prisma client)
│   └── types/            # Definiciones de tipos globales
├── public/               # Assets estáticos
└── docs/                 # Documentación técnica extendida (Análisis, Tech Stack)
```

---

## 🛠️ Configuración Local

1. **Requisitos**: Node.js 20+, PostgreSQL (Docker o Supabase).
2. **Instalación**: `npm install`.
3. **Variables**: Configura `.env.local` usando `.env.example`.
4. **Base de Datos**: `npx prisma migrate dev`.
5. **Genkit**: `npm run genkit:dev` (en terminal aparte).
6. **Ejecución**: `npm run dev`.

---

> Desarrollado con ❤️ por Ángel Nereira
