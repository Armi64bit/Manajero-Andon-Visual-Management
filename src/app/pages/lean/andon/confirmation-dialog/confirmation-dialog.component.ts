import { Component, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent {
  @Input() title: string;
  @Input() message: string;
  showCheckmark = false;

  constructor(protected ref: NbDialogRef<ConfirmationDialogComponent>) {}

  confirm() {
    this.showCheckmark = true;
    setTimeout(() => {
      this.ref.close(true);
    }, 1500);
  }

  cancel() {
    this.ref.close(false);
  }
}
