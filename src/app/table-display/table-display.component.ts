import { Component, OnInit, Input, ViewChild, ElementRef} from "@angular/core";
import _, { map } from "underscore";
import { ProjectsService } from "../projects.service";
import { DatePipe, PlatformLocation } from "@angular/common";
import { Observable } from "rxjs";
import { MasterData } from "../project";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
import { MessageService, ConfirmationService } from 'primeng/api';
import { OverlayPanelModule } from "primeng/overlaypanel";
import { CanExit } from './../can-exit.guard';
interface Book {
  name: String,
  author: String,
  year: Number
}
@Component({
  selector: "app-table-display",
  templateUrl: "./table-display.component.html",
  styleUrls: ["./table-display.component.css"],
  providers: [DatePipe,MessageService,ConfirmationService,OverlayPanelModule],
})
export class TableDisplayComponent implements OnInit, CanExit {
 

  @ViewChild('dateCalendar' ,{static: false}) datePicker: any;
   projects: any = [];
  copyProjects : any = [];
  selectedProjects : any = [];
  rowData = {};
  spanWidth = '75px'

  loading: boolean = true;
  groupedFilterData = [];
  curatedFilters: any = [];
  selectedFilterData: any = [];
  tableFilters = [];
  columnFilteredData: any = [];

  filteredData: any = [];
  groupFilter = [{}];
  
  

  timeline_status = false;
  timeline_boolean = false;
  showBtn = -1;

  resourcesList = [];
  fiterResourcesList = [];
  resourceID = "";
  listStatus = []
  
  dismiss = false
  //menus -> Used for Tab Menu
  menus = []

  oldValue = ''
  sideOption = [
    {"label":"Send Mail","value":"Send Mail"},
    {"label":"Details","value":"Details"},
    {"label":"Archive","value":"Archive"},
    {"label":"Delete","value":"Delete"}
  ]
  types = [];
  //projects -> List of project details
  // projects = [];
  date_format_type = [];

  //newArr -> to store the fitlered list of columns which are active
  newArr: { label: string; value: string; isActive: boolean }[];
  account = [];
  account_value = "";
  copy_account_value =""
  date_format_value = "";
  copy_date_format_value =""

  date_boolean = false;
  amount_boolean = true;

  columnSettings = [];
  copyColumnSettings = []
  msstatus: any;
  mestatus: any;
  calendarDates = [];

  menu_filter_array = []; // filtered project details based on menu selection
  menu_array = [];
  menu = true
  statusId = 0;

  backend = {}
  startDate = ''
  endDate = ''
  notes= 'Summary'

  constructor(
    private messageService: MessageService,
    public datepipe: DatePipe,
    private projectService: ProjectsService,
    private confirmationService : ConfirmationService,
    private location : PlatformLocation
  
  ) {
    this.newArr = this.types.filter(function (record) {
      return record.isActive === true;
    });
    //  console.log(this.date_format_value)
  //  let menArr = _.where(this.projects, {status: "OnRisk"})
this.notes = 'Write Summary'
  }
  ngOnInit() {
    this.loadData()
    this.projectService.getBacked().subscribe((datas) => {
      let settings = datas["settings"];
      this.columnSettings = [...datas["settings"]];

      this.tableFilters = datas["tableFilters"];
      this.resourcesList = datas["resourcesList"];
      this.date_format_type = datas["date_format"];
      this.account = datas["account"];
      this.menu_array = datas["status"];
      this.loadMenu(this.menu_array);
      this.date_format_value = datas["date_format_value"];
      
      this.copy_date_format_value = datas["date_format_value"]

      this.account_value = datas["account_value"];
      this.copy_account_value = datas["account_value"]
       if(this.account_value === '10.5k'){
         this.amount_boolean = false;
          }
     

      this.loadStatus(this.menu_array);
  
      this.loadTableFilters(this.projects, this.tableFilters);
    });
}

canDeactivate(): Promise<any> | boolean {
  const confirmResult = confirm('Are you sure you want to leave this page ? ');
  if (confirmResult === true) {
    return true;
  } else {
    return false;
  }
}


loadTableFilters(projects,tableFilters){
  tableFilters.forEach((key) => {
    this.curatedFilters[key] = _.uniq(_.pluck(projects, key));
  });
console.log('TF',tableFilters)
console.log('CF',this.curatedFilters)

  //logic to arrange the array needed for ListBox [Filter]
  this.groupedFilterData=[];
  for (let i = 0; i < tableFilters.length; i++) {
    var filterObject = {};
    filterObject["label"] = tableFilters[i];
    filterObject["value"] = tableFilters[i];
    filterObject["items"] = [];
    var filterArray = this.curatedFilters[tableFilters[i]];
    for (let j = 0; j < filterArray.length; j++) {
      var object = {
        label: filterArray[j],
        value: filterArray[j],
      };
      filterObject["items"].push(object);
    }
    this.groupedFilterData.push(filterObject);
  }
  this.groupedFilterData = [...this.groupedFilterData];
  console.log(this.groupedFilterData)
}
  loadData(){
        this.projectService.getdata().subscribe((data) =>{
         this.projects = data; //[]
       
        })
        this.projectService.loadAll()

        
  }

  loadMenu(menu){
    console.log(menu)
    this.menus =[{
     "label":"All",
     "length": this.projects.length
    }]

    for(let i=0;i< menu.length;i++){
      let  menuArr = this.projects.filter(function (record) {
        return (record.status === menu[i]);
      });
  
      let obj = {
        "label":menu[i],
        "length": menuArr.length
      }
      this.menus.push(obj)
    }
    this.menus=[...this.menus]
  
    let archiveArr = _.where(this.projects,{archive:1})
    var objArchive = {
      "label" : "Archive",
      "length": archiveArr.length
    }
    this.menus.push(objArchive)
  this.menus=[...this.menus]
  }
  loadStatus(menu){
  let objArr = [];
    for(let i = 0;i<menu.length;i++){
   let obj= {

    "label": menu[i],
    "isActive":false
   }
   objArr.push(obj)
  }
  this.listStatus = [...objArr]
  }

  onSideMenu(event){
    console.log(event)
   if(event === 'Archive'){
     this.onArchive();
   } 
   if(event === 'Delete'){
     this.onDelete();
   }
  }

onArchive(){
  console.log(this.statusId, 'Archive')
  var obj = {}
  this.projects.forEach(element => {
    if(element.id===this.statusId){
      element.archive = 1;
      obj=element
    }
    this.loadData()
  });
  this.loadMenu(this.menu_array)

  this.projectService.update(obj)
}

notesUpdate(event){
  var obj = {}
  this.projects.forEach(element => {
    if(element.id===this.statusId){
      element.notes = event;
      obj=element
    }
    this.loadData()
  });  

  this.projectService.update(obj)
}
  onFilter(): void {
    if (this.selectedFilterData.length === 0) {
      this.menu = true;
    } else {
      this.menu = false;
      var data = [];
      this.projects.forEach((element) => {
        this.tableFilters.forEach((el) => {
          if (this.selectedFilterData.indexOf(element[el]) > -1) {
            data.push(element);
          }
        });
      });

      // this.menu_filter_array = [...new Set(this.columnFilteredData)]
      this.columnFilteredData = [...new Set(data)];
      this.menu_filter_array = [...this.columnFilteredData];
    }
  }

  onDateChange(event) {
    this.date_format_value = event.value;
  }

  onAmountChange(event) {
  
    if (event.option.value === "10.5k") {
      this.amount_boolean = false;
    } else if (event.option.value === "10,500") {
      this.amount_boolean = true;
    }
  }
  // resourceID = "";
  onResourceSelect(event, i) {
    if (i.isActive === false) {
      i.isActive = true;
    } else {
      i.isActive = false;
    }
  }
  onResourceApply(this) {
    var addResource = this.resourcesList
      .filter(function (record) {
        return record.isActive === true;
      })
      .map((i) => i.label);
  
    this.projects.forEach((ele) => {
      if (ele["id"] === this.statusId) {
        ele["resources_alloted"] = [...addResource];
      }
    });
    // console.log(this.resourceID)
    console.log(this.projects);
    this.resourcesList.forEach((el) => {
      el["isActive"] = false;
    });
  }

  onResourceClick(data) {
    this.resourcesList.forEach((element) => {
      element.isActive = false;
    });
    var list = data.resources_alloted;
    if (list.length > 0 && data.id === this.statusId) {
      for (let i = 0; i < this.resourcesList.length; i++) {
        let obj = this.resourcesList[i];
        for (let j = 0; j < list.length; j++) {
          if (list[j] === obj["label"]) {
            obj.isActive = true;
          }
        }
      }
    }
  }
  //Function to filter the list of columns which are active and to be displayed
  onColumnOrder(event,data,cl) {
    console.log("Before",data)
   if(data.isVisible===false){
     data.isVisible = true
   } else {
     data.isVisible = false
   }
   console.log("After",data)
   console.log('After',this.columnSettings)
   console.log(this.copyColumnSettings)
  }
  
  
 
  
  onStatusFilter(event, i) {

    var text = i.label;
    console.log(text);
    if (
      this.columnFilteredData.length > 0 &&
      this.selectedFilterData.length > 0
    ) {
      this.projects = [...this.columnFilteredData];
    }
    if (text != "All" && text!= 'Archive') {
      this.menu = false;
      this.menu_filter_array = this.projects.filter(function (record) {
        return (record.status === text);
      });
    } else if(text = 'Archive' && text != 'All') {
      this.menu = false
      this.menu_filter_array = this.projects.filter(function(record) {
        return record.archive === 1;
      })
    } else {
      this.menu = true
    }
    console.log("Status Filtered Data", this.menu_filter_array);
  }
  statusUpdate = "";
  onStatus(info) {
    this.rowData = info;
    this.statusId = info.id;
    console.log("This Status", this.statusId);
    let sampleData = _.uniq(_.pluck(this.projects, "resources_alloted"));
    console.log("sample", sampleData);
  }
  onListStatus(event) {
    console.log(event);
    console.log(this.statusId);
    let object = {} // to passing data to inline edit 
    this.projects.forEach((ele) => {
      if (ele["id"] === this.statusId) {
        object = ele
        ele["status"] = event;
      }
    })
    console.log(this.projects);
    this.loadMenu(this.menu_array);
    this.onRowInlineEdit('status',object)
  }



change(event){
  console.log(event)
}

  //  mcode

  //  mcode
  csactive() {
    console.log("hi");
    this.msstatus = !this.msstatus;
  }
  ceactive() {
    console.log("hi");
    this.mestatus = !this.mestatus;
  }

  showUndoBtn(index) {
    console.log(index);
    this.showBtn = index;
    
    this.startDate = this.projects[this.showBtn-1].timeline.startdate
  }

  onch(valued, id) {
    console.log(valued, id);
    console.log(id,this.projects)

    this.setEndDate(valued, id);
  }
  onsch(valued, id) {
    console.log(valued, id);
    console.log(id,this.projects);
     this.setStartDate(valued, id);
  }
  csonch(id){
  
    for (let i = 0; i < this.projects.length; i++) {
      if (this.projects[i].id === id) {
        this.projects[i].timeline.startdate =  '';
        return;
      }
    }

  }
  ceonch(id){
    for (let i = 0; i < this.projects.length; i++) {
      if (this.projects[i].id === id) {
        this.projects[i].timeline.enddate = '';
        return;
      }
    }
  }
  setStartDate(valued, id) {
    let latest_date = this.datepipe.transform(valued, "yyyy-MM-dd");
    console.log(latest_date);
    for (let i = 0; i < this.projects.length; i++) {
      if (this.projects[i].id === id) {
        if(latest_date > this.projects[i].timeline.enddate) {
          alert("start date need to be lesser than end date");
          return;
        }
        this.projects[i].timeline.startdate = latest_date;
        return;
      }
    }
    console.log(this.projects);
    this.datePicker.overlayVisible = false;
  }

  setEndDate(valued, id) {
    // this.cdate=new Date();
    let latest_date = this.datepipe.transform(valued, "yyyy-MM-dd");
    console.log(latest_date);
    // const index: number = this.tmdata.indexOf(id);
    for (let i = 0; i < this.projects.length; i++) {
      if (this.projects[i].id === id) {
        if(latest_date < this.projects[i].timeline.startdate) {
          // console.log("soe");
          alert("End date need to be bigger then start date");

          return;
        }
        this.projects[i].timeline.enddate = latest_date;
        return;
      }
    }
    console.log(this.projects);
    this.datePicker.overlayVisible = false;
  }
  // mcode

  onRowEditInit(editData) {
    console.log(editData);
    console.log("Edit Init Event Called");
  }
 
  onRowEditSave(editData) {
    // console.log(editData);
    this.projectService.update(editData);
    console.log(this.projectService)
    console.log(editData)
    this.projects.forEach(element => {
      if(element.id === editData.id){
        element = editData
      }
    });
    console.log(this.projects)
    this.loadTableFilters(this.projects,this.tableFilters)
    this.messageService.add({severity:'success', summary: 'Success', detail:'Row Updated Successfully'});
   
  }


  

 onRowInlineEdit(field,data){
  
   console.log(field,data[field])
   var objTracker = data["traker"];
   console.log(objTracker)
   var obj = {}
   var date = new Date()
   var month = date.getMonth()+1
   var dateString = date.getDate()+'.'+month+'.'+date.getFullYear()
   console.log(date)
   console.log(this.copyProjects)
if(data[field] === data[field])
{
  if(field==='estimation'){
    obj ={
      "id": data.id,
      "field": field,
      "value":  "US$" +data[field],
      "date" : dateString,
      "time" : date.toLocaleTimeString(),
      "operation":"Changed"
    }
    objTracker.push(obj)  
   } else {
    obj = {
      "id": data.id,
      "field": field,
      "value":  data[field],
      "date" : dateString,
      "time" : date.toLocaleTimeString(),
      "operation":"Changed"
      }
      objTracker.push(obj)
     }
} else {
  alert('the value is not changed')
}
 this.projects.forEach(element => {
     if(element.id === data.id){
      element["traker"] = [...objTracker]
      element["lastUpdate"] = date.toUTCString()
     }
   });
   console.log(this.projects)
   this.loadTableFilters(this.projects,this.tableFilters)
 }
 //Table Settings 
 onSettingsSave(){
  var body = {}
  body["settings"] = this.columnSettings,
  body["tableFilters"]= this.tableFilters;
  body["resourcesList"] = this.resourcesList;
  body["date_format"] = this.date_format_type;
  body["account"] = this.account;
  body["status"] = this.menu_array;
  body["date_format_value"] = this.date_format_value;
  body["account_value"] = this.account_value
  this.projectService.updateSetings(body)
  this.messageService.add({severity:'success', summary: 'Success', detail:'Saved Successfully'});
 this.dismiss = true
}
onSettingsReset(){
  this.confirmationService.confirm({
    message: 'Are you sure you want to reset the settings?',
    header: 'Confirm',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
      let objectArray = []

      this.columnSettings.forEach((ele) =>{
      ele.isVisible = true
      })
    
      this.date_format_value = this.date_format_type[0].value
      this.account_value  = this.account[0].value
      this.messageService.add({severity:'success', summary: 'Successful', detail: 'Settings Reset Done Successfully', life: 3000});
    }
});
}
// Save - > whole data of project
onSaveProject(){
  console.log(this.projects)
  this.projectService.updateWholeData(this.projects)
  this.loadData()
  this.messageService.add({severity:'success', summary: 'Success', detail:'Saved Successfully'});

}

deleteSelectedProjects(){
  console.log('Selected Projects',this.selectedProjects)
  this.confirmationService.confirm({
    message: 'Are you sure you want to delete the selected projects?',
    header: 'Confirm',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
        this.projects = this.projects.filter(val => !this.selectedProjects.includes(val));
        this.selectedProjects = null;
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
         this.loadMenu(this.menu_array)
      }
});

}
onDelete(){

  this.confirmationService.confirm({
    message: 'Are you sure you want to delete ' + this.rowData["projectName"] + '?',
    header: 'Confirm',
    icon: 'pi pi-exclamation-triangle',
    accept: () => {
        this.projects = this.projects.filter(val => val.id !== this.rowData["id"]);
        
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
        this.loadMenu(this.menu_array)  
      }
});  
}

onSaveTimeLine(field,data,dateType){
  var objTracker = data["traker"];
  console.log(objTracker)
  var obj = {}
  var date = new Date()
  var month = date.getMonth()+1
  var dateString = date.getDate()+'.'+month+'.'+date.getFullYear()
  console.log(date)
  console.log(this.copyProjects)

 if( dateType ==='startdate'){
   obj ={
     "id": data.id,
     "field": dateType,
     "value":  data[field].startdate,
     "date" : dateString,
     "time" : date.toLocaleTimeString(),
     "operation":"Changed"
   }
   objTracker.push(obj)  
  } else {
   obj = {
     "id": data.id,
     "field": dateType,
     "value":  data[field].enddate,
     "date" : dateString,
     "time" : date.toLocaleTimeString(),
     "operation":"Changed"
     }
     objTracker.push(obj)
    }

this.projects.forEach(element => {
    if(element.id === data.id){
     element["traker"] = [...objTracker]
     element["lastUpdate"] = date.toUTCString()
    }
  });
  console.log(this.projects)
  this.loadTableFilters(this.projects,this.tableFilters)
}

}
