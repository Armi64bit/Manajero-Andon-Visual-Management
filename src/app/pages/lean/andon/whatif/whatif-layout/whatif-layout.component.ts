import { Component } from '@angular/core';
import { Whatif, WhatifService } from '../../api/whatif.service';
import { NbDialogService } from '@nebular/theme';
import { EditWhatifModalComponent } from '../edit-whatif-modal/edit-whatif-modal.component';

@Component({
  selector: 'ngx-whatif-layout',
  templateUrl: './whatif-layout.component.html',
  styleUrls: ['./whatif-layout.component.scss']
})
export class WhatifLayoutComponent {
  whatif: Whatif;

  constructor(
    private whatifService: WhatifService,
    private dialogService: NbDialogService // Inject the dialog service correctly
  ) {}

  ngOnInit() {
    this.loadWhyData(); // Load initial data
  }

  loadWhyData() {
    this.whatifService.getWhatifById("668fbed954d4c57710653c11").subscribe(data => {
      this.whatif = data;
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
