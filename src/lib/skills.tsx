

import * as React from "react";
import { Server, Shield, Zap, Layers, Code2, Database, GitBranch, Cloud, Settings2, BrainCircuit } from "lucide-react";
import { FaDocker, FaGitAlt } from "react-icons/fa";
import { SiTypescript, SiPostgresql, SiVercel, SiKubernetes, SiJavascript, SiGooglecloud, SiGo, SiRedis, SiApachekafka, SiTerraform, SiRailway } from "react-icons/si";
import { TbBrandNextjs } from "react-icons/tb";
import { LinuxIcon, PrismaIcon, NeonIcon, OracleCloudIcon, SqlIcon, MinioIcon } from "./icons";
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
  SiGo,
  SiPostgresql,
  PrismaIcon,
  NeonIcon,
  SqlIcon,
  SiRedis,
  SiApachekafka,
  SiMinio: MinioIcon,
  FaDocker,
  SiKubernetes,
  SiTerraform,
  SiRailway,
  SiVercel,
  SiGooglecloud,
  OracleCloudIcon,
  FaGitAlt,
  LinuxIcon,
  BrainCircuit,
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

// Category icon map for rendering — one entry per SkillCategory id
export const categoryIconMap: Record<string, React.ElementType> = {
  Code2,       // frontend
  Server,      // backend
  Database,    // data
  Settings2,   // devops
  Cloud,       // cloud
  Shield,      // security
  BrainCircuit, // ai-engineering
};
