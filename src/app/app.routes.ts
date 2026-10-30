import { Routes } from '@angular/router';
import { moduleRoutes } from './content/module-resolver';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home').then((m) => m.HomePage),
    data: {
      description:
        'Réviser le vocabulaire et les points faibles de mes cours de japonais, module par module.',
    },
  },
  {
    path: 'reglages',
    title: 'Réglages',
    loadComponent: () => import('./pages/settings/settings').then((m) => m.SettingsPage),
    data: { description: 'Thème d’affichage et synchronisation de la progression.' },
  },
  ...moduleRoutes('module/:id', () => import('./pages/module/module').then((m) => m.ModulePage)),
  ...moduleRoutes(
    'module/:id/entrainement',
    () => import('./pages/practice/practice').then((m) => m.PracticePage),
    // Page d'exercice sans contenu propre : hors des moteurs et du sitemap.
    { title: (title) => `Entraînement · ${title}`, noindex: true },
  ),
  {
    // Pré-rendue en `404.html` (tools/postbuild.mjs) : Vercel la sert avec le statut 404.
    path: '404',
    title: 'Page introuvable',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFoundPage),
    data: { description: 'Cette page n’existe pas.', noindex: true },
  },
  {
    path: '**',
    title: 'Page introuvable',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFoundPage),
    data: { description: 'Cette page n’existe pas.', noindex: true },
  },
];
