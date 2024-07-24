import { Component, OnInit } from '@angular/core';
import { What, WhatService } from '../../api/what.service';
import { NbDialogService } from '@nebular/theme';
import { EditWhatModalComponent } from '../edit-what-modal/edit-what-modal.component';

@Component({
  selector: 'ngx-what-layout',
  templateUrl: './what-layout.component.html',
  styleUrls: ['./what-layout.component.scss']
})
export class WhatLayoutComponent implements OnInit {
  what: What;

  constructor(
    private whatService: WhatService,
    private dialogService: NbDialogService // Inject the dialog service correctly
  ) {}

  ngOnInit() {
    this.loadWhatData(); // Load initial data
  }

  loadWhatData(): void {
    this.whatService.getAllWhats().subscribe(data => {
      if (data.length > 0) {
        this.what = data[0]; // Load the first item from the list
      } else {
        // Handle the case where no items are returned
        console.log('No data found');
      }
    }, error => {
      // Handle any errors that occur during the HTTP request
      console.error('Error fetching data', error);
    });
  }

  openEditModal() {
    this.dialogService.open(EditWhatModalComponent, {
      context: {
        whatData: { ...this.what } // Pass a copy of whys to prevent direct mutation
      }
    }).onClose.subscribe(updatedWhat => {
      if (updatedWhat) {
        this.what = updatedWhat; // Update whys if changes were saved
        this.loadWhatData(); // Reload data to reflect changes

      }
    });
  }

}
