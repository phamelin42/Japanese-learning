import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RedirectCommand, ResolveFn, Route, Router } from '@angular/router';
import { MODULE_INDEX } from './module-index';
import { ModuleEntry, StudyModule } from './module.model';

function findEntry(route: ActivatedRouteSnapshot): ModuleEntry | undefined {
  return inject(MODULE_INDEX).find((entry) => entry.id === route.paramMap.get('id'));
}

/** Un module inconnu affiche la page introuvable, l'adresse tapée restant visible. */
const moduleResolver: ResolveFn<StudyModule> = (route, state) => {
  const entry = findEntry(route);
  if (entry) return entry.load();
  const router = inject(Router);
  return new RedirectCommand(router.parseUrl('/404'), { browserUrl: state.url });
};

const descriptionResolver: ResolveFn<string> = (route) => findEntry(route)?.summary ?? '';

interface ModuleRouteOptions {
  /** Titre de la page à partir du titre du module. */
  title?: (moduleTitle: string) => string;
  noindex?: boolean;
}

/**
 * Route d'une page qui reçoit un module (`input.required<StudyModule>()` nommé `module`), avec
 * son titre et sa description tirés de l'index.
 */
export function moduleRoutes(
  path: string,
  loadComponent: NonNullable<Route['loadComponent']>,
  options: ModuleRouteOptions = {},
): Route[] {
  return [
    {
      path,
      loadComponent,
      resolve: { module: moduleResolver, description: descriptionResolver },
      title: (route) => {
        const title = findEntry(route)?.title ?? '';
        return options.title ? options.title(title) : title;
      },
      data: options.noindex ? { noindex: true } : {},
    },
  ];
}
