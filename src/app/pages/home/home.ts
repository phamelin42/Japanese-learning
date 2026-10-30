import { Component, computed, inject, signal, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FdBadge, FdCard, FdEmptyState, FdRadioGroup, FdRadioOption } from '@phamelin/fuda';
import {
  formatLessonDate,
  KIND_LABELS,
  KIND_SKIES,
  MODULE_INDEX,
} from '../../content/module-index';
import { ProgressStore } from '../../progress/progress-store';

type KindFilter = 'tous' | 'vocabulaire' | 'lecon';
type StateFilter = 'tous' | 'a-faire' | 'termines';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink, FdBadge, FdCard, FdEmptyState, FdRadioGroup],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  encapsulation: ViewEncapsulation.None,
})
export class HomePage {
  private readonly index = inject(MODULE_INDEX);
  private readonly progress = inject(ProgressStore).progress;

  protected readonly kindOptions: readonly FdRadioOption[] = [
    { value: 'tous', label: 'Tous' },
    { value: 'vocabulaire', label: 'Vocabulaire' },
    { value: 'lecon', label: 'Leçons' },
  ];
  protected readonly stateOptions: readonly FdRadioOption[] = [
    { value: 'tous', label: 'Tous' },
    { value: 'a-faire', label: 'À faire' },
    { value: 'termines', label: 'Terminés' },
  ];
  protected readonly kind = signal<KindFilter>('tous');
  protected readonly state = signal<StateFilter>('tous');
  protected readonly hasModules = this.index.length > 0;

  protected readonly modules = computed(() => {
    const kind = this.kind();
    const state = this.state();
    const progress = this.progress().modules;
    const isDone = (id: string) => progress[id]?.done === true;
    return this.index
      .filter((entry) => kind === 'tous' || entry.kind === kind)
      .filter((entry) => state === 'tous' || isDone(entry.id) === (state === 'termines'))
      .slice()
      .sort((a, b) => b.lessonDate.localeCompare(a.lessonDate))
      .map((entry) => ({
        ...entry,
        kindLabel: KIND_LABELS[entry.kind],
        sky: KIND_SKIES[entry.kind],
        dateLabel: formatLessonDate(entry.lessonDate),
        done: isDone(entry.id),
      }));
  });

  protected setKind(value: string): void {
    this.kind.set(value as KindFilter);
  }

  protected setState(value: string): void {
    this.state.set(value as StateFilter);
  }
}
