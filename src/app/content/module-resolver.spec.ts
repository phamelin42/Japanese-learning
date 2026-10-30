import { Location } from '@angular/common';
import { Component, input } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { RouterTestingHarness } from '@angular/router/testing';
import { StudyModule } from './module.model';
import { moduleRoutes } from './module-resolver';

@Component({ template: '{{ module().title }}' })
class ModuleStub {
  readonly module = input.required<StudyModule>();
}

@Component({ template: 'introuvable' })
class NotFoundStub {}

describe('moduleRoutes', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideRouter(
          [
            ...moduleRoutes('module/:id', () => Promise.resolve(ModuleStub), {
              title: (title) => `Entraînement : ${title}`,
            }),
            { path: '404', component: NotFoundStub },
          ],
          withComponentInputBinding(),
        ),
      ],
    });
  });

  it('charge le module de l’adresse et le passe à la page', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/module/jours-de-la-semaine');
    expect(harness.routeNativeElement?.textContent).toBe('Jours de la semaine');
    expect(document.title).toBe('Entraînement : Jours de la semaine');
  });

  it('affiche la page introuvable pour un module inconnu, sans changer l’adresse', async () => {
    const harness = await RouterTestingHarness.create();
    await harness.navigateByUrl('/module/nulle-part');
    expect(harness.routeNativeElement?.textContent).toBe('introuvable');
    expect(TestBed.inject(Location).path()).toBe('/module/nulle-part');
  });
});
