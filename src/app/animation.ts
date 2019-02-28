import {
    trigger,
    state,
    style,
    animate,
    transition,
    animation
    } from '@angular/animations';

export const trasAnimation = [
    trigger('myAnimation', [
      // définir l'état inactive de l'élément HTML
      state('active', style({
        height: '50%',
        opacity: 0.25,
        backgroundColor: 'black',
        transform: 'scale(0.1)',
      })),
      // définir l'état active de l'élément HTML
      state('inactive', style({
        height: '26%',
        opacity: 1,
        backgroundColor: '#f8f9fa',
        transform: 'scale(1)',
      })),
      transition('inactive => active', animate('0.3s ease-in')),
      transition('active => inactive', animate('0.3s 0.3s ease-out')),
    ]),
];