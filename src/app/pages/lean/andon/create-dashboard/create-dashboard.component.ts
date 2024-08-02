import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-create-dashboard',
  templateUrl: './create-dashboard.component.html',
  styleUrls: ['./create-dashboard.component.scss']
})
export class CreateDashboardComponent {
  stations: any[] = [];
  currentStep = 1;
  dashboardName = '';
  refreshRate = 3;
  stationName = '';
  metricName = '';
  targetValue = 0;
  selectedIcon = 'fa-cog';
  warningThreshold = 60;
  criticalThreshold = 50;



  constructor( private router: Router) { }

  ngOnInit(): void {
    this.addExampleStations();
  }

  nextStep(step: number) {
    this.currentStep = step;
    if (step === 4) {
      this.updatePreview();
    }
  }

  addStation() {
    const station = {
      name: this.stationName,
      metric: this.metricName,
      target: this.targetValue,
      icon: this.selectedIcon,
      currentValue: 0,
      average: 0,
      efficiency: 0
    };
    this.stations.push(station);
    this.updateStationList();
    this.clearStationInputs();
  }
  clearStationInputs() {
    this.stationName = '';
    this.metricName = '';
    this.targetValue = 0;
    this.selectedIcon = 'fa-cog';
  }

  updateStationList() {
    const stationList = document.getElementById('stationList');
    if (stationList) {
      stationList.innerHTML = '';
      this.stations.forEach((station, index) => {
        const stationItem = document.createElement('div');
        stationItem.className = 'station-item';
        stationItem.innerHTML = `
          <span><i class="fas ${station.icon}"></i> ${station.name} - ${station.metric}</span>
          <button class="remove-station" (click)="removeStation(${index})">Remove</button>

        `;
        stationList.appendChild(stationItem);
      });
    }
  }

  removeStation(index: number) {
    this.stations.splice(index, 1);
    this.updateStationList();
  }

  updatePreview() {
    const previewContainer = document.getElementById('previewContainer');
    if (previewContainer) {
      previewContainer.innerHTML = '';
      this.stations.forEach((station, index) => {
        const stationElement = document.createElement('div');
        stationElement.className = 'preview-station';
        stationElement.innerHTML = `
          <h3><i class="fas ${station.icon}"></i> ${station.name}</h3>
          <p>${station.metric}</p>
          <div class="preview-metric" id="metric-${index}">0</div>
          <div class="preview-status" id="status-${index}">Normal</div>
        `;
        previewContainer.appendChild(stationElement);
      });
      this.updateStatistics();
      this.simulateRealTimeUpdates();
    }
  }

  updateStatistics() {
    const statisticsContainer = document.createElement('div');
    statisticsContainer.className = 'statistics-container';
    statisticsContainer.innerHTML = '<h2>Real-Time Statistics</h2>';

    const statsTable = document.createElement('table');
    statsTable.innerHTML = `
      <tr>
        <th>Station</th>
        <th>Current Value</th>
        <th>Average</th>
        <th>Efficiency</th>
      </tr>

    `;

    this.stations.forEach((station, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${station.name}</td>
        <td id="current-${index}">${station.currentValue}</td>
        <td id="average-${index}">${station.average.toFixed(2)}</td>
        <td id="efficiency-${index}">${station.efficiency.toFixed(2)}%</td>
      `;
      statsTable.appendChild(row);
    });

    statisticsContainer.appendChild(statsTable);
    const wizardContainer = document.querySelector('.wizard-container');
    if (wizardContainer) {
      wizardContainer.appendChild(statisticsContainer);
    }
  }

  simulateRealTimeUpdates() {
    const refreshRate = parseInt((document.getElementById('refreshRate') as HTMLInputElement).value) * 1000;
    const warningThreshold = parseInt((document.getElementById('warningThreshold') as HTMLInputElement).value);
    const criticalThreshold = parseInt((document.getElementById('criticalThreshold') as HTMLInputElement).value);

    setInterval(() => {
      this.stations.forEach((station, index) => {
        const newValue = Math.floor(Math.random() * (station.target * 1.2));
        station.currentValue = newValue;
        station.average = (station.average * 9 + newValue) / 10; // Moving average
        station.efficiency = (newValue / station.target) * 100;

        const metricElement = document.getElementById(`metric-${index}`);
        const statusElement = document.getElementById(`status-${index}`);
        const currentElement = document.getElementById(`current-${index}`);
        const averageElement = document.getElementById(`average-${index}`);
        const efficiencyElement = document.getElementById(`efficiency-${index}`);

        if (metricElement && statusElement && currentElement && averageElement && efficiencyElement) {
          metricElement.textContent = newValue.toString();
          currentElement.textContent = newValue.toString();
          averageElement.textContent = station.average.toFixed(2);
          efficiencyElement.textContent = station.efficiency.toFixed(2) + '%';

          metricElement.classList.add('pulse');
          setTimeout(() => metricElement.classList.remove('pulse'), 1000);

          if (station.efficiency >= warningThreshold) {
            statusElement.className = 'preview-status';
            statusElement.textContent = 'Normal';
            statusElement.style.backgroundColor = 'var(--secondary-color)';
          } else if (station.efficiency >= criticalThreshold) {
            statusElement.className = 'preview-status';
            statusElement.textContent = 'Warning';
            statusElement.style.backgroundColor = '#f39c12';
          } else {
            statusElement.className = 'preview-status';
            statusElement.textContent = 'Critical';
            statusElement.style.backgroundColor = 'var(--danger-color)';
          }

          statusElement.classList.add('pulse');
          setTimeout(() => statusElement.classList.remove('pulse'), 1000);
        }
      });
    }, refreshRate);
  }

  generateDashboard() {
    const dashboardName = (document.getElementById('dashboardName') as HTMLInputElement).value;
    const refreshRate = (document.getElementById('refreshRate') as HTMLInputElement).value;
    const warningThreshold = (document.getElementById('warningThreshold') as HTMLInputElement).value;
    const criticalThreshold = (document.getElementById('criticalThreshold') as HTMLInputElement).value;

    alert(`Dashboard "${dashboardName}" configured with ${this.stations.length} stations.\nRefresh rate: ${refreshRate}s\nWarning threshold: ${warningThreshold}%\nCritical threshold: ${criticalThreshold}%\n\nYour Andon dashboard with real-time statistics is ready!`);
  }

  // Example stations initialization
  addExampleStations() {
    const exampleStations = [
      { name: 'Assembly Line', metric: 'Units/Hour', target: 100, icon: 'fa-industry' },
      { name: 'Quality Control', metric: 'Defect Rate', target: 5, icon: 'fa-clipboard-check' },
      { name: 'Packaging', metric: 'Boxes/Hour', target: 50, icon: 'fa-box' },
      { name: 'Shipping', metric: 'Orders Processed', target: 75, icon: 'fa-truck' }
    ];

    exampleStations.forEach(station => {
      this.stations.push({
        ...station,
        currentValue: 0,
        average: 0,
        efficiency: 0
      });
    });

    this.updateStationList();
  }
  goBack() {
    this.router.navigate(['/pages/lean/andon'], { queryParams: { tab: 'use' } });
  }
}
