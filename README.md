# Nimbus — Landing page SaaS

Landing page premium pour **Nimbus**, un produit SaaS fictif d'automatisation pour équipes (inspiration Linear / Vercel / Stripe). Interface 100 % en français, thème sombre, animations fluides et maquette de dashboard entièrement construite en JSX/CSS.

![Statut](https://img.shields.io/badge/statut-terminé-7C5CFF) ![Tests](https://img.shields.io/badge/tests-46%20passés-22D3EE) ![React](https://img.shields.io/badge/React-18-7C5CFF)

## ✨ Fonctionnalités

- **Navbar en verre dépoli** : liens avec scroll fluide, bouton « Essai gratuit », menu mobile plein écran animé (Échap + piège de focus), compactage après 40 px de scroll.
- **Hero spectaculaire** : titre avec mot en dégradé animé, badge « Nouveau », bouton magnétique, maquette de dashboard interactive (parallaxe souris + scroll, tilt 3D, graphiques animés, cartes flottantes).
- **Bandeau de logos clients** en défilement infini (marquee CSS), pause au survol.
- **Fonctionnalités en grille bento** : 6 cartes de tailles différentes, halo lumineux qui suit le curseur, légère inclinaison 3D et mini-visuel animé propre à chaque carte.
- **Comment ça marche** : 3 étapes avec ligne de progression qui se dessine au scroll.
- **Chiffres clés** : compteurs animés déclenchés une seule fois à l'apparition (intersection observer).
- **Tarifs** : 3 offres (Starter, Pro mise en avant, Entreprise), bascule Mensuel / Annuel −20 % avec **prix animés**, avantages avec coches, CTA par offre, choix mémorisé en `localStorage`.
- **Témoignages** : carrousel avec défilement automatique (6 s), pause au survol, flèches, points cliquables, navigation clavier (← →) et glissement tactile.
- **FAQ** : accordéon animé, une seule question ouverte à la fois, entièrement accessible au clavier (`aria-expanded`, `aria-controls`).
- **CTA + newsletter** : validation d'email, état de chargement simulé (squelette + spinner), message de succès animé, message d'erreur, toast de confirmation.
- **Footer complet** : colonnes de liens, réseaux sociaux, mentions légales fictives, bouton « retour en haut » qui apparaît au scroll.
- **Page 404** soignée avec suggestions de navigation.
- **Animations respectueuses** de `prefers-reduced-motion` (framer-motion + CSS).
- **Images robustes** via `SafeImage` : fallback dégradé + icône en cas d'échec, fondu à l'apparition.

## 🛠 Stack technique

| Outil | Usage |
| --- | --- |
| React 18 + Vite 5 | Base applicative et build |
| React Router 7 | Routes `/` et 404, transitions de pages |
| Tailwind CSS 3.4 | Design system (tokens, dark mode, utilitaires) |
| Framer Motion | Animations, parallaxe, carrousel, apparitions au scroll |
| Lucide React | Iconographie |
| @fontsource-variable/plus-jakarta-sans | Police auto-hébergée (pas de CDN) |
| Vitest + Testing Library | Tests unitaires et composants |

## 🚀 Installation et scripts

```bash
npm install        # installe les dépendances
npm run dev        # serveur de développement (http://localhost:5173)
npm run test       # lance la suite de tests (46 tests)
npm run lint       # analyse ESLint (0 erreur)
npm run build      # build de production dans dist/
npm run preview    # prévisualise le build
```

## 📁 Structure du projet

```
src/
├── components/
│   ├── brand/           # Logo SVG
│   ├── cta/             # Bloc final + formulaire newsletter
│   ├── faq/             # Accordéon accessible
│   ├── features/        # Grille bento, visuals animés, marquee
│   ├── hero/            # Hero + maquette de dashboard
│   ├── how-it-works/    # Étapes + ligne de progression
│   ├── layout/          # Navbar, Footer, bouton retour en haut
│   ├── pricing/         # Offres + bascule mensuel/annuel
│   ├── stats/           # Chiffres clés avec compteurs
│   ├── testimonials/    # Carrousel
│   └── ui/              # Container, Badge, MagneticButton, Toast, SafeImage, Counter…
├── data/                # Données de démo réalistes (features, tarifs, FAQ…)
├── hooks/               # useScrolled, useLockBodyScroll, ScrollToTopOnRouteChange
├── lib/                 # Fonctions pures testables (pricing, email, counter, storage)
├── pages/               # HomePage, NotFoundPage
└── test/                # Setup Vitest (mocks jsdom)
```

## 📸 Captures d'écran

> _Emplacements prévus — ajouter les captures après déploiement :_

| Vue | Capture |
| --- | --- |
| Hero + maquette de dashboard | `docs/captures/hero.png` |
| Grille bento des fonctionnalités | `docs/captures/fonctionnalites.png` |
| Tarifs avec bascule annuelle | `docs/captures/tarifs.png` |
| Carrousel de témoignages | `docs/captures/temoignages.png` |
| Vue mobile (menu ouvert) | `docs/captures/mobile.png` |

## 🎯 Ce que ce projet démontre

- **Architecture propre** : composants courts (< 250 lignes), logique métier isolée dans `src/lib` (fonctions pures testées), données séparées dans `src/data`.
- **Qualité UI/UX** : design system cohérent (tokens Tailwind + variables CSS), typographie soignée, micro-interactions, états de chargement et d'erreur.
- **Performance et accessibilité** : animations uniquement sur `transform`/`opacity`, respect de `prefers-reduced-motion`, ARIA, navigation clavier complète, contraste AA.
- **Culture de test** : 46 tests Vitest/Testing Library couvrant la logique pure et les comportements clés (accordéon, carrousel, menu mobile, tarifs, compteurs).
- **Responsive mobile-first** vérifié de 360 px à 1440 px, sans débordement horizontal.
