

import * as React from "react";
import { Server, Shield, Zap, Layers, Code2, Database, GitBranch, Briefcase } from "lucide-react";
import { FaDocker, FaGitAlt } from "react-icons/fa";
import { SiTypescript, SiPostgresql, SiVercel, SiKubernetes, SiJavascript, SiGooglecloud } from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";
import { LinuxIcon, PrismaIcon, NeonIcon, OracleCloudIcon, SqlIcon } from "./icons";
import { skillsData, skillCategories, type SkillCategory } from "./data/skills-data";

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
  category: SkillCategory;
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
  icon: iconMap[skill.iconName] || Code2,
  practicalAbilities: skill.practicalAbilities.map(ability => ({
    ...ability,
    icon: iconMap[ability.iconName] || Zap
  }))
}));

export { skillCategories };

export const getSkillsByCategory = (category: SkillCategory) =>
  skills.filter(skill => skill.category === category);

// Category icon map for rendering
export const categoryIconMap: Record<string, React.ElementType> = {
  Code2, Database, Server, Shield,
};
