import { Component } from '@angular/core';

@Component({
  selector: 'ngx-alert-list',
  templateUrl: './alert-list.component.html',
  styleUrls: ['./alert-list.component.scss']
})
export class AlertListComponent {
  alerts = [
    { timestamp: new Date(), location: 'Line 1', severity: 'High', status: 'Unacknowledged' },
    { timestamp: new Date(), location: 'Line 2', severity: 'Medium', status: 'Unacknowledged' },
    { timestamp: new Date(), location: 'Line 3', severity: 'Low', status: 'Unacknowledged' }
  ];

  acknowledgeAlert(alert: any) {
    alert.status = 'Acknowledged';
    // Implement logic to send acknowledgment to backend
  }

  getSeverityClass(severity: string): string {
    switch (severity) {
      case 'High':
        return 'badge-danger';
      case 'Medium':
        return 'badge-warning';
      case 'Low':
        return 'badge-success';
      default:
        return 'badge-secondary';
    }
  }

}
