
# Portafolio Profesional de Ángel Nereira - Ingeniero de Software

![Header](https://picsum.photos/seed/readme-header/1200/300)

Este repositorio contiene el código fuente de mi portafolio personal, una aplicación web moderna y dinámica diseñada no solo para mostrar mi trabajo, sino para demostrar mis habilidades en desarrollo full-stack, arquitectura en la nube e inteligencia artificial.

**[Ver el sitio en vivo](https://angelnereira.com)**

---

## 🚀 Sobre el Proyecto

Este no es un portafolio estático. Es una aplicación web full-stack que funciona como una carta de presentación interactiva y un centro de operaciones para mi marca personal. La plataforma está diseñada para ser:

*   **Dinámica**: El contenido, como los proyectos y los posts del blog, se gestiona a través de archivos Markdown, permitiendo actualizaciones fáciles sin tocar el código.
*   **Inteligente**: Integra funcionalidades de IA con **Google Genkit** para ofrecer herramientas útiles como un generador de CV personalizado y análisis de compatibilidad laboral.
*   **Escalable**: Construido sobre una arquitectura moderna con **Next.js** y desplegado en **Vercel**, garantizando un rendimiento global y una experiencia de usuario fluida.
*   **Autogestionable**: A través de un panel de administración, puedo generar contenido y analizar datos, convirtiendo mi portafolio en una herramienta de negocio.

---

## 🛠️ Stack Tecnológico

Este proyecto utiliza un conjunto de tecnologías modernas y robustas, seleccionadas para optimizar el rendimiento, la escalabilidad y la experiencia de desarrollo.

*   **Framework Frontend**: **Next.js 14+** (App Router)
*   **Lenguaje**: **TypeScript**
*   **Estilos**: **Tailwind CSS** con **ShadCN UI** para componentes.
*   **Inteligencia Artificial**: **Google Genkit** para flujos de IA y conexión con modelos de Gemini.
*   **Backend & Base de Datos**: **Firebase** (Firestore para la base de datos de contactos, Firebase Auth para autenticación).
*   **Despliegue (Hosting)**: **Vercel**
*   **Control de Versiones**: **Git** y **GitHub** (con GitHub Actions para CI/CD).

---

## ✨ Características Destacadas

*   **Generador de CV con IA**: Una herramienta que utiliza Genkit para generar un CV profesional en formato Markdown basado en mi perfil, proyectos y habilidades actualizadas.
*   **Panel de Administración Privado**: Una sección protegida (`/admin`) que incluye herramientas como:
    *   **Analizador de Compatibilidad Laboral**: Sube una descripción de trabajo y mi perfil para obtener un análisis de compatibilidad con IA.
    *   **Generador de Cartas de Presentación**: Crea cartas de presentación personalizadas basadas en una oferta de trabajo.
*   **Contenido Dinámico**: Los artículos del blog se escriben en Markdown y se renderizan dinámicamente, optimizados para SEO con `generateStaticParams`.
*   **Carrusel de Habilidades Interactivo**: Una visualización animada y atractiva de mis competencias técnicas.
*   **Formularios de Contacto Inteligentes**: Múltiples formularios (cliente, empleador, etc.) que guardan la información directamente en una base de datos de Firestore a través de Server Actions.
*   **Diseño Responsivo y Adaptativo**: Interfaz de usuario pulida que funciona perfectamente en cualquier dispositivo.

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

*   **Ubicación**: Todos los flujos se encuentran en `src/ai/flows`.
*   **Funcionamiento**: Cada flujo define un `inputSchema` (los datos que recibe) y un `outputSchema` (el formato de respuesta esperado) usando Zod. Esto garantiza que la IA devuelva una respuesta estructurada y predecible.
*   **Ejemplo (`generate-cv.ts`)**:
    1.  Recibe el perfil del usuario (habilidades, proyectos, etc.) como un objeto.
    2.  Utiliza una plantilla de prompt (Handlebars) para estructurar la petición al modelo de IA.
    3.  Pide al modelo que genere el contenido del CV en formato Markdown.
    4.  El flujo retorna el contenido del CV, que luego se muestra en la interfaz de usuario.

### Instalación y Uso Local

Para clonar y ejecutar este proyecto en tu máquina local, sigue estos pasos:

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/angelnereira/tu-repositorio.git
    cd tu-repositorio
    ```

2.  **Instalar dependencias:**
    ```bash
    npm install
    ```

3.  **Configurar variables de entorno:**
    Crea un archivo `.env.local` en la raíz del proyecto y añade las claves de API necesarias, especialmente las de Firebase y Google AI Studio.
    ```env
    # Firebase
    NEXT_PUBLIC_FIREBASE_API_KEY=...
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=...
    # ... otras variables de Firebase

    # Google AI (Genkit)
    GEMINI_API_KEY=...
    ```

4.  **Ejecutar el proyecto en modo desarrollo:**
    ```bash
    npm run dev
    ```
    La aplicación estará disponible en `http://localhost:3000`.

5.  **Ejecutar el servidor de Genkit (para los flujos de IA):**
    En una terminal separada, ejecuta:
    ```bash
    npm run genkit:dev
    ```
    Esto iniciará el servidor de desarrollo de Genkit, necesario para que las funcionalidades de IA funcionen localmente.

