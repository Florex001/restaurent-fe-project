import { Component } from '@angular/core';
import {AuthService} from "../../auth-services/auth-service/auth.service";
import {FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink} from "@angular/router";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {NgIf} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    MatProgressBarModule,
    NgIf,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  isSpinning: boolean;
  validateForm: FormGroup;

  constructor(
    private service: AuthService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(){
    this.validateForm = this.fb.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
      name: ["", Validators.required],
    })
  }


  register(){
    this.service.signup(this.validateForm.value).subscribe((res) => {
      if (res.id != null){
        this._snackBar.open("✔️Success", "Close", {duration: 2000, horizontalPosition: 'center', verticalPosition: 'top'});
      } else {
        this._snackBar.open("🤬Oh no...", "Close", {duration: 2000, horizontalPosition: 'center', verticalPosition: 'top'});
      }
    })
  }

}
