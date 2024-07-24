import { Component, Input } from '@angular/core';
import { Whatif, WhatifService } from '../../api/whatif.service';
import { NbDialogRef } from '@nebular/theme';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'ngx-edit-whatif-modal',
  templateUrl: './edit-whatif-modal.component.html',
  styleUrls: ['./edit-whatif-modal.component.scss']
})
export class EditWhatifModalComponent {
  @Input() whatifData: Whatif;
  public Editor = ClassicEditor;
  public previewImage: string | ArrayBuffer | null = null;
  previewImage2: string | ArrayBuffer | null = null;

  constructor(
    protected ref: NbDialogRef<EditWhatifModalComponent>,
    private whatifService: WhatifService // Inject WhyService
    ,private http: HttpClient
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
  onFileChange(event: Event, fieldName: 'image1' | 'image2') {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      const formData = new FormData();
      formData.append('upload', file);

      this.http.post<any>('http://localhost:8888/api/upload', formData).subscribe(
        response => {
          console.log('File uploaded successfully:', response);
          this.whatifData[fieldName] = response.url; // Update image URL in data model

          if (fieldName === 'image1') {
            this.previewImage = URL.createObjectURL(file); // Preview uploaded image for Image 1
          } else if (fieldName === 'image2') {
            this.previewImage2 = URL.createObjectURL(file); // Preview uploaded image for Image 2
          }
        },
        error => {
          console.error('Error uploading file:', error);
          // Handle error as needed
        }
      );
    }
  }
}
