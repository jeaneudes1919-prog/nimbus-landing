# README_PRODUCTION — Mise en production (à faire plus tard)

> Ce document est un **plan d'action**. Rien de ce qui suit n'est implémenté : le projet est aujourd'hui une landing page frontend statique, sans backend ni déploiement.

## Hébergement statique

Le build génère un dossier `dist/` entièrement statique.

- **Vercel / Netlify / Cloudflare Pages** : build command `npm run build`, output `dist`.
- **SPA routing** : configurer un fallback vers `index.html` (sinon la route 404 renvoie une vraie erreur HTTP au rechargement).
  - Netlify : `_redirects` avec `/* /index.html 200`.
  - Vercel : rewrite `{ "source": "/(.*)", "destination": "/index.html" }`.
- **Auto-hébergement** : Nginx avec `try_files $uri $uri/ /index.html;`.

## CI/CD

Pipeline minimal (GitHub Actions) :

1. `npm ci`
2. `npm run lint`
3. `npm run test`
4. `npm run build`
5. Déploiement du dossier `dist/` sur la branche `main`.

Ajouter un cache npm et un blocage du merge si une étape échoue.

## Variables d'environnement

Actuellement **aucune**. Lors du branchement d'un backend newsletter ou analytics :

- Préfixer par `VITE_` pour les variables exposées au client (elles sont publiques dans le bundle).
- Ne jamais mettre de clé secrète dans une variable `VITE_` : passer par un endpoint serverless.
- Fournir un `.env.example` et ignorer `.env` dans Git.

## Optimisations prévues

- **Découpage du bundle** : le chunk JS fait ~403 kB (~128 kB gzip) à cause de framer-motion et de tout lucide-react. Pistes : imports ciblés, `manualChunks`, chargement différé des sections sous la ligne de flottaison.
- **Images** : les avatars Unsplash sont chargés en distant. En production, les héberger en local en WebP/AVIF avec `srcset` et dimensions explicites.
- **Polices** : ne conserver que le sous-ensemble latin (les fichiers vietnamien/latin-ext sont émis par défaut).
- **SEO** : ajouter un sitemap, `robots.txt`, des balises Open Graph complètes et des données structurées JSON-LD (`SoftwareApplication`).
- **Analytics** : mesure d'audience respectueuse de la vie privée (Plausible ou Umami), sans cookies par défaut.

## Qualité et surveillance

- Tests end-to-end (Playwright) sur les parcours : menu mobile, bascule tarifaire, soumission newsletter.
- Audit Lighthouse en CI (objectif ≥ 95 en performance, accessibilité, SEO).
- Monitoring d'erreurs front (Sentry) et suivi des Web Vitals.
- Vérification de l'accessibilité avec `axe-core`.

## Conformité et mentions légales

Avant une mise en ligne réelle :

- Remplacer la société fictive du footer par les mentions légales exactes.
- Rédiger une vraie politique de confidentialité et un bandeau cookies si des traceurs sont ajoutés.
- Vérifier la conformité RGPD des formulaires (base légale, durée de conservation, droit d'accès/suppression).

## Définition de « prêt pour la production »

- [ ] Backend newsletter réel avec double opt-in
- [ ] Pages légales rédigées
- [ ] SPA fallback configuré
- [ ] Bundle découpé et budget de performance respecté
- [ ] CI/CD vert sur `main`
- [ ] Tests E2E et audit accessibilité passés
- [ ] Monitoring et alertes en place
