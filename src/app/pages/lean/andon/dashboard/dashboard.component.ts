import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'ngx-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {

  todayIssues: number = 7; // Example: Number of issues today
  compliantLinesPercentage: number = 75; // Example percentage value
  stopHours: number = 3; // Example: Stop hours today
  workHours: number = 10; // Example: Work hours today
  stackingDelay: number = 5; // Example: Stacking delay today
  untrackedLines: number = 2; // Example: Number of untracked lines


  productionLineStatus: string = 'Running';
  uptimePercentage: number = 95;
  downtimePercentage: number = 5;
  constructor() {}
  getIssuesIndicatorClass(): string {
    // Logic to determine class based on today's issues
    if (this.todayIssues > 5) {
      return 'indicator-red'; // Example class for high issues
    } else if (this.todayIssues > 0) {
      return 'indicator-yellow'; // Example class for moderate issues
    } else {
      return 'indicator-green'; // Example class for low issues
    }
  }
  toggleHalfCircle(): void {
    const halfCircle = document.querySelector('.circle .mask.half .fill');
    if (halfCircle) {
      halfCircle.classList.toggle('rotate');
    }
  }
  getCompliantLinesIndicatorClass(): string {
    // Logic to determine class based on compliant lines percentage
    if (this.compliantLinesPercentage < 70) {
      return 'indicator-red'; // Example class for low compliance
    } else if (this.compliantLinesPercentage < 90) {
      return 'indicator-yellow'; // Example class for moderate compliance
    } else {
      return 'indicator-green'; // Example class for high compliance
    }
  }
  getStackingDelayIndicatorClass(): string {
    // Logic to determine class based on stacking delay
    if (this.stackingDelay > 30) {
      return 'indicator-red'; // Example class for high delay
    } else if (this.stackingDelay > 10) {
      return 'indicator-yellow'; // Example class for moderate delay
    } else {
      return 'indicator-green'; // Example class for low delay
    }
  }
  getUntrackedLinesIndicatorClass(): string {
    // Logic to determine class based on untracked lines
    if (this.untrackedLines > 10) {
      return 'indicator-red'; // Example class for high untracked lines
    } else if (this.untrackedLines > 0) {
      return 'indicator-yellow'; // Example class for moderate untracked lines
    } else {
      return 'indicator-green'; // Example class for low untracked lines
    }
  }

  @ViewChild('barChart') private barChartRef: ElementRef;
  @ViewChild('lineChart') private lineChartRef: ElementRef;
  @ViewChild('issuesChart') private issuesChartRef: ElementRef;
  @ViewChild('pieChartCanvas') private pieChartCanvas?: ElementRef<HTMLCanvasElement>;

  private barChart: any;
  private lineChart: any;
  private issuesChart: any;
  chart: Chart | undefined;

  // Example data for production lines
  chartData: number[][] = [
    [65, 59, 80, 81, 56, 55, 40], // Production Line 1
    [70, 62, 78, 79, 60, 58, 42], // Production Line 2
    [60, 58, 75, 77, 50, 48, 38]  // Production Line 3
  ];
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


  ngAfterViewInit() {
    this.setupBarChart();
    this.setupLineChart();
    this.setupIssuesChart();
    this.setupPieChart();

  }
  private setupPieChart() {
    if (this.pieChartCanvas) {
      // Get the native element and set its dimensions explicitly
      const canvasElement = this.pieChartCanvas.nativeElement;
      canvasElement.width = 150; // Example width
      canvasElement.height = 150; // Example height

      // Create the chart
      this.chart = new Chart(canvasElement, {
        type: 'pie',
        data: {
          labels: ['Compliant Lines', 'Non-compliant Lines'],
          datasets: [{
            label: 'Compliance',
            data: [this.compliantLinesPercentage, 100 - this.compliantLinesPercentage],
            backgroundColor: [
              'rgba(75, 192, 192, 0.8)',
              'rgba(255, 99, 132, 0)'
            ],
            borderColor: [
              'rgba(75, 192, 192, 1)',
              'rgba(255, 99, 132, 0)'
            ],
            borderWidth: 2
          }]
        },
        options: {
          responsive: false, // Ensure chart does not resize with window
          plugins: {
            legend: {
              display: false // Hide the legend
            },
            tooltip: {
              callbacks: {
                label: function(tooltipItem: any) {
                  return tooltipItem.label + ': ' + tooltipItem.raw.toFixed(2) + '%';
                }
              }
            }
          }
        }
      });
    }
  }



  private setupBarChart() {
    this.barChart = new Chart(this.barChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: this.chartLabels,
        datasets: [
          {
            label: 'Production Line 1',
            data: this.chartData[0],
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          },
          {
            label: 'Production Line 2',
            data: this.chartData[1],
            backgroundColor: 'rgba(255, 206, 86, 0.6)',
            borderColor: 'rgba(255, 206, 86, 1)',
            borderWidth: 1
          },
          {
            label: 'Production Line 3',
            data: this.chartData[2],
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }
        ]
      },
      options: this.chartOptions
    });
  }

  private setupLineChart() {
    this.lineChart = new Chart(this.lineChartRef.nativeElement, {
      type: 'line',
      data: {
        labels: this.chartLabels,
        datasets: [
          {
            label: 'Uptime',
            data: [95, 92, 96, 94, 93, 97, 95],
            fill: false,
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 2
          },
          {
            label: 'Downtime',
            data: [5, 8, 4, 6, 7, 3, 5],
            fill: false,
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 2
          }
        ]
      },
      options: this.chartOptions
    });
  }

  private setupIssuesChart() {
    this.issuesChart = new Chart(this.issuesChartRef.nativeElement, {
      type: 'bar',
      data: {
        labels: ['8am', '9am', '10am', '11am', '12pm', '1pm', '2pm'], // Example labels for hours
        datasets: [
          {
            label: 'Production Line 1 Issues',
            data: [10, 8, 12, 9, 11, 7, 13], // Example data for Production Line 1 issues by hour
            backgroundColor: 'rgba(255, 159, 64, 0.6)',
            borderColor: 'rgba(255, 159, 64, 1)',
            borderWidth: 1
          },
          {
            label: 'Production Line 2 Issues',
            data: [8, 6, 10, 7, 9, 5, 11], // Example data for Production Line 2 issues by hour
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          },
          {
            label: 'Production Line 3 Issues',
            data: [12, 9, 14, 10, 13, 8, 15], // Example data for Production Line 3 issues by hour
            backgroundColor: 'rgba(255, 99, 86, 0.6)',
            borderColor: 'rgba(255, 99, 86, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            stacked: true // Adjust if you want stacked or grouped bars
          },
          y: {
            beginAtZero: true // Start y-axis from zero
          }
        }
      }
    });
  }

}
