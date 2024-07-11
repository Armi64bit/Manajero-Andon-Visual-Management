import { Component, Input } from '@angular/core';
import { What, WhatService } from '../../api/what.service';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-edit-what-modal',
  templateUrl: './edit-what-modal.component.html',
  styleUrls: ['./edit-what-modal.component.scss']
})
export class EditWhatModalComponent {
  @Input() whatData: What;

  constructor(
    protected ref: NbDialogRef<EditWhatModalComponent>,
    private whyService: WhatService
  ) {}

  close() {
    this.ref.close();
  }

  saveChanges() {
    // Call updateWhy method from WhyService
    this.whyService.updateWhat(this.whatData.id, this.whatData).subscribe(updatedWhy => {
      console.log('Updated What:', updatedWhy);
      this.ref.close(); // Close modal after saving changes
    }, error => {
      console.error('Error updating What:', error);
      // Handle error scenario
    });
  }
}
