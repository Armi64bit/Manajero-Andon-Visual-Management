import { Component, Input } from '@angular/core';
import { How, HowService } from '../../api/how.service';
import { NbDialogRef } from '@nebular/theme';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ngx-step3edit',
  templateUrl: './step3edit.component.html',
  styleUrls: ['./step3edit.component.scss']
})
export class Step3editComponent {
  @Input() howData: How;
  public Editor = ClassicEditor;
  public previewImage: string | ArrayBuffer | null = null;

  constructor(
    protected ref: NbDialogRef<Step3editComponent>,
    private howService: HowService,
    private http: HttpClient

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
