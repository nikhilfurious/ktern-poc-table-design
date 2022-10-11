import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../product.service';
import _, { map } from 'underscore';
import { DatePipe } from '@angular/common'
import {PaginatorModule} from 'primeng/paginator';
// import { timeStamp } from 'console';
import { AvatarModule } from "primeng/avatar";
import {TooltipModule} from 'primeng/tooltip';


@Component({
  selector: 'app-table-row-expand',
  templateUrl: './table-row-expand.component.html',
  styleUrls: ['./table-row-expand.component.css'],
  providers: [DatePipe,PaginatorModule,AvatarModule,TooltipModule]
})
export class TableRowExpandComponent implements OnInit {
  msstatus: boolean = false;
  mestatus: boolean = false;

  showBtn=-1;

  loading: boolean = true;
  groupedFilterData: any = [];
  curatedFilters: any = []
  selectedFilterData : any = [];
  tableFilters : any = []
  columnFilteredData: any = [];
  
  filteredData : any = []; 
  filterObject = {
    label : String,
    value : String,
    items : []
}
groupFilter = [{}]
//

amount_boolean = true;

 listStatus = [    
  {label: 'OnHold', icon: 'pi pi-fw pi-calendar',isActive:false,length:3},
  {label: 'Risk', icon: 'pi pi-fw pi-calendar',isActive:true,length:3},
  {label: 'Ontrack', icon: 'pi pi-fw pi-pencil',isActive:false,length:2},
  {label: 'Potential Risk', icon: 'pi pi-fw pi-file',isActive:false,length:2}
]

  //menus -> Used for Tab Menu
  menus = [
      {label: 'All', icon: 'pi pi-fw pi-home' ,isActive:true,length:6},
      {label: 'OnHold', icon: 'pi pi-fw pi-calendar',isActive:false,length:1},
      {label: 'Risk', icon: 'pi pi-fw pi-calendar',isActive:true,length:3},
      {label: 'Ontrack', icon: 'pi pi-fw pi-pencil',isActive:false,length:1},
      {label: 'Potential Risk', icon: 'pi pi-fw pi-file',isActive:false,length:1},
    
  ];


  //map set
  
  columnsetings=[
    {"header":"id","field":'pname',"type":"string"},
    {"header":"id","field":'id',"type":"statusstring"},
    {"header":"id","field":'id',"type":"date"},
    {"header":"from","field":'from',"type":"date"},
    {"header":"to","field":'to',"type":"date"},
    {"header":"recievedDate","field":'redate',"type":"date"},
  ]

  //map set

  

  //types -> Checkbox
  types = [
    {label:'Project Name',value:'projectName',isActive:true},
    {label:'PM',value:'projectManager',isActive:true},
    {label:'Status',value:'status',isActive:true},
    {label:'Last Update',value:'lastUpdate',isActive:true},
    {label:'Resources',value:'resources',isActive:true},
    {label:'Project Timeline',value:'projectTimeLine',isActive:true},
    {label:'startdate',value:'startdate',isActive:true},
    {label:'Estimation',value:'estimation',isActive:true},
  ];

  reourcesList = [
    {label:'UI/UX designer' , value:'UI/UX designer', isActive:false},
    {label:'Front End Developer' , value: 'Front End Developer', isActive:false},
    {label:'PM' , value: 'Front End Developer', isActive:false},
    {label:'Back End Developer' , value: 'Back End Developer', isActive:false},
    {label:'Solution Architect' , value: 'Solution Architect', isActive:false}
  ]

//projects -> List of project details
projects = [];


//newArr -> to store the fitlered list of columns which are active
  newArr: { label: string; value: string; isActive: boolean; }[];
  account =[
    {label:"10.5k",value:"decimal"},
    {label:"10,5000",value:"thousand"}
    ]
    account_value = ''
  date_format_type =[
      {label:"DD/MM/YYYY",value:"dd/LL/yyyy ,hh:mm "},
      {label:"MM/DD/YYYY",value:"LL/dd/yyyy"},
      {label:"DD/MM/YYYY",value:"DD/MMM/YYYY"}
    ]
    date_format_value ='dd LLL yyyy,HH:MM aaaa'
    date_boolean = false;
onFilter($event: string[]): void {
if(this.selectedFilterData.length===0){
  this.menu = true
  console.log(this.menu,this.projects)
} else {
this.menu = false;
var data = []
this.projects.forEach(element =>{
    this.tableFilters.forEach(el =>{
        //console.log(el)
        if(this.selectedFilterData.indexOf(element[el]) > -1){
            console.log(element)
            data.push(element)
        }
    })
})

// this.menu_filter_array = [...new Set(this.columnFilteredData)]
this.columnFilteredData = [...new Set(data)]
this.menu_filter_array =  [...this.columnFilteredData]
console.log('CFD',this.columnFilteredData)
console.log(this.menu_filter_array)
}}


  //  mcode
  cl(){
    console.log("hei")
  }
  csactive() {
    console.log("hi");
    this.msstatus = !this.msstatus;
  }
  ceactive() {
    console.log("hi");
    this.mestatus = !this.mestatus;
  }

  showUndoBtn(index){
    console.log(index);
    this.showBtn=index;
  }

  //new

  ceonch(id) {
    console.log(id);
    this.cemyFunction(id)
  }

  cemyFunction(id) {
    // this.cdate=new Date();
    // let latest_date = this.datepipe.transform(valued, 'yyyy-MM-dd');
    // console.log(latest_date);
    // const index: number = this.tmdata.indexOf(id);
    const newArr = this.projects.map(obj => {
      if (obj.id === id) {
        return { ...obj, enddate: "" };
      }

      return obj;
    });
    // console.log(index,id)
    console.log(newArr)
    this.projects = newArr
  }
  csonch(id) {
    console.log(id);
    this.csmyFunction(id)
  }

  csmyFunction(id) {
    // this.cdate=new Date();
    // let latest_date = this.datepipe.transform(valued, 'yyyy-MM-dd');
    // console.log(latest_date);
    // const index: number = this.tmdata.indexOf(id);
    const newArr = this.projects.map(obj => {
      if (obj.id === id) {
        return { ...obj, startdate: "" };
      }

      return obj;
    });
    // console.log(index,id)
    console.log(newArr)
    this.projects = newArr
  }

  //new


  onch(valued, id) {
    console.log(valued, id);
    this.myFunction(valued, id)
  }
  onsch(valued, id) {
    console.log(valued, id);
    this.mysFunction(valued, id)
  }
  mysFunction(valued, id) {
    // this.cdate=new Date();
    let latest_date = this.datepipe.transform(valued, 'yyyy-MM-dd');
    console.log(latest_date);
    // const index: number = this.tmdata.indexOf(id);
    const newArr = this.projects.map(obj => {
      if (obj.id === id) {
        if(latest_date > obj.enddate) {
          console.log("soe");
          alert("start date need to be lesser than end date");

          return { ...obj, startdate: obj.startdate };
        }
        return { ...obj, startdate: latest_date };
      }

      return obj;
    });
    // console.log(index,id)
    console.log(newArr)
    this.projects = newArr
  }
  t(event:any){
    console.log("hi");
  }
  myFunction(valued, id) {
    // this.cdate=new Date();
    let latest_date = this.datepipe.transform(valued, 'yyyy-MM-dd');
    console.log(latest_date);
    // const index: number = this.tmdata.indexOf(id);
    const newArr = this.projects.map(obj => {
      if (obj.id === id) {
        if(latest_date < obj.startdate) {
          alert("End date need to be bigger then start date");

          return { ...obj, enddate: obj.enddate };
        }
        return { ...obj, enddate: latest_date };
      }

      return obj;
    });
    // console.log(index,id)
    console.log(newArr)
    this.projects = newArr
  }
  // mcode


// products: Product[];
// groupFilter = [{}]
constructor(private productService: ProductService, public datepipe: DatePipe){
  this.projects = [
    {
    "id": 1,
    "style": "color: red; background-color: white;",
    "class": "string",
    "ManagerImgs":"/assets/images/user2.jpg",
    "projectName":"Kaar Tech",
    "Manager":"Jeevan",
    "status":"Risk",
    "lastUpdate": "Tue Sep 27 2022 10:55:55 GMT+0530 (India Standard Time)",
    "resources": '',
    "resources_alloted":["UI designer","Front End Developer","Back End Developer"],
    // "projectTimeLine": {
    //   "fromDate" : "Tue Sep 28 2022 10:55:55 GMT+0530 (India Standard Time)",
    //   "ToDate" : "Tue Sep 30 2022 10:55:55 GMT+0530 (India Standard Time)"
    // },
    "startdate": "14 jan 2001", "enddate": "15 feb 2002",
    "estimation" : {
      "amount":10600,
      "currency":"US$"
    },
    "traker":[{
      "id":1,
      "status":"Estimated on 12.09.2022"
    },{
      "id":1,
      "status":"Changed on 12.09.2022"
    },{
      "id":1,
      "status": "Updated on 12.09.2022"
    }]
  },
  {
    "id":2,
    "type":"string",
    "ManagerImgs":"/assets/images/user2.jpg",
    "projectName":"Daimler",
    "Manager":"Jeevan",
    "status":"Ontrack",
    "lastUpdate": "Tue Sep 27 2022 10:55:55 GMT+0530 (India Standard Time)",
    "resources": 3,
    "resources_alloted":["UI designer","Front End Developer","Back End Developer"],
    "startdate": "16 mar 2003", "enddate": "",
    "estimation" : {
      "amount":10700,
      "currency":"US$"
    },
  
   "traker":[{
    "id":2,
    "status":"Estimated on 11.09.2022"
  },{
    "id":2,
    "status":"Changed on 02.09.2022"
  },{
    "id":2,
    "status": "Updated on 22.09.2022"
  }]
  },
  {
    "id":3,
    "type":"string",
    "ManagerImgs":"/assets/images/mlogo.png",
    "projectName":"Dell",
    "Manager":"Mohan Das",
    "status":"OnHold",
    "lastUpdate": "Tue Sep 27 2022 10:55:55 GMT+0530 (India Standard Time)",
    "resources": 3,
    "resources_alloted":["UI designer","Front End Developer","Back End Developer"],
    "startdate": "18 feb 2020", "enddate": "14 mar 2001",
    "estimation" : {
      "amount":10500,
      "currency":"US$"
    },
   "traker":[{
    "id":3,
    "status":"Estimated on 10.08.2022"
  },{
    "id":3,
    "status":"Changed on 12.09.2022"
  },{
    "id":3,
    "status": "Updated on 12.09.2022"
  }]
  },
  {
    "id":4,
    "class": "string",
    "ManagerImgs":"https://www.w3schools.com/images/w3schools_green.jpg",
    "projectName":"Almas Tofech",
    "Manager":"Ravi",
    "status":"Potential Risk",
    "lastUpdate": "Tue Sep 27 2022 10:55:55 GMT+0530 (India Standard Time)",
    "resources": 3,
    "resources_alloted":["UI designer","Front End Developer","Back End Developer"],
    // "projectTimeLine": " 15 May 2022 > 17 Aug 2023",
    "startdate": "", "enddate": "",
    "estimation" : {
      "amount":10800,
      "currency":"US$"
    },
  
   "traker":[{
    "id":4,
    "status":"Estimated on 10.08.2022"
  },{
    "id":4,
    "status":"Changed on 12.09.2022"
  },{
    "id":4,
    "status": "Updated on 12.09.2022"
  }]
  
  },
  {
    "id":5,
    "ManagerImgs":"/assets/images/user1.jfif",
    "projectName":"Al Bid Info Tech",
    "Manager":"Gopal Das",
    "status":"Risk",
    "lastUpdate": "Tue Sep 27 2022 10:55:55 GMT+0530 (India Standard Time)",
    "resources": 3,
    "resources_alloted":["UI designer","Front End Developer","Back End Developer"],
    "startdate": "14 jan 2001", "enddate": "14 mar 2001",
    "estimation" : {
      "amount":10900,
      "currency":"US$"
    },
  
   "estimation_tracker":"Roger updated estimation from US$ 15k to US$ 10K on May 18 2021 @ 4.14pm",
   "status_tracker":"Roger changed status from On Hold 15k to On Track on May 18 2021 @ 4.14pm",
   "created_tracker":"Roger created project on 11 May 2021",
   "traker":[{
    "id":5,
    "status":"Estimated on 12.09.2022"
  },{
    "id":5,
    "status":"Changed on 12.09.2022"
  },{
    "id":5,
    "status": "Updated on 12.09.2022"
  }]
  },
  {
    "id": 6,
    "ManagerImgs":"/assets/images/user2.jpg",
    "projectName": "Al Rias",
    "Manager":"Jeevan",
    "status":"Risk",
    "lastUpdate": "Tue Mar 28 2022 10:55:55 GMT+0530 (India Standard Time)",
    "resources": 3,
    "resources_alloted":["UI designer","Front End Developer","Back End Developer"],
    "startdate": "14 jan 2001", "enddate": "14 mar 2001",
    "estimation" : {
      "amount":10200,
      "currency":"US$"
    },
   "traker":[{
    "id":6,
    "status":"Estimated on 12.09.2022"
  },{
    "id":6,
    "status":"Changed on 12.09.2022"
  },{
    "id":6,
    "status": "Updated on 12.09.2022"
  }]
  }];
  console.log(this.projects)
  this.tableFilters = ['projectName','Manager']
  this.tableFilters.forEach(key =>{
  this.curatedFilters[key] = _.uniq(_.pluck(this.projects, key));
})

//logic to arrange the array needed for ListBox [Filter]
 for(let i=0;i<this.tableFilters.length;i++){
  var filterObject = {}
  filterObject['label'] = this.tableFilters[i]
  filterObject['values'] = this.tableFilters[i]
  filterObject['items'] = []
   var filterArray = this.curatedFilters[this.tableFilters[i]]
  for(let j =0;j < filterArray.length;j++){
      var object = {
          label: filterArray[j],
          value:  filterArray[j],
      }
     filterObject['items'].push(object)   
  }
this.groupedFilterData.push( filterObject)
}

console.log("Group Filter",this.groupedFilterData)

 
//  console.log(this.date_format_value)
}
onDateChange(event){
  this.date_boolean = true;
this.date_format_value = event.value
}
onAmountChange(event){
  debugger
  if(event.option.value === "decimal"){
    this.amount_boolean = false
  } else if(event.option.value === "thousand"){
    this.amount_boolean = true
  }
}
onResourceSelect(event ,i){
  console.log(i.label , i.isActive)
  if(i.isActive === false){
    i.isActive = true
  } else {
    i.isActive = false
  }


}
//Function to filter the list of columns which are active and to be displayed
onColumnOrder(event,i,cl){

  var index = document.getElementsByClassName(cl)
  if(i.isActive === false){
    i.isActive = true
    for(let i=0;i<index.length;i++){
      index[i].classList.remove("tabCol")
    } 
  } else {
    i.isActive = false
    for(let i=0;i<index.length;i++){
      index[i].classList.add("tabCol")
    }}
  this.newArr = this.types.filter(function(record) {  
    return record.isActive === true ;
});
 console.log(this.newArr)
}
menu_filter_array = []; // filtered project details based on menu selection
menu_arry = []
menu :boolean = true;
statusId = 0
onStatusFilter(event,i){
var text =  i.label
console.log(text)
if(this.columnFilteredData.length > 0 && this.selectedFilterData.length > 0){
this.projects = [...this.columnFilteredData]
}
console.log('Status Data Array ',this.projects);
if(text !='All'){
this.menu = false

this.menu_filter_array = this.projects.filter(function(record){
  return record.status === text;
})
} 
else{
  this.menu = true;
}

console.log('Status Filtered Data',this.menu_filter_array)
}
statusUpdate = ''
onStatus(info){
  this.statusId = info.id
  console.log('This Status',this.statusId)
}

onListStatus(event){
  console.log(event)
  console.log(this.statusId)
  this.projects.forEach(ele =>{
    if(ele["id"] === this.statusId){
      ele["status"] = event
    }
  })
  console.log(this.projects)

}
  ngOnInit() { 
    this.newArr = this.types.filter(function(record) {  
      return record.isActive === true ;
  });
   }
}
