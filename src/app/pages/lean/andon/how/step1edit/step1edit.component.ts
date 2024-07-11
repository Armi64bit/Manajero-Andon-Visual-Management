import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { How, HowService } from '../../api/how.service';

@Component({
  selector: 'ngx-step1edit',
  templateUrl: './step1edit.component.html',
  styleUrls: ['./step1edit.component.scss']
})
export class Step1editComponent {
  @Input() howData: How;

  constructor(
    protected ref: NbDialogRef<Step1editComponent>,
    private howService: HowService
  ) {}

  close() {
    this.ref.close();
  }

  saveChanges() {
    // Call updateWhy method from WhyService
    this.howService.update(this.howData.id, this.howData).subscribe(updatedhow => {
      console.log('Updated What:', updatedhow);
      this.ref.close(); // Close modal after saving changes
      window.location.reload(); // Reload the page after saving changes

    }, error => {
      console.error('Error updating What:', error);
      // Handle error scenario
    });
  }
}
