import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-imgprev',
  templateUrl: './imgprev.component.html',
  styleUrls: ['./imgprev.component.scss']
})
export class ImgprevComponent {
  @Input() imageSrc: string;

  constructor(protected dialogRef: NbDialogRef<ImgprevComponent>) {}

  close() {
    this.dialogRef.close();
  }
}
