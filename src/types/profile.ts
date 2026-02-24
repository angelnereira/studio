// ============================================
// Shared types for Prisma JSON fields
// These map to the Json columns in ProfileBase,
// JobVacancy, Application, and related models.
// ============================================

import type { LucideIcon } from "lucide-react";

// === ProfileBase JSON fields ===

export interface WorkExperience {
    company: string;
    position: string;
    period: string;
    responsibilities: string[];
}

export interface SkillCategory {
    category: string;
    items: string[];
}

export interface Education {
    institution: string;
    degree: string;
    year?: string;
    description?: string;
}

export interface LanguageEntry {
    language: string;
    level: string;
}

export interface SocialLinks {
    linkedin?: string;
    github?: string;
    portfolio?: string;
    twitter?: string;
    [key: string]: string | undefined;
}

export interface ProjectEntry {
    title: string;
    label?: string;
    description: string;
    techHighlights?: { title: string; description: string }[];
    [key: string]: unknown;
}

// === JobVacancy JSON fields ===

export interface VacancyRequirements {
    technical?: { skill: string; level?: string }[];
    softSkills?: string[];
}

export interface VacancyAnalysis {
    company?: string;
    position?: string;
    location?: string;
    workMode?: string;
    salaryRange?: string;
    industryDomain?: string;
    cultureFit?: string;
    requirements?: VacancyRequirements;
    keywords?: string[];
    compatibilityScore?: number;
    suggestions?: string;
    [key: string]: unknown;
}

// === Contact form data types (email.ts) ===

export interface ClientFormData {
    name: string;
    email: string;
    company?: string;
    country?: string;
    industry?: string;
    service: string;
    budget: string;
    message: string;
}

export interface EmployerFormData {
    recruiterName: string;
    email: string;
    companyName: string;
    jobTitle: string;
    jobDescription: string;
    country?: string;
    industry?: string;
    salaryOffer?: string;
    contractType?: string;
}

export interface CollaboratorFormData {
    name: string;
    email: string;
    linkedin?: string;
    portfolio?: string;
    expertise?: string;
    subject: string;
    message: string;
}

export interface InvitationFormData {
    inviterName: string;
    email: string;
    eventName: string;
    eventType: string;
    proposedRole: string;
    eventDate: string;
    eventTime?: string;
    eventLocation: string;
    invitationReason: string;
}

export type ContactFormData =
    | ClientFormData
    | EmployerFormData
    | CollaboratorFormData
    | InvitationFormData;

// === Re-usable component prop types ===

export type IconComponent = LucideIcon | React.ElementType;

// === Email template data ===

export interface TemplateData {
    name?: string;
    previewText?: string;
    clientName?: string;
    projectName?: string;
    projectUrl?: string;
    serviceName?: string;
    packageName?: string;
    subscriberName?: string;
    edition?: string;
    headline?: string;
    introText?: string;
    [key: string]: string | undefined;
}
