import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {StorageService} from "./storage.service";


@Injectable({
  providedIn: 'root',
})
export class IsLoggedInGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const userRole = StorageService.getUserRole();

    if (userRole) {
      if (userRole === 'ADMIN') {
        this.router.navigateByUrl('/admin/dashboard');
      } else if (userRole === 'CUSTOMER') {
        this.router.navigateByUrl('/customer/dashboard');
      }
      return false;
    }

    return true;
  }
}
