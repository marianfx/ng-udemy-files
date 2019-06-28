import { Component } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  animations: [
    trigger('divState', [
      state('normal', style({
        'background-color': 'red',
        transform: 'translateX(0)'
      })),
      state('highlighted', style({
        'background-color': 'blue',
        transform: 'translateX(100px)'
      })),
      transition('normal <=> highlighted', animate(300))
    ]),
    trigger('wildState', [
      state('normal', style({
        'background-color': 'red',
        transform: 'translateX(0)'
      })),
      state('highlighted', style({
        'background-color': 'blue',
        transform: 'translateX(100px)'
      })),
      state('shrunken', style({
        'background-color': 'green',
        transform: 'translateX(0px) scale(0.5)'
      })),
      transition('normal => highlighted', animate(300)),
      transition('highlighted => normal', animate(800)),
      transition('shrunken <=> *', [
        style({
          'background-color': 'orange'
        }),
        animate(1000, style({
          'border-radius': '50px'
        })),
        animate(500) // this is transition to the end state
      ])
    ]),
    // in = element added to the DOM
    // void = special state when element does not exist
    trigger('list1', [
      state('in', style({
        'opacity': 1,
        transform: 'translateX(0)'
      })),
      transition('void => *', [
        style({
          'opacity': 0,
          transform: 'translate(-100px)'
        }),
        animate(300)
      ]),
      transition('* => void', [
        animate(300),
        style({
          transform: 'translateX(100px)',
          opacity: 0
        })
      ]),
    ])
  ]
})
export class AppComponent {
  list = ['Milk', 'Sugar', 'Bread'];
  state = 'normal';
  wildState = 'normal';

  onAdd(item) {
    this.list.push(item);
  }

  onAnimate() {
    this.state = this.state === 'normal' ? 'highlighted' : 'normal';
    this.wildState = this.wildState === 'normal' ? 'highlighted' : 'normal';
  }

  onShrink() {
    this.wildState = this.wildState === 'shrunken' ? 'normal' : 'shrunken';
  }

  onDelete(item) {
    const indexOf = this.list.indexOf(item);
    console.log(indexOf);
    this.list.splice(indexOf, 1);
  }
}