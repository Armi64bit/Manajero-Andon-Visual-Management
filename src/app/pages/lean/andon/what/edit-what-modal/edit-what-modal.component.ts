import { Component, Input } from '@angular/core';
import { What, WhatService } from '../../api/what.service';
import { NbDialogRef } from '@nebular/theme';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ngx-edit-what-modal',
  templateUrl: './edit-what-modal.component.html',
  styleUrls: ['./edit-what-modal.component.scss']
})
export class EditWhatModalComponent {
  @Input() whatData: What;
  public Editor = ClassicEditor;
  public previewImage: string | ArrayBuffer | null = null;

  constructor(
    protected ref: NbDialogRef<EditWhatModalComponent>,
    private whyService: WhatService,
    private http: HttpClient

  ) {}

  close() {
    this.ref.close();
  }

  saveChanges() {
    // Call updateWhy method from WhyService
    this.whyService.updateWhat(this.whatData.id, this.whatData).subscribe(updatedWhy => {
      console.log('Updated What:', updatedWhy);
      this.ref.close(); // Close modal after saving changes
      window.location.reload(); // Reload the entire page

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
          this.whatData[imageField] = response.url; // Update the appropriate image URL in the data model
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
