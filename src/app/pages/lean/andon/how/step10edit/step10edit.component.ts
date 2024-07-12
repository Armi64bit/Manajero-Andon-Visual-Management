import { Component, Input } from '@angular/core';
import { How, HowService } from '../../api/how.service';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-step10edit',
  templateUrl: './step10edit.component.html',
  styleUrls: ['./step10edit.component.scss']
})
export class Step10editComponent {
  @Input() howData: How;

  constructor(
    protected ref: NbDialogRef<Step10editComponent>,
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
