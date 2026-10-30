import {
  afterNextRender,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  Injector,
  input,
  signal,
  untracked,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';
import { FdButton, FdIcon, FdProgress, FdTextField } from '@phamelin/fuda';
import { StudyModule } from '../../content/module.model';
import { buildQuestions } from '../../practice/build-questions';
import { PracticeSession } from '../../practice/practice-session';
import { ProgressStore } from '../../progress/progress-store';

@Component({
  selector: 'app-practice-page',
  imports: [RouterLink, FormField, FdButton, FdIcon, FdProgress, FdTextField],
  templateUrl: './practice.html',
  styleUrl: './practice.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [PracticeSession],
})
export class PracticePage {
  readonly module = input.required<StudyModule>();

  protected readonly session = inject(PracticeSession);
  private readonly store = inject(ProgressStore);
  private readonly injector = inject(Injector);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);

  /** Faux au pré-rendu : le tirage se fait dans le navigateur, sinon l'hydratation diverge. */
  protected readonly ready = signal(false);
  private readonly total = signal(0);

  protected readonly answerModel = signal({ answer: '' });
  protected readonly answerForm = form(this.answerModel);

  protected readonly answered = computed(() => {
    const status = this.session.status();
    return status === 'right' || status === 'wrong';
  });
  protected readonly done = computed(() => this.total() - this.session.remaining());
  protected readonly isDone = computed(
    () => this.store.progress().modules[this.module().id]?.done === true,
  );
  protected readonly progress = computed(() =>
    this.total() === 0 ? 0 : Math.round((this.done() / this.total()) * 100),
  );

  private readonly nextButton = viewChild('nextButton', { read: ElementRef });
  private readonly doneHeading = viewChild<ElementRef<HTMLElement>>('doneHeading');

  constructor() {
    afterNextRender(() => this.ready.set(true));
    effect(() => {
      if (!this.ready()) return;
      const questions = buildQuestions(this.module());
      untracked(() => this.restartWith(questions.length, () => this.session.start(questions)));
    });
  }

  protected onSubmit(event: Event): void {
    event.preventDefault();
    if (this.answered()) {
      this.next();
      return;
    }
    this.session.submit(this.answerModel().answer);
    if (this.answered()) this.afterRender(() => this.nextButton()?.nativeElement.focus());
  }

  protected next(): void {
    this.session.next();
    this.answerModel.set({ answer: '' });
    if (this.session.status() === 'done') {
      this.store.recordSession(this.module().id, this.session.firstTryScore());
    }
    this.afterRender(() =>
      this.session.status() === 'done'
        ? this.doneHeading()?.nativeElement.focus()
        : this.focusField(),
    );
  }

  protected markDone(): void {
    this.store.setDone(this.module().id, true);
  }

  protected restart(): void {
    const questions = buildQuestions(this.module());
    this.restartWith(questions.length, () => this.session.start(questions));
    this.afterRender(() => this.focusField());
  }

  private restartWith(total: number, start: () => void): void {
    this.total.set(total);
    this.answerModel.set({ answer: '' });
    start();
  }

  private focusField(): void {
    this.host.nativeElement.querySelector<HTMLInputElement>('fd-text-field input')?.focus();
  }

  private afterRender(action: () => void): void {
    afterNextRender(action, { injector: this.injector });
  }
}
