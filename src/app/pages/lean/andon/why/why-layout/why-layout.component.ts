import { Component, OnInit } from '@angular/core';
import { Why, WhyService } from '../../api/why.service';
import { NbDialogService } from '@nebular/theme';
import { EditWhyModalComponent } from '../edit-why-modal/edit-why-modal.component';

@Component({
  selector: 'ngx-why-layout',
  templateUrl: './why-layout.component.html',
  styleUrls: ['./why-layout.component.scss']
})
export class WhyLayoutComponent implements OnInit {
  whys: Why;

  constructor(
    private whyService: WhyService,
    private dialogService: NbDialogService // Inject the dialog service correctly
  ) {}

  ngOnInit() {
    this.loadWhyData(); // Load initial data
  }

  loadWhyData() {
    this.whyService.getWhyById("668fb47d54d4c57710653c0f").subscribe(data => {
      this.whys = data;
    });
  }

  openEditModal() {
    this.dialogService.open(EditWhyModalComponent, {
      context: {
        whyData: { ...this.whys } // Pass a copy of whys to prevent direct mutation
      }
    }).onClose.subscribe(updatedWhy => {
      if (updatedWhy) {
        this.whys = updatedWhy; // Update whys if changes were saved
      }
    });
  }
}
