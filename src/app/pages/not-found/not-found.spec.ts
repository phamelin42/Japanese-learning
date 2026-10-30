import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { NotFoundPage } from './not-found';

describe('NotFoundPage', () => {
  it('dit que la page n’existe pas et ramène à l’accueil', async () => {
    TestBed.configureTestingModule({ providers: [provideRouter([])] });
    const fixture = TestBed.createComponent(NotFoundPage);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('h1')?.textContent?.trim()).toBe('Page introuvable');
    expect(el.querySelector('a')?.getAttribute('href')).toBe('/');
  });
});
