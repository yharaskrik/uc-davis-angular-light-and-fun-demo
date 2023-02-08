import { Component, inject } from '@angular/core';
import {
  createAction,
  createFeature,
  createReducer,
  on,
  Store,
} from '@ngrx/store';
import { AsyncPipe } from '@angular/common';
import { createEffect } from '@ngrx/effects';
import { interval, map } from 'rxjs';

interface CounterState {
  counter: number;
}

export const incrementCounter = createAction('increment counter');

export const counterState = createFeature<'counter', CounterState>({
  name: 'counter',
  reducer: createReducer(
    { counter: 0 },
    on(incrementCounter, (state) => ({
      ...state,
      counter: state.counter + 1,
    }))
  ),
});

export const incrementCounter$ = createEffect(
  () => interval(1000).pipe(map(() => incrementCounter())),
  { functional: true }
);

@Component({
  selector: 'counter',
  standalone: true,
  styles: [
    `
      .counter {
        font-size: 72px;
      }
    `,
  ],
  template: ` <div class="counter">{{ counter$ | async }}</div> `,
  imports: [AsyncPipe],
})
export class CounterComponent {
  readonly counter$ = inject(Store).select(counterState.selectCounter);
}
