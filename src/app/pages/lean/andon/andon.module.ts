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


@NgModule({
  declarations: [
    WorkshopComponent,
    UseMethodComponent,
    AlertListComponent,
    IssueListComponent,
    DashboardComponent,
    

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
    ChartsModule
  ]
})
export class AndonModule { }
