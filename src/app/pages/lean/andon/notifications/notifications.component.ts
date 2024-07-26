import { Component } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { NotificationDetailModalComponent } from '../notification-detail-modal/notification-detail-modal.component';

interface StationNotification {
  station: string;
  message: string;
  level: 'info' | 'warning' | 'critical';
  timestamp: Date;
}


@Component({
  selector: 'ngx-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent {

  notifications: StationNotification[] = [
    { station: 'Station 1', message: 'Temperature exceeded threshold', level: 'warning', timestamp: new Date() },
    { station: 'Station 2', message: 'Sensor failure detected', level: 'critical', timestamp: new Date() },
    { station: 'Station 3', message: 'Normal operation', level: 'info', timestamp: new Date() },
  ];

  notificationHistory: StationNotification[] = [
    { station: 'Station 1', message: 'Routine maintenance completed', level: 'info', timestamp: new Date() },
    { station: 'Station 2', message: 'Calibration adjusted', level: 'info', timestamp: new Date() },
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
