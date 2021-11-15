import {animate, state, style, transition, trigger} from '@angular/animations';

export const fadeInAnimation = trigger('routeAnimations', [
  state('in', style({opacity: 1})),
  transition(':enter', [
    style({opacity: 0}),
    animate(600)
  ]),
  transition(':leave', [
    animate(600, style({opacity: 0}))
  ])
]);
