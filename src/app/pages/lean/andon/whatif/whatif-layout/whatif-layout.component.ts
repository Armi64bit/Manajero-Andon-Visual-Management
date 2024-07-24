import { Component, OnInit } from '@angular/core';
import { Whatif, WhatifService } from '../../api/whatif.service';
import { NbDialogService } from '@nebular/theme';
import { EditWhatifModalComponent } from '../edit-whatif-modal/edit-whatif-modal.component';

@Component({
  selector: 'ngx-whatif-layout',
  templateUrl: './whatif-layout.component.html',
  styleUrls: ['./whatif-layout.component.scss']
})
export class WhatifLayoutComponent implements OnInit  {
  whatif: Whatif;

  constructor(
    private whatifService: WhatifService,
    private dialogService: NbDialogService // Inject the dialog service correctly
  ) {}

  ngOnInit() {
    this.loadWhyData(); // Load initial data
  }

  loadWhyData(): void {
    this.whatifService.getAllWhatifs().subscribe(data => {
      if (data.length > 0) {
        this.whatif = data[0]; // Load the first item from the list
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
    this.dialogService.open(EditWhatifModalComponent, {
      context: {
        whatifData: { ...this.whatif } // Pass a copy of whys to prevent direct mutation
      }
    }).onClose.subscribe(updatedwhatif => {
      if (updatedwhatif) {
        this.whatif = updatedwhatif; // Update whys if changes were saved
      }
    });
  }
}
