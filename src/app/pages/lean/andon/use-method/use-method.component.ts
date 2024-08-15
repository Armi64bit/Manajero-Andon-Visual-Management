import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { Dashboard, Notification, Station } from '../api/dashboard.model';
import { DashboardService } from '../api/dashboard.service';
import { NbDialogService } from '@nebular/theme';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { StationDetailsComponent } from '../station-details/station-details.component';
import { Router } from '@angular/router';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'ngx-use-method',
  templateUrl: './use-method.component.html',
  styleUrls: ['./use-method.component.scss'],
})
export class UseMethodComponent implements OnInit, OnDestroy {
  dashboards: Dashboard[] = [];
  selectedDashboard: Dashboard | null = null;
  private stationStatusCheck$: Subscription | null = null;

  constructor(
    private dashboardService: DashboardService,
    private dialogService: NbDialogService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadDashboards();
  }

  ngOnDestroy(): void {
    if (this.stationStatusCheck$) {
      this.stationStatusCheck$.unsubscribe();
    }
  }

  loadDashboards(): void {
    this.dashboardService.getAllDashboards().subscribe(
      (dashboards: Dashboard[]) => {
        this.dashboards = dashboards;
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error loading dashboards:', error);
      }
    );
  }

  onSelectDashboard(dashboard: Dashboard): void {
    if (this.selectedDashboard) {
      // Stop monitoring the previous dashboard
      this.stopMonitoringStations();
    }

    this.selectedDashboard = dashboard;
    if (dashboard) {
      this.loadDashboardData(dashboard.id);
      this.startMonitoringStations(dashboard.id);
    }
  }

  onEditDashboard(dashboardId: string) {
    this.router.navigate(['/pages/lean/andon/updateDash', dashboardId]);
  }

  onCreateDashboard() {
    this.router.navigate(['/pages/lean/andon/create-dashboard']); // Replace with your actual route
  }
  gotokpi() {
    this.router.navigate(['/pages/lean/andon/kpi']); // Replace with your actual route
  }

  onBackToSelection(): void {
    if (this.selectedDashboard) {
      this.stopMonitoringStations();
    }
    this.selectedDashboard = null;
  }

  onDeleteDashboard(dashboard: Dashboard): void {
    this.dialogService
      .open(ConfirmationDialogComponent, {
        context: {
          title: 'Confirm Deletion',
          message: `Are you sure you want to delete the dashboard "${dashboard.name}"?`,
        },
      })
      .onClose.subscribe((confirmed) => {
        if (confirmed) {
          this.dashboardService.deleteDashboard(dashboard.id).subscribe(
            () => {
              if (this.selectedDashboard && this.selectedDashboard.id === dashboard.id) {
                this.stopMonitoringStations();
              }
              this.selectedDashboard = null;
              this.loadDashboards();
              this.cdr.detectChanges();
            },
            (error) => {
              console.error('Error deleting dashboard:', error);
            }
          );
        }
      });
  }

  updateStationData(newData: Station[]): void {
    if (this.selectedDashboard) {
      this.selectedDashboard.stations.forEach(station => {
        const newStation = newData.find(s => s.id === station.id);
        if (newStation) {
          if (this.isStatusChanged(station, newStation)) {
            this.addNotification(newStation);
          }
          station.target_value = newStation.target_value;
          station.updated = true;
          setTimeout(() => station.updated = false, 1000);
        }
      });
      this.cdr.detectChanges();
    }
  }

  loadDashboardData(dashboardId: string): void {
    this.dashboardService.getDashboardData(dashboardId).subscribe(
      (data: Station[]) => {
        this.updateStationData(data); // data should be of type Station[]
      },
      (error) => {
        console.error('Error loading dashboard data:', error);
      }
    );
  }

  isStatusChanged(oldStation: Station, newStation: Station): boolean {
    return oldStation.status !== newStation.status &&
           (newStation.status === 'warning' || newStation.status === 'critical');
  }

  addNotification(station: Station): void {
    if (!this.selectedDashboard) return;

    const notification: Notification = {
      station: station.name,
      message: `Station ${station.name} has changed to ${station.status} status.`,
      level: 'info',
      status: 'new',
      timestamp: new Date(),
      note: '',
      type: 'STATUS_CHANGE',
      dataSource: 'System'
    };

    this.dashboardService.addNotificationToDashboard(this.selectedDashboard.id, notification).subscribe(
      () => console.log('Notification added'),
      (error) => console.error('Error adding notification:', error)
    );
  }

  startMonitoringStations(dashboardId: string): void {
    this.stationStatusCheck$ = timer(0, 60000).subscribe(() => {
      this.loadDashboardData(dashboardId);
    });
  }

  stopMonitoringStations(): void {
    if (this.stationStatusCheck$) {
      this.stationStatusCheck$.unsubscribe();
      this.stationStatusCheck$ = null;
    }
  }

  openStationDetails(station: any) {
    this.dialogService.open(StationDetailsComponent, {
      context: {
        station: station
      }
    });
  }
}
