import { Component, computed, input, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FdBadge, FdButton } from '@phamelin/fuda';
import { formatLessonDate, KIND_LABELS } from '../../content/module-index';
import { StudyModule } from '../../content/module.model';
import { buildQuestions } from '../../practice/build-questions';

@Component({
  selector: 'app-module-page',
  imports: [RouterLink, FdBadge, FdButton],
  templateUrl: './module.html',
  styleUrl: './module.scss',
  encapsulation: ViewEncapsulation.None,
})
export class ModulePage {
  readonly module = input.required<StudyModule>();

  protected readonly kindLabel = computed(() => KIND_LABELS[this.module().kind]);
  protected readonly dateLabel = computed(() => formatLessonDate(this.module().lessonDate));
  protected readonly questionCount = computed(() => buildQuestions(this.module()).length);
}
