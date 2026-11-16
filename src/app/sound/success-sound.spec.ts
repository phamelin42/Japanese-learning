import { TestBed } from '@angular/core/testing';
import { SOUND_STORAGE_KEY, SuccessSound } from './success-sound';

class FakeParam {
  setValueAtTime = vi.fn();
  exponentialRampToValueAtTime = vi.fn();
  value = 0;
}

function installFakeAudio() {
  const oscillators: { frequency: FakeParam; start: ReturnType<typeof vi.fn> }[] = [];
  class FakeContext {
    state = 'running';
    currentTime = 0;
    destination = {};
    resume = vi.fn();
    createOscillator() {
      const oscillator = {
        type: '',
        frequency: new FakeParam(),
        start: vi.fn(),
        stop: vi.fn(),
        connect: (node: unknown) => node,
      };
      oscillators.push(oscillator);
      return oscillator;
    }
    createGain() {
      return { gain: new FakeParam(), connect: (node: unknown) => node };
    }
  }
  vi.stubGlobal('AudioContext', FakeContext);
  return oscillators;
}

describe('SuccessSound', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => vi.unstubAllGlobals());

  it('joue deux notes quand il est activé', () => {
    const oscillators = installFakeAudio();
    TestBed.inject(SuccessSound).play();
    expect(oscillators).toHaveLength(2);
    expect(oscillators.every((oscillator) => oscillator.start.mock.calls.length === 1)).toBe(true);
  });

  it('ne joue rien une fois désactivé, et se souvient du choix', async () => {
    const oscillators = installFakeAudio();
    const sound = TestBed.inject(SuccessSound);
    sound.setEnabled(false);
    sound.play();
    expect(oscillators).toHaveLength(0);
    expect(localStorage.getItem(SOUND_STORAGE_KEY)).toBe('off');
  });

  it('relit le choix « désactivé » de l’appareil après le premier rendu', async () => {
    localStorage.setItem(SOUND_STORAGE_KEY, 'off');
    const sound = TestBed.inject(SuccessSound);
    expect(sound.enabled()).toBe(true);
    TestBed.tick();
    await vi.waitFor(() => expect(sound.enabled()).toBe(false));
  });

  it('reste silencieux, sans erreur, quand le navigateur n’a pas d’audio', () => {
    vi.stubGlobal('AudioContext', undefined);
    expect(() => TestBed.inject(SuccessSound).play()).not.toThrow();
  });
});
