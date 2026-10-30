import { Routes } from '@angular/router';

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
