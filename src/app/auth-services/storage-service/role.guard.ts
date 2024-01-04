import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {StorageService} from "./storage.service";


@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanLoad {
  constructor(private router: Router) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ): Observable<boolean> | Promise<boolean> | boolean {
    const userRole = StorageService.getUserRole();

    if (userRole) {
      if (route.path === 'admin' && userRole === 'ADMIN') {
        return true;
      } else if (route.path === 'customer' && userRole === 'CUSTOMER') {
        return true;
      } else {
        if (userRole === 'ADMIN') {
          this.router.navigateByUrl('/admin/dashboard');
        } else if (userRole === 'CUSTOMER') {
          this.router.navigateByUrl('/customer/dashboard');
        }
        return false;
      }
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }
}
