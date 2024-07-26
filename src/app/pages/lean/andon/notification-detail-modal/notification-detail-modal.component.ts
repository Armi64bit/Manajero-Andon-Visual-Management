import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

interface StationNotification {
  station: string;
  message: string;
  level: 'info' | 'warning' | 'critical';
  timestamp: Date;
}


@Component({
  selector: 'ngx-notification-detail-modal',
  templateUrl: './notification-detail-modal.component.html',
  styleUrls: ['./notification-detail-modal.component.scss']
})
export class NotificationDetailModalComponent {
  notification: StationNotification;

  constructor(protected dialogRef: NbDialogRef<NotificationDetailModalComponent>) {}

  close() {
    this.dialogRef.close();
  }

  getLevelColor(level: 'info' | 'warning' | 'critical'): string {
    switch (level) {
      case 'info':
        return 'primary';
      case 'warning':
        return 'warning';
      case 'critical':
        return 'danger';
    }
  }

  getLevelIcon(level: 'info' | 'warning' | 'critical'): string {
    switch (level) {
      case 'info':
        return 'info-outline';
      case 'warning':
        return 'alert-triangle-outline';
      case 'critical':
        return 'alert-circle-outline';
    }
  }
}
