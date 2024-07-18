import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Why, WhyService } from '../../api/why.service';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ngx-edit-why-modal',
  templateUrl: './edit-why-modal.component.html',
  styleUrls: ['./edit-why-modal.component.scss']
})
export class EditWhyModalComponent {
  @Input() whyData: Why;
  public Editor = ClassicEditor;
  public previewImage: string | ArrayBuffer | null = null;

  constructor(
    protected ref: NbDialogRef<EditWhyModalComponent>,
    private whyService: WhyService // Inject WhyService
    ,
    private http: HttpClient
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
  onFileChange(event: Event, imageField: string) {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      const formData = new FormData();
      formData.append('upload', file);

      this.http.post<any>('http://localhost:8888/api/upload', formData).subscribe(
        (response) => {
          console.log('File uploaded successfully:', response);
          this.whyData[imageField] = response.url; // Update the appropriate image URL in the data model
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
