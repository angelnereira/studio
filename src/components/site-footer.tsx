import { Github, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="py-6 md:px-8 md:py-0 border-t">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Construido por Ángel Nereira. © {new Date().getFullYear()} Todos los Derechos Reservados.
        </p>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://github.com" target="_blank" rel="noreferrer">
              <Github className="h-5 w-5" />
              <span className="sr-only">GitHub</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://twitter.com" target="_blank" rel="noreferrer">
              <Twitter className="h-5 w-5" />
              <span className="sr-only">Twitter</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" asChild>
            <Link href="https://linkedin.com" target="_blank" rel="noreferrer">
              <Linkedin className="h-5 w-5" />
              <span className="sr-only">LinkedIn</span>
            </Link>
          </Button>
        </div>
      </div>
    </footer>
  );
}
