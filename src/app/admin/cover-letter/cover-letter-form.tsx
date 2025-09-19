"use client";

import { useFormState, useFormStatus } from "react-dom";
import { useEffect, useState } from "react";
import { onGenerate, FormState } from "./actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Clipboard, ClipboardCheck, FileText, Terminal } from "lucide-react";

const initialState: FormState = {
  message: "",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} className="w-full">
      {pending ? "Generating..." : "Generate Cover Letter"}
    </Button>
  );
}

export function CoverLetterForm() {
  const [state, formAction] = useFormState(onGenerate, initialState);
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (state.message && !state.data) {
      toast({
        variant: "destructive",
        title: "Error",
        description: state.message + (state.issues ? `: ${state.issues.join(", ")}` : ''),
      });
    }
  }, [state, toast]);
  
  const handleCopy = () => {
    if (state.data?.coverLetter) {
      navigator.clipboard.writeText(state.data.coverLetter);
      setCopied(true);
      toast({ title: "Copied to clipboard!" });
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>AI Cover Letter Generator</CardTitle>
          <CardDescription>
            Provide a job description and your profile to generate a tailored cover letter.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
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
        <CardHeader className="flex flex-row items-start justify-between">
          <div>
            <CardTitle>Generated Cover Letter</CardTitle>
            <CardDescription>Review and copy the generated letter.</CardDescription>
          </div>
          {state.data && (
            <Button variant="ghost" size="icon" onClick={handleCopy}>
              {copied ? <ClipboardCheck className="h-4 w-4" /> : <Clipboard className="h-4 w-4" />}
              <span className="sr-only">Copy</span>
            </Button>
          )}
        </CardHeader>
        <CardContent className="space-y-4">
          {state.data ? (
             <div className="prose prose-sm dark:prose-invert max-w-none p-4 bg-secondary rounded-md h-[450px] overflow-y-auto">
               <p style={{ whiteSpace: 'pre-wrap' }}>{state.data.coverLetter}</p>
             </div>
          ) : (
             <Alert>
              <FileText className="h-4 w-4" />
              <AlertTitle>Waiting for input</AlertTitle>
              <AlertDescription>
                Your personalized cover letter will appear here once generated.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
