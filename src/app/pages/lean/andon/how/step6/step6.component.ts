import { Component, OnInit } from '@angular/core';
import { How, HowService } from '../../api/how.service';
import { NbDialogService } from '@nebular/theme';
import { Step6editComponent } from '../step6edit/step6edit.component';

@Component({
  selector: 'ngx-step6',
  templateUrl: './step6.component.html',
  styleUrls: ['./step6.component.scss']
})
export class Step6Component implements OnInit  {
  how: How;

  constructor(
    private howService: HowService,
    private dialogService: NbDialogService // Inject the dialog service correctly
  ) {}

  ngOnInit() {
    this.loadWhyData(); // Load initial data
  }

  loadWhyData(): void {
    this.howService.getAll().subscribe(data => {
      if (data.length > 0) {
        this.how = data[0]; // Load the first item from the list
      } else {
        // Handle the case where no items are returned
        console.log('No data found');
      }
    }, error => {
      // Handle any errors that occur during the HTTP request
      console.error('Error fetching data', error);
    });
  }
  openEditModal() {
    this.dialogService.open(Step6editComponent, {
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
