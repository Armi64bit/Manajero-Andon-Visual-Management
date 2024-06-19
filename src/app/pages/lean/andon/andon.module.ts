import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbButtonModule, NbCardModule, NbIconModule, NbLayoutModule, NbStepperModule, NbTabsetModule } from '@nebular/theme';
import { AndonRoutingModule } from './andon-routing.module';
import { WorkshopComponent } from './workshop/workshop.component';


@NgModule({
  declarations: [
    WorkshopComponent
  ],
  imports: [
    CommonModule,
    AndonRoutingModule,
    NbIconModule,
    NbStepperModule,
    NbCardModule,
    NbButtonModule,
    NbLayoutModule,
    NbTabsetModule

  ]
})
export class AndonModule { }
