import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Why, WhyService } from '../../api/why.service';

@Component({
  selector: 'ngx-edit-why-modal',
  templateUrl: './edit-why-modal.component.html',
  styleUrls: ['./edit-why-modal.component.scss']
})
export class EditWhyModalComponent {
  @Input() whyData: Why;

  constructor(
    protected ref: NbDialogRef<EditWhyModalComponent>,
    private whyService: WhyService // Inject WhyService
  ) {}

  close() {
    this.ref.close();
  }

  saveChanges() {
    // Call updateWhy method from WhyService
    this.whyService.updateWhy(this.whyData.id, this.whyData).subscribe(updatedWhy => {
      console.log('Updated Why:', updatedWhy);
      this.ref.close(); // Close modal after saving changes
      window.location.reload(); // Reload the page after saving changes

    }, error => {
      console.error('Error updating Why:', error);
      // Handle error scenario
    });
  }
}
