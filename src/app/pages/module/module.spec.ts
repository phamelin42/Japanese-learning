import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import jours from '../../content/modules/jours-de-la-semaine';
import { ProgressStore } from '../../progress/progress-store';
import { ModulePage } from './module';

describe('ModulePage', () => {
  beforeEach(() => localStorage.clear());

  async function render(): Promise<HTMLElement> {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(ModulePage);
    fixture.componentRef.setInput('module', jours);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('titre la page du nom du module et donne la date du cours', async () => {
    const el = await render();
    expect(el.querySelector('h1')?.textContent?.trim()).toBe('Jours de la semaine');
    expect(el.querySelector('time')?.getAttribute('datetime')).toBe(jours.lessonDate);
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
