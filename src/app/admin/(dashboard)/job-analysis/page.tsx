import { AnalysisForm } from './analysis-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3 } from 'lucide-react';

export default function JobAnalysisPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight flex items-center gap-3">
          <BarChart3 className="w-8 h-8 text-primary" />
          AI Job Compatibility Analyzer
        </h1>
        <p className="text-muted-foreground mt-1">Analyze your profile against job postings to identify strengths and gaps.</p>
      </div>
      <Card className="border-white/10 bg-black/40 backdrop-blur-xl">
        <CardHeader>
          <CardTitle>Analyze Compatibility</CardTitle>
          <CardDescription>Paste a job description and let AI evaluate your fit.</CardDescription>
        </CardHeader>
        <CardContent>
          <AnalysisForm />
        </CardContent>
      </Card>
    </div>
  );
}
