import { Component, Input } from '@angular/core';
import { Whatif, WhatifService } from '../../api/whatif.service';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-edit-whatif-modal',
  templateUrl: './edit-whatif-modal.component.html',
  styleUrls: ['./edit-whatif-modal.component.scss']
})
export class EditWhatifModalComponent {
  @Input() whatifData: Whatif;

  constructor(
    protected ref: NbDialogRef<EditWhatifModalComponent>,
    private whatifService: WhatifService // Inject WhyService
  ) {}

  close() {
    this.ref.close();
  }

  saveChanges() {
    // Call updateWhy method from WhyService
    this.whatifService.updateWhatif(this.whatifData.id, this.whatifData).subscribe(updatedWhy => {
      console.log('Updated Whatif:', updatedWhy);
      this.ref.close(); // Close modal after saving changes
    }, error => {
      console.error('Error updating Whatif:', error);
      // Handle error scenario
    });
  }
}
