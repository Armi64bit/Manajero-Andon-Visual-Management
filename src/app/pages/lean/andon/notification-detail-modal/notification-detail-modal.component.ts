import { Component, ChangeDetectorRef } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Notification } from '../api/dashboard.model';
import { NotificationService } from '../api/notifications.service';

@Component({
  selector: 'ngx-notification-detail-modal',
  templateUrl: './notification-detail-modal.component.html',
  styleUrls: ['./notification-detail-modal.component.scss']
})
export class NotificationDetailModalComponent {
  notification: Notification;

  constructor(
    protected dialogRef: NbDialogRef<NotificationDetailModalComponent>,
    private notificationService: NotificationService, // Inject NotificationService
    private cdr: ChangeDetectorRef
  ) {}

  close() {
    this.dialogRef.close();
  }

  saveChanges() {
    console.log('Saving notification:', this.notification);

    if (this.notification && this.notification.id) {
      this.notificationService.updateNotification(this.notification.id, this.notification).subscribe(
        updatedNotification => {
          console.log('Notification updated successfully:', updatedNotification);
          this.dialogRef.close(updatedNotification); // Close and return updated notification
          
        },
        error => {
          console.error('Error updating notification:', error);
        }
      );
    } else {
      console.error('Notification is missing an ID');
    }
    this.cdr.detectChanges(); // Ensure the view is updated
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
