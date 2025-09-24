# Stack Tecnológico y Arquitectura del Portafolio

Este documento detalla el conjunto de tecnologías, herramientas y patrones arquitectónicos utilizados en este proyecto. Sirve como una guía rápida para entender qué componentes se utilizan y por qué.

---

## 1. Core del Proyecto

Son las tecnologías fundamentales sobre las que se construye toda la aplicación.

-   **Next.js (App Router)**
    -   **Rol**: Framework principal para React.
    -   **Uso**: Se utiliza para el renderizado del lado del servidor (SSR), generación de sitios estáticos (SSG), y la estructura general de la aplicación basada en el App Router. Permite un rendimiento optimizado, excelente SEO y una experiencia de desarrollo moderna.

-   **TypeScript**
    -   **Rol**: Lenguaje de programación principal.
    -   **Uso**: Añade tipado estático a JavaScript, lo que garantiza un código más robusto, predecible y auto-documentado. Es crucial para la mantenibilidad a largo plazo y para reducir errores en tiempo de desarrollo.

-   **React**
    -   **Rol**: Librería para la construcción de interfaces de usuario.
    -   **Uso**: Es la base sobre la que funciona Next.js. Se utiliza para crear componentes de UI reutilizables y gestionar el estado de la interfaz de forma declarativa.

---

## 2. UI/UX (Interfaz y Experiencia de Usuario)

Herramientas enfocadas en la apariencia visual, la interacción y la experiencia del usuario.

-   **Tailwind CSS**
    -   **Rol**: Framework de CSS "utility-first".
    -   **Uso**: Permite construir diseños complejos y personalizados directamente en el HTML, agilizando el desarrollo de la interfaz sin salirse de un sistema de diseño coherente.

-   **ShadCN UI**
    -   **Rol**: Colección de componentes de UI reutilizables.
    -   **Uso**: Provee componentes base (Botones, Tarjetas, Formularios, etc.) construidos sobre Tailwind CSS y Radix UI. Son accesibles, personalizables y aceleran enormemente el desarrollo de interfaces complejas.

-   **Framer Motion**
    -   **Rol**: Librería de animaciones para React.
    -   **Uso**: Se utiliza para crear las animaciones de entrada en las diferentes secciones de la página (`AnimatedDiv`), aportando un toque dinámico y profesional a la experiencia de usuario.

-   **Lucide React**
    -   **Rol**: Librería de iconos.
    -   **Uso**: Proporciona un conjunto de iconos SVG limpios y consistentes que se utilizan en toda la aplicación para mejorar la comunicación visual.

---

## 3. Inteligencia Artificial

Componentes utilizados para las funcionalidades de IA, como la generación de CV y el análisis de compatibilidad.

-   **Google Genkit**
    -   **Rol**: Framework de código abierto para construir aplicaciones con IA.
    -   **Uso**: Orquesta las llamadas a los modelos de IA (Gemini). Define los "flujos" (`flows`) que estructuran la lógica de negocio de la IA, gestionando las entradas (con Zod) y las salidas esperadas del modelo.

-   **Zod**
    -   **Rol**: Librería de validación de esquemas para TypeScript.
    -   **Uso**: Se utiliza en los flujos de Genkit para definir y validar los esquemas de entrada (`inputSchema`) y salida (`outputSchema`). Esto garantiza que la comunicación con la IA sea segura y predecible.

---

## 4. Datos y Backend

Tecnologías encargadas de la persistencia de datos, la lógica del servidor y la autenticación.

-   **Firebase**
    -   **Rol**: Plataforma de desarrollo de aplicaciones de Google.
    -   **Uso**:
        -   **Firestore**: Base de datos NoSQL utilizada para guardar los envíos de los formularios de contacto.
        -   **Firebase Authentication**: (Previsto) Para gestionar el acceso al panel de administración (`/admin`).

-   **Vercel Postgres**
    -   **Rol**: Base de datos SQL gestionada por Vercel.
    -   **Uso**: Se utiliza en el middleware (`/welcome`) como fuente principal de datos que se cachean en Vercel Edge Config. Ideal para datos estructurados.

-   **Markdown (`gray-matter`, `remark`)**
    -   **Rol**: Sistema de gestión de contenido (CMS) basado en archivos.
    -   **Uso**: Los artículos del blog se escriben en archivos Markdown. `gray-matter` se usa para leer los metadatos (título, fecha) y `remark` para convertir el contenido a HTML y renderizarlo en la página.

---

## 5. Infraestructura y DevOps

Herramientas para el despliegue, la automatización y el rendimiento de la aplicación.

-   **Vercel**
    -   **Rol**: Plataforma de despliegue y hosting.
    -   **Uso**: Aloja la aplicación Next.js y la despliega automáticamente con cada `push` a la rama principal de GitHub. Gestiona el rendimiento global a través de su CDN.

-   **Vercel Edge Config**
    -   **Rol**: Almacén de clave-valor de baja latencia.
    -   **Uso**: Actúa como una capa de caché ultrarrápida para datos que no cambian con frecuencia. El middleware consulta primero Edge Config y, si no encuentra el dato, recurre a la base de datos principal.

-   **GitHub Actions**
    -   **Rol**: Plataforma de Integración Continua y Entrega Continua (CI/CD).
    -   **Uso**: (Previsto) Automatiza flujos de trabajo como la ejecución de pruebas antes de un despliegue o la sincronización de datos con Edge Config.
