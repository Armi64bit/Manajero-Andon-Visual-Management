import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkshopComponent } from './workshop/workshop.component'; // Adjust the path as necessary

const routes: Routes = [
  { path: '', component: WorkshopComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AndonRoutingModule { }
