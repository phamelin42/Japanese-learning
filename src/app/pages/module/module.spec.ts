import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { StudyModule } from '../../content/module.model';
import jours from '../../content/modules/jours-de-la-semaine';
import { ProgressStore } from '../../progress/progress-store';
import { ModulePage } from './module';

describe('ModulePage', () => {
  beforeEach(() => localStorage.clear());

  async function render(module: StudyModule = jours): Promise<HTMLElement> {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(ModulePage);
    fixture.componentRef.setInput('module', module);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('titre la page du nom du module et donne sa date d’ajout', async () => {
    const el = await render();
    expect(el.querySelector('h1')?.textContent?.trim()).toBe('Jours de la semaine');
    expect(el.querySelector('time')?.getAttribute('datetime')).toBe(jours.lessonDate);
    expect(el.querySelector('.app-module__kicker')?.textContent).toContain('Ajouté le');
  });

  it('affiche la fiche, avec les exemples japonais marqués comme tels', async () => {
    const el = await render();
    const headings = [...el.querySelectorAll('h2')].map((h) => h.textContent?.trim());
    expect(headings).toContain('Un élément par jour');
    const example = el.querySelector('[lang="ja"]');
    expect(example?.textContent).toContain('今日は何曜日ですか。');
  });

  it('liste le vocabulaire du module', async () => {
    const el = await render();
    const rows = el.querySelectorAll('.app-vocabulary tbody tr');
    expect(rows).toHaveLength(jours.vocabulary!.length);
    expect(rows[0].textContent).toContain('lundi');
    expect(rows[0].textContent).toContain('月曜日');
    expect(rows[0].textContent).toContain('げつようび');
  });

  it('n’affiche la colonne « Lecture » que si un mot a un kanji', async () => {
    const kanaOnly: StudyModule = {
      ...jours,
      vocabulary: [{ id: 'migi', fr: 'droite', kana: 'みぎ' }],
    };
    const withReading = await render();
    expect(withReading.querySelectorAll('.app-vocabulary thead th')).toHaveLength(3);

    TestBed.resetTestingModule();
    const el = await render(kanaOnly);
    const headers = [...el.querySelectorAll('.app-vocabulary thead th')].map((th) =>
      th.textContent?.trim(),
    );
    expect(headers).toEqual(['Français', 'Japonais']);
    expect(el.querySelectorAll('.app-vocabulary tbody tr:first-child td')).toHaveLength(2);
    expect(el.querySelector('.app-vocabulary tbody')?.textContent).toContain('みぎ');
  });

  it('mène à l’entraînement et annonce le nombre de questions', async () => {
    const el = await render();
    const link = [...el.querySelectorAll('a')].find((a) => a.textContent?.includes('S’entraîner'));
    expect(link?.getAttribute('href')).toBe('/module/jours-de-la-semaine/entrainement');
    expect(el.textContent).toContain('16 questions');
  });

  it('marque le module terminé, puis le rouvre, avec l’interrupteur', async () => {
    const el = await render();
    const toggle = el.querySelector<HTMLInputElement>('fd-switch input')!;
    const store = TestBed.inject(ProgressStore);
    expect(toggle.closest('fd-switch')?.textContent).toContain('Module terminé');

    toggle.click();
    await Promise.resolve();
    expect(store.moduleProgress('jours-de-la-semaine')()?.done).toBe(true);

    toggle.click();
    expect(store.moduleProgress('jours-de-la-semaine')()?.done).toBe(false);
  });
});
