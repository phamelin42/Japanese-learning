import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'reglages', renderMode: RenderMode.Prerender },
  { path: '404', renderMode: RenderMode.Prerender },
  // Une adresse inconnue reçoit la page 404 pré-rendue ; le client prend le relais.
  { path: '**', renderMode: RenderMode.Client },
];
