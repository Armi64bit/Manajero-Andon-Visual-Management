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
    { value: 'home-outline', name: 'Home' },
    { value: 'bell-outline', name: 'Bell' },
    { value: 'heart-outline', name: 'Heart' },
    { value: 'settings-outline', name: 'Settings' },
    { value: 'info-outline', name: 'Info' },
    { value: 'checkmark-outline', name: 'Checkmark' },
    { value: 'close-outline', name: 'Close' },
    { value: 'alarm-outline', name: 'Alarm' },
    { value: 'clock-outline', name: 'Clock' },
    { value: 'cog-outline', name: 'Cog' },
    { value: 'lab-outline', name: 'Lab' },
    { value: 'factory-outline', name: 'Factory' },
    { value: 'tools-outline', name: 'Tools' },
    { value: 'bar-chart-outline', name: 'Bar Chart' },
    { value: 'pie-chart-outline', name: 'Pie Chart' },
    { value: 'list-outline', name: 'List' },
    { value: 'archive-outline', name: 'Archive' },
    { value: 'clipboard-outline', name: 'Clipboard' },
    { value: 'file-outline', name: 'File' },
    { value: 'folder-outline', name: 'Folder' },
    { value: 'warning-outline', name: 'Warning' },
    { value: 'info-circle-outline', name: 'Info Circle' },
    { value: 'graph-outline', name: 'Graph' },
    { value: 'tag-outline', name: 'Tag' },
    { value: 'search-outline', name: 'Search' },
    { value: 'edit-outline', name: 'Edit' },
    { value: 'plus-outline', name: 'Plus' },
    { value: 'minus-outline', name: 'Minus' },
    { value: 'upload-outline', name: 'Upload' },
    { value: 'download-outline', name: 'Download' },
    { value: 'sync-outline', name: 'Sync' },
    { value: 'thermometer-outline', name: 'Thermometer' },
    { value: 'printer-outline', name: 'Printer' },
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
