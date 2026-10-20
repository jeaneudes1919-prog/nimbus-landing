import {
  Workflow,
  Layers,
  Shield,
  Zap,
  Sparkles,
  Network,
} from "lucide-react";

export const FEATURES = [
  {
    id: "workflows",
    title: "Workflows sans code",
    description:
      "Assemblez vos automatisations à la souris. Déclencheurs, conditions et actions s'enchaînent en quelques secondes.",
    icon: Workflow,
    span: "lg:col-span-2",
    accent: "primary",
    visual: "workflow",
  },
  {
    id: "temps-reel",
    title: "Sync en temps réel",
    description:
      "Vos données circulent instantanément entre tous vos outils, sans import manuel.",
    icon: Zap,
    span: "lg:col-span-1",
    accent: "accent",
    visual: "pulse",
  },
  {
    id: "equipes",
    title: "Espaces d'équipe",
    description:
      "Invitez vos collaborateurs, définissez les rôles et travaillez sur les mêmes workflows.",
    icon: Layers,
    span: "lg:col-span-1",
    accent: "accent",
    visual: "team",
  },
  {
    id: "analytics",
    title: "Analytics actionnable",
    description:
      "Suivez le temps gagné, les tâches exécutées et les goulots d'étranglement de vos process.",
    icon: Sparkles,
    span: "lg:col-span-2",
    accent: "primary",
    visual: "chart",
  },
  {
    id: "integrations",
    title: "150+ intégrations",
    description:
      "Slack, Notion, HubSpot, Stripe, Airtable… connectez vos outils préférés en un clic.",
    icon: Network,
    span: "lg:col-span-1",
    accent: "primary",
    visual: "integrations",
  },
  {
    id: "securite",
    title: "Sécurité de niveau entreprise",
    description:
      "Chiffrement AES-256, SSO, journal d'audit et hébergement européen certifié ISO 27001.",
    icon: Shield,
    span: "lg:col-span-2",
    accent: "accent",
    visual: "security",
  },
];
