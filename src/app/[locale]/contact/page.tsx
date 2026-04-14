import { AnimatedDiv } from '@/components/animated-div';
import { CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Briefcase, Handshake, User, Calendar } from 'lucide-react';
import { ClientForm } from './client-form';
import { EmployerForm } from './employer-form';
import { CollaboratorForm } from './collaborator-form';
import { SpotlightCard } from '@/components/spotlight-card';
import { InvitationForm } from './invitation-form';
import { TiltCard } from '@/components/ui/tilt-card';
import { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return {
    title: t('metadata_title'),
    description: t('metadata_description'),
  };
}

function ContactCard({ icon, title, description, children }: { icon: React.ReactNode, title: string, description: string, children: React.ReactNode }) {
  return (
    <TiltCard className="h-full">
      <SpotlightCard className="group relative flex flex-col h-full overflow-hidden transition-all duration-300 ease-geist bg-card/40 backdrop-blur-md border border-white/5 hover:border-primary/50 hover:shadow-primary/20 hover:shadow-xl rounded-[var(--radius)]">
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
    </TiltCard>
  );
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('contact');

  return (
    <>
      <AnimatedDiv>
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">{t('page_title')}</h1>
          <p className="mt-4 text-muted-foreground md:text-xl">
            {t('page_description')}
          </p>
        </div>
      </AnimatedDiv>
      <AnimatedDiv delay={0.2}>
        <div className="mx-auto mt-8 sm:mt-10 md:mt-12 max-w-4xl">
          <Tabs defaultValue="client" className="w-full">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-1 h-auto">
              <TabsTrigger value="client" className="flex items-center justify-center gap-1 sm:gap-2">
                <User className="h-4 w-4" />
                <span className="text-xs sm:text-sm">{t('tabs.client')}</span>
              </TabsTrigger>
              <TabsTrigger value="employer" className="flex items-center justify-center gap-1 sm:gap-2">
                <Briefcase className="h-4 w-4" />
                <span className="text-xs sm:text-sm">{t('tabs.employer')}</span>
              </TabsTrigger>
              <TabsTrigger value="collaboration" className="flex items-center justify-center gap-1 sm:gap-2">
                <Handshake className="h-4 w-4" />
                <span className="text-xs sm:text-sm">{t('tabs.collaboration')}</span>
              </TabsTrigger>
              <TabsTrigger value="invitation" className="flex items-center justify-center gap-1 sm:gap-2">
                <Calendar className="h-4 w-4" />
                <span className="text-xs sm:text-sm">{t('tabs.invitation')}</span>
              </TabsTrigger>
            </TabsList>
            <TabsContent value="client" className="mt-6">
              <ContactCard
                icon={<User />}
                title={t('client_card.title')}
                description={t('client_card.description')}
              >
                <ClientForm />
              </ContactCard>
            </TabsContent>
            <TabsContent value="employer" className="mt-6">
              <ContactCard
                icon={<Briefcase />}
                title={t('employer_card.title')}
                description={t('employer_card.description')}
              >
                <EmployerForm />
              </ContactCard>
            </TabsContent>
            <TabsContent value="collaboration" className="mt-6">
              <ContactCard
                icon={<Handshake />}
                title={t('collaboration_card.title')}
                description={t('collaboration_card.description')}
              >
                <CollaboratorForm />
              </ContactCard>
            </TabsContent>
            <TabsContent value="invitation" className="mt-6">
              <ContactCard
                icon={<Calendar />}
                title={t('invitation_card.title')}
                description={t('invitation_card.description')}
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
