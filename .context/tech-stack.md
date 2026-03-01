# Tech Stack

## Architecture Standards

### Stack

- **Framework**: Next.js 15 (App Router)
- **UI**: React 19 + TypeScript + Tailwind CSS
- **State**: Zustand (client), React Server Components (server)
- **DB**: PostgreSQL via Neon + Prisma ORM
- **Auth**: Existing implementation
- **i18n**: next-intl
- **Deployment**: Vercel
- **Media**: Cloudinary (WebP/AVIF optimization)
- **Queue**: BullMQ

### Naming Conventions

- Components: PascalCase
- Hooks: camelCase with "use" prefix
- API routes: kebab-case
- Zod schemas: camelCase + "Schema" suffix
