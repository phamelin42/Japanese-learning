import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router, TitleStrategy, provideRouter } from '@angular/router';
import { PageTitleStrategy, SITE_NAME, SITE_URL } from './page-title-strategy';

@Component({ template: '' })
class Blank {}

describe('PageTitleStrategy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter([
          { path: '', component: Blank, data: { description: 'Accueil.' } },
          {
            path: 'reglages',
            component: Blank,
            title: 'Réglages',
            data: { description: 'Thème et synchronisation.' },
          },
        ]),
        { provide: TitleStrategy, useClass: PageTitleStrategy },
      ],
    });
  });

  const meta = (selector: string, attr: string) =>
    document.head.querySelector(selector)?.getAttribute(attr);

  it('préfixe le titre de page par le nom du site', async () => {
    await TestBed.inject(Router).navigateByUrl('/reglages');
    expect(document.title).toBe(`Réglages · ${SITE_NAME}`);
  });

  it('garde le nom du site seul sur une page sans titre', async () => {
    await TestBed.inject(Router).navigateByUrl('/');
    expect(document.title).toBe(SITE_NAME);
  });

  it('pose la description et l’URL canonique de la page', async () => {
    await TestBed.inject(Router).navigateByUrl('/reglages');
    expect(meta('meta[name="description"]', 'content')).toBe('Thème et synchronisation.');
    expect(meta('link[rel="canonical"]', 'href')).toBe(`${SITE_URL}/reglages`);
  });

  it('exclut des moteurs une page marquée noindex, et seulement elle', async () => {
    TestBed.inject(Router).resetConfig([
      ...TestBed.inject(Router).config,
      { path: 'absent', component: Blank, data: { noindex: true } },
    ]);
    await TestBed.inject(Router).navigateByUrl('/absent');
    expect(meta('meta[name="robots"]', 'content')).toBe('noindex');
    await TestBed.inject(Router).navigateByUrl('/reglages');
    expect(document.head.querySelector('meta[name="robots"]')).toBeNull();
  });

  it('donne l’URL de la racine sans barre finale en double', async () => {
    await TestBed.inject(Router).navigateByUrl('/');
    expect(meta('link[rel="canonical"]', 'href')).toBe(`${SITE_URL}/`);
  });
});
