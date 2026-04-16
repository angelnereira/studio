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
import { services } from "@/lib/services";
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

export function ClientForm() {
  const t = useTranslations("contact.form");
  const { toast } = useToast();
  const [state, formAction] = useActionState(onContactSubmit, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.status === 'success' && state.formType === 'client') {
      toast({
        title: t("client.success_title"),
        description: state.message,
      });
      formRef.current?.reset();
    } else if (state.status === 'error' && state.formType === 'client' && state.message && !state.issues) {
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
      <input type="hidden" name="formType" value="client" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">{t("client.name_label")}</Label>
          <Input id="name" name="name" placeholder={t("client.name_placeholder")} />
          {state.issues?.name && <p className="text-sm font-medium text-destructive">{state.issues.name}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">{t("shared.email_label")}</Label>
          <Input id="email" name="email" type="email" placeholder={t("client.email_placeholder")} />
          {state.issues?.email && <p className="text-sm font-medium text-destructive">{state.issues.email}</p>}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="company">{t("client.company_label")}</Label>
          <Input id="company" name="company" placeholder={t("client.company_placeholder")} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="country">{t("shared.country_label")}</Label>
          <Input id="country" name="country" placeholder={t("client.country_placeholder")} />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="service">{t("client.service_label")}</Label>
          <Select name="service">
            <SelectTrigger id="service">
              <SelectValue placeholder={t("client.service_placeholder")} />
            </SelectTrigger>
            <SelectContent>
              {services.filter(s => s.published).map(service => (
                <SelectItem key={service.slug} value={service.slug}>{service.title}</SelectItem>
              ))}
              <SelectItem value="other">{t("client.service_other")}</SelectItem>
            </SelectContent>
          </Select>
          {state.issues?.service && <p className="text-sm font-medium text-destructive">{state.issues.service}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="budget">{t("client.budget_label")}</Label>
          <Select name="budget">
            <SelectTrigger id="budget">
              <SelectValue placeholder={t("client.budget_placeholder")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="2.5k-5k">$2,500 - $5,000</SelectItem>
              <SelectItem value="5k-10k">$5,000 - $10,000</SelectItem>
              <SelectItem value="10k-25k">$10,000 - $25,000</SelectItem>
              <SelectItem value=">25k">{t("client.budget_more")}</SelectItem>
            </SelectContent>
          </Select>
          {state.issues?.budget && <p className="text-sm font-medium text-destructive">{state.issues.budget}</p>}
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
        <Label htmlFor="message">{t("client.message_label")}</Label>
        <Textarea
          id="message"
          name="message"
          placeholder={t("client.message_placeholder")}
          className="min-h-[150px]"
        />
        {state.issues?.message && <p className="text-sm font-medium text-destructive">{state.issues.message}</p>}
      </div>
      <SubmitButton submitText={t("client.submit")} submittingText={t("shared.submitting")} />
    </form>
  );
}
