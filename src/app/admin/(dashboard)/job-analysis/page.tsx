import { AnalysisForm } from './analysis-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { PageHeader } from '@/components/admin/page-header';

export default function JobAnalysisPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="AI Job Analyzer"
        description="Analyze your profile against job postings to identify strengths and gaps."
        icon={<Search className="h-5 w-5" />}
      />
      <Card className="border-white/10 bg-black/40 backdrop-blur-xl">
        <CardHeader>
          <CardTitle>Analyze compatibility</CardTitle>
          <CardDescription>Paste a job description and let AI evaluate your fit.</CardDescription>
        </CardHeader>
        <CardContent>
          <AnalysisForm />
        </CardContent>
      </Card>
    </div>
  );
}
