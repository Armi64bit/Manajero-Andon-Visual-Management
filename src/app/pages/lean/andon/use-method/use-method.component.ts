import { Component } from '@angular/core';
import { Why, WhyService } from '../api/why.service';
import { What, WhatService } from '../api/what.service';
import { Whatif, WhatifService } from '../api/whatif.service';
import { How, HowService } from '../api/how.service';

@Component({
  selector: 'ngx-use-method',
  templateUrl: './use-method.component.html',
  styleUrls: ['./use-method.component.scss']
})
export class UseMethodComponent {
  alerts = [
    { timestamp: new Date(), location: 'Line 1', severity: 'High', status: 'Unacknowledged' },
    { timestamp: new Date(), location: 'Line 2', severity: 'Medium', status: 'Unacknowledged' },
    { timestamp: new Date(), location: 'Line 3', severity: 'Low', status: 'Unacknowledged' }
  ];

  acknowledgeAlert(alert: any) {
    alert.status = 'Acknowledged';
    // Implement logic to send acknowledgment to backend
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
