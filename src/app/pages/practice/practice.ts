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
import { romajiToKana } from '../../answers/romaji-to-kana';
import { StudyModule } from '../../content/module.model';
import { buildQuestions } from '../../practice/build-questions';
import { PracticeSession } from '../../practice/practice-session';
import { ProgressStore } from '../../progress/progress-store';
import { SuccessSound } from '../../sound/success-sound';

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
  private readonly sound = inject(SuccessSound);
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

  /** Ce que le champ affichait après la dernière frappe : sert à savoir ce qui vient d'être tapé. */
  private shown = '';
  /** Le rōmaji réellement tapé tant que le champ n'a fait que s'allonger ; `null` après une correction. */
  private typed: string | null = '';

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
    const question = this.session.current();
    const shown = this.answerModel().answer;
    const answer = question?.answerLang === 'ja' ? romajiToKana(shown, { final: true }) : shown;
    if (answer !== shown) this.answerModel.set({ answer });
    this.session.submit(answer, answer !== this.typed ? this.typed : null);
    if (this.session.status() === 'right') this.sound.play();
    if (this.answered()) this.afterRender(() => this.nextButton()?.nativeElement.focus());
  }

  /**
   * Sur une question en japonais, ce qui est tapé en rōmaji devient des kana dans le champ, comme
   * avec un clavier japonais : on garde le clavier français. Les claviers japonais, eux, composent
   * leurs kana eux-mêmes (`isComposing`) : on n'y touche pas.
   */
  protected onFieldInput(event: Event): void {
    const field = event.target;
    if (!(field instanceof HTMLInputElement)) return;
    if (this.session.current()?.answerLang !== 'ja') return;
    const value = field.value;
    if ((event as InputEvent).isComposing) {
      this.typed = null;
      this.shown = value;
      return;
    }
    if (value === '') this.typed = '';
    else if (this.typed !== null && value.startsWith(this.shown)) {
      this.typed += value.slice(this.shown.length);
    } else this.typed = null;
    // Une correction au milieu du texte ne doit pas renvoyer le curseur à la fin.
    const atEnd = field.selectionStart === null || field.selectionStart >= value.length;
    const converted = atEnd ? romajiToKana(value) : value;
    this.shown = converted;
    if (converted !== value) this.answerModel.set({ answer: converted });
  }

  protected next(): void {
    this.session.next();
    this.resetTyping();
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
    this.resetTyping();
    start();
  }

  private resetTyping(): void {
    this.answerModel.set({ answer: '' });
    this.shown = '';
    this.typed = '';
  }

  private focusField(): void {
    this.host.nativeElement.querySelector<HTMLInputElement>('fd-text-field input')?.focus();
  }

  private afterRender(action: () => void): void {
    afterNextRender(action, { injector: this.injector });
  }
}
