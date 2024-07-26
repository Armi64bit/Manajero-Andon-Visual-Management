import { Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { How, HowService } from '../../api/how.service';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ngx-step5edit',
  templateUrl: './step5edit.component.html',
  styleUrls: ['./step5edit.component.scss']
})
export class Step5editComponent {
  @Input() howData: How;
  public Editor = ClassicEditor;
  public previewImage: string | ArrayBuffer | null = null;
  @ViewChild('confirmDialog') confirmDialog: TemplateRef<any>;
  showCheckmark = false;
  constructor(
    protected ref: NbDialogRef<Step5editComponent>,
    private howService: HowService   ,
    private http: HttpClient,
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
  onFileChange(event: Event, imageField: string) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      const formData = new FormData();
      formData.append('upload', file);

      this.http.post<any>('http://localhost:8888/api/upload', formData).subscribe(
        (response) => {
          console.log('File uploaded successfully:', response);
          this.howData[imageField] = response.url; // Update the appropriate image URL in the data model
          this.previewImage = URL.createObjectURL(file); // Preview uploaded image
        },
        (error) => {
          console.error('Error uploading file:', error);
          // Handle error as needed
        }
      );
    }
  }
}
