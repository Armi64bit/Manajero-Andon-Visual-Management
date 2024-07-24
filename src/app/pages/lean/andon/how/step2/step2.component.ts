import { Component, OnInit } from '@angular/core';
import { Step2editComponent } from '../step2edit/step2edit.component';
import { How, HowService } from '../../api/how.service';
import { NbDialogService } from '@nebular/theme';

@Component({
  selector: 'ngx-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.scss']
})
export class Step2Component implements OnInit {
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
    this.dialogService.open(Step2editComponent, {
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

