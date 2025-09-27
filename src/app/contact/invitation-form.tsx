"use client";

import { useFormStatus } from "react-dom";
import { useEffect, useActionState, startTransition, useRef, useState } from "react";
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

const initialState: FormState = {
  message: "",
  status: "idle",
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" className="w-full" disabled={pending}>
      {pending ? "Enviando..." : "Enviar Invitación"}
    </Button>
  );
}

export function InvitationForm() {
  const { toast } = useToast();
  const [state, formAction] = useActionState(onContactSubmit, initialState);
  const formRef = useRef<HTMLFormElement>(null);
  const [date, setDate] = useState<Date | undefined>();

  useEffect(() => {
    if (state.status === 'success' && state.message) {
      toast({
        title: "¡Invitación Recibida!",
        description: "Gracias por la invitación. Revisaré los detalles y te contactaré pronto.",
      });
      formRef.current?.reset();
      setDate(undefined);
    } else if (state.status === 'error' && state.message && !state.issues) {
       toast({
        variant: "destructive",
        title: "Error al enviar",
        description: state.message,
      });
    }
  }, [state, toast]);

  const handleSubmit = (formData: FormData) => {
    if (date) {
      formData.set('eventDate', date.toISOString());
    }
    startTransition(() => {
      formAction(formData);
    });
  };

  return (
    <form ref={formRef} action={handleSubmit} className="space-y-6">
      <input type="hidden" name="formType" value="invitation" />
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="inviterName">Tu Nombre</Label>
          <Input id="inviterName" name="inviterName" placeholder="Nombre de quien invita" />
          {state.issues?.inviterName && <p className="text-sm font-medium text-destructive">{state.issues.inviterName}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email de Contacto</Label>
          <Input id="email" name="email" type="email" placeholder="tu.email@ejemplo.com" />
          {state.issues?.email && <p className="text-sm font-medium text-destructive">{state.issues.email}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="eventName">Nombre del Evento</Label>
        <Input id="eventName" name="eventName" placeholder="Ej: Tech Conf 2024" />
        {state.issues?.eventName && <p className="text-sm font-medium text-destructive">{state.issues.eventName}</p>}
      </div>
      
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="eventType">Tipo de Evento</Label>
          <Select name="eventType">
            <SelectTrigger id="eventType">
              <SelectValue placeholder="Selecciona el tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="conferencia">Conferencia</SelectItem>
              <SelectItem value="taller">Taller / Workshop</SelectItem>
              <SelectItem value="meetup">Meetup / Comunidad</SelectItem>
              <SelectItem value="reunion-negocios">Reunión de Negocios</SelectItem>
              <SelectItem value="podcast-entrevista">Podcast / Entrevista</SelectItem>
              <SelectItem value="otro">Otro</SelectItem>
            </SelectContent>
          </Select>
          {state.issues?.eventType && <p className="text-sm font-medium text-destructive">{state.issues.eventType}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="proposedRole">Rol Propuesto</Label>
          <Select name="proposedRole">
            <SelectTrigger id="proposedRole">
              <SelectValue placeholder="Selecciona tu rol" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="expositor">Expositor / Ponente</SelectItem>
              <SelectItem value="panelista">Panelista</SelectItem>
              <SelectItem value="asistente-especial">Asistente Especial</SelectItem>
              <SelectItem value="mentor">Mentor</SelectItem>
              <SelectItem value="entrevistado">Entrevistado</SelectItem>
            </SelectContent>
          </Select>
          {state.issues?.proposedRole && <p className="text-sm font-medium text-destructive">{state.issues.proposedRole}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Fecha del Evento</Label>
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
                {date ? format(date, "PPP") : <span>Selecciona una fecha</span>}
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
          <Label htmlFor="eventTime">Hora (Opcional)</Label>
          <Input id="eventTime" name="eventTime" type="time" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="eventLocation">Ubicación o Enlace</Label>
        <Input id="eventLocation" name="eventLocation" placeholder="Dirección física o URL de la reunión" />
        {state.issues?.eventLocation && <p className="text-sm font-medium text-destructive">{state.issues.eventLocation}</p>}
      </div>
     
      <div className="space-y-2">
        <Label htmlFor="invitationReason">Motivo de la Invitación</Label>
        <Textarea
          id="invitationReason"
          name="invitationReason"
          placeholder="Describe brevemente el evento y el motivo de la invitación."
          className="min-h-[120px]"
        />
        {state.issues?.invitationReason && <p className="text-sm font-medium text-destructive">{state.issues.invitationReason}</p>}
      </div>
      <SubmitButton />
    </form>
  );
}