import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { FdThemeService } from '@phamelin/fuda';
import { ProgressSync, SyncState } from '../../progress/progress-sync';
import { SettingsPage } from './settings';

function fakeSync() {
  return {
    secret: signal<string | null>(null),
    state: signal<SyncState>('off'),
    lastSyncAt: signal<string | null>(null),
    setSecret: vi.fn(),
    syncNow: vi.fn(() => Promise.resolve()),
  };
}

describe('SettingsPage', () => {
  let sync: ReturnType<typeof fakeSync>;

  beforeEach(() => {
    localStorage.clear();
    sync = fakeSync();
    TestBed.configureTestingModule({ providers: [{ provide: ProgressSync, useValue: sync }] });
  });
  afterEach(() => document.documentElement.removeAttribute('data-theme'));

  async function render() {
    const fixture = TestBed.createComponent(SettingsPage);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const button = (name: string) =>
      [...document.querySelectorAll<HTMLButtonElement>('button')].find(
        (b) => b.textContent?.trim() === name,
      );
    return { fixture, el, button };
  }

  it('passe en thème Nuit avec l’interrupteur', async () => {
    const { fixture, el } = await render();
    const toggle = el.querySelector<HTMLInputElement>('fd-switch input');
    expect(toggle?.checked).toBe(false);

    toggle?.click();
    await fixture.whenStable();

    expect(TestBed.inject(FdThemeService).theme()).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('enregistre le code saisi et lance une synchronisation', async () => {
    const { fixture, el } = await render();
    const field = el.querySelector<HTMLInputElement>('fd-text-field input')!;
    expect(field.type).toBe('password');
    field.value = 'ma phrase';
    field.dispatchEvent(new Event('input'));
    await fixture.whenStable();
    el.querySelector('form')!.dispatchEvent(new Event('submit', { cancelable: true }));
    await fixture.whenStable();
    expect(sync.setSecret).toHaveBeenCalledWith('ma phrase');
    expect(sync.syncNow).toHaveBeenCalled();
    expect(field.value).toBe('');
  });

  it('n’enregistre pas un code vide', async () => {
    const { fixture, el } = await render();
    el.querySelector('form')!.dispatchEvent(new Event('submit', { cancelable: true }));
    await fixture.whenStable();
    expect(sync.setSecret).not.toHaveBeenCalled();
  });

  it.each<[SyncState, RegExp]>([
    ['off', /la progression reste sur cet appareil/],
    ['syncing', /Synchronisation en cours/],
    ['ok', /Synchronisé à \d{1,2} h \d{2}/],
    ['unauthorized', /Code refusé/],
    ['error', /Serveur injoignable/],
  ])('dit l’état de la synchronisation : %s', async (state, text) => {
    sync.state.set(state);
    sync.lastSyncAt.set('2026-10-30T10:05:00.000Z');
    const { el } = await render();
    expect(el.querySelector('[role="status"]')?.textContent).toMatch(text);
  });

  // La fermeture du dialogue attend la fin de son animation, que jsdom ne joue pas :
  // la confirmation est vérifiée dans e2e/settings.spec.ts.
  it('demande confirmation avant d’oublier le code', async () => {
    sync.secret.set('ma phrase');
    const { fixture, button } = await render();
    button('Oublier ce code sur cet appareil')!.click();
    await fixture.whenStable();
    expect(document.querySelector('[role="alertdialog"]')?.textContent).toContain(
      'Oublier le code sur cet appareil ?',
    );
    expect(button('Oublier le code')).toBeDefined();
    expect(sync.setSecret).not.toHaveBeenCalled();
  });

  it('ne propose d’oublier le code que s’il y en a un', async () => {
    const { button } = await render();
    expect(button('Oublier ce code sur cet appareil')).toBeUndefined();
  });
});
