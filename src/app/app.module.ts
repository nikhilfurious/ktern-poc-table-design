import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {TableModule} from 'primeng/table';

import { FormsModule } from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import {TieredMenuModule} from 'primeng/tieredmenu';
import {Menu, MenuItemContent, MenuModule} from 'primeng/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {SelectButtonModule} from 'primeng/selectbutton';
import {TabMenuModule} from 'primeng/tabmenu';
// import { TableRowExpandComponent } from './table-row-expand/table-row-expand.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FilterService, MessageService, PrimeNGConfig } from 'primeng/api';
import {RatingModule} from 'primeng/rating'; 
import { TimelineModule } from 'primeng/timeline';
import {CardModule} from 'primeng/card';
import {MultiSelectModule} from 'primeng/multiselect';
import {DropdownModule} from 'primeng/dropdown';
import {ToastModule} from 'primeng/toast';
import {CascadeSelectModule} from 'primeng/cascadeselect';


import {ListboxModule} from 'primeng/listbox';
// import { TreeSelectComponent } from './tree-select/tree-select.component'; 
import { NgZorroAntdModule, NZ_I18N, en_US } from "ng-zorro-antd";
import _, { map } from 'underscore';
import { ThousandPipePipe } from './thousand-pipe.pipe'
import {CalendarModule} from 'primeng/calendar';
import { TableDisplayComponent } from './table-display/table-display.component';
import {TooltipModule} from 'primeng/tooltip';
import {AvatarModule} from 'primeng/avatar';

import {DialogModule} from 'primeng/dialog';
// import { TableCheckComponent } from './table-check/table-check.component';
import {ToolbarModule} from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { OverlayPanel } from 'primeng/overlaypanel';
import { CanExitGuard } from './can-exit.guard';

// import { ContactComponent } from './contact/contact.component';

@NgModule({
  declarations: [
    AppComponent,
    // TableRowExpandComponent,
    MenuItemContent,
    ThousandPipePipe,
    TableDisplayComponent,

    // TableCheckComponent,
    // ContactComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TableModule,
    InputTextModule,
		CheckboxModule,
		ButtonModule,
		RadioButtonModule,
    FormsModule,
    TieredMenuModule,
    BrowserAnimationsModule,
    MultiSelectModule,
    OverlayPanelModule,
    SelectButtonModule,
    TabMenuModule,
    TableModule,
    HttpClientModule,
    RatingModule,
    TimelineModule,
    CardModule,
    MultiSelectModule,
    DropdownModule,
    ToastModule,
    ListboxModule,
    NgZorroAntdModule,
    CalendarModule,
    TooltipModule,
    AvatarModule,
    DialogModule,
    ToolbarModule,
    ConfirmDialogModule,
    InputTextareaModule,


  ],
  providers: [FilterService, PrimeNGConfig,MessageService,CanExitGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
