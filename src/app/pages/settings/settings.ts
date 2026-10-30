import { Component, computed, inject, ViewEncapsulation } from '@angular/core';
import { FdSwitch, FdThemeService } from '@phamelin/fuda';

@Component({
  selector: 'app-settings-page',
  imports: [FdSwitch],
  templateUrl: './settings.html',
  styleUrl: './settings.scss',
  encapsulation: ViewEncapsulation.None,
})
export class SettingsPage {
  private readonly themeService = inject(FdThemeService);

  protected readonly isDark = computed(() => this.themeService.theme() === 'dark');

  protected setDark(dark: boolean): void {
    this.themeService.set(dark ? 'dark' : 'light');
  }
}
