import { Component, OnChanges, Input, SimpleChanges, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { DashboardService } from '../api/dashboard.service';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnChanges, OnDestroy {
  @Input() dashboard: any;
  status: string = 'normal';
  countdown: number = 0;
  refreshInterval: any;
  countdownInterval: any;

  constructor(private dashboardService: DashboardService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.startRefreshProcess();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dashboard']) {
      this.evaluateStatus();
      this.updateCountdown();
    }
  }

  ngOnDestroy(): void {
    if (this.refreshInterval) {
      clearInterval(this.refreshInterval);
    }
    if (this.countdownInterval) {
      clearInterval(this.countdownInterval);
    }
  }

  evaluateStatus(): void {
    if (this.dashboard) {
      const stations = this.dashboard.stations || [];
      const totalStations = stations.length;

      console.log('Total Stations:', totalStations);
      if (totalStations === 0) {
        this.status = 'normal';
        return;
      }

      const criticalCount = stations.filter((station: any) => station.status === 'critical').length;
      const warningCount = stations.filter((station: any) => station.status === 'warning').length;
      const normalCount = stations.filter((station: any) => station.status === 'normal').length;

      console.log('Critical Count:', criticalCount);
      console.log('Warning Count:', warningCount);
      console.log('Normal Count:', normalCount);

      if (criticalCount / totalStations > 0.3) {
        this.status = 'critical';
      } else if (warningCount / totalStations > 0.3) {
        this.status = 'warning';
      } else {
        this.status = 'normal';
      }

      console.log('Evaluated Status:', this.status);
      this.cdr.detectChanges(); // Manually trigger change detection
    }
  }

  startRefreshProcess(): void {
    if (this.dashboard && this.dashboard.refreshRate) {
      this.refreshData();
      this.refreshInterval = setInterval(() => {
        this.refreshData();
      }, this.dashboard.refreshRate * 1000); // Convert seconds to milliseconds
    }
  }

  refreshData(): void {
    if (this.dashboard && this.dashboard.id) {
      this.dashboardService.getDashboardById(this.dashboard.id).subscribe(data => {
        this.dashboard = data;
        this.evaluateStatus();
        this.updateCountdown();
      }, error => {
        console.error('Error fetching data:', error);
      });
    }
  }

  updateCountdown(): void {
    if (this.dashboard && this.dashboard.refreshRate) {
      this.countdown = this.dashboard.refreshRate;
      if (this.countdownInterval) {
        clearInterval(this.countdownInterval); // Clear previous countdown interval
      }
      this.countdownInterval = setInterval(() => {
        this.countdown--;
        if (this.countdown <= 0) {
          this.countdown = this.dashboard.refreshRate; // Reset countdown
          // Optionally, you could call refreshData here to ensure immediate refresh
          // this.refreshData();
        }
        console.log('Countdown:', this.countdown); // Debugging output
        this.cdr.detectChanges(); // Manually trigger change detection
      }, 1000); // Update every second
    }
  }
}
