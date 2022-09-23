import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../product.service';
import { Product } from '../product';
import { PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-table-row-expand',
  templateUrl: './table-row-expand.component.html',
  styleUrls: ['./table-row-expand.component.css']
})
export class TableRowExpandComponent implements OnInit {

  loading: boolean = true;
  status = [
    {label:"OnHold" , value:"OnHold"},
    {label:"Risk" , value:"Risk"},
    {label:"Potential Risk" , value:"Potential Risk"}
  ]
  events1 = [
    {
      status: "Ordered",
      date: "15/10/2020 10:30",
      icon: PrimeIcons.SHOPPING_CART,
      image: "game-controller.jpg",
      
    },
    {
      status: "Processing",
      date: "15/10/2020 14:00",
      icon: PrimeIcons.COG,
     
    },
    {
      status: "Shipped",
      date: "15/10/2020 16:15",
      icon: PrimeIcons.ENVELOPE,
    
    },
    {
      status: "Delivered",
      date: "16/10/2020 10:00",
      icon: PrimeIcons.CHECK,
     
    }
  ];
  //menus -> Used for Tab Menu
  menus = [
      {label: 'All', icon: 'pi pi-fw pi-home' ,isActive:false,length:7},
      {label: 'OnHold', icon: 'pi pi-fw pi-calendar',isActive:true,length:3},
      {label: 'Ontrack', icon: 'pi pi-fw pi-pencil',isActive:false,length:2},
      {label: 'Potential Risk', icon: 'pi pi-fw pi-file',isActive:false,length:2},
      {label: 'Settings', icon: 'pi pi-fw pi-cog',isActive:false,length:1}
  ];
  //types -> Checkbox
  types = [
    // {label:'CheckBox', value:'checkbox', isActive:false},
    // {label:' #',value:'id',isActive:false},
    {label:'Project Name',value:'projectName',isActive:true},
    {label:'PM',value:'projectManager',isActive:true},
    {label:'Status',value:'status',isActive:true},
    {label:'Last Update',value:'lastUpdate',isActive:true},
    {label:'Resources',value:'resources',isActive:true},
    {label:'Project Timeline',value:'projectTimeLine',isActive:true},
    {label:'Estimation',value:'estimation',isActive:true},
  
  ];
//projects -> List of project details
//projects -> List of project details
projects = [
  {
  "id":1,
  "projectName":"Kaar Tech",
  "status":"Risk",
  "lastUpdate": "15 Mar 2021, 12:47pm",
  "resources": 3,
  "projectManager":"Jeevan",
  "resources_alloted":["UI designer","Front End Developer","Back End Developer"],
  "projectTimeLine": " 15 May 2022 ",
  "estimation" :"US$ 10.5K",
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
  "projectName":"Daimler",
  "status":"Ontrack",
  "lastUpdate": "15 Mar 2021, 12:47pm",
  "resources": 3,
  "resources_alloted":["UI designer","Front End Developer","Back End Developer"],
  "projectTimeLine": " 15 May 2022 ",
 "estimation" :"US$ 10.5K",
 "projectManager":"Jeevan",
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
  "projectName":"Dell",
  "status":"OnHold",
  "lastUpdate": "15 Mar 2021, 12:47pm",
  "resources": 3,
  "resources_alloted":["UI designer","Front End Developer","Back End Developer"],
  "projectTimeLine": " 15 May 2022 ",
 "estimation" :"US$ 10.5K",
 "projectManager":"Jeevan",
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
  "projectName":"Almas Tofech",
  "status":"Potential Risk",
  "lastUpdate": "15 Mar 2021, 12:47pm",
  "resources": 3,
  "resources_alloted":["UI designer","Front End Developer","Back End Developer"],
  "projectTimeLine": " 15 May 2022 > 17 Aug 2023",
 "estimation" :"US$ 10.5K",
 "projectManager":"Jeevan",
 "projectTracker":[{
     "estimation":"Roger updated estimation from US$ 15k to US$ 10K on May 18 2021 @ 4.14pm",
     "status":"Roger changed status from On Hold 15k to On Track on May 18 2021 @ 4.14pm",
     "created":"Roger created project on 11 May 2021"
 }]
},
{
  "id":5,
  "projectName":"Al Bid Info Tech",
  "status":"Risk",
  "lastUpdate": "15 Mar 2021, 12:47pm",
  "resources": 3,
  "resources_alloted":["UI designer","Front End Developer","Back End Developer"],
  "projectTimeLine": "15 May 2022 > 17 Aug 2023",
 "estimation" :"US$ 10.5K",
 "projectManager":"Jeevan",
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
  "projectName":"Al Rias ",
  "status":"Risk",
  "lastUpdate": "15 Mar 2021, 12:47pm",
  "resources": 3,
  "resources_alloted":["UI designer","Front End Developer","Back End Developer"],
  "projectTimeLine": "15 May 2022 > 17 Aug 2023",
 "estimation" :"US$ 10.5K",
 "projectManager":"Jeevan",
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
//newArr -> to store the fitlered list of columns which are active
  newArr: { label: string; value: string; isActive: boolean; }[];
  account =[
    {label:"10.k",value:"10,000"},
    {label:"10,5000",value:"10,500"}
    ]
  date_format_type =[
      {label:"DD/MM/YYYY",value:"DD/MM/YYYY"},
      {label:"MM/DD/YYYY",value:"MM/DD/YYYY"},
      {label:"DD/MM/YYYY",value:"DD/MMM/YYYY"}
    ]

// products: Product[];
constructor(private productService: ProductService){
  console.log(this.projects)

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
onMenu(event){
  // this.menu = true
var menu_name = event.target.innerText;
var text = menu_name.slice(0,menu_name.length-2)
console.log(text)
if(text !='All'){
this.menu = false
this.menu_filter_array = this.projects.filter(function(record){
  return record.status === text;
})
} 
else{
  this.menu = true;
}

console.log(this.menu_filter_array)
}

  ngOnInit() { 
    this.newArr = this.types.filter(function(record) {  
      return record.isActive === true ;
  });
   }
}
