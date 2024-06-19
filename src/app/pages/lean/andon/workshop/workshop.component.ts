import { Component, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { NbIconConfig } from '@nebular/theme';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'ngx-workshop',
  templateUrl: './workshop.component.html',
  styleUrls: ['./workshop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  ],
  styles: [`
    :host nb-tab {
      padding: 1.25rem;
    }
  `],
})
export class WorkshopComponent implements AfterViewInit {
  bellIconConfig: NbIconConfig = { icon: 'bell-outline', pack: 'eva' };
  isVisible = 'hidden';

  ngAfterViewInit() {
    setTimeout(() => {
      this.isVisible = 'visible';
    }, 100);
  }
}
