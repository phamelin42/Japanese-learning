import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ApplicationRef, PendingTasks } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideRouter([]), provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
  });

  async function render(): Promise<HTMLElement> {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    return fixture.nativeElement as HTMLElement;
  }

  it('propose un lien d’évitement vers le contenu principal', async () => {
    const el = await render();
    const skip = el.querySelector('a.app-skip');
    expect(skip?.getAttribute('href')).toBe('#contenu');
    expect(el.querySelector('main#contenu')).not.toBeNull();
  });

  it('relie l’accueil et les réglages depuis l’en-tête', async () => {
    const el = await render();
    const links = [...el.querySelectorAll('header a')].map((a) => [
      a.textContent?.trim(),
      a.getAttribute('href'),
    ]);
    expect(links).toEqual([
      ['Apprendre le japonais', '/'],
      ['Réglages', '/reglages'],
    ]);
  });

  it('signale sur <html> que l’application est hydratée et prête', async () => {
    document.documentElement.removeAttribute('data-app-ready');
    await render();
    expect(document.documentElement.hasAttribute('data-app-ready')).toBe(true);
  });

  it('ne se dit prête qu’une fois la page chargée et hydratée (application stable)', async () => {
    document.documentElement.removeAttribute('data-app-ready');
    // Une route paresseuse en cours de chargement est une tâche en attente.
    const done = TestBed.inject(PendingTasks).add();
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await new Promise((resolve) => setTimeout(resolve));
    expect(document.documentElement.hasAttribute('data-app-ready')).toBe(false);

    done();
    await TestBed.inject(ApplicationRef).whenStable();
    await Promise.resolve();
    expect(document.documentElement.hasAttribute('data-app-ready')).toBe(true);
  });
});
