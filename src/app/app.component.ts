import { Component } from '@angular/core';
import { ProjectsService } from './projects.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular-table-prime-ng';
  projects: any[];
  constructor(private projectService : ProjectsService){
    // this.projectService.getData().subscribe((data:any[])=>{
    //   this.projects = data;
    // })
}

}
