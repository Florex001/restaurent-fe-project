import { Component } from '@angular/core';
import {AuthService} from "../../auth-services/auth-service/auth.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router, RouterLink} from "@angular/router";
import {StorageService} from "../../auth-services/storage-service/storage.service";
import {NgIf} from "@angular/common";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    RouterLink,
    NgIf,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  isSpinning: boolean;
  loginForm: FormGroup;

  constructor(
    private service: AuthService,
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(){
    this.loginForm = this.fb.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    })
  }

  submitForm() {
    this.service.login(this.loginForm.value).subscribe(
      (res) => {
        this.isSpinning = true;

        if (res.userId !== null) {
          const user = {
            id: res.userId,
            name: res.username,
            role: res.userRole
          };

          StorageService.saveToken(res.jwt);
          StorageService.saveUser(user);

          if (StorageService.isAdminLoggedIn()) {
            this.router.navigateByUrl("admin/dashboard");
          } else if (StorageService.isCustomerLoggedIn()) {
            this.router.navigateByUrl("customer/dashboard");
          }

          this.isSpinning = false;
        } else {
          console.error('Invalid server response:', res);
          this.isSpinning = false;
        }
      },
      (error) => {
        this._snackBar.open("🤬 Invalid username or password.", "Close", { duration: 2000, horizontalPosition: 'center', verticalPosition: 'top' });
        this.isSpinning = false;
      }
    );
  }
}
