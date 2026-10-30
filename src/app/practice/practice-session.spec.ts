import { TestBed } from '@angular/core/testing';
import { RANDOM } from '../random';
import { PracticeSession } from './practice-session';
import { Question } from './question';

function question(id: string, answer: string): Question {
  return {
    id,
    prompt: id,
    promptLang: 'fr',
    accepted: [answer],
    answerLang: 'fr',
    expected: answer,
  };
}

const questions = [question('a', 'un'), question('b', 'deux'), question('c', 'trois')];

function session(random: () => number = () => 0.999): PracticeSession {
  TestBed.configureTestingModule({
    providers: [PracticeSession, { provide: RANDOM, useValue: random }],
  });
  return TestBed.inject(PracticeSession);
}

function answerAll(s: PracticeSession): void {
  while (s.status() !== 'done') {
    s.submit(s.current()!.expected);
    s.next();
  }
}

describe('PracticeSession', () => {
  it('garde l’ordre quand le tirage ne mélange rien', () => {
    const s = session();
    s.start(questions);
    expect(s.current()?.id).toBe('a');
    expect(s.status()).toBe('asking');
    expect(s.remaining()).toBe(3);
  });

  it('mélange les questions sans en perdre ni en dupliquer', () => {
    const s = session(() => 0);
    s.start(questions);
    const order: string[] = [];
    while (s.status() !== 'done') {
      order.push(s.current()!.id);
      s.submit(s.current()!.expected);
      s.next();
    }
    expect(order).not.toEqual(['a', 'b', 'c']);
    expect([...order].sort()).toEqual(['a', 'b', 'c']);
  });

  it('valide une bonne réponse et passe à la suivante', () => {
    const s = session();
    s.start(questions);
    s.submit('Un.');
    expect(s.status()).toBe('right');
    s.next();
    expect(s.current()?.id).toBe('b');
    expect(s.status()).toBe('asking');
  });

  it('repose une question ratée après les autres', () => {
    const s = session();
    s.start(questions);
    s.submit('faux');
    expect(s.status()).toBe('wrong');
    s.next();
    expect(s.current()?.id).toBe('b');
    expect(s.remaining()).toBe(3);
    s.submit('deux');
    s.next();
    s.submit('trois');
    s.next();
    expect(s.current()?.id).toBe('a');
  });

  it('ne compte au premier essai que les questions réussies du premier coup', () => {
    const s = session();
    s.start(questions);
    s.submit('faux');
    s.next();
    answerAll(s);
    expect(s.status()).toBe('done');
    expect(s.firstTryScore()).toEqual({ right: 2, total: 3 });
  });

  it('marque 3 sur 3 quand tout est juste du premier coup', () => {
    const s = session();
    s.start(questions);
    answerAll(s);
    expect(s.firstTryScore()).toEqual({ right: 3, total: 3 });
    expect(s.current()).toBeNull();
  });

  it('ignore un second envoi avant « Suivant »', () => {
    const s = session();
    s.start(questions);
    s.submit('faux');
    s.submit('un');
    expect(s.status()).toBe('wrong');
  });

  it('ignore une réponse vide', () => {
    const s = session();
    s.start(questions);
    s.submit('   ');
    expect(s.status()).toBe('asking');
  });

  it('ignore « Suivant » tant que la question n’a pas reçu de réponse', () => {
    const s = session();
    s.start(questions);
    s.next();
    expect(s.current()?.id).toBe('a');
  });

  it('garde la saisie envoyée pour l’afficher avec le verdict', () => {
    const s = session();
    s.start(questions);
    s.submit('faux');
    expect(s.lastInput()).toBe('faux');
  });

  it('repart de zéro au redémarrage', () => {
    const s = session();
    s.start(questions);
    s.submit('faux');
    s.start(questions);
    expect(s.status()).toBe('asking');
    expect(s.remaining()).toBe(3);
    answerAll(s);
    expect(s.firstTryScore()).toEqual({ right: 3, total: 3 });
  });

  it('se termine aussitôt sans question', () => {
    const s = session();
    s.start([]);
    expect(s.status()).toBe('done');
  });
});
