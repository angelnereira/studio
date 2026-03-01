const fs = require('fs');
const files = [
  'src/components/home-page-client.tsx',
  'src/components/site-footer.tsx',
  'src/components/home-sections.tsx',
  'src/components/site-header.tsx',
  'src/app/[locale]/services/page.tsx',
  'src/app/[locale]/proyectos/page.tsx',
];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/import \{ useLanguage \} from ["']@\/lib\/language-context["'];/g, 'import { useTranslations } from "next-intl";');
  content = content.replace(/const \{\s*t\s*\} = useLanguage\(\);/g, 'const t = useTranslations();');
  fs.writeFileSync(file, content);
  console.log('Updated ' + file);
});

// Update CVDownloadButton separately
let cvFile = 'src/features/cv/components/CVDownloadButton.tsx';
let cvContent = fs.readFileSync(cvFile, 'utf8');
cvContent = cvContent.replace(/import \{ useLanguage \} from ["']@\/lib\/language-context["'];/g, 'import { useTranslations, useLocale } from "next-intl";');
cvContent = cvContent.replace(/const \{\s*language,\s*t\s*\} = useLanguage\(\);/g, 'const t = useTranslations();\n    const language = useLocale();');
fs.writeFileSync(cvFile, cvContent);
console.log('Updated ' + cvFile);
