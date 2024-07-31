import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Dashboard } from '../api/dashboard.model';
import { DashboardService } from '../api/dashboard.service';
import { NbDialogService } from '@nebular/theme';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'ngx-use-method',
  templateUrl: './use-method.component.html',
  styleUrls: ['./use-method.component.scss'],
})
export class UseMethodComponent implements OnInit {
  dashboards: Dashboard[] = [];
  selectedDashboard: Dashboard | null = null;

  constructor(
    private dashboardService: DashboardService,
    private dialogService: NbDialogService,
    private cdr: ChangeDetectorRef // Inject ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadDashboards();
  }

  loadDashboards(): void {
    console.log('Loading dashboards...');
    this.dashboardService.getAllDashboards().subscribe(
      (dashboards: Dashboard[]) => {
        this.dashboards = dashboards;
        this.cdr.detectChanges(); // Force change detection
        console.log('Loaded dashboards:', this.dashboards);
      },
      (error) => {
        console.error('Error loading dashboards:', error);
      }
    );
  }


  onSelectDashboard(dashboard: Dashboard): void {
    this.selectedDashboard = dashboard;
    console.log('Selected dashboard:', this.selectedDashboard);
  }

  onBackToSelection(): void {
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
              console.log('Dashboard deleted');
              this.selectedDashboard = null;
              this.loadDashboards(); // Reload dashboard list
              this.cdr.detectChanges(); // Force change detection

            },
            (error) => {
              console.error('Error deleting dashboard:', error);
            }
          );
        }
      });
  }
}
