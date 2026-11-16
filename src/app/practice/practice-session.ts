import { computed, inject, Injectable, signal } from '@angular/core';
import { checkAnswer, hasSmallKanaSlip } from '../answers/check-answer';
import { RANDOM } from '../random';
import { Question } from './question';

export type PracticeStatus = 'asking' | 'right' | 'wrong' | 'done';

/**
 * Une série d'entraînement : questions mélangées, une question ratée revient en fin de file
 * jusqu'à être réussie. Fournie par la page d'entraînement (une série par page).
 */
@Injectable()
export class PracticeSession {
  private readonly random = inject(RANDOM);

  private readonly queue = signal<readonly Question[]>([]);
  private readonly missed = signal<ReadonlySet<string>>(new Set());
  private readonly total = signal(0);

  readonly status = signal<PracticeStatus>('done');
  readonly lastInput = signal('');
  /** Bonne réponse, mais un petit kana (ゃ ゅ ょ っ) a été tapé en taille normale. */
  readonly smallKanaSlip = signal(false);
  readonly current = computed(() => (this.status() === 'done' ? null : (this.queue()[0] ?? null)));
  readonly remaining = computed(() => this.queue().length);
  readonly firstTryScore = computed(() => ({
    right: this.total() - this.missed().size,
    total: this.total(),
  }));

  start(questions: readonly Question[]): void {
    this.queue.set(this.shuffle(questions));
    this.missed.set(new Set());
    this.total.set(questions.length);
    this.lastInput.set('');
    this.smallKanaSlip.set(false);
    this.status.set(questions.length > 0 ? 'asking' : 'done');
  }

  /**
   * `input` est ce que le champ affiche (et ce qu'on rappelle après une faute). `typed` est le
   * rōmaji réellement tapé quand le champ l'a transformé en kana : une graphie que le kana ne
   * garde pas (« nn » pour ん, « wa » pour la particule は) reste ainsi acceptée.
   */
  submit(input: string, typed: string | null = null): void {
    const question = this.current();
    if (this.status() !== 'asking' || !question || input.trim() === '') return;
    this.lastInput.set(input);
    const { accepted, answerLang } = question;
    const rightAsTyped = typed !== null && checkAnswer(typed, accepted, answerLang);
    if (rightAsTyped || checkAnswer(input, accepted, answerLang)) {
      this.smallKanaSlip.set(!rightAsTyped && hasSmallKanaSlip(input, accepted, answerLang));
      this.status.set('right');
    } else {
      this.missed.update((missed) => new Set(missed).add(question.id));
      this.status.set('wrong');
    }
  }

  next(): void {
    const status = this.status();
    if (status !== 'right' && status !== 'wrong') return;
    const [answered, ...rest] = this.queue();
    const queue = status === 'wrong' ? [...rest, answered] : rest;
    this.queue.set(queue);
    this.lastInput.set('');
    this.smallKanaSlip.set(false);
    this.status.set(queue.length > 0 ? 'asking' : 'done');
  }

  /** Fisher-Yates. */
  private shuffle(questions: readonly Question[]): Question[] {
    const result = [...questions];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(this.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }
}
