import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { CanExitGuard } from './can-exit.guard';
// import { ContactComponent } from './contact/contact.component';
// import { TableCheckComponent } from './table-check/table-check.component';
import { TableDisplayComponent } from './table-display/table-display.component';
// import { TableRowExpandComponent } from './table-row-expand/table-row-expand.component';

const routes: Routes = [
  {path:'',component:AppComponent},
  // {path:'expand',component:TableRowExpandComponent},
  {path :'table-display',component: TableDisplayComponent ,canDeactivate: [CanExitGuard]},
  // {path : 'table-check',component : TableCheckComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
