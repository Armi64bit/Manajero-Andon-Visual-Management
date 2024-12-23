import { Component, Input } from '@angular/core';
import { How, HowService } from '../../api/how.service';
import { NbDialogRef } from '@nebular/theme';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'ngx-step2edit',
  templateUrl: './step2edit.component.html',
  styleUrls: ['./step2edit.component.scss']
})
export class Step2editComponent {
  @Input() howData: How;
  public Editor = ClassicEditor;

  constructor(
    protected ref: NbDialogRef<Step2editComponent>,
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
