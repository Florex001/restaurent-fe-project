import {Component, signal} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {NgIf} from "@angular/common";


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

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(){
    this.categoryForm = this.fb.group({
      categoryImage: ['', Validators.required],
      name: [null, Validators.required],
      description: [null, Validators.required]
    })
  }

  submitForm(){
    console.log(this.categoryForm.value);
  }

  previewImage(event: any): void {
    const input = event.target;
    const file = (input.files as FileList)[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.categoryForm.patchValue({
          categoryImage: e.target.result
        });
      };

      reader.readAsDataURL(file);
    }
  }


  getImageUrl(): string {
    return this.categoryForm.get('categoryImage').value;
  }


}
