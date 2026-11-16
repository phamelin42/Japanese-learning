import { isPlatformBrowser } from '@angular/common';
import { afterNextRender, DOCUMENT, inject, PLATFORM_ID, Service, signal } from '@angular/core';

/** Événement de Chrome et d'Edge (Android, ordinateur) : absent de Safari et de Firefox. */
interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

/**
 * L'installation du site comme application. Chrome propose l'installation par un événement qu'il
 * faut garder pour la déclencher depuis un bouton ; Safari n'en a pas, la page explique alors le
 * geste à faire. Créé au démarrage de l'application : l'événement ne se rejoue pas.
 */
@Service()
export class InstallPrompt {
  private readonly window = isPlatformBrowser(inject(PLATFORM_ID))
    ? inject(DOCUMENT).defaultView
    : null;
  private deferred: BeforeInstallPromptEvent | null = null;

  /** Le navigateur est prêt à installer : le bouton peut s'afficher. */
  readonly canInstall = signal(false);
  /** L'application tourne déjà installée (ou vient de l'être). */
  readonly installed = signal(false);

  constructor() {
    const window = this.window;
    if (!window) return;
    window.addEventListener('beforeinstallprompt', (event) => {
      event.preventDefault();
      this.deferred = event as BeforeInstallPromptEvent;
      this.canInstall.set(true);
    });
    window.addEventListener('appinstalled', () => {
      this.deferred = null;
      this.canInstall.set(false);
      this.installed.set(true);
    });
    // Lu après le premier rendu : le HTML pré-rendu ne sait pas comment la page est ouverte.
    afterNextRender(() => this.installed.set(this.isRunningInstalled()));
  }

  async install(): Promise<void> {
    const deferred = this.deferred;
    if (!deferred) return;
    // Un événement ne sert qu'une fois : le bouton disparaît, quelle que soit la réponse.
    this.deferred = null;
    this.canInstall.set(false);
    await deferred.prompt();
    if ((await deferred.userChoice).outcome === 'accepted') this.installed.set(true);
  }

  private isRunningInstalled(): boolean {
    const window = this.window;
    if (!window) return false;
    const iosStandalone = (window.navigator as { standalone?: boolean }).standalone === true;
    return iosStandalone || window.matchMedia?.('(display-mode: standalone)').matches === true;
  }
}
