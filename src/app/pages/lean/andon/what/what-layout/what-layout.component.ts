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
    this.loadWhyData(); // Load initial data
  }

  loadWhyData() {
    this.whatService.getWhatById("668fbc1a54d4c57710653c10").subscribe(data => {
      this.what = data;
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
        this.loadWhyData(); // Reload data to reflect changes

      }
    });
  }

}
