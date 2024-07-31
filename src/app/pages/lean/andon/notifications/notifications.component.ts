import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { NbDialogService } from '@nebular/theme';
import { NotificationDetailModalComponent } from '../notification-detail-modal/notification-detail-modal.component';
import { Dashboard } from '../api/dashboard.model'; // Ensure this matches your actual path

// Define the Notification interface
export interface Notification {
  id: string;
  type: string;
  message: string;
  timestamp: string;
  dataSource: string;
}

// Update StationNotification to match the expected display format
interface StationNotification {
  id: string;
  station: string;
  message: string;
  level: 'info' | 'warning' | 'critical';
  status: 'resolved' | 'in-progress' | 'new';
  timestamp: Date;
  note?: string;
}

@Component({
  selector: 'ngx-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnChanges {
  @Input() dashboard: Dashboard | null = null;

  notifications: StationNotification[] = [];
  showHistoryFlag = false;

  constructor(private dialogService: NbDialogService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.dashboard && this.dashboard) {
      this.loadNotifications();
    }
  }

  loadNotifications(): void {
    if (this.dashboard) {
      this.notifications = this.dashboard.notifications.map(notification => ({
        id: notification.id, // Ensure id is included
        station: this.getStationName(notification.dataSource),
        message: notification.message,
        level: this.mapNotificationLevel(notification.type),
        status: 'new', // Set default status or implement a way to determine it
        timestamp: new Date(notification.timestamp),
        note: notification.note // Include note if available
      }));

      // Sort notifications by timestamp in descending order (most recent first)
      this.notifications.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    }
  }


  getStationName(dataSource: string): string {
    // Implement a method to map dataSource to station name if needed
    return dataSource;
  }

  mapNotificationLevel(type: string): 'info' | 'warning' | 'critical' {
    switch (type) {
      case 'info':
        return 'info';
      case 'warning':
        return 'warning';
      case 'critical':
        return 'critical';
      default:
        return 'info'; // Default to 'info' if the type doesn't match
    }
  }

  getDisplayedNotifications(): StationNotification[] {
    return this.showHistoryFlag ? this.notifications : this.notifications.slice(0, 2);
  }

  toggleHistory(): void {
    this.showHistoryFlag = !this.showHistoryFlag;
  }

  openDetails(notification: StationNotification) {
    this.dialogService.open(NotificationDetailModalComponent, {
      context: {
        notification: notification
      }
    }).onClose.subscribe((updatedNotification: StationNotification) => {
      if (updatedNotification) {
        // Update the notification in the list
        const index = this.notifications.findIndex(n => n.id === updatedNotification.id);
        if (index > -1) {
          this.notifications[index] = updatedNotification;
          // Optional: Sort the notifications if needed
          this.notifications.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
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
