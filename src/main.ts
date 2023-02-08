import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import {
  CounterComponent,
  counterState,
  incrementCounter$,
} from './app/counter.component';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter([
      {
        path: '',
        component: CounterComponent,
        providers: [
          provideState(counterState.name, counterState.reducer),
          provideEffects([{ incrementCounter$ }]),
        ],
        canActivate: [() => confirm('Do you want to show the counter?')],
      },
    ]),
    provideStore(),
    provideEffects(),
  ],
});
