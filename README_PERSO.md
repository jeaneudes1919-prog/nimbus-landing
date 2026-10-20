# README_PERSO — Notes d'apprentissage

Document personnel : ce que ce projet m'a appris, comment le refaire, quoi améliorer, et les pièges à éviter.

## 🧠 Améliorations classées par difficulté

### Niveau collège — les bases

1. **Changer les couleurs** : modifier `tailwind.config.js` (tokens `primary`, `accent`, `bg`) et vérifier que tout le site suit.
2. **Modifier les textes** : les données sont centralisées dans `src/data/` — aucun texte marketing n'est codé en dur dans les composants.
3. **Ajouter une question FAQ** : un objet dans `src/data/faq.js` suffit, l'accordéon se met à jour seul.
4. **Changer un témoignage** : `src/data/testimonials.js` + une URL Unsplash.

### Niveau lycée — comprendre les mécanismes

5. **Ajouter une offre tarifaire** : éditer `src/data/pricing.js`. La grille s'adapte (`md:grid-cols-3` → à passer à 4 colonnes).
6. **Modifier la remise annuelle** : `ANNUAL_DISCOUNT` dans `src/lib/pricing.js`, puis relancer les tests — c'est justement leur rôle.
7. **Ajouter un lien de navigation** : `NAV_LINKS` dans `src/data/site.js` + une `id` sur la section correspondante.
8. **Ajouter une intégration dans le visuel** : tableau `TOOLS` dans `FeatureVisual.jsx`.
9. **Changer l'intervalle du carrousel** : `AUTOPLAY_DELAY` dans `Testimonials.jsx`.

### Niveau professionnel — architecture et qualité

10. **Extraire un hook** : la logique de bascule de facturation pourrait devenir `useBilling()`.
11. **Généraliser le compteur** : `Counter` fonctionne déjà pour les entiers ; prévoir les décimales et les formats localisés.
12. **Internationaliser** : extraire les textes dans des fichiers de traduction (`fr.json`, `en.json`) + un contexte de langue.
13. **Tester l'accessibilité** : ajouter `vitest-axe` et vérifier chaque section.
14. **Migrer vers Next.js** : récupérer le design system et les composants, convertir les pages en App Router.

## ✏️ Exercices pour progresser (avec indices)

### Exercice 1 — Ajouter un thème clair

**Objectif** : un toggle soleil/lune qui persiste le choix.
**Indices** : `darkMode: "class"` est déjà dans la config Tailwind ; il faut une classe `dark` sur `<html>`, des variables CSS pour le clair, et un stockage `localStorage` via `src/lib/storage.js`.
**Piège** : les couleurs codées en dur (`bg-[#0B0B12]`) dans la maquette du dashboard devront devenir des variables.

### Exercice 2 — Ajouter un filtre de témoignages par entreprise

**Objectif** : des puces « Tous / Ops / Produit / Finance » au-dessus du carrousel.
**Indices** : ajouter un champ `sector` aux données, un état `filter`, recalculer la liste et réinitialiser l'index quand le filtre change.
**Piège** : l'auto-play doit repartir de `0` après un changement de filtre, sinon l'index dépasse la nouvelle longueur.

### Exercice 3 — Remplacer la newsletter par un vrai appel API

**Objectif** : POST vers une route `/api/newsletter` avec gestion des statuts 200/400/500.
**Indices** : remplacer le `setTimeout` de `NewsletterForm.jsx` par `fetch`, garder les états `loading/success/error`, afficher un message différent selon le code HTTP.
**Piège** : toujours nettoyer l'`AbortController` au démontage pour éviter une mise à jour d'état sur composant démonté.

### Exercice 4 — Ajouter une section « Calculateur d'économies »

**Objectif** : un slider « heures perdues par semaine » qui estime les heures et l'argent économisés par an.
**Indices** : composant contrôlé, formule pure dans `src/lib/`, tests unitaires sur la formule, animation du résultat avec `Counter`.
**Piège** : arrondir côté affichage uniquement, jamais dans les calculs intermédiaires.

### Exercice 5 — Rendre la maquette du dashboard réellement interactive

**Objectif** : cliquer sur « Workflows » dans la sidebar change le contenu affiché.
**Indices** : état `activeView` dans `DashboardMockup`, petits composants de vue, transitions `AnimatePresence`.
**Piège** : garder la maquette décorative en `aria-hidden` si elle reste non fonctionnelle ; sinon, lui donner un vrai rôle accessible.

## 🔑 Concepts clés et où les trouver

| Concept | Fichier | Ce qu'il faut retenir |
| --- | --- | --- |
| Animations déclaratives | `src/components/hero/Hero.jsx` | `useMotionValue` + `useSpring` pour le tilt, `useScroll` + `useTransform` pour la parallaxe |
| Ligne dessinée au scroll | `src/components/how-it-works/HowItWorks.jsx` | `useScroll({ target, offset })` puis `scaleX` sur un trait |
| Compteurs déclenchés une fois | `src/components/ui/Counter.jsx` | `useInView(ref, { once: true })` + `setInterval` nettoyé |
| Fonctions pures testables | `src/lib/pricing.js` | Aucun accès au DOM/React → tests instantanés et fiables |
| Accordéon accessible | `src/components/faq/Faq.jsx` | `aria-expanded`, `aria-controls`, contenu monté uniquement à l'ouverture |
| Carrousel complet | `src/components/testimonials/Testimonials.jsx` | Index modulo, pause au survol, swipe, clavier, `role="tablist"` |
| Piège de focus | `src/components/layout/Navbar.jsx` | Boucle Tab/Shift+Tab, fermeture Échap, focus rendu au bouton |
| Persistance légère | `src/lib/storage.js` | `try/catch` systématique : le stockage peut être bloqué (navigation privée) |
| Images robustes | `src/components/ui/SafeImage.jsx` | États `loading/loaded/error`, fallback visuel, jamais d'image cassée |

## ⚠️ Erreurs fréquentes (et comment les éviter)

1. **Syntaxe TypeScript dans un projet JS** : `const [x, setX] = useState<number>(0)` casse esbuild. Rester en JS pur ou renommer en `.tsx` et configurer TypeScript.
2. **Icônes lucide inexistantes** : cette version n'exporte pas `Twitter`, `GitHub`, `LinkedIn`, `Home` ni `BarChart3`. Utiliser `Github`/`Linkedin` quand disponibles, sinon des SVG maison (c'est ce qui a été fait dans le footer), et `House` au lieu de `Home`.
3. **Apostrophes en JSX** : `react/no-unescaped-entities` échoue. Utiliser l'apostrophe typographique `’` (meilleure typographie de toute façon).
4. **`module.exports` dans un projet ESM** : `package.json` contient `"type": "module"` → utiliser `export default` dans `tailwind.config.js` et `postcss.config.js`.
5. **Oublier les directives Tailwind** : sans `@tailwind base/components/utilities` dans `index.css`, aucune classe ne s'applique.
6. **Animations infinies non désactivées** : toujours associer `motion-reduce:animate-none` ou `useReducedMotion()`.
7. **Tests dépendants des animations** : tester les attributs ARIA (`aria-expanded`, `aria-selected`) plutôt que la présence d'éléments animés en sortie.
8. **Prix formatés avec `Intl`** : les espaces insécables (U+202F) cassent les assertions naïves — normaliser dans les tests (`replace(/\u202f|\u00a0/g, " ")`).

## 🧭 Décisions techniques et pourquoi

- **Pas de bibliothèque d'état** : l'état local suffit (un carrousel, un accordéon, un formulaire). Ajouter Zustand/Redux serait de la complexité gratuite.
- **Framer Motion plutôt que CSS pur** : les animations d'apparition, la parallaxe et les transitions de page demandent une orchestration difficile à maintenir en CSS seul. Les animations décoratives simples (marquee, aurora, pulse) restent en CSS pour la performance.
- **Logique métier dans `src/lib`** : les calculs de prix et la validation d'email sont des fonctions pures, donc testables sans DOM et réutilisables (par exemple côté futur backend).
- **Données dans `src/data`** : facilite la modification du contenu sans toucher au JSX, et prépare une éventuelle récupération depuis une API/CMS.
- **Tests comportementaux** : Testing Library interroge l'interface comme un utilisateur (rôles ARIA, labels) plutôt que les détails d'implémentation.
- **Vitest 4.1.12 + `--legacy-peer-deps`** : Vitest 5 exige une version de Vite incompatible avec Vite 5.4 ; cette combinaison est stable et suffisante.
- **Un composant par fichier, < 250 lignes** : lisibilité, revue de code plus simple, pas de fichiers fourre-tout.

## 📚 Pour aller plus loin

- Documentation Framer Motion : `useScroll`, `useTransform`, `AnimatePresence`, `useReducedMotion`.
- Accessibilité des accordéons : pattern WAI-ARIA « Accordion ».
- Pattern WAI-ARIA « Carousel » pour les rôles `tablist`/`tab`.
- `Intl.NumberFormat` pour les formats monétaires localisés.
