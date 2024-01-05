import { Component } from '@angular/core';
import {AdminService} from "../../admin-services/admin.service";
import {MatButtonModule} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {NgForOf} from "@angular/common";
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatChipsModule} from "@angular/material/chips";

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    MatButtonModule,
    RouterLink,
    NgForOf,
    MatCardModule,
    MatGridListModule,
    MatChipsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  categories: any;

  constructor(
    private service: AdminService,
  ) { }

  ngOnInit(){
    this.getAllCategories()
  }

  getAllCategories(){
    this.categories = [];
    this.service.getAllCategories().subscribe((res)=> {
      res.forEach(element => {
        element.processedImg = 'data:image/jpg;base64,' + element.returnedImg;
        this.categories.push(element);
      })
    })
  }

}
