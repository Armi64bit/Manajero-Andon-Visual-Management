import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbButtonModule, NbCardModule, NbIconModule, NbStepperModule } from '@nebular/theme';
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
    NbButtonModule
  ]
})
export class AndonModule { }
