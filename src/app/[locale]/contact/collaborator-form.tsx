"use client";

import { useFormStatus } from "react-dom";
import { useEffect, useActionState, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { onContactSubmit, FormState } from "./actions";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";

const initialState: FormState = {
  message: "",
  status: "idle",
};

function SubmitButton({ submitText, submittingText }: { submitText: string; submittingText: string }) {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" className="w-full" disabled={pending}>
      {pending ? submittingText : submitText}
    </Button>
  );
}

export function CollaboratorForm() {
  const t = useTranslations("contact.form");
  const { toast } = useToast();
  const [state, formAction] = useActionState(onContactSubmit, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === 'success' && state.formType === 'collaborator') {
      toast({
        title: t("collaborator.success_title"),
        description: t("collaborator.success_description"),
      });
      formRef.current?.reset();
    } else if (state.status === 'error' && state.formType === 'collaborator' && state.message && !state.issues) {
       toast({
        variant: "destructive",
        title: t("shared.error_title"),
        description: state.message,
      });
    }
  }, [state, toast, t]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="space-y-6"
    >
      <input type="hidden" name="formType" value="collaborator" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">{t("collaborator.name_label")}</Label>
          <Input id="name" name="name" placeholder={t("collaborator.name_placeholder")} />
          {state.issues?.name && <p className="text-sm font-medium text-destructive">{state.issues.name}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">{t("shared.email_label")}</Label>
          <Input id="email" name="email" type="email" placeholder={t("collaborator.email_placeholder")} />
          {state.issues?.email && <p className="text-sm font-medium text-destructive">{state.issues.email}</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="linkedin">{t("collaborator.linkedin_label")}</Label>
            <Input id="linkedin" name="linkedin" placeholder={t("collaborator.linkedin_placeholder")} />
            {state.issues?.linkedin && <p className="text-sm font-medium text-destructive">{state.issues.linkedin}</p>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="portfolio">{t("collaborator.portfolio_label")}</Label>
            <Input id="portfolio" name="portfolio" placeholder={t("collaborator.portfolio_placeholder")} />
            {state.issues?.portfolio && <p className="text-sm font-medium text-destructive">{state.issues.portfolio}</p>}
          </div>
      </div>
      <div className="space-y-2">
          <Label htmlFor="expertise">{t("collaborator.expertise_label")}</Label>
          <Select name="expertise">
            <SelectTrigger id="expertise">
              <SelectValue placeholder={t("collaborator.expertise_placeholder")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="frontend">{t("collaborator.expertise_frontend")}</SelectItem>
              <SelectItem value="backend">{t("collaborator.expertise_backend")}</SelectItem>
              <SelectItem value="fullstack">{t("collaborator.expertise_fullstack")}</SelectItem>
              <SelectItem value="devops">{t("collaborator.expertise_devops")}</SelectItem>
              <SelectItem value="mobile">{t("collaborator.expertise_mobile")}</SelectItem>
              <SelectItem value="ux-ui">{t("collaborator.expertise_ux_ui")}</SelectItem>
              <SelectItem value="data-science-ai">{t("collaborator.expertise_data_ai")}</SelectItem>
              <SelectItem value="project-management">{t("collaborator.expertise_pm")}</SelectItem>
              <SelectItem value="other">{t("collaborator.expertise_other")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      <div className="space-y-2">
        <Label htmlFor="subject">{t("collaborator.subject_label")}</Label>
        <Input id="subject" name="subject" placeholder={t("collaborator.subject_placeholder")} />
        {state.issues?.subject && <p className="text-sm font-medium text-destructive">{state.issues.subject}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">{t("collaborator.message_label")}</Label>
        <Textarea
          id="message"
          name="message"
          placeholder={t("collaborator.message_placeholder")}
          className="min-h-[150px]"
        />
        {state.issues?.message && <p className="text-sm font-medium text-destructive">{state.issues.message}</p>}
      </div>
      <SubmitButton submitText={t("collaborator.submit")} submittingText={t("shared.submitting")} />
    </form>
  );
}
