import { LocationStrategy, PlatformLocation } from '@angular/common';
import { Component } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';

import { ProjectsService } from './projects.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular-table-prime-ng';
  projectsData: any = []
  
  constructor(
    
    private projectService: ProjectsService,
    private location : PlatformLocation) {
    this.projectService.getdata().subscribe((data) =>{
      this.projectsData = data;
     })
    
}


}
