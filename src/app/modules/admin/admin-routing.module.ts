import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./admin-components/dashboard/dashboard.component";
import {AddCategoryComponent} from "./admin-components/add-category/add-category.component";
import {RoleGuard} from "../../auth-services/storage-service/role.guard";
import {PostProductComponent} from "./admin-components/post-product/post-product.component";

const routes: Routes = [
  {
    path: "dashboard",
    component: DashboardComponent,
    canLoad: [RoleGuard]
  },
  {
    path: "category",
    component: AddCategoryComponent,
    canLoad: [RoleGuard]
  },
  {
    path: "product",
    component: PostProductComponent,
    canLoad: [RoleGuard]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
