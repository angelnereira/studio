# Project Foundation Rules

## Owner

- Name: Ángel Nereira
- Role: Senior Full Stack Engineer & SaaS Architect
- Site: angelnereira.com
- GitHub: <https://github.com/angelnereira>
- LinkedIn: <https://www.linkedin.com/in/angel-nereira-software-ingineer-and-devops/>

## Philosophy

This portfolio exists to prove that real, measurable projects speak louder than formal degrees.
Every feature and UI decision must reinforce this narrative. The owner is a self-taught professional
with 5+ years of experience building production SaaS systems.

## Non-Negotiable Rules

1. NEVER overwrite files without creating a backup first (append .bak extension).
2. NEVER delete functionality without replacing it with something superior.
3. NEVER push changes directly — use draft/preview mode when available.
4. ALL new text must go through the i18n system (es.json + en.json). Zero hardcoded strings.
5. ALL new UI components must have loading, error, and success states defined.
6. ALWAYS run TypeScript check (npx tsc --noEmit) after any code change.
7. ALWAYS document the reason for each architectural decision in DECISIONS.md.
8. When in doubt, choose the simplest solution that solves the problem completely.
