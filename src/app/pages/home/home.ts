import { Component, computed, inject, signal, ViewEncapsulation } from '@angular/core';
import { FdBadge, FdCard, FdEmptyState, FdRadioGroup, FdRadioOption } from '@phamelin/fuda';
import {
  formatLessonDate,
  KIND_LABELS,
  KIND_SKIES,
  MODULE_INDEX,
} from '../../content/module-index';

type KindFilter = 'tous' | 'vocabulaire' | 'lecon';

@Component({
  selector: 'app-home-page',
  imports: [FdBadge, FdCard, FdEmptyState, FdRadioGroup],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  encapsulation: ViewEncapsulation.None,
})
export class HomePage {
  private readonly index = inject(MODULE_INDEX);

  protected readonly kindOptions: readonly FdRadioOption[] = [
    { value: 'tous', label: 'Tous' },
    { value: 'vocabulaire', label: 'Vocabulaire' },
    { value: 'lecon', label: 'Leçons' },
  ];
  protected readonly kind = signal<KindFilter>('tous');
  protected readonly hasModules = this.index.length > 0;

  protected readonly modules = computed(() => {
    const kind = this.kind();
    return this.index
      .filter((entry) => kind === 'tous' || entry.kind === kind)
      .slice()
      .sort((a, b) => b.lessonDate.localeCompare(a.lessonDate))
      .map((entry) => ({
        ...entry,
        kindLabel: KIND_LABELS[entry.kind],
        sky: KIND_SKIES[entry.kind],
        dateLabel: formatLessonDate(entry.lessonDate),
      }));
  });

  protected setKind(value: string): void {
    this.kind.set(value as KindFilter);
  }
}
