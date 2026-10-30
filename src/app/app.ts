import { afterNextRender, Component, DOCUMENT, inject, ViewEncapsulation } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ProgressSync } from './progress/progress-sync';
import { SITE_NAME } from './seo/page-title-strategy';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  encapsulation: ViewEncapsulation.None,
  host: { class: 'app' },
})
export class App {
  protected readonly siteName = SITE_NAME;

  constructor() {
    const root = inject(DOCUMENT).documentElement;
    const sync = inject(ProgressSync);
    afterNextRender(() => {
      // Fin de l'hydratation : avant, un clic n'est que rejoué. Les e2e attendent ce signal.
      root.setAttribute('data-app-ready', '');
      sync.start();
    });
  }
}
