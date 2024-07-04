import { Component } from '@angular/core';

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
  
}
