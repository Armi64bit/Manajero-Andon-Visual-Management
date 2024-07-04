import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {
  productionLineStatus: string = 'Running';
  uptimePercentage: number = 95;
  downtimePercentage: number = 5;

  @ViewChild('barChart') private barChartRef: ElementRef;
  @ViewChild('lineChart') private lineChartRef: ElementRef;
  @ViewChild('issuesChart') private issuesChartRef: ElementRef;

  private barChart: any;
  private lineChart: any;
  private issuesChart: any;

  chartData: number[] = [65, 59, 80, 81, 56, 55, 40];
  chartLabels: string[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  chartOptions: any = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

  constructor() {}

  ngAfterViewInit() {
    this.setupBarChart();
    this.setupLineChart();
    this.setupIssuesChart();
  }

  private setupBarChart() {
    this.barChart = new Chart(this.barChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: this.chartLabels,
        datasets: [{
          label: 'Production Data',
          data: this.chartData,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: this.chartOptions
    });
  }

  private setupLineChart() {
    this.lineChart = new Chart(this.lineChartRef.nativeElement, {
      type: 'line',
      data: {
        labels: this.chartLabels,
        datasets: [{
          label: 'Uptime',
          data: [95, 92, 96, 94, 93, 97, 95],
          fill: false,
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 2
        }, {
          label: 'Downtime',
          data: [5, 8, 4, 6, 7, 3, 5],
          fill: false,
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 2
        }]
      },
      options: this.chartOptions
    });
  }

  private setupIssuesChart() {
    this.issuesChart = new Chart(this.issuesChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: this.chartLabels,
        datasets: [{
          label: 'Lines with Most Issues',
          data: [10, 8, 12, 9, 11, 7, 13], // Example data for lines with issues
          backgroundColor: 'rgba(255, 159, 64, 0.6)',
          borderColor: 'rgba(255, 159, 64, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
}
