import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DashboardService } from '../api/dashboard.service';

@Component({
  selector: 'ngx-edit-dashboard',
  templateUrl: './edit-dashboard.component.html',
  styleUrls: ['./edit-dashboard.component.scss']
})
export class EditDashboardComponent implements OnInit {
  dashboard: any = {
    name: '',
    refreshRate: 1,
    stations: [],
    thresholds: [{ warning: 0, critical: 0 }]
  };
  station: any = { name: '', metric_name: '', target_value: 0, icon: '' };
  currentStep: number = 0;
  dashboardId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private dashboardService: DashboardService
  ) {}

  ngOnInit() {
    this.dashboardId = this.route.snapshot.paramMap.get('id');
    this.loadDashboard();
  }

  loadDashboard() {
    this.dashboardService.getDashboardById(this.dashboardId).subscribe(
      data => {
        this.dashboard = data;
      },
      error => {
        console.error('Error loading dashboard:', error);
      }
    );
  }

  goBackToDashboards() {
    this.router.navigate(['/pages/lean/andon/use']);
  }

  nextStep() {
    if (this.currentStep < 3) {
      this.currentStep++;
    }
  }

  addStation() {
    this.dashboard.stations.push({ ...this.station });
    this.station = { name: '', metric_name: '', target_value: 0, icon: '' };
  }

  removeStation(index: number) {
    this.dashboard.stations.splice(index, 1);
  }

  generateDashboard() {
    this.dashboardService.updateDashboard(this.dashboardId, this.dashboard).subscribe(
      () => {
        this.router.navigate(['/pages/lean/andon/use']);
      },
      error => {
        console.error('Error updating dashboard:', error);
      }
    );
  }
}
