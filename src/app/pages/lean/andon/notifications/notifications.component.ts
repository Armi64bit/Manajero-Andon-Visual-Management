import { Component } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { NotificationDetailModalComponent } from '../notification-detail-modal/notification-detail-modal.component';

interface StationNotification {
  station: string;
  message: string;
  level: 'info' | 'warning' | 'critical';
  status: 'resolved' | 'in-progress' | 'new'; // Add status property
  timestamp: Date;
  note?: string; // Add optional note property
}

@Component({
  selector: 'ngx-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {

  notifications: StationNotification[] = [
    { station: 'Station 1', message: 'Temperature exceeded threshold', level: 'warning', status: 'new', timestamp: new Date() },
    { station: 'Station 2', message: 'Sensor failure detected', level: 'critical', status: 'new', timestamp: new Date() },
    { station: 'Station 3', message: 'Normal operation', level: 'info', status: 'resolved', timestamp: new Date() },
  ];

  notificationHistory: StationNotification[] = [
    { station: 'Station 1', message: 'Routine maintenance completed', level: 'info', status: 'resolved', timestamp: new Date() },
    { station: 'Station 2', message: 'Calibration adjusted', level: 'info', status: 'resolved', timestamp: new Date() },
  ];

  showHistoryFlag = false;

  constructor(private dialogService: NbDialogService) {}

  showHistory() {
    this.showHistoryFlag = true;
  }

  hideHistory() {
    this.showHistoryFlag = false;
  }

  openDetails(notification: StationNotification) {
    this.dialogService.open(NotificationDetailModalComponent, {
      context: {
        notification: notification
      }
    }).onClose.subscribe((updatedNotification: StationNotification) => {
      if (updatedNotification) {
        // Update the notification with the new status and note
        const index = this.notifications.findIndex(n => n.station === updatedNotification.station && n.timestamp.getTime() === updatedNotification.timestamp.getTime());
        if (index > -1) {
          this.notifications[index] = updatedNotification;
        }
      }
    });
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
