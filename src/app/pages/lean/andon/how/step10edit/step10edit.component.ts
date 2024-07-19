import { Component, Input } from '@angular/core';
import { How, HowService } from '../../api/how.service';
import { NbDialogRef } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'ngx-step10edit',
  templateUrl: './step10edit.component.html',
  styleUrls: ['./step10edit.component.scss']
})
export class Step10editComponent {
  @Input() howData: How;
  public Editor = ClassicEditor;
  public previewImages: { [key: string]: string | ArrayBuffer | null } = {};

  constructor(
    protected ref: NbDialogRef<Step10editComponent>,
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
          this.howData[imageField] = response.url;
          const reader = new FileReader();
          reader.onload = (e) => {
            this.previewImages[imageField] = e.target.result;
          };
          reader.readAsDataURL(file);
        },
        (error) => {
          console.error('Error uploading file:', error);
        }
      );
    }
  }
}
