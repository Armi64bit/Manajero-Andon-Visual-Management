import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { How, HowService } from '../../api/how.service';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'ngx-step2edit',
  templateUrl: './step2edit.component.html',
  styleUrls: ['./step2edit.component.scss']
})
export class Step2editComponent {
  @Input() howData: How;
  public Editor = ClassicEditor;
  @ViewChild('confirmDialog') confirmDialog: TemplateRef<any>;
  showCheckmark = false;
  constructor(
    protected ref: NbDialogRef<Step2editComponent>,
    private howService: HowService,
    private dialogService: NbDialogService

  ) {}

  close() {
    this.ref.close();
  }
  openConfirmDialog() {
    this.dialogService.open(this.confirmDialog, { context: 'Are you sure you want to save these changes?' });
  }
  confirmSaveChanges(ref: NbDialogRef<any>) {
    // Show checkmark and then close the dialog after animation
    this.showCheckmark = true;
    setTimeout(() => {
      this.saveChanges(); // Call saveChanges after animation
      ref.close();
    }, 1000); // Adjust timing as needed
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
