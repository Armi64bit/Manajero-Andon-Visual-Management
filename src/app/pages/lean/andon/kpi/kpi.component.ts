// kpi.component.ts
import { Component, OnInit } from '@angular/core';
import { KpiService } from '../api/kpi.service';
import * as echarts from 'echarts';

@Component({
  selector: 'ngx-kpi',
  templateUrl: './kpi.component.html',
  styleUrls: ['./kpi.component.scss']
})
export class KpiComponent implements OnInit {

  totalNotificationsOption: any;
  averageDowntimeOption: any;
  averageUptimeOption: any;
  totalNotificationsBarOption: any;
  stationsStatusBarOption: any;
  alertsPieOption: any;
  notificationsLineOption: any;

  constructor(private kpiService: KpiService) { }

  ngOnInit() {
    this.kpiService.getKpisForAllDashboards().subscribe(kpis => {
      this.totalNotificationsOption = this.createPieChartOption('Notifications Breakdown', [
        { name: 'Resolved', value: kpis.totalResolvedNotifications },
        { name: 'Warning', value: kpis.totalWarningNotifications },
        { name: 'Critical', value: kpis.totalCriticalNotifications }
      ]);

      this.averageDowntimeOption = this.createGaugeOption('Average Downtime %', kpis.averageDowntimePercentage);
      this.averageUptimeOption = this.createGaugeOption('Average Uptime %', kpis.averageUptimePercentage);

      this.totalNotificationsBarOption = this.createBarChartOption('Total Notifications', [
        { name: 'Resolved', value: kpis.totalResolvedNotifications },
        { name: 'Warning', value: kpis.totalWarningNotifications },
        { name: 'Critical', value: kpis.totalCriticalNotifications }
      ]);

      this.stationsStatusBarOption = this.createBarChartOption('Stations by Status', [
        { name: 'Critical', value: kpis.totalCriticalStations },
        { name: 'Warning', value: kpis.totalWarningStations }
      ]);

      this.alertsPieOption = this.createPieChartOption('Alerts Breakdown', [
        { name: 'In-Progress', value: kpis.totalInProgressAlerts },
        { name: 'Resolved', value: kpis.totalAlerts - kpis.totalInProgressAlerts }
      ]);

      this.kpiService.getNotifications().subscribe(notifications => {
        this.notificationsLineOption = this.createLineChartOption(notifications);
      });
    });
  }

  createPieChartOption(title: string, data: any[]) {
    return {
      title: {
        text: title,
        left: 'center'
      },
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: 'left',
        data: data.map(item => item.name)
      },
      color: ['#ff9999', '#66b3ff', '#99ff99'], // Define custom colors here
      series: [
        {
          name: title,
          type: 'pie',
          radius: '50%',
          data: data,
          emphasis: {
            itemStyle: {
              color: '#ff0000' // Highlight color
            }
          },
          label: {
            show: true,
            position: 'outside',
            formatter: '{b}: {d}%'
          }
        }
      ]
    };
  }

  createBarChartOption(title: string, data: any[]) {
    return {
      title: {
        text: title,
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      xAxis: {
        type: 'category',
        data: data.map(item => item.name),
        axisLabel: {
          interval: 0,
          rotate: 30 // Rotate labels for better visibility
        }
      },
      yAxis: {
        type: 'value'
      },
      color: ['#4caf50', '#ffeb3b', '#f44336'], // Define custom colors here
      series: [
        {
          name: title,
          type: 'bar',
          data: data.map(item => ({
            value: item.value,
            itemStyle: {
              color: this.getColorForName(item.name) // Set color based on name
            }
          })),
          label: {
            show: true,
            position: 'top'
          },
          emphasis: {
            itemStyle: {
              color: '#ff0000'
            }
          }
        }
      ],
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      }
    };
  }

  createLineChartOption(notifications: any[]) {
    const dates = Array.from(new Set(notifications.map(notification => new Date(notification.timestamp).toLocaleDateString())));
    const counts = notifications.reduce((acc, notification) => {
      const date = new Date(notification.timestamp).toLocaleDateString();
      acc[date] = (acc[date] || 0) + 1;
      return acc;
    }, {});

    return {
      title: {
        text: 'Notifications Over Time',
        left: 'center'
      },
      tooltip: {
        trigger: 'axis',
        formatter: '{b}<br/>Count: {c}'
      },
      xAxis: {
        type: 'category',
        data: dates,
        boundaryGap: false
      },
      yAxis: {
        type: 'value'
      },
      color: '#007bff',
      series: [
        {
          name: 'Notifications',
          type: 'line',
          data: dates.map(date => counts[date] || 0),
          smooth: true // Smooth line
        }
      ],
      dataZoom: [{
        type: 'inside',
        start: 0,
        end: 100
      }]
    };
  }

  createGaugeOption(title: string, value: number) {
    return {
      title: {
        text: title,
        subtext: '',
        left: 'center'
      },
      series: [{
        name: title,
        type: 'gauge',
        detail: { formatter: '{value}%' },
        data: [{ value: value, name: title }],
        itemStyle: {
          color: '#67C23A' // Gauge color
        }
      }],
      emphasis: {
        itemStyle: {
          color: '#ff0000'
        }
      }
    };
  }

  getColorForName(name: string) {
    const colors = {
      'Resolved': '#4caf50',
      'Warning': '#ffeb3b',
      'Critical': '#ff0000',
    };
    return colors[name] || '#000000'; // Default to black if name is not found
  }
}
