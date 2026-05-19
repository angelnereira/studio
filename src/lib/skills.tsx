

import * as React from "react";
import { Server, Shield, Zap, Layers, Code2, Database, GitBranch, Cloud, Settings2, BrainCircuit, Smartphone, Bluetooth, Rss } from "lucide-react";
import { FaDocker, FaGitAlt } from "react-icons/fa";
import { SiTypescript, SiPostgresql, SiVercel, SiJavascript, SiGooglecloud, SiGo, SiRedis, SiRailway, SiRust, SiKotlin } from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";
import { LinuxIcon, PrismaIcon, NeonIcon, SqlIcon } from "./icons";
import { skillsData, skillCategories, getSkillsData, getSkillCategories, type SkillCategory } from "./data/skills-data";

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
  SiGo,
  SiRust,
  SiKotlin,
  SiPostgresql,
  PrismaIcon,
  NeonIcon,
  SqlIcon,
  SiRedis,
  BullMQIcon: Rss, // BullMQ uses Rss as a reasonable queue/stream stand-in icon
  FaDocker,
  SiRailway,
  SiVercel,
  SiGooglecloud,
  FaGitAlt,
  LinuxIcon,
  BluetoothIcon: Bluetooth,
  BrainCircuit,
  Smartphone,
  Zap,
  Server,
  Shield,
  Layers,
  Code2,
  Database,
  GitBranch,
  Cloud,
  Settings2,
};

const mapToSkills = (data: typeof skillsData): Skill[] =>
  data.map(skill => ({
    ...skill,
    icon: iconMap[skill.iconName] || Code2,
    practicalAbilities: skill.practicalAbilities.map(ability => ({
      ...ability,
      icon: iconMap[ability.iconName] || Zap
    }))
  }));

export const skills: Skill[] = mapToSkills(skillsData);

export { skillCategories };

export const getSkillsByCategory = (category: SkillCategory) =>
  skills.filter(skill => skill.category === category);

export function getSkillsForLocale(locale: string = 'es'): Skill[] {
  return mapToSkills(getSkillsData(locale));
}

export function getSkillCategoriesForLocale(locale: string = 'es') {
  return getSkillCategories(locale);
}

// Category icon map for rendering — one entry per SkillCategory id
export const categoryIconMap: Record<string, React.ElementType> = {
  Code2,       // frontend
  Server,      // backend
  Database,    // data
  Settings2,   // devops
  Cloud,       // cloud
  Shield,      // security
  Smartphone,  // mobile-systems
  BrainCircuit, // ai-engineering
};
