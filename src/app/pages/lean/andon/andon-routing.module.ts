import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkshopComponent } from './workshop/workshop.component'; // Adjust the path as necessary
import { CreateDashboardComponent } from './create-dashboard/create-dashboard.component';

const routes: Routes = [
  { path: '', component: WorkshopComponent },
  { path: 'create-dashboard', component: CreateDashboardComponent }, // New route

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AndonRoutingModule { }
