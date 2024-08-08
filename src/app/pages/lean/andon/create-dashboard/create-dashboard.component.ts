import { Component } from '@angular/core';
import { DashboardService } from '../api/dashboard.service';
import { Dashboard, Station, Threshold, Alert, Notification } from '../api/dashboard.model';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-create-dashboard',
  templateUrl: './create-dashboard.component.html',
  styleUrls: ['./create-dashboard.component.scss'],
})
export class CreateDashboardComponent {
  currentStep = 0;
  dashboard: Omit<Dashboard, 'id'> = {
    name: '',
    refreshRate: 30,
    stations: [],
    thresholds: [{ id: '', warning: 65, critical: 90 }],
    alerts: [],
    notifications: [],
  };

  station: Omit<Station, 'id'> = {
    name: '',
    metric_name: '',
    target_value: '',
    icon: '',
    status: 'normal',
  };

  constructor(    private router: Router,
    private dashboardService: DashboardService) {}

  nextStep() {
    this.currentStep++;
  }

  addStation() {
    const newStation: Station = { ...this.station, id: this.generateId() };
    this.dashboard.stations.push(newStation);
    this.station = { name: '', metric_name: '', target_value: '', icon: '', status: 'normal' };
  }
  goBackToDashboards() {
    this.router.navigate(['/pages/lean/andon/use']);
  }
  removeStation(index: number) {
    this.dashboard.stations.splice(index, 1);
  }

  generateDashboard() {
    this.dashboardService.createDashboard(this.dashboard).subscribe(
      (response) => {
        console.log('Dashboard created:', response);
      },
      (error) => {
        console.error('Error creating dashboard:', error);
      }
    );
  }

  private generateId(): string {
    return Math.random().toString(36).substr(2, 9);
  }
}
