# i18n Enforcement Rules (ALWAYS ACTIVE)

## Critical Rule

ZERO hardcoded user-visible strings are allowed anywhere in the codebase.
This applies to: page content, button labels, error messages, success messages,
alt text, aria-labels, placeholder text, meta titles, meta descriptions,
og:description, and any other text the user might see.

## i18n System

- Library: next-intl
- Languages: Spanish (es) + English (en)
- Default locale: auto-detected from browser Accept-Language header
- Fallback: Spanish (es)
- URL structure: /es/... and /en/...
- Persistence: cookie (not localStorage — SSR compatibility required)

## Key Structure Convention

Use dot notation with 3 levels maximum:

- section.component.element
- Examples:
  - nav.links.about → "Sobre mí" / "About"
  - hero.cta.download_cv → "Descargar CV" / "Download CV"
  - admin.projects.form.title → "Título del proyecto" / "Project title"
  - errors.network.timeout → "Tiempo de espera agotado" / "Request timeout"

## Verification Requirement

Before marking any task as complete, perform a grep search for hardcoded strings:

```bash
grep -r "\"[A-Z]" src/ --include="*.tsx" --include="*.ts" | grep -v "//.*" | grep -v ".test."
grep -r ">[A-Z][a-z]" src/ --include="*.tsx" | grep -v "//"
```

If either command returns results, the task is NOT complete.

## ES/EN Content Source of Truth

- Spanish content: based on Angel_Nereira_CV_ATS.pdf
- English content: based on Angel_Nereira_CV_ATS_EN.pdf
- Translations must sound natural, not literal word-for-word
- Technical terms (Next.js, PostgreSQL, etc.) are NOT translated
