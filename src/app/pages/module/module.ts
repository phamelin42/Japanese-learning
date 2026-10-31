import { Component, computed, inject, input, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FdBadge, FdButton, FdSwitch } from '@phamelin/fuda';
import { formatLessonDate, KIND_LABELS } from '../../content/module-index';
import { StudyModule } from '../../content/module.model';
import { buildQuestions } from '../../practice/build-questions';
import { ProgressStore } from '../../progress/progress-store';

@Component({
  selector: 'app-module-page',
  imports: [RouterLink, FdBadge, FdButton, FdSwitch],
  templateUrl: './module.html',
  styleUrl: './module.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ModulePage {
  readonly module = input.required<StudyModule>();

  private readonly store = inject(ProgressStore);

  protected readonly kindLabel = computed(() => KIND_LABELS[this.module().kind]);
  protected readonly dateLabel = computed(() => formatLessonDate(this.module().lessonDate));
  protected readonly questionCount = computed(() => buildQuestions(this.module()).length);
  /** Sans kanji, la colonne « Lecture » serait vide : on ne l'affiche pas. */
  protected readonly hasReadings = computed(() =>
    (this.module().vocabulary ?? []).some((word) => !!word.kanji),
  );
  protected readonly isDone = computed(
    () => this.store.progress().modules[this.module().id]?.done === true,
  );

  protected setDone(done: boolean): void {
    this.store.setDone(this.module().id, done);
  }
}
