import { CoverLetterForm } from './cover-letter-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FileText } from 'lucide-react';

export default function CoverLetterPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <FileText className="w-8 h-8 text-primary" />
          AI Cover Letter Generator
        </h1>
        <p className="text-muted-foreground mt-1">Generate professional cover letters tailored to specific job postings using AI.</p>
      </div>
      <Card className="border-white/10 bg-black/40 backdrop-blur-xl">
        <CardHeader>
          <CardTitle>Create Cover Letter</CardTitle>
          <CardDescription>Fill in the details below and let AI craft the perfect cover letter.</CardDescription>
        </CardHeader>
        <CardContent>
          <CoverLetterForm />
        </CardContent>
      </Card>
    </div>
  );
}
