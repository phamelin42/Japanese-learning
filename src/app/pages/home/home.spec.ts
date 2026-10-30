import { TestBed } from '@angular/core/testing';
import { HomePage } from './home';

describe('HomePage', () => {
  it('a un seul titre de niveau 1', async () => {
    const fixture = TestBed.createComponent(HomePage);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    expect([...el.querySelectorAll('h1')].map((h) => h.textContent?.trim())).toEqual([
      'Mes modules',
    ]);
  });
});
