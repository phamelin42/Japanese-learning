import { RenderMode, ServerRoute } from '@angular/ssr';
import { MODULES } from './content/modules';

const moduleParams = async () => MODULES.map(({ id }) => ({ id }));

export const serverRoutes: ServerRoute[] = [
  { path: '', renderMode: RenderMode.Prerender },
  { path: 'reglages', renderMode: RenderMode.Prerender },
  { path: 'module/:id', renderMode: RenderMode.Prerender, getPrerenderParams: moduleParams },
  {
    path: 'module/:id/entrainement',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: moduleParams,
  },
  { path: '404', renderMode: RenderMode.Prerender },
  // Une adresse inconnue reçoit la page 404 pré-rendue ; le client prend le relais.
  { path: '**', renderMode: RenderMode.Client },
];
