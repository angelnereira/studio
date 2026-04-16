"use client";

import { useFormStatus } from "react-dom";
import { useEffect, useActionState, useRef } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
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

export function EmployerForm() {
  const t = useTranslations("contact.form");
  const { toast } = useToast();
  const [state, formAction] = useActionState(onContactSubmit, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === 'success' && state.formType === 'employer') {
      toast({
        title: t("employer.success_title"),
        description: t("employer.success_description"),
      });
      formRef.current?.reset();
    } else if (state.status === 'error' && state.formType === 'employer' && state.message && !state.issues) {
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
      <input type="hidden" name="formType" value="employer" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="recruiterName">{t("employer.recruiter_name_label")}</Label>
          <Input id="recruiterName" name="recruiterName" placeholder={t("employer.recruiter_name_placeholder")} />
          {state.issues?.recruiterName && <p className="text-sm font-medium text-destructive">{state.issues.recruiterName}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">{t("employer.email_label")}</Label>
          <Input id="email" name="email" type="email" placeholder={t("employer.email_placeholder")} />
          {state.issues?.email && <p className="text-sm font-medium text-destructive">{state.issues.email}</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="companyName">{t("employer.company_name_label")}</Label>
          <Input id="companyName" name="companyName" placeholder={t("employer.company_name_placeholder")} />
          {state.issues?.companyName && <p className="text-sm font-medium text-destructive">{state.issues.companyName}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="jobTitle">{t("employer.job_title_label")}</Label>
          <Input id="jobTitle" name="jobTitle" placeholder={t("employer.job_title_placeholder")} />
          {state.issues?.jobTitle && <p className="text-sm font-medium text-destructive">{state.issues.jobTitle}</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="country">{t("shared.country_label")}</Label>
            <Input id="country" name="country" placeholder={t("employer.country_placeholder")} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="salaryOffer">{t("employer.salary_label")}</Label>
            <Input id="salaryOffer" name="salaryOffer" placeholder={t("employer.salary_placeholder")} />
          </div>
      </div>
      <div className="space-y-2">
          <Label htmlFor="industry">{t("shared.industry_label")}</Label>
          <Select name="industry">
            <SelectTrigger id="industry">
              <SelectValue placeholder={t("shared.industry_placeholder")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technology">{t("shared.industry_technology")}</SelectItem>
              <SelectItem value="ecommerce">{t("shared.industry_ecommerce")}</SelectItem>
              <SelectItem value="finance">{t("shared.industry_finance")}</SelectItem>
              <SelectItem value="health">{t("shared.industry_health")}</SelectItem>
              <SelectItem value="education">{t("shared.industry_education")}</SelectItem>
              <SelectItem value="professional-services">{t("shared.industry_professional_services")}</SelectItem>
              <SelectItem value="real-estate">{t("shared.industry_real_estate")}</SelectItem>
              <SelectItem value="transport-logistics">{t("shared.industry_transport")}</SelectItem>
              <SelectItem value="other">{t("shared.industry_other")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="contractType">{t("employer.contract_label")}</Label>
          <Select name="contractType">
            <SelectTrigger id="contractType">
              <SelectValue placeholder={t("employer.contract_placeholder")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="full-time">{t("employer.contract_full_time")}</SelectItem>
              <SelectItem value="part-time">{t("employer.contract_part_time")}</SelectItem>
              <SelectItem value="contract">{t("employer.contract_freelance")}</SelectItem>
              <SelectItem value="internship">{t("employer.contract_internship")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      <div className="space-y-2">
        <Label htmlFor="jobDescription">{t("employer.job_description_label")}</Label>
        <Textarea
          id="jobDescription"
          name="jobDescription"
          placeholder={t("employer.job_description_placeholder")}
          className="min-h-[150px]"
        />
        {state.issues?.jobDescription && <p className="text-sm font-medium text-destructive">{state.issues.jobDescription}</p>}
      </div>
      <SubmitButton submitText={t("employer.submit")} submittingText={t("shared.submitting")} />
    </form>
  );
}
