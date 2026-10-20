import { Plug, GitBranch, Rocket } from "lucide-react";

export const STEPS = [
  {
    number: "01",
    title: "Connectez vos outils",
    description:
      "Choisissez parmi 150 intégrations et authentifiez-vous en quelques secondes. Aucune ligne de code requise.",
    icon: Plug,
    duration: "2 minutes",
  },
  {
    number: "02",
    title: "Composez votre workflow",
    description:
      "Glissez vos déclencheurs, conditions et actions sur le canevas. Testez en direct avant de publier.",
    icon: GitBranch,
    duration: "10 minutes",
  },
  {
    number: "03",
    title: "Laissez Nimbus travailler",
    description:
      "Activez votre automatisation. Nimbus exécute les tâches 24/7 et vous alerte en cas d'anomalie.",
    icon: Rocket,
    duration: "Toute la journée",
  },
];
