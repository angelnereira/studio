# Portfolio Profesional - Ángel Nereira

<div align="center">

**Ingeniero de Software** especializado en crear soluciones empresariales escalables para FinTech y GovTech

### 🌐 [angelnereira.com](https://angelnereira.com)

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)](https://www.prisma.io/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?logo=supabase)](https://supabase.com/)

</div>

---

## 🎯 Sobre Mí

No solo programo, **diseño soluciones completas**. Con experiencia en sistemas SaaS multi-tenant, integraciones gubernamentales (DGI Panamá) y arquitecturas cloud enterprise (Oracle Cloud Infrastructure), creo software que genera valor de negocio real.

### Filosofía
>
> "Solucionar problemas para disfrutar la vida"

### Proyectos Destacados

- **SAGO-FACTU**: Sistema SaaS de facturación electrónica multi-tenant con integración DGI Panamá
- **UETA Travel Access**: Sistema empresarial en Oracle Cloud Infrastructure con Oracle Database
- **Este Portfolio**: Arquitectura escalable con Next.js 16, Prisma y AI Agents (Genkit)

---

## 🚀 Sobre este Proyecto

Este portfolio es más que un sitio web estático. Es una **aplicación empresarial completa** que demuestra:

- **Arquitectura Moderna**: Next.js 16 (App Router) + TypeScript + Prisma ORM + PostgreSQL
- **Gestión de Datos**: Integración robusta con Supabase (PostgreSQL) y Prisma
- **Soluciones IA**: Integración con Google Genkit y Gemini para features inteligentes
- **Escalabilidad**: Diseñado con las mejores prácticas de software enterprise
- **Responsive Design**: Optimizado para móviles y desktop con Tailwind CSS

---

## 🛠️ Stack Tecnológico

Este proyecto utiliza un conjunto de tecnologías modernas y robustas, seleccionadas para optimizar el rendimiento, la escalabilidad y la experiencia de desarrollo.

### Core

* **Framework**: **Next.js 16** (App Router) - Framework React con SSR, SSG y Server Components
- **Lenguaje**: **TypeScript 5.0** - Type-safety completo en todo el proyecto
- **ORM**: **Prisma** - Cliente de base de datos type-safe con schema-first approach
- **Base de Datos**: **PostgreSQL** (Hosted on Supabase)
- **Auth**: **Auth.js (NextAuth) v5** - Autenticación segura y flexible

### Frontend & UI

* **Estilos**: **Tailwind CSS v4** - CSS moderno y performante
- **Componentes**: **ShadCN UI** - Componentes accesibles y personalizables
- **Animaciones**: **Framer Motion** - Transiciones y animaciones fluidas
- **Visualización de Datos**: **Recharts** - Gráficos interactivos para dashboards

### Backend & Integrations

* **Server Actions**: Next.js 15+ Server Actions para lógica server-side
- **Validación**: **Zod** - Schema validation para formularios y datos
- **Emails**: **Resend** - API moderna para envío transaccional de emails
- **PDF Generation**: **jsPDF** - Generación de documentos PDF client-side

### AI & Machine Learning

* **Google Genkit** - Framework para flujos de IA con type-safe prompts
- **Gemini AI** - Modelo de lenguaje de Google para generación de contenido

### DevOps & Deployment

* **Hosting**: **Vercel** - Despliegue continuo con edge functions
- **CI/CD**: **GitHub Actions** - Automatización de testing y deployment
- **Monitoreo**: Vercel Analytics & Web Vitals

---

## ✨ Características Destacadas

### 💰 **Calculadora de Presupuestos** (Nuevo)

Sistema interactivo de cotización de proyectos de software con:
- **Wizard Multi-Paso**: 5 pasos para configurar servicio, complejidad, timeline, complementos y ver resultados
- **Cálculo Inteligente**: Precios basados en múltiples factores (complejidad, país, urgencia, tipo de cliente)
- **Recomendaciones Personalizadas**: Sistema de sugerencias según el tipo de proyecto y presupuesto
- **Exportación PDF**: Genera presupuestos profesionales en PDF descargables
- **Envío por Email**: Envía presupuestos formateados directamente al email del cliente
- **Persistencia Local**: Guarda cálculos en localStorage para recuperación posterior

### 🤖 **Herramientas con IA**

* **Generador de CV con IA**: Genera CVs profesionales en Markdown usando Genkit y Gemini
- **Panel de Administración Privado** (`/admin`):
  - **Analizador de Compatibilidad Laboral**: Análisis de match entre perfil y ofertas de trabajo
  - **Generador de Cartas de Presentación**: Cartas personalizadas basadas en ofertas específicas

### 📝 **Blog Técnico Interactivo**

* **Contenido en Markdown**: Artículos técnicos optimizados para SEO con `generateStaticParams`
- **Análisis de Datos Musicales**: Dashboard interactivo con visualizaciones de Recharts
- **Comparación Interactiva de Artistas**: Herramienta de comparación con gráficos de barras y radar
- **Responsive Tables**: Tablas adaptativas para móviles con scroll horizontal

### 📬 **Sistema de Contacto Avanzado**

* **Formularios Multi-Tipo**: 4 tipos de formularios (cliente, empleador, colaborador, invitación)
- **Validación Completa**: Zod + Prisma para type-safety en validación
- **Persistencia en PostgreSQL**: Almacenamiento directo con Prisma ORM
- **Email Automático**: Envío formateado a través de Resend API
- **Server Actions**: Procesamiento server-side con Next.js 15

### 🎨 **Experiencia de Usuario**

* **Diseño Responsive**: Optimizado para todo tipo de dispositivos
- **Animaciones Fluidas**: Transiciones suaves con Framer Motion
- **Dark Mode**: Tema claro y oscuro con persistencia
- **Carrusel de Habilidades**: Visualización interactiva de competencias técnicas

---

## 📄 Documentación Técnica

### Estructura del Proyecto

El proyecto sigue la estructura estándar del App Router de Next.js.

```
/src
├── /ai
│   ├── /flows       # Lógica de negocio de IA con Genkit (generar CV, etc.)
│   └── genkit.ts    # Configuración central de Genkit
├── /app
│   ├── /admin       # Rutas y lógica del panel de administración
│   ├── /api         # (Opcional) API Routes de Next.js
│   ├── /(main)      # Rutas principales del sitio (Home, Servicios, etc.)
│   └── layout.tsx   # Layout principal de la aplicación
├── /components
│   ├── /ui          # Componentes de UI de ShadCN (Button, Card, etc.)
│   └── (custom)     # Componentes personalizados (SiteHeader, SpotlightCard, etc.)
├── /content
│   └── /blog        # Archivos Markdown para los artículos del blog
├── /hooks           # Hooks personalizados (ej. use-toast)
└── /lib             # Utilidades, datos estáticos (habilidades, servicios) y lógica compartida
```

### Flujos de IA con Google Genkit

La inteligencia artificial es un pilar de este proyecto. Se utiliza **Google Genkit** para orquestar las llamadas a los modelos de lenguaje de Gemini.

- **Ubicación**: Todos los flujos se encuentran en `src/ai/flows`.
- **Funcionamiento**: Cada flujo define un `inputSchema` (los datos que recibe) y un `outputSchema` (el formato de respuesta esperado) usando Zod. Esto garantiza que la IA devuelva una respuesta estructurada y predecible.
- **Ejemplo (`generate-cv.ts`)**:
    1. Recibe el perfil del usuario (habilidades, proyectos, etc.) como un objeto.
    2. Utiliza una plantilla de prompt (Handlebars) para estructurar la petición al modelo de IA.
    3. Pide al modelo que genere el contenido del CV en formato Markdown.
    4. El flujo retorna el contenido del CV, que luego se muestra en la interfaz de usuario.

### Instalación y Uso Local

Para clonar y ejecutar este proyecto en tu máquina local, sigue estos pasos:

1. **Clonar el repositorio:**

    ```bash
    git clone https://github.com/angelnereira/tu-repositorio.git
    cd tu-repositorio
    ```

2. **Instalar dependencias:**

    ```bash
    npm install
    ```

3. **Configurar variables de entorno:**
    Copia el archivo `.env.example` a `.env.local` y configura las variables necesarias:

    ```bash
    cp .env.example .env.local
    ```

    Edita `.env.local` con tus credenciales:

    ```env
    # Base de Datos (PostgreSQL - Supabase recomendado)
    DATABASE_URL="postgresql://usuario:contraseña@host:5432/database?schema=public"

    # Supabase (para futuras funcionalidades de auth)
    NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
    NEXT_PUBLIC_SUPABASE_ANON_KEY=tu-anon-key

    # Google AI (Genkit)
    GEMINI_API_KEY=tu-api-key

    # Resend (para envío de emails desde formularios de contacto)
    # Obtén tu API Key en https://resend.com/api-keys
    RESEND_API_KEY=re_tu_api_key_aqui
    ```

4. **Configurar la base de datos:**

    ```bash
    # Generar el cliente de Prisma
    npx prisma generate

    # Ejecutar las migraciones (crea las tablas en la BD)
    npx prisma migrate dev --name init
    ```

5. **Ejecutar el proyecto en modo desarrollo:**

    ```bash
    npm run dev
    ```

    La aplicación estará disponible en `http://localhost:3000`.

6. **Ejecutar el servidor de Genkit (para los flujos de IA):**
    En una terminal separada, ejecuta:

    ```bash
    npm run genkit:dev
    ```

    Esto iniciará el servidor de desarrollo de Genkit, necesario para que las funcionalidades de IA funcionen localmente.

7. **Explorar la base de datos (opcional):**

    ```bash
    npx prisma studio
    ```

    Esto abrirá Prisma Studio en `http://localhost:5555` para visualizar y editar tus datos.
\n<- Restored original attachment handling in Trigger redeploy: Tue Mar  3 12:22:34 EST 2026 -->
