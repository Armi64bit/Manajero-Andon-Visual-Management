import { Component } from '@angular/core';
import { How, HowService } from '../../api/how.service';
import { NbDialogService } from '@nebular/theme';
import { Step8editComponent } from '../step8edit/step8edit.component';

@Component({
  selector: 'ngx-step8',
  templateUrl: './step8.component.html',
  styleUrls: ['./step8.component.scss']
})
export class Step8Component {
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
    this.dialogService.open(Step8editComponent, {
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
