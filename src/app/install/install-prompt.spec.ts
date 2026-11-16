import { TestBed } from '@angular/core/testing';
import { InstallPrompt } from './install-prompt';

function installEvent(outcome: 'accepted' | 'dismissed') {
  const event = new Event('beforeinstallprompt', { cancelable: true }) as Event & {
    prompt: () => Promise<void>;
    userChoice: Promise<{ outcome: string }>;
  };
  event.prompt = vi.fn(() => Promise.resolve());
  event.userChoice = Promise.resolve({ outcome });
  return event;
}

describe('InstallPrompt', () => {
  it('propose l’installation quand le navigateur la propose, sans la montrer avant', () => {
    const service = TestBed.inject(InstallPrompt);
    expect(service.canInstall()).toBe(false);
    const event = installEvent('accepted');
    window.dispatchEvent(event);
    expect(service.canInstall()).toBe(true);
    // La bannière automatique du navigateur est retenue pour ne s'ouvrir que depuis le bouton.
    expect(event.defaultPrevented).toBe(true);
  });

  it('ouvre la boîte d’installation une seule fois et note l’installation acceptée', async () => {
    const service = TestBed.inject(InstallPrompt);
    const event = installEvent('accepted');
    window.dispatchEvent(event);
    await service.install();
    expect(event.prompt).toHaveBeenCalledTimes(1);
    expect(service.canInstall()).toBe(false);
    expect(service.installed()).toBe(true);
    await service.install();
    expect(event.prompt).toHaveBeenCalledTimes(1);
  });

  it('ne se croit pas installé après un refus', async () => {
    const service = TestBed.inject(InstallPrompt);
    window.dispatchEvent(installEvent('dismissed'));
    await service.install();
    expect(service.installed()).toBe(false);
    expect(service.canInstall()).toBe(false);
  });

  it('passe à « installée » à l’événement appinstalled', () => {
    const service = TestBed.inject(InstallPrompt);
    window.dispatchEvent(installEvent('accepted'));
    window.dispatchEvent(new Event('appinstalled'));
    expect(service.installed()).toBe(true);
    expect(service.canInstall()).toBe(false);
  });

  it('se sait installé quand la page s’ouvre en plein écran', async () => {
    vi.stubGlobal('matchMedia', (query: string) => ({ matches: query.includes('standalone') }));
    const service = TestBed.inject(InstallPrompt);
    TestBed.tick();
    await vi.waitFor(() => expect(service.installed()).toBe(true));
    vi.unstubAllGlobals();
  });
});
