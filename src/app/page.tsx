import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Briefcase, Code, Cpu, Database, GitBranch, Github, Linkedin, Server, Terminal, Twitter, Wind } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import * as React from "react";

const profileImage = PlaceHolderImages.find(p => p.id === 'profile-photo');
const projectImages = {
  proj1: PlaceHolderImages.find(p => p.id === 'project-1'),
  proj2: PlaceHolderImages.find(p => p.id === 'project-2'),
  proj3: PlaceHolderImages.find(p => p.id === 'project-3'),
};
const testimonialImages = {
  test1: PlaceHolderImages.find(p => p.id === 'testimonial-1'),
  test2: PlaceHolderImages.find(p => p.id === 'testimonial-2'),
  test3: PlaceHolderImages.find(p => p.id === 'testimonial-3'),
};

const skills = [
  { name: "Next.js", icon: <Wind /> },
  { name: "Node.js", icon: <Server /> },
  { name: "React", icon: <Cpu /> },
  { name: "Firebase", icon: <Database /> },
  { name: "Docker", icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-docker"><path d="M22 12.5c0-2.2-2-3.5-4-3.5-1.2 0-2.7.9-3.5 2.1-.8-1.2-2.3-2.1-3.5-2.1-2 0-4 1.3-4 3.5 0 .9.3 2.1 1.2 3.1-1.1.4-2.2 1.5-2.2 3.4 0 2.2 2 4 4 4h8c2 0 4-1.8 4-4 0-1.9-1.1-3-2.2-3.4.9-1 1.2-2.2 1.2-3.1Z" /><path d="M5 12.5H3" /><path d="M6 15.5H3" /><path d="M6 9.5H3" /><path d="M8 6.5H6" /><path d="M9 3.5H7" /></svg> },
  { name: "Git", icon: <GitBranch /> },
  { name: "Terminal", icon: <Terminal /> },
  { name: "APIs", icon: <Code /> },
];

const projects = [
  {
    title: "Pro SaaS Platform",
    description: "A comprehensive SaaS platform with multi-tenancy, billing, and advanced features.",
    technologies: ["Next.js", "Firebase", "Stripe"],
    image: projectImages.proj1,
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    title: "AI Analytics Dashboard",
    description: "An analytics dashboard providing deep insights using AI-powered data analysis.",
    technologies: ["React", "Node.js", "GraphQL"],
    image: projectImages.proj2,
    liveUrl: "#",
  },
  {
    title: "E-commerce Mobile App",
    description: "A cross-platform mobile app for a seamless shopping experience.",
    technologies: ["React Native", "Firebase", "Docker"],
    image: projectImages.proj3,
    githubUrl: "#",
  },
];

const testimonials = [
  {
    name: "Jane Doe",
    title: "CEO, TechCorp",
    quote: "Working with this developer was a game-changer for our company. Their expertise in modern web technologies is unparalleled.",
    avatar: testimonialImages.test1,
  },
  {
    name: "John Smith",
    title: "CTO, Innovate LLC",
    quote: "The quality of work and professionalism exceeded all our expectations. I highly recommend their services for any complex project.",
    avatar: testimonialImages.test2,
  },
  {
    name: "Emily White",
    title: "Product Manager, StartupX",
    quote: "Incredibly talented and easy to work with. They delivered a high-quality product on a tight deadline.",
    avatar: testimonialImages.test3,
  },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-secondary/50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-headline">
                    Growing Software Developer
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Building robust and scalable web applications with a focus on modern technologies and user experience.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button asChild size="lg">
                    <Link href="/contact">Contact Me</Link>
                  </Button>
                  <Button asChild variant="secondary" size="lg">
                    <Link href="/services">View Services</Link>
                  </Button>
                </div>
              </div>
              {profileImage && (
                <Image
                  src={profileImage.imageUrl}
                  alt={profileImage.description}
                  data-ai-hint={profileImage.imageHint}
                  width={400}
                  height={400}
                  className="mx-auto aspect-square overflow-hidden rounded-full object-cover sm:w-full lg:order-last"
                />
              )}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">My Skillset</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  A versatile developer with a strong foundation in both frontend and backend technologies.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-2 gap-6 py-12 sm:grid-cols-3 md:grid-cols-4">
              {skills.map((skill) => (
                <div key={skill.name} className="flex flex-col items-center justify-center space-y-2 rounded-lg bg-card p-6 shadow-sm transition-transform hover:scale-105 hover:shadow-lg">
                  <div className="text-primary">{React.cloneElement(skill.icon as React.ReactElement, { className: 'h-10 w-10' })}</div>
                  <span className="font-medium">{skill.name}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl font-headline">Featured Projects</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Here are some of the projects I'm proud to have worked on.
                </p>
              </div>
            </div>
            <div className="grid gap-6 lg:grid-cols-3 py-12">
              {projects.map((project) => (
                <Card key={project.title} className="flex flex-col overflow-hidden transition-shadow hover:shadow-xl">
                  {project.image && (
                    <Image
                      src={project.image.imageUrl}
                      alt={project.image.description}
                      data-ai-hint={project.image.imageHint}
                      width={600}
                      height={400}
                      className="aspect-video w-full object-cover"
                    />
                  )}
                  <CardHeader>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary">{tech}</Badge>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    {project.liveUrl && <Button asChild><Link href={project.liveUrl}>View Live <ArrowRight className="ml-2 h-4 w-4" /></Link></Button>}
                    {project.githubUrl && <Button variant="ghost" asChild><Link href={project.githubUrl}><Github className="mr-2 h-4 w-4" /> Source</Link></Button>}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center sm:text-5xl font-headline">What Others Say</h2>
            <div className="grid gap-8 mt-12 sm:grid-cols-1 md:grid-cols-3">
              {testimonials.map((testimonial) => (
                <Card key={testimonial.name}>
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                  </CardContent>
                  <CardFooter className="flex items-center gap-4">
                    {testimonial.avatar && (
                      <Avatar>
                        <AvatarImage src={testimonial.avatar.imageUrl} alt={testimonial.name} data-ai-hint={testimonial.avatar.imageHint} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    )}
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight font-headline">
                Ready to build something amazing?
              </h2>
              <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Let's collaborate on your next project. I'm available for freelance work and new opportunities.
              </p>
            </div>
            <div className="mx-auto w-full max-w-sm space-y-2">
                <Button asChild size="lg" className="w-full">
                  <Link href="/contact">Get in Touch</Link>
                </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
