import { Component } from '@angular/core';

@Component({
  selector: 'ngx-issue-list',
  templateUrl: './issue-list.component.html',
  styleUrls: ['./issue-list.component.scss']
})
export class IssueListComponent {
  issues = [
    { timestamp: new Date(), location: 'Line 1', severity: 'High', assignedTo: 'John Doe', status: 'Open' },
    { timestamp: new Date(), location: 'Line 2', severity: 'Medium', assignedTo: 'Jane Smith', status: 'In Progress' },
    { timestamp: new Date(), location: 'Line 3', severity: 'Low', assignedTo: 'James Brown', status: 'Closed' }
  ];
  getSeverityColor(severity: string): string {
    switch (severity) {
      case 'High':
        return 'danger';
      case 'Medium':
        return 'warning';
      case 'Low':
        return 'success';
      default:
        return 'secondary';
    }
  }

}
