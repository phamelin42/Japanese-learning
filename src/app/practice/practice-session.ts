import { computed, inject, Injectable, signal } from '@angular/core';
import { checkAnswer } from '../answers/check-answer';
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
    this.status.set(questions.length > 0 ? 'asking' : 'done');
  }

  submit(input: string): void {
    const question = this.current();
    if (this.status() !== 'asking' || !question || input.trim() === '') return;
    this.lastInput.set(input);
    if (checkAnswer(input, question.accepted, question.answerLang)) {
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
