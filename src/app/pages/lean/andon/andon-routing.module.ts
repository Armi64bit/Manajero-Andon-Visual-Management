import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WorkshopComponent } from './workshop/workshop.component'; // Adjust the path as necessary
import { CreateDashboardComponent } from './create-dashboard/create-dashboard.component';
import { UseMethodComponent } from './use-method/use-method.component';
import { EditDashboardComponent } from './edit-dashboard/edit-dashboard.component';
import { KpiComponent } from './kpi/kpi.component';
import { KpiperdashComponent } from './kpiperdash/kpiperdash.component';

const routes: Routes = [
  { path: '', component: WorkshopComponent },
  { path: 'create-dashboard', component: CreateDashboardComponent },
  { path: 'use', component: UseMethodComponent },
  { path: 'updateDash/:id', component: EditDashboardComponent },
  { path: 'kpi', component: KpiComponent },
  { path: 'kpi/:dashboardId', component: KpiperdashComponent },



];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AndonRoutingModule { }
