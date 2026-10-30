import { TestBed } from '@angular/core/testing';
import { FdThemeService } from '@phamelin/fuda';
import { SettingsPage } from './settings';

describe('SettingsPage', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => document.documentElement.removeAttribute('data-theme'));

  it('passe en thème Nuit avec l’interrupteur', async () => {
    const fixture = TestBed.createComponent(SettingsPage);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const toggle = el.querySelector<HTMLInputElement>('fd-switch input');
    expect(toggle?.checked).toBe(false);

    toggle?.click();
    await fixture.whenStable();

    expect(TestBed.inject(FdThemeService).theme()).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });
});
