"use client";

import { useFormStatus } from "react-dom";
import { useEffect, useActionState, useRef, useState } from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
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

export function InvitationForm() {
  const t = useTranslations("contact.form");
  const { toast } = useToast();
  const [state, formAction] = useActionState(onContactSubmit, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const [date, setDate] = useState<Date | undefined>();

  useEffect(() => {
    if (state.status === 'success' && state.formType === 'invitation') {
      toast({
        title: t("invitation.success_title"),
        description: t("invitation.success_description"),
      });
      formRef.current?.reset();
      setDate(undefined);
    } else if (state.status === 'error' && state.formType === 'invitation' && state.message && !state.issues) {
       toast({
        variant: "destructive",
        title: t("shared.error_title"),
        description: state.message,
      });
    }
  }, [state, toast, t]);

  const handleSubmit = (formData: FormData) => {
    if (date) {
      formData.set('eventDate', date.toISOString());
    }
    formAction(formData);
  };

  return (
    <form ref={formRef} action={handleSubmit} className="space-y-6">
      <input type="hidden" name="formType" value="invitation" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="inviterName">{t("invitation.inviter_name_label")}</Label>
          <Input id="inviterName" name="inviterName" placeholder={t("invitation.inviter_name_placeholder")} />
          {state.issues?.inviterName && <p className="text-sm font-medium text-destructive">{state.issues.inviterName}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">{t("invitation.email_label")}</Label>
          <Input id="email" name="email" type="email" placeholder={t("invitation.email_placeholder")} />
          {state.issues?.email && <p className="text-sm font-medium text-destructive">{state.issues.email}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="eventName">{t("invitation.event_name_label")}</Label>
        <Input id="eventName" name="eventName" placeholder={t("invitation.event_name_placeholder")} />
        {state.issues?.eventName && <p className="text-sm font-medium text-destructive">{state.issues.eventName}</p>}
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="eventType">{t("invitation.event_type_label")}</Label>
          <Select name="eventType">
            <SelectTrigger id="eventType">
              <SelectValue placeholder={t("invitation.event_type_placeholder")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="conferencia">{t("invitation.event_type_conference")}</SelectItem>
              <SelectItem value="taller">{t("invitation.event_type_workshop")}</SelectItem>
              <SelectItem value="meetup">{t("invitation.event_type_meetup")}</SelectItem>
              <SelectItem value="reunion-negocios">{t("invitation.event_type_business")}</SelectItem>
              <SelectItem value="podcast-entrevista">{t("invitation.event_type_podcast")}</SelectItem>
              <SelectItem value="otro">{t("invitation.event_type_other")}</SelectItem>
            </SelectContent>
          </Select>
          {state.issues?.eventType && <p className="text-sm font-medium text-destructive">{state.issues.eventType}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="proposedRole">{t("invitation.proposed_role_label")}</Label>
          <Select name="proposedRole">
            <SelectTrigger id="proposedRole">
              <SelectValue placeholder={t("invitation.proposed_role_placeholder")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="expositor">{t("invitation.role_speaker")}</SelectItem>
              <SelectItem value="panelista">{t("invitation.role_panelist")}</SelectItem>
              <SelectItem value="asistente-especial">{t("invitation.role_special_guest")}</SelectItem>
              <SelectItem value="mentor">{t("invitation.role_mentor")}</SelectItem>
              <SelectItem value="entrevistado">{t("invitation.role_interviewee")}</SelectItem>
            </SelectContent>
          </Select>
          {state.issues?.proposedRole && <p className="text-sm font-medium text-destructive">{state.issues.proposedRole}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label>{t("invitation.event_date_label")}</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>{t("invitation.select_date")}</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                disabled={(d) => d < new Date(new Date().setDate(new Date().getDate() - 1))}
              />
            </PopoverContent>
          </Popover>
          {state.issues?.eventDate && <p className="text-sm font-medium text-destructive">{state.issues.eventDate}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="eventTime">{t("invitation.event_time_label")}</Label>
          <Input id="eventTime" name="eventTime" type="time" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="eventLocation">{t("invitation.event_location_label")}</Label>
        <Input id="eventLocation" name="eventLocation" placeholder={t("invitation.event_location_placeholder")} />
        {state.issues?.eventLocation && <p className="text-sm font-medium text-destructive">{state.issues.eventLocation}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="invitationReason">{t("invitation.invitation_reason_label")}</Label>
        <Textarea
          id="invitationReason"
          name="invitationReason"
          placeholder={t("invitation.invitation_reason_placeholder")}
          className="min-h-[120px]"
        />
        {state.issues?.invitationReason && <p className="text-sm font-medium text-destructive">{state.issues.invitationReason}</p>}
      </div>
      <SubmitButton submitText={t("invitation.submit")} submittingText={t("shared.submitting")} />
    </form>
  );
}
