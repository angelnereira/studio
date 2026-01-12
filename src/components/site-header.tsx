"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrainCircuit, Menu, Moon, Sun, Home, Briefcase, Code2, FileText, Mail, FolderKanban, Calculator } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import * as React from "react";
import { LanguageToggle } from "@/components/language-toggle";
import { useLanguage } from "@/lib/language-context";
import { useSession } from "next-auth/react";

export function SiteHeader() {
  const { data: session } = useSession();
  const [isSheetOpen, setSheetOpen] = React.useState(false);
  const pathname = usePathname();
  const { setTheme, theme } = useTheme();
  const { t } = useLanguage();

  const navItems = React.useMemo(() => [
    { href: "/", label: t('nav.home'), icon: <Home className="h-4 w-4" /> },
    { href: "/services", label: t('nav.services'), icon: <Briefcase className="h-4 w-4" /> },
    { href: "/proyectos", label: t('nav.projects'), icon: <FolderKanban className="h-4 w-4" /> },
    { href: "/calculadora", label: t('nav.calculator'), icon: <Calculator className="h-4 w-4" /> },
    { href: "/skills", label: t('skills.title'), icon: <Code2 className="h-4 w-4" /> },
    { href: "/blog", label: "Blog", icon: <FileText className="h-4 w-4" /> },
    { href: "/contact", label: t('nav.contact'), icon: <Mail className="h-4 w-4" /> },
    ...(session?.user ? [{ href: "/admin", label: "Admin", icon: <BrainCircuit className="h-4 w-4 text-primary" /> }] : []),
  ], [t, session]);

  return (
    <header className="sticky top-0 z-50 w-full border-b glass">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center">
          <Link href="/" className="mr-6 flex items-center space-x-2 group">
            <div className="w-8 h-8 flex-shrink-0 bg-primary/10 rounded-full flex items-center justify-center text-primary border border-primary/20 group-hover:border-primary/50 transition-colors duration-300">
              <BrainCircuit className="h-5 w-5" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold sm:inline-block">Ángel Nereira</span>
            </div>
          </Link>
        </div>

        <nav className="hidden md:flex items-center space-x-2 text-sm font-medium">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-md px-3 py-2 transition-all duration-300 ease-geist hover:bg-accent hover:text-accent-foreground hover:-translate-y-0.5",
                pathname === item.href ? "bg-secondary text-secondary-foreground" : "text-foreground/70"
              )}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-2">
          <LanguageToggle />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            aria-label="Toggle theme"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>

          <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <SheetHeader>
                <SheetTitle className="sr-only">Menú Móvil</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col h-full">
                <div className="flex items-center space-x-2 mb-8">
                  <BrainCircuit className="h-6 w-6 text-primary" />
                  <span className="font-bold">Ángel Nereira</span>
                </div>
                <div className="flex flex-col space-y-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSheetOpen(false)}
                      className={cn(
                        "flex items-center gap-3 rounded-md p-3 text-lg font-medium transition-colors hover:bg-accent",
                        pathname === item.href ? "bg-secondary text-secondary-foreground" : "text-foreground/70"
                      )}
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  ))}

                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

