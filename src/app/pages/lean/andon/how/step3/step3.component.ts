import { Component } from '@angular/core';
import { How, HowService } from '../../api/how.service';
import { NbDialogService } from '@nebular/theme';
import { Step3editComponent } from '../step3edit/step3edit.component';

@Component({
  selector: 'ngx-step3',
  templateUrl: './step3.component.html',
  styleUrls: ['./step3.component.scss']
})
export class Step3Component {
  how: How;

  constructor(
    private howService: HowService,
    private dialogService: NbDialogService // Inject the dialog service correctly
  ) {}

  ngOnInit() {
    this.loadWhyData(); // Load initial data
  }

  loadWhyData() {
    this.howService.getById("1").subscribe(data => {
      this.how = data;
    });
  }

  openEditModal() {
    this.dialogService.open(Step3editComponent, {
      context: {
        howData: { ...this.how } // Pass a copy of whys to prevent direct mutation
      }
    }).onClose.subscribe(updatedhow => {
      if (updatedhow) {
        this.how = updatedhow; // Update whys if changes were saved
        this.loadWhyData(); // Reload data to reflect changes

      }
    });
  }
}
