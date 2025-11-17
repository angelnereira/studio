
# Portfolio Profesional - Ángel Nereira | Ingeniero de Software

![Header](https://picsum.photos/seed/readme-header/1200/300)

**Ingeniero de Software** especializado en crear soluciones empresariales escalables para FinTech y GovTech. Este repositorio contiene el código fuente de mi portfolio profesional, diseñado para demostrar mi experiencia en arquitectura de software, desarrollo de soluciones complejas y uso de tecnologías modernas.

**[Ver el sitio en vivo](https://angelnereira.com)**

---

## 🎯 Sobre Mí

No solo programo, **diseño soluciones completas**. Con experiencia en sistemas SaaS multi-tenant, integraciones gubernamentales (DGI Panamá) y arquitecturas cloud enterprise (Oracle Cloud Infrastructure), creo software que genera valor de negocio real.

### Filosofía
> "Solucionar problemas para disfrutar la vida"

### Proyectos Destacados
- **SAGO-FACTU**: Sistema SaaS de facturación electrónica multi-tenant con integración DGI Panamá
- **UETA Travel Access**: Sistema empresarial en Oracle Cloud Infrastructure con Oracle Database
- **Este Portfolio**: Migración exitosa Firebase → Prisma ORM (type-safety completo)

---

## 🚀 Sobre este Proyecto

Este portfolio es más que un sitio web estático. Es una **aplicación empresarial completa** que demuestra:

*   **Arquitectura Moderna**: Next.js 15 + TypeScript + Prisma ORM + PostgreSQL
*   **Type-Safety Completo**: Migración exitosa de Firebase a Prisma para mejor DX
*   **Soluciones IA**: Integración con Google Genkit y Gemini para features inteligentes
*   **Escalabilidad**: Diseñado con las mejores prácticas de software enterprise
*   **Responsive Design**: Optimizado para móviles y desktop con Tailwind CSS

---

## 🛠️ Stack Tecnológico

Este proyecto utiliza un conjunto de tecnologías modernas y robustas, seleccionadas para optimizar el rendimiento, la escalabilidad y la experiencia de desarrollo.

*   **Framework Frontend**: **Next.js 15** (App Router)
*   **Lenguaje**: **TypeScript**
*   **Estilos**: **Tailwind CSS** con **ShadCN UI** para componentes.
*   **Inteligencia Artificial**: **Google Genkit** para flujos de IA y conexión con modelos de Gemini.
*   **ORM**: **Prisma** - Type-safe database client con soporte completo para TypeScript.
*   **Base de Datos**: **PostgreSQL** (Supabase) - Base de datos relacional escalable y moderna.
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
*   **Formularios de Contacto Inteligentes**: Múltiples formularios (cliente, empleador, colaborador, invitación) que guardan la información directamente en PostgreSQL a través de Server Actions con validación de tipo completa usando Prisma y Zod.
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
    ```

4.  **Configurar la base de datos:**
    ```bash
    # Generar el cliente de Prisma
    npx prisma generate

    # Ejecutar las migraciones (crea las tablas en la BD)
    npx prisma migrate dev --name init
    ```

5.  **Ejecutar el proyecto en modo desarrollo:**
    ```bash
    npm run dev
    ```
    La aplicación estará disponible en `http://localhost:3000`.

6.  **Ejecutar el servidor de Genkit (para los flujos de IA):**
    En una terminal separada, ejecuta:
    ```bash
    npm run genkit:dev
    ```
    Esto iniciará el servidor de desarrollo de Genkit, necesario para que las funcionalidades de IA funcionen localmente.

7.  **Explorar la base de datos (opcional):**
    ```bash
    npx prisma studio
    ```
    Esto abrirá Prisma Studio en `http://localhost:5555` para visualizar y editar tus datos.

