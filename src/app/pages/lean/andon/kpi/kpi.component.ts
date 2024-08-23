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
  averageDowntimePercentage: number = 0;
  averageUptimePercentage: number = 0;
  totalWarningNotifications: number = 0;
  totalCriticalNotifications: number = 0;
  constructor(private kpiService: KpiService) { }

  ngOnInit() {
    this.kpiService.getKpisForAllDashboards().subscribe(kpis => {

      this.averageDowntimePercentage = kpis.averageDowntimePercentage;
      this.averageUptimePercentage = kpis.averageUptimePercentage;
      this.totalWarningNotifications = kpis.totalWarningNotifications;
      this.totalCriticalNotifications = kpis.totalCriticalNotifications;


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
        { name: 'Resolved', value: kpis.totalAlerts - kpis.totalInProgressAlerts },
        { name: 'In-Progress', value: kpis.totalInProgressAlerts }
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
        left: 'center',
        textStyle: {
          color: '#333',
          fontWeight: 'bold',
          fontSize: 16
        }
      },
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        textStyle: {
          color: '#fff'
        },
        formatter: '{a} <br/>{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'horizontal',
        bottom: '10%',
        data: data.map(item => item.name),
        textStyle: {
          color: '#555'
        }
      },
      color: ['#4caf50', '#ff9800', '#f44336'],  // Updated order to align colors correctly
      series: [
        {
          name: title,
          type: 'pie',
          radius: ['40%', '70%'], // Donut-style pie chart
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2
          },
          label: {
            show: true,
            position: 'outside',
            formatter: '{b}: {d}%',
            color: '#333',
            fontSize: 14
          },
          labelLine: {
            length: 20,
            length2: 15
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
          data: data
        }
      ]
    };
  }


  createBarChartOption(title: string, data: any[]) {
    return {
      title: {
        text: title,
        left: 'center',
        textStyle: {
          color: '#333',
          fontSize: 16
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        },
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        textStyle: {
          color: '#fff'
        }
      },
      xAxis: {
        type: 'category',
        data: data.map(item => item.name),
        axisLabel: {
          interval: 0,
          rotate: 30,
          color: '#333'
        },
        axisLine: {
          lineStyle: {
            color: '#ddd'
          }
        }
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: false
        },
        splitLine: {
          lineStyle: {
            color: '#f0f0f0'
          }
        }
      },
      color: ['#4caf50', '#ff9800', '#f44336'],
      series: [
        {
          name: title,
          type: 'bar',
          data: data.map(item => ({
            value: item.value,
            itemStyle: {
              color: this.getColorForName(item.name), // Use gradient color based on name
              barBorderRadius: [4, 4, 0, 0]
            }
          })),
          label: {
            show: true,
            position: 'top',
            color: '#333'
          },
          emphasis: {
            itemStyle: {
              color: '#ff5722'
            }
          }
        }
      ],
      grid: {
        left: '3%',
        right: '4%',
        bottom: '10%',
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
        left: 'center',
        textStyle: {
          color: '#333',
          fontSize: 16
        }
      },
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        textStyle: {
          color: '#fff'
        },
        formatter: '{b}<br/>Count: {c}'
      },
      xAxis: {
        type: 'category',
        data: dates,
        boundaryGap: false,
        axisLine: {
          lineStyle: {
            color: '#ddd'
          }
        },
        axisLabel: {
          color: '#333'
        }
      },
      yAxis: {
        type: 'value',
        axisLine: {
          show: false
        },
        splitLine: {
          lineStyle: {
            color: '#f0f0f0'
          }
        }
      },
      color: ['#007bff'],
      series: [
        {
          name: 'Notifications',
          type: 'line',
          data: dates.map(date => counts[date] || 0),
          smooth: true, // Smooth line
          areaStyle: {
            color: 'rgba(0, 123, 255, 0.2)' // Add area shading under the line
          },
          lineStyle: {
            width: 2
          },
          symbol: 'circle',
          symbolSize: 8
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
        left: 'center',
        textStyle: {
          color: '#333',
          fontSize: 18,
          fontWeight: 'bold',
          fontFamily: 'Arial, sans-serif'
        }
      },
      tooltip: {
        formatter: '{a} <br/>{b}: {c}%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        textStyle: {
          color: '#fff',
          fontSize: 14,
          fontFamily: 'Arial, sans-serif'
        }
      },
      series: [{
        name: title,
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        radius: '85%',
        center: ['50%', '60%'],
        detail: {
          formatter: '{value}%',
          fontSize: 24,
          fontWeight: 'bold',
          color: '#333',
          backgroundColor: 'transparent',
          borderWidth: 0
        },
        data: [{ value: value, name: title }],
        axisLine: {
          lineStyle: {
            color: [
              [0.3, '#FF6F61'],  // Red for low values
              [0.7, '#FFEB3B'],  // Yellow for moderate values
              [1, '#4CAF50']    // Green for high values
            ],
            width: 10
          }
        },
        axisTick: {
          distance: -20,
          length: 6,
          lineStyle: {
            color: '#999',
            width: 1
          }
        },
        splitLine: {
          distance: -20,
          length: 14,
          lineStyle: {
            color: '#999',
            width: 1
          }
        },
        axisLabel: {
          color: '#333',
          fontSize: 12,
          fontFamily: 'Arial, sans-serif'
        },
        pointer: {
          width: 4,
          length: '80%',
          itemStyle: {
            color: '#607D8B', // Dark grey pointer
            shadowColor: 'rgba(0, 0, 0, 0.3)',
            shadowBlur: 6
          }
        },
        itemStyle: {
          color: '#607D8B' // Pointer color
        }
      }]
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
