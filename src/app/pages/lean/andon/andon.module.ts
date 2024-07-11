import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbButtonModule, NbCardModule, NbIconModule, NbLayoutModule, NbStepperModule, NbTabsetModule } from '@nebular/theme';
import { AndonRoutingModule } from './andon-routing.module';
import { WorkshopComponent } from './workshop/workshop.component';
import { UseMethodComponent } from './use-method/use-method.component';
import { ChartsModule } from '../../charts/charts.module';
import { AlertListComponent } from './alert-list/alert-list.component';
import { IssueListComponent } from './issue-list/issue-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { WhyLayoutComponent } from './why/why-layout/why-layout.component';
import { EditWhyModalComponent } from './why/edit-why-modal/edit-why-modal.component';
import { FormsModule, NgModel } from '@angular/forms';
import { WhatLayoutComponent } from './what/what-layout/what-layout.component';
import { EditWhatModalComponent } from './what/edit-what-modal/edit-what-modal.component';
import { WhatifLayoutComponent } from './whatif/whatif-layout/whatif-layout.component';
import { EditWhatifModalComponent } from './whatif/edit-whatif-modal/edit-whatif-modal.component';


@NgModule({
  declarations: [
    WorkshopComponent,
    UseMethodComponent,
    AlertListComponent,
    IssueListComponent,
    DashboardComponent,
    WhyLayoutComponent,
    EditWhyModalComponent,
    WhatLayoutComponent,
    EditWhatModalComponent,
    WhatifLayoutComponent,
    EditWhatifModalComponent,


  ],
  imports: [
    CommonModule,
    AndonRoutingModule,
    NbIconModule,
    NbStepperModule,
    NbCardModule,
    NbButtonModule,
    NbLayoutModule,
    NbTabsetModule,
    ChartsModule,
    HttpClientModule,
    FormsModule

  ]
})
export class AndonModule { }
