import { LocationStrategy } from '@angular/common';
import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { ProductService } from './product.service';
import { ProjectsService } from './projects.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular-table-prime-ng';
  projects: any[];
  
  constructor(router: Router) {
}
  


}
