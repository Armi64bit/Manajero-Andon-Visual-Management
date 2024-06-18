import { Component, AfterViewInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'ngx-workshop',
  templateUrl: './workshop.component.html',
  styleUrls: ['./workshop.component.scss'],
  animations: [
    trigger('revealAnimation', [
      state('hidden', style({
        opacity: 0,
        transform: 'translateY(100px)'
      })),
      state('visible', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('hidden => visible', [
        animate('0.5s ease-out')
      ])
    ])
  ]
})
export class WorkshopComponent implements AfterViewInit {
  isVisible = 'hidden';

  ngAfterViewInit() {
    setTimeout(() => {
      this.isVisible = 'visible';
    }, 100);
  }
}
