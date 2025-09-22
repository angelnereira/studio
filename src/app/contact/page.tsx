
import { AnimatedDiv } from '@/components/animated-div';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Briefcase, Handshake, User, Calendar } from 'lucide-react';
import { ClientForm } from './client-form';
import { EmployerForm } from './employer-form';
import { CollaboratorForm } from './collaborator-form';
import { SpotlightCard } from '@/components/spotlight-card';
import { InvitationForm } from './invitation-form';

function ContactCard({ icon, title, description, children }: { icon: React.ReactNode, title: string, description: string, children: React.ReactNode }) {
  return (
    <SpotlightCard className="group relative flex flex-col h-full overflow-hidden transition-all duration-300 ease-geist bg-secondary/50 backdrop-blur-sm border border-white/10 hover:border-primary/50 hover:shadow-primary/20 hover:shadow-xl">
      <CardHeader className="text-center">
        <div className="mx-auto bg-primary/10 text-primary p-3 rounded-full w-fit mb-2">
            {icon}
        </div>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </SpotlightCard>
  )
}

export default function ContactPage() {
  return (
    <>
      <AnimatedDiv>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Hablemos</h1>
          <p className="mt-4 text-muted-foreground md:text-xl">
            Construyamos algo increíble juntos. Elige la opción que mejor se adapte a tu necesidad.
          </p>
        </div>
      </AnimatedDiv>
      <AnimatedDiv delay={0.2}>
        <div className="mx-auto mt-12 max-w-4xl">
           <Tabs defaultValue="client" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="client"><User className='mr-2' />Cliente</TabsTrigger>
              <TabsTrigger value="employer"><Briefcase className='mr-2'/>Empleador</TabsTrigger>
              <TabsTrigger value="collaboration"><Handshake className='mr-2'/>Colaboración</TabsTrigger>
              <TabsTrigger value="invitation"><Calendar className='mr-2'/>Invitación</TabsTrigger>
            </TabsList>
            <TabsContent value="client" className="mt-6">
              <ContactCard
                icon={<User />}
                title="Propuesta de Proyecto"
                description="¿Tienes una idea o proyecto en mente? Cuéntame los detalles."
              >
                <ClientForm />
              </ContactCard>
            </TabsContent>
            <TabsContent value="employer" className="mt-6">
               <ContactCard
                icon={<Briefcase />}
                title="Oportunidad Laboral"
                description="¿Crees que encajaría en tu equipo? Envíame los detalles del rol."
              >
                <EmployerForm />
              </ContactCard>
            </TabsContent>
            <TabsContent value="collaboration" className="mt-6">
               <ContactCard
                icon={<Handshake />}
                title="Propuesta de Colaboración"
                description="¿Interesado en colaborar en un proyecto, charla o evento? Contáctame."
              >
                <CollaboratorForm />
              </ContactCard>
            </TabsContent>
             <TabsContent value="invitation" className="mt-6">
               <ContactCard
                icon={<Calendar />}
                title="Invitación a Evento"
                description="Para invitaciones a conferencias, talleres, reuniones o cualquier otro evento profesional."
              >
                <InvitationForm />
              </ContactCard>
            </TabsContent>
          </Tabs>
        </div>
      </AnimatedDiv>
    </>
  );
}
