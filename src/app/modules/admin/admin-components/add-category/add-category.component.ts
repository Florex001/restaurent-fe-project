import {Component, signal} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {NgIf} from "@angular/common";
import {AdminService} from "../../admin-services/admin.service";
import {MatSnackBar} from "@angular/material/snack-bar";


@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    NgIf
  ],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent {

  categoryForm: FormGroup;
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;

  constructor(
    private service: AdminService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(){
    this.categoryForm = this.fb.group({
      name: [null, Validators.required],
      description: [null, Validators.required]
    })
  }


  submitForm(){
    const formData :FormData = new FormData();
    formData.append("img", this.selectedFile);
    formData.append("name", this.categoryForm.get("name").value);
    formData.append("description", this.categoryForm.get("description").value);
    this.service.createCategory(formData).subscribe(
      (res) => {
        this._snackBar.open("✔️Success", "Close", {duration: 2000, horizontalPosition: 'center', verticalPosition: 'top'});
      }, (error) => {
        this._snackBar.open("🤬Oh no...", "Close", {duration: 2000, horizontalPosition: 'center', verticalPosition: 'top'});
      }
    )
  }

  onFileSelected(event:any){
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage(): void {
   const reader = new FileReader();
   reader.onload = () => {
     this.imagePreview = reader.result
   }
   reader.readAsDataURL(this.selectedFile)
  }



}
