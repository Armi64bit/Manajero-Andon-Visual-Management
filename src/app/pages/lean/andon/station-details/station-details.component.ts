import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { StationService } from '../api/station.service';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'ngx-station-details',
  templateUrl: './station-details.component.html',
  styleUrls: ['./station-details.component.scss']
})
export class StationDetailsComponent {
  @Input() station: any;
  isEditing: boolean = false;
  icons = [
    { value: 'fa-cogs', name: 'Cogs' },
    { value: 'fa-industry', name: 'Industry' },
    { value: 'fa-tools', name: 'Tools' },
    { value: 'fa-truck', name: 'Truck' },
    { value: 'fa-warehouse', name: 'Warehouse' },
    { value: 'fa-box', name: 'Box' },
    { value: 'fa-tachometer-alt', name: 'Tachometer' },
    { value: 'fa-hard-hat', name: 'Hard Hat' },
    { value: 'fa-wrench', name: 'Wrench' },
    { value: 'fa-gear', name: 'Gear' },
    { value: 'fa-pallet', name: 'Pallet' },
    { value: 'fa-screwdriver', name: 'Screwdriver' },
    { value: 'fa-hammer', name: 'Hammer' },
    { value: 'fa-bolt', name: 'Bolt' },
    { value: 'fa-saw', name: 'Saw' }
  ];





  constructor(
    private dialogRef: NbDialogRef<StationDetailsComponent>,
    private stationService: StationService
  ) {}

  ngAfterViewInit() {
    // Ensures the dropdown functionality works after the view is initialized
    const dropdownElement = document.getElementById('iconDropdown');
    if (dropdownElement) {
      // Initialize dropdown if necessary
      new bootstrap.Dropdown(dropdownElement);
    }
  }

  close() {
    this.dialogRef.close();
  }



  editStation() {
    this.isEditing = true;
  }

  cancelEdit() {
    this.isEditing = false;
    // Optionally reset form values or handle any additional logic
  }

  saveChanges() {
    this.stationService.updateStation(this.station.id, this.station).subscribe(
      response => {
        console.log('Station updated successfully', response);
        this.isEditing = false; // Exit edit mode
      },
      error => {
        console.error('Error updating station', error);
      }
    );
  }

  selectIcon(icon: { value: string, name: string }) {
    this.station.icon = icon.value;
  }
  getIconName(icon: string): string {
    return this.icons.find(i => i.value === icon)?.name || 'Unknown';
  }
}
