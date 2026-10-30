import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ModuleEntry, StudyModule } from '../../content/module.model';
import { MODULE_INDEX } from '../../content/module-index';
import { HomePage } from './home';

function entry(id: string, kind: ModuleEntry['kind'], lessonDate: string): ModuleEntry {
  return {
    id,
    kind,
    lessonDate,
    title: `Titre ${id}`,
    summary: `Résumé ${id}`,
    load: () => Promise.resolve({} as StudyModule),
  };
}

const entries = [
  entry('ancien', 'vocabulaire', '2026-09-02'),
  entry('particules', 'lecon', '2026-10-14'),
  entry('recent', 'vocabulaire', '2026-10-28'),
];

describe('HomePage', () => {
  async function render(index: readonly ModuleEntry[] = entries) {
    TestBed.configureTestingModule({
      providers: [provideRouter([]), { provide: MODULE_INDEX, useValue: index }],
    });
    const fixture = TestBed.createComponent(HomePage);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const titles = () =>
      [...el.querySelectorAll('.app-module-list [slot="title"]')].map((t) => t.textContent?.trim());
    return { fixture, el, titles };
  }

  it('a un seul titre de niveau 1', async () => {
    const { el } = await render();
    expect([...el.querySelectorAll('h1')].map((h) => h.textContent?.trim())).toEqual([
      'Mes modules',
    ]);
  });

  it('liste les modules du cours le plus récent au plus ancien', async () => {
    const { titles } = await render();
    expect(titles()).toEqual(['Titre recent', 'Titre particules', 'Titre ancien']);
  });

  it('montre le type, la date du cours et le résumé de chaque module', async () => {
    const { el } = await render();
    const card = el.querySelector('.app-module-list a')!;
    expect(card.querySelector('fd-badge')?.textContent?.trim()).toBe('Vocabulaire');
    expect(card.querySelector('time')?.getAttribute('datetime')).toBe('2026-10-28');
    expect(card.querySelector('time')?.textContent?.trim()).toBe('28 octobre 2026');
    expect(card.textContent).toContain('Résumé recent');
  });

  it('mène à la page de chaque module', async () => {
    const { el } = await render();
    const hrefs = [...el.querySelectorAll('.app-module-list a')].map((a) => a.getAttribute('href'));
    expect(hrefs).toEqual(['/module/recent', '/module/particules', '/module/ancien']);
  });

  it('filtre par type de module', async () => {
    const { fixture, el, titles } = await render();
    const radio = (label: string) =>
      [...el.querySelectorAll<HTMLInputElement>('fd-radio-group input')].find(
        (input) => input.closest('label')?.textContent?.trim() === label,
      )!;

    radio('Leçons').click();
    await fixture.whenStable();
    expect(titles()).toEqual(['Titre particules']);

    radio('Vocabulaire').click();
    await fixture.whenStable();
    expect(titles()).toEqual(['Titre recent', 'Titre ancien']);

    radio('Tous').click();
    await fixture.whenStable();
    expect(titles()).toHaveLength(3);
  });

  it('dit qu’aucun module n’existe encore quand l’index est vide', async () => {
    const { el } = await render([]);
    expect(el.querySelector('fd-empty-state')).not.toBeNull();
    expect(el.querySelector('fd-radio-group')).toBeNull();
  });
});
