import { Component } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

interface StationNotification {
  station: string;
  message: string;
  level: 'info' | 'warning' | 'critical';
  status: 'resolved' | 'in-progress' | 'new';
  timestamp: Date;
  note?: string;
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

  saveChanges() {
    // Handle saving changes, e.g., update the notification status and note
    console.log('Changes saved:', this.notification);
    this.dialogRef.close(this.notification); // Pass the updated notification back
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

  getStatusIcon(status: 'resolved' | 'in-progress' | 'new'): string {
    switch (status) {
      case 'resolved':
        return 'checkmark-circle-outline';
      case 'in-progress':
        return 'refresh-outline';
      case 'new':
        return 'circle-outline';
    }
  }
}
