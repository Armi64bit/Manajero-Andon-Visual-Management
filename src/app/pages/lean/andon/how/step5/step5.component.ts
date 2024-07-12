import { Component } from '@angular/core';
import { How, HowService } from '../../api/how.service';
import { NbDialogService } from '@nebular/theme';
import { Step5editComponent } from '../step5edit/step5edit.component';

@Component({
  selector: 'ngx-step5',
  templateUrl: './step5.component.html',
  styleUrls: ['./step5.component.scss']
})
export class Step5Component {
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
    this.dialogService.open(Step5editComponent, {
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
