"use client";

import { useFormStatus } from "react-dom";
import { useEffect, useActionState, startTransition } from "react";
import { onAnalyze, FormState } from "./actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const initialState: FormState = {
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Analyzing..." : "Analyze Compatibility"}
    </Button>
  );
}

export function AnalysisForm() {
  const [state, formAction] = useActionState(onAnalyze, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message && !state.data) {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.message + (state.issues ? `: ${state.issues.join(", ")}` : ''),
      });
    }
  }, [state, toast]);
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Job Compatibility Analysis</CardTitle>
          <CardDescription>
            Paste a job description and your profile/resume to get an AI-powered compatibility analysis.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="jobDescription">Job Description</Label>
              <Textarea
                id="jobDescription"
                name="jobDescription"
                placeholder="Paste the full job description here."
                className="min-h-[200px]"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="userProfile">Your Profile / Resume</Label>
              <Textarea
                id="userProfile"
                name="userProfile"
                placeholder="Paste your resume or a summary of your skills and experience."
                className="min-h-[200px]"
                required
              />
            </div>
            <SubmitButton />
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Analysis Result</CardTitle>
          <CardDescription>The compatibility score and suggestions will appear here.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {state.data ? (
            <div className="space-y-6">
              <div>
                <Label>Compatibility Score</Label>
                <div className="flex items-center gap-4 mt-2">
                  <Progress value={state.data.compatibilityScore * 100} className="w-[60%]" />
                  <span className="text-lg font-bold text-primary">{(state.data.compatibilityScore * 100).toFixed(0)}%</span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Detailed Analysis</h3>
                <div className="prose prose-sm dark:prose-invert max-w-none p-4 bg-secondary rounded-md">
                   <p>{state.data.analysis}</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Improvement Suggestions</h3>
                 <div className="prose prose-sm dark:prose-invert max-w-none p-4 bg-secondary rounded-md">
                   <p>{state.data.suggestions}</p>
                </div>
              </div>
            </div>
          ) : (
             <Alert>
              <Terminal className="h-4 w-4" />
              <AlertTitle>Waiting for input</AlertTitle>
              <AlertDescription>
                Your analysis results will be displayed here once you submit the form.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}