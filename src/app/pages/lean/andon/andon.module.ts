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
import { StepperComponent } from './how/stepper/stepper.component';
import { Step1Component } from './how/step1/step1.component';
import { Step2Component } from './how/step2/step2.component';
import { Step3Component } from './how/step3/step3.component';
import { Step4Component } from './how/step4/step4.component';
import { Step5Component } from './how/step5/step5.component';
import { Step6Component } from './how/step6/step6.component';
import { Step7Component } from './how/step7/step7.component';
import { Step8Component } from './how/step8/step8.component';
import { Step9Component } from './how/step9/step9.component';
import { Step10Component } from './how/step10/step10.component';
import { Step1editComponent } from './how/step1edit/step1edit.component';
import { Step2editComponent } from './how/step2edit/step2edit.component';
import { Step3editComponent } from './how/step3edit/step3edit.component';
import { Step4editComponent } from './how/step4edit/step4edit.component';
import { Step5editComponent } from './how/step5edit/step5edit.component';
import { Step6editComponent } from './how/step6edit/step6edit.component';
import { Step7editComponent } from './how/step7edit/step7edit.component';
import { Step8editComponent } from './how/step8edit/step8edit.component';
import { Step9editComponent } from './how/step9edit/step9edit.component';
import { Step10editComponent } from './how/step10edit/step10edit.component';


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
    StepperComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    Step4Component,
    Step5Component,
    Step6Component,
    Step7Component,
    Step8Component,
    Step9Component,
    Step10Component,
    Step1editComponent,
    Step2editComponent,
    Step3editComponent,
    Step4editComponent,
    Step5editComponent,
    Step6editComponent,
    Step7editComponent,
    Step8editComponent,
    Step9editComponent,
    Step10editComponent,


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
    FormsModule,


  ]
})
export class AndonModule { }
