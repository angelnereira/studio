

import * as React from "react";
import { Server, Shield, Zap, Layers, Code2, Database, GitBranch, Briefcase } from "lucide-react";
import { FaDocker, FaGitAlt } from "react-icons/fa";
import { SiTypescript, SiPostgresql, SiVercel, SiKubernetes, SiJavascript, SiGooglecloud } from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";
import { LinuxIcon, PrismaIcon, NeonIcon, OracleCloudIcon, SqlIcon } from "./icons";
import { skillsData, skillCategories } from "./data/skills-data";

export type PracticalAbility = {
  title: string;
  description: string;
  icon: React.ElementType;
};

export type Skill = {
  name: string;
  slug: string;
  icon: React.ElementType;
  description: string;
  category: "core" | "data" | "infrastructure";
  practicalAbilities: PracticalAbility[];
};

const iconMap: Record<string, React.ElementType> = {
  TbBrandNextjs,
  SiTypescript,
  SiJavascript,
  SiPostgresql,
  PrismaIcon,
  NeonIcon,
  SqlIcon,
  SiVercel,
  FaDocker,
  SiKubernetes,
  SiGooglecloud,
  OracleCloudIcon,
  FaGitAlt,
  LinuxIcon,
  Zap,
  Server,
  Shield,
  Layers,
  Code2,
  Database,
  GitBranch,
};

export const skills: Skill[] = skillsData.map(skill => ({
  ...skill,
  icon: iconMap[skill.iconName] || Code2, // Fallback icon
  practicalAbilities: skill.practicalAbilities.map(ability => ({
    ...ability,
    icon: iconMap[ability.iconName] || Zap // Fallback icon
  }))
}));

export { skillCategories };

// Helper para obtener skills por categoría
export const getSkillsByCategory = (category: "core" | "data" | "infrastructure") =>
  skills.filter(skill => skill.category === category);
