import { CoverLetterForm } from './cover-letter-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileSignature } from 'lucide-react';
import { PageHeader } from '@/components/admin/page-header';

export default function CoverLetterPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Cover Letters"
        description="Generate professional cover letters tailored to specific job postings."
        icon={<FileSignature className="h-5 w-5" />}
      />
      <Card className="border-white/10 bg-black/40 backdrop-blur-xl">
        <CardHeader>
          <CardTitle>Create cover letter</CardTitle>
          <CardDescription>Fill in the details and let AI craft the perfect letter.</CardDescription>
        </CardHeader>
        <CardContent>
          <CoverLetterForm />
        </CardContent>
      </Card>
    </div>
  );
}
