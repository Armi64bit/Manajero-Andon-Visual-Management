import { Component, AfterViewInit, ChangeDetectionStrategy } from '@angular/core';
import { NbIconConfig } from '@nebular/theme';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Why, WhyService } from '../api/why.service';
import { What, WhatService } from '../api/what.service';
import { Whatif, WhatifService } from '../api/whatif.service';
import { How, HowService } from '../api/how.service';

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

  whys: Why[];
  whats: What[];
  whatifs: Whatif[];
  hows: How[];
  constructor(private whyService: WhyService,private whatService: WhatService,private whatifService: WhatifService,private howService: HowService) {}

  ngOnInit() {
    this.whyService.getAllWhys().subscribe(data => {
      this.whys = data;
    });
    this.whatService.getAllWhats().subscribe(data => {
      this.whats = data;
    });
    this.whatifService.getAllWhatifs().subscribe(data => {
      this.whatifs = data;
    });
    this.howService.getAll().subscribe(data => {
      this.hows = data;
    });
  }
}
