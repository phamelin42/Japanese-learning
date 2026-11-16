import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { StudyModule } from '../../content/module.model';
import jours from '../../content/modules/jours-de-la-semaine';
import { ProgressStore } from '../../progress/progress-store';
import { RANDOM } from '../../random';
import { SuccessSound } from '../../sound/success-sound';
import { PracticePage } from './practice';

describe('PracticePage', () => {
  beforeEach(() => localStorage.clear());

  const play = vi.fn();

  const choudo: StudyModule = {
    id: 'choudo',
    title: 'Exactement',
    kind: 'vocabulaire',
    lessonDate: '2026-11-16',
    summary: 'Un mot avec un petit ょ.',
    vocabulary: [{ id: 'choudo', fr: 'exactement', kana: 'ちょうど' }],
  };

  async function render(module: StudyModule = jours) {
    play.mockClear();
    TestBed.configureTestingModule({
      // Sans mélange : la série suit l'ordre de buildQuestions (lundi fr → ja, lundi ja → fr…).
      providers: [
        provideRouter([]),
        { provide: RANDOM, useValue: () => 0.999 },
        { provide: SuccessSound, useValue: { play } },
      ],
    });
    const fixture = TestBed.createComponent(PracticePage);
    fixture.componentRef.setInput('module', module);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    const field = () => el.querySelector<HTMLInputElement>('fd-text-field input')!;
    const answer = async (text: string) => {
      field().value = text;
      field().dispatchEvent(new Event('input'));
      el.querySelector('form')!.dispatchEvent(new Event('submit', { cancelable: true }));
      await fixture.whenStable();
    };
    /** Frappe après frappe, comme au clavier : chaque lettre part en événement `input` qui remonte. */
    const type = async (text: string) => {
      for (const letter of text) {
        field().value += letter;
        field().dispatchEvent(new Event('input', { bubbles: true }));
        await fixture.whenStable();
      }
    };
    const submit = async () => {
      el.querySelector('form')!.dispatchEvent(new Event('submit', { cancelable: true }));
      await fixture.whenStable();
    };
    const button = (name: string) =>
      [...el.querySelectorAll<HTMLButtonElement>('button')].find(
        (b) => b.textContent?.trim() === name,
      );
    const next = async () => {
      button('Suivant')!.click();
      await fixture.whenStable();
    };
    const prompt = () => el.querySelector('.app-practice__prompt')?.textContent?.trim();
    return { fixture, el, field, answer, type, submit, button, next, prompt };
  }

  it('pose la première question sans rien révéler de la réponse', async () => {
    const { el, prompt } = await render();
    expect(prompt()).toBe('lundi');
    expect(el.textContent).toContain('Écris en japonais');
    expect(el.textContent).not.toContain('月曜日');
    expect(el.textContent).not.toContain('げつようび');
    expect(el.textContent).not.toContain('lune');
  });

  it('prépare le champ pour une saisie japonaise', async () => {
    const { el, field } = await render();
    expect(el.querySelector('fd-text-field')?.getAttribute('lang')).toBe('ja');
    const form = el.querySelector('form')!;
    expect(form.getAttribute('autocomplete')).toBe('off');
    expect(form.getAttribute('autocapitalize')).toBe('off');
    expect(form.getAttribute('spellcheck')).toBe('false');
    expect(field()).not.toBeNull();
  });

  it('dit « Juste ! » avec le corrigé et donne le focus à « Suivant »', async () => {
    const { el, answer, button } = await render();
    await answer('getsuyoubi');
    expect(el.textContent).toContain('Juste !');
    expect(el.textContent).toContain('月曜日');
    expect(el.textContent).toContain('lune');
    expect(document.activeElement).toBe(button('Suivant'));
  });

  it('joue le son de validation sur une bonne réponse, pas sur une mauvaise', async () => {
    const { answer, next } = await render();
    await answer('kayoubi');
    expect(play).not.toHaveBeenCalled();
    await next();
    await answer('lundi');
    expect(play).toHaveBeenCalledTimes(1);
  });

  it('valide ちようど pour ちょうど et rappelle d’écrire les petits kana en petit', async () => {
    const { el, answer } = await render(choudo);
    await answer('ちようど');
    expect(el.textContent).toContain('Juste !');
    expect(el.textContent).toContain('petits kana');
    expect(play).toHaveBeenCalledTimes(1);
  });

  it('ne rappelle rien quand la réponse est exacte', async () => {
    const { el, answer } = await render(choudo);
    await answer('ちょうど');
    expect(el.textContent).toContain('Juste !');
    expect(el.textContent).not.toContain('petits kana');
  });

  it('dit « Pas tout à fait », rappelle la saisie et donne le corrigé', async () => {
    const { el, answer } = await render();
    await answer('kayoubi');
    expect(el.textContent).toContain('Pas tout à fait');
    expect(el.textContent).toContain('Ta réponse : かようび');
    expect(el.textContent).toContain('月曜日');
  });

  describe('rōmaji transformé en kana pendant la frappe', () => {
    const hon: StudyModule = {
      id: 'hon',
      title: 'Livre',
      kind: 'vocabulaire',
      lessonDate: '2026-11-16',
      summary: 'Un mot en ん.',
      vocabulary: [{ id: 'hon', fr: 'livre', kana: 'ほん' }],
    };
    const bonjour: StudyModule = {
      id: 'bonjour',
      title: 'Bonjour',
      kind: 'vocabulaire',
      lessonDate: '2026-11-16',
      summary: 'Un mot avec la particule は.',
      vocabulary: [{ id: 'konnichiwa', fr: 'bonjour', kana: 'こんにちは' }],
    };

    it('écrit les kana dans le champ au fil des lettres', async () => {
      const { field, type } = await render();
      await type('getsu');
      expect(field().value).toBe('げつ');
      await type('youbi');
      expect(field().value).toBe('げつようび');
    });

    it('laisse en lettres une syllabe pas encore finie', async () => {
      const { field, type } = await render();
      await type('getsuy');
      expect(field().value).toBe('げつy');
    });

    it('valide la réponse tapée en rōmaji, ん final compris', async () => {
      const { el, type, submit } = await render(hon);
      await type('hon');
      await submit();
      expect(el.textContent).toContain('Juste !');
    });

    it('accepte la graphie tapée même quand le kana affiché diffère (konnichiwa)', async () => {
      const { el, field, type, submit } = await render(bonjour);
      await type('konnichiwa');
      expect(field().value).toBe('こんにちわ');
      await submit();
      expect(el.textContent).toContain('Juste !');
    });

    it('refuse une réponse corrigée à la main qui n’est plus celle tapée', async () => {
      const { el, field, fixture, type, submit } = await render(bonjour);
      await type('konnichiwa');
      // Un retour arrière puis une nouvelle frappe : le rōmaji tapé n'est plus connu, seul le kana
      // affiché compte, et わ n'est pas は.
      field().value = 'こんにち';
      field().dispatchEvent(new Event('input', { bubbles: true }));
      await fixture.whenStable();
      await type('wa');
      expect(field().value).toBe('こんにちわ');
      await submit();
      expect(el.textContent).toContain('Pas tout à fait');
    });

    it('ne transforme pas la saisie d’un clavier japonais en cours de composition', async () => {
      const { field, fixture } = await render();
      field().value = 'getsu';
      field().dispatchEvent(new InputEvent('input', { bubbles: true, isComposing: true }));
      await fixture.whenStable();
      expect(field().value).toBe('getsu');
    });

    it('ne renvoie pas le curseur à la fin quand on corrige au milieu du texte', async () => {
      const { field, fixture } = await render();
      field().value = 'getsuyoubi';
      field().setSelectionRange(3, 3);
      field().dispatchEvent(new Event('input', { bubbles: true }));
      await fixture.whenStable();
      expect(field().value).toBe('getsuyoubi');
    });

    it('n’y touche pas sur une question en français, et le dit seulement en japonais', async () => {
      const { el, field, type, answer, next } = await render();
      expect(el.textContent).toContain('Tape en rōmaji');
      await answer('getsuyoubi');
      await next();
      expect(el.textContent).not.toContain('Tape en rōmaji');
      await type('lundi');
      expect(field().value).toBe('lundi');
    });

    it('repart d’un champ vide après chaque question', async () => {
      const { field, type, answer, next } = await render(choudo);
      await type('choudo');
      expect(field().value).toBe('ちょうど');
      await answer('choudo');
      await next();
      expect(field().value).toBe('');
    });
  });

  it('passe à la question suivante, vide le champ et y remet le focus', async () => {
    const { answer, next, prompt, field } = await render();
    await answer('getsuyoubi');
    await next();
    expect(prompt()).toBe('月曜日');
    expect(field().value).toBe('');
    expect(document.activeElement).toBe(field());
  });

  it('demande le français pour une invite en japonais, lecture comprise', async () => {
    const { el, answer, next } = await render();
    await answer('getsuyoubi');
    await next();
    expect(el.textContent).toContain('Écris en français');
    expect(el.querySelector('.app-practice__reading')?.textContent?.trim()).toBe('げつようび');
    expect(el.querySelector('fd-text-field')?.getAttribute('lang')).toBe('fr');
  });

  it('affiche le score au premier essai en fin de série', async () => {
    const { el, answer, next, prompt } = await render();
    // Invite affichée → bonne réponse, dans les deux sens.
    const solutions = new Map(
      jours.vocabulary!.flatMap((word) => [
        [word.fr, word.kana],
        [word.kanji ?? word.kana, word.fr],
      ]),
    );
    await answer('faux');
    await next();
    for (let guard = 0; guard < 20 && !el.textContent?.includes('Série terminée'); guard++) {
      await answer(solutions.get(prompt()!)!);
      await next();
    }
    expect(el.textContent).toContain('Série terminée');
    expect(el.textContent).toContain('15 sur 16 du premier coup');
  });

  it('recommence une série complète', async () => {
    const { fixture, el, answer, next, button, prompt } = await render();
    for (const word of jours.vocabulary!) {
      await answer(word.kana);
      await next();
      await answer(word.fr);
      await next();
    }
    button('Recommencer')!.click();
    await fixture.whenStable();
    expect(el.textContent).not.toContain('Série terminée');
    expect(prompt()).toBe('lundi');
  });

  async function finish(page: Awaited<ReturnType<typeof render>>): Promise<void> {
    for (const word of jours.vocabulary!) {
      await page.answer(word.kana);
      await page.next();
      await page.answer(word.fr);
      await page.next();
    }
  }

  it('enregistre la série terminée et son score, une seule fois', async () => {
    const page = await render();
    await finish(page);
    await page.fixture.whenStable();
    expect(TestBed.inject(ProgressStore).moduleProgress('jours-de-la-semaine')()).toMatchObject({
      sessions: 1,
      bestFirstTry: { right: 16, total: 16 },
      done: false,
    });
  });

  it('propose de marquer le module terminé en fin de série', async () => {
    const page = await render();
    await finish(page);
    page.button('Marquer comme terminé')!.click();
    await page.fixture.whenStable();
    expect(TestBed.inject(ProgressStore).moduleProgress('jours-de-la-semaine')()?.done).toBe(true);
    expect(page.button('Marquer comme terminé')).toBeUndefined();
    expect(page.el.textContent).toContain('Module terminé');
  });
});
