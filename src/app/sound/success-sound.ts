import { isPlatformBrowser } from '@angular/common';
import { afterNextRender, DOCUMENT, inject, PLATFORM_ID, Service, signal } from '@angular/core';

export const SOUND_STORAGE_KEY = 'jl.sound';

// Deux notes qui montent (la6 puis mi7) : court, net, et audible sans casque dans un train.
const NOTES = [
  { frequency: 880, start: 0 },
  { frequency: 1318.5, start: 0.11 },
] as const;
const NOTE_SECONDS = 0.28;
const PEAK_GAIN = 0.16;

/**
 * Le petit son d'une bonne réponse, synthétisé (aucun fichier à charger). Activé par défaut ;
 * le choix est gardé en `localStorage`, lu après le premier rendu comme la progression pour ne
 * pas faire diverger l'hydratation. Rien ne sonne au pré-rendu.
 */
@Service()
export class SuccessSound {
  private readonly window = isPlatformBrowser(inject(PLATFORM_ID))
    ? inject(DOCUMENT).defaultView
    : null;
  private context: AudioContext | null = null;

  readonly enabled = signal(true);

  constructor() {
    if (this.window) afterNextRender(() => this.enabled.set(this.read()));
  }

  setEnabled(enabled: boolean): void {
    this.enabled.set(enabled);
    try {
      this.window?.localStorage.setItem(SOUND_STORAGE_KEY, enabled ? 'on' : 'off');
    } catch {
      // Stockage refusé (navigation privée) : le choix vaut pour la visite en cours.
    }
  }

  /** À appeler depuis un geste (l'envoi de la réponse) : sans lui, le navigateur reste muet. */
  play(): void {
    if (!this.enabled() || !this.window) return;
    try {
      const AudioContextClass =
        this.window.AudioContext ??
        (this.window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioContextClass) return;
      this.context ??= new AudioContextClass();
      const context = this.context;
      if (context.state === 'suspended') void context.resume();
      const now = context.currentTime;
      for (const note of NOTES) {
        const oscillator = context.createOscillator();
        const gain = context.createGain();
        const start = now + note.start;
        oscillator.type = 'sine';
        oscillator.frequency.value = note.frequency;
        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.exponentialRampToValueAtTime(PEAK_GAIN, start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + NOTE_SECONDS);
        oscillator.connect(gain).connect(context.destination);
        oscillator.start(start);
        oscillator.stop(start + NOTE_SECONDS + 0.02);
      }
    } catch {
      // Pas d'audio disponible : la réponse reste validée, sans son.
    }
  }

  private read(): boolean {
    try {
      return this.window?.localStorage.getItem(SOUND_STORAGE_KEY) !== 'off';
    } catch {
      return true;
    }
  }
}
