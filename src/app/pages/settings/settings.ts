import { Component, computed, inject, signal, ViewEncapsulation } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { FdButton, FdDialog, FdSwitch, FdTextField, FdThemeService } from '@phamelin/fuda';
import { ProgressSync } from '../../progress/progress-sync';
import { ForgetSecretDialog } from './forget-secret-dialog';

/** « 14 h 05 », à l'heure de l'appareil. */
function formatTime(iso: string): string {
  const date = new Date(iso);
  return `${date.getHours()} h ${String(date.getMinutes()).padStart(2, '0')}`;
}

@Component({
  selector: 'app-settings-page',
  imports: [FormField, FdButton, FdSwitch, FdTextField],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
  encapsulation: ViewEncapsulation.None,
})
export class SettingsPage {
  private readonly themeService = inject(FdThemeService);
  private readonly dialog = inject(FdDialog);
  protected readonly sync = inject(ProgressSync);

  protected readonly isDark = computed(() => this.themeService.theme() === 'dark');

  protected readonly secretModel = signal({ code: '' });
  protected readonly secretForm = form(this.secretModel);

  protected readonly syncMessage = computed(() => {
    switch (this.sync.state()) {
      case 'off':
        return 'Synchronisation désactivée : la progression reste sur cet appareil.';
      case 'syncing':
        return 'Synchronisation en cours…';
      case 'ok': {
        const at = this.sync.lastSyncAt();
        return at ? `Synchronisé à ${formatTime(at)}.` : 'Synchronisé.';
      }
      case 'unauthorized':
        return 'Code refusé : vérifie-le, c’est le même sur tous tes appareils.';
      case 'error':
        return 'Serveur injoignable : nouvel essai au prochain changement.';
    }
  });

  protected setDark(dark: boolean): void {
    this.themeService.set(dark ? 'dark' : 'light');
  }

  protected saveSecret(event: Event): void {
    event.preventDefault();
    const code = this.secretModel().code.trim();
    if (!code) return;
    this.sync.setSecret(code);
    this.secretModel.set({ code: '' });
    void this.sync.syncNow();
  }

  protected forgetSecret(): void {
    this.dialog
      .open<boolean>(ForgetSecretDialog, { role: 'alertdialog' })
      .closed.subscribe((confirmed) => {
        if (confirmed) this.sync.setSecret(null);
      });
  }
}
