import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./customer-component/dashboard/dashboard.component";
import {RoleGuard} from "../../auth-services/storage-service/role.guard";

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canLoad: [RoleGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
