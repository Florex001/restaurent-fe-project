import { Routes } from '@angular/router';
import {SignupComponent} from "./auth-components/signup/signup.component";
import {LoginComponent} from "./auth-components/login/login.component";
import {AuthService} from "./auth-services/auth-service/auth.service";
import {StorageService} from "./auth-services/storage-service/storage.service";
import {RoleGuard} from "./auth-services/storage-service/role.guard";
import {IsLoggedInGuard} from "./auth-services/storage-service/is-logged-in.guard";

export const routes: Routes = [
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [IsLoggedInGuard]
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [IsLoggedInGuard]
  },
  {
    path: 'admin',
    loadChildren: () => import("./modules/admin/admin.module").then(m => m.AdminModule),
    canLoad: [RoleGuard]
  },
  {
    path: 'customer',
    loadChildren: () => import("./modules/customer/customer.module").then(m => m.CustomerModule),
    canLoad: [RoleGuard]
  }

];
