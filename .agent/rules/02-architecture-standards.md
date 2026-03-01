# Architecture Standards

## Stack (do not introduce new dependencies without justification)

- Framework: Next.js 15 (App Router)
- UI: React 19 + TypeScript + Tailwind CSS
- State: Zustand (client), React Server Components (server)
- DB: PostgreSQL via Neon + Prisma ORM
- Auth: (verify existing implementation before touching)
- i18n: next-intl (preferred) or existing solution
- Deployment: Vercel
- Media: Cloudinary (WebP/AVIF optimization)
- Queue: BullMQ (already in use in Sago One)

## Code Organization (Feature-Based Architecture)

```
src/
  app/                    → Next.js App Router pages
    [locale]/             → i18n locale prefix (es|en)
    api/                  → API Routes
  features/               → Feature modules (self-contained)
    cv/                   → CV download feature
    avatar/               → Avatar generation feature
    blog/                 → Blog feature
    contact/              → Contact form feature
    projects/             → Portfolio projects
    admin/                → Admin panel
  components/             → Shared UI components
    ui/                   → Base design system components
  lib/                    → Utilities, helpers, server-only code
  hooks/                  → Custom React hooks
  types/                  → Global TypeScript types
  i18n/                   → Translation files and config
messages/
  es.json                 → Spanish translations
  en.json                 → English translations
```

## Naming Conventions

- Components: PascalCase (CVDownloadButton.tsx)
- Hooks: camelCase with "use" prefix (useCVDownload.ts)
- API routes: kebab-case (/api/cv/download)
- i18n keys: dot notation (cv.download.button.label)
- Constants: SCREAMING_SNAKE_CASE
- Zod schemas: camelCase + "Schema" suffix (cvDownloadSchema)

## Forbidden Patterns

- NO `any` types in TypeScript
- NO `console.log` in production code (use proper logging)
- NO business logic inside React components (extract to hooks/services)
- NO direct API calls from UI components (use service layer)
- NO duplicate validation logic (centralize in Zod schemas)
- NO inline styles (use Tailwind classes)
