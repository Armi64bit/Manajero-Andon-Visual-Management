// ckeditor.component.ts
import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { HttpClient } from '@angular/common/http';
import { UploadAdapter } from '@ckeditor/ckeditor5-upload';

@Component({
  selector: 'ngx-ckeditor',
  templateUrl: './ckeditor.component.html',
  styleUrls: ['./ckeditor.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CkeditorComponent),
      multi: true
    }
  ]
})
export class CkeditorComponent implements OnInit, ControlValueAccessor {
  @Input() initialData: string;

  public Editor = ClassicEditor;
  public editorData: string;

  private onChange: (value: any) => void;
  private onTouched: () => void;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.editorData = this.initialData || '';
  }

  writeValue(value: any): void {
    this.editorData = value || '';
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public onEditorChange({ editor }: any) {
    const data = editor.getData();
    this.editorData = data;
    if (this.onChange) {
      this.onChange(data);
    }
  }

  public onEditorReady(editor: any) {
    editor.ui.view.editable.element.style.height = '200px';

    editor.plugins.get('FileRepository').createUploadAdapter = (loader: any) => {
      return new CustomUploadAdapter(loader, this.http);
    };
  }
}

// CustomUploadAdapter
export class CustomUploadAdapter implements UploadAdapter {
  constructor(private loader: any, private http: HttpClient) {}

  upload(): Promise<any> {
    return this.loader.file
      .then((file: any) => new Promise((resolve, reject) => {
        const data = new FormData();
        data.append('upload', file);

        this.http.post<any>('http://localhost:8888/api/upload', data)
          .subscribe(
            (response) => {
              // Ensure the response contains the URL
              if (response && response.url) {
                resolve({
                  default: response.url
                });
              } else {
                reject('Upload failed. The response does not contain the URL.');
              }
            },
            (error) => {
              reject(error);
            }
          );
      }));
  }

  abort(): void {
    // Implement if needed
  }
}
