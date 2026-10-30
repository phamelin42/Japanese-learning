import {
  afterNextRender,
  ApplicationRef,
  Component,
  DOCUMENT,
  inject,
  ViewEncapsulation,
} from '@angular/core';
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
    const appRef = inject(ApplicationRef);
    afterNextRender(() => {
      sync.start();
      // Prête quand la page (chargée à la demande) est hydratée : avant, un toucher n'est que
      // rejoué. Les e2e attendent ce signal pour interagir.
      void appRef.whenStable().then(() => root.setAttribute('data-app-ready', ''));
    });
  }
}
