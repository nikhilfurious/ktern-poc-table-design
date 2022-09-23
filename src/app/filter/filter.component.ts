import { Component, OnInit } from '@angular/core';

import { MenuItem } from 'primeng/api';
import { env } from 'process';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {

  items: any [];

  scrollableItems: MenuItem[];

  activeItem: MenuItem;

  activeItem2: MenuItem;

  project_details :[]
  // menuItem =['All']
  projects = [
    {
    "id":1,
    "projectName":"Kaar Tech",
    "status":"Risk",
    "lastUpdate": "15 Mar 2021, 12:47pm",
    "resources": 3,
    "resources_alloted":["UI designer","Front End Developer","Back End Developer"],
    "projectTimeLine": " 15 May 2022 ",
    "projectManager":"Mohan Das",
    "tracker":[{
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
    "status":"On track",
    "lastUpdate": "15 Mar 2021, 12:47pm",
    "resources": 3,
    "resources_alloted":["UI designer","Front End Developer","Back End Developer"],
    "projectTimeLine": " 15 May 2022 ",
   "estimation" :"US$ 10.5K",
   "estimation_tracker":"Roger updated estimation from US$ 15k to US$ 10K on May 18 2021 @ 4.14pm",
   "status_tracker":"Roger changed status from On Hold 15k to On Track on May 18 2021 @ 4.14pm",
   "created_tracker":"Roger created project on 11 May 2021",
   "projectManager":"Gopal Das",
   "traker":[{
    "id":2,
    "status":"Estimated on 12.09.2022"
  },{
    "id":2,
    "status":"Changed on 12.09.2022"
  },{
    "id":2,
    "status": "Updated on 12.09.2022"
  }]
},
{
    "id":3,
    "projectName":"Dell",
    "status":"OnHold",
    "lastUpdate": "15 Mar 2021, 12:47pm",
    "resources": 3,
    "projectManager":"Krishna",
    "resources_alloted":["UI designer","Front End Developer","Back End Developer"],
    "projectTimeLine": " 15 May 2022 ",
   "estimation" :"US$ 10.5K",
   "estimation_tracker":"Roger updated estimation from US$ 15k to US$ 10K on May 18 2021 @ 4.14pm",
   "status_tracker":"Roger changed status from On Hold 15k to On Track on May 18 2021 @ 4.14pm",
   "created_tracker":"Roger created project on 11 May 2021",
   "traker":[{
    "id":3,
    "status":"Estimated on 12.09.2022"
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
    "projectManager":"Sagar",
    "resources_alloted":["UI designer","Front End Developer","Back End Developer"],
    "projectTimeLine": " 15 May 2022 > 17 Aug 2023",
   "estimation" :"US$ 10.5K",
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
    "projectManager":"Unin",
    "resources_alloted":["UI designer","Front End Developer","Back End Developer"],
    "projectTimeLine": " 15 May 2022 > 17 Aug 2023",
   "estimation" :"US$ 10.5K",
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
    "projectTimeLine": " 15 May 2022 > 17 Aug 2023",
   "estimation" :"US$ 10.5K",
   "status_tracker":"Roger changed status from On Hold 15k to On Track on May 18 2021 @ 4.14pm",
   "created_tracker":"Roger created project on 11 May 2021",
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
}]
menuItem = []
menuItemObject = [{}]
menuArray = []
menuName = ''
// selectedData = [

//   {manuName: 'projectName', name: 'Kaar Tech'}, 
//   {manuName: 'projectName', name: 'Daimler'}]
selectedData = [];
menuNames = []
 
   
onMenuActive(event,i,aria){

     this.menuItem =[]
    this.menuItemObject =[{}]
    this.menuArray = []
    this.menuName = i.value;
    this.menuNames = []


  
     this.projects.forEach((element)=> {
       return this.menuItem.push(element[i.value]);
     })
    //project - > list of projects 

    

    console.log(this.menuNames)
     for(let i=0;i<this.menuItem.length;i++){
     this.menuItemObject.push({
       manuName: this.menuName,
       name:this.menuItem[i]
     })
     }
     this.menuItemObject.slice(1,this.menuItemObject.length)
    
  this.menuArray = this.menuItemObject.slice(1,this.menuItemObject.length)
   console.log('MN',this.menuArray)
 }

// projectManager : ['Mohn','Gopal]
filterObject = {}
filters = ["projectName","projectManager"]
result = []
onMenuSelect(event , ev){
  console.log(ev)
  console.log(event)
  let data = {}
  event.selectedData.forEach(element => {
    // if(element.manuName==='projectName'){
    //   if(!data['projectName']){
    //   data['projectName'] = [element.name]
    //   this.filterObject['projectName'] = data['projectName']
    //   } else{
    //   data['projectName'].push(element.name)
    // //  console.log('GT',this.filterObject['projectName'])
    //   }
    // }

    Object.keys(element).forEach(keys =>{
      if(!data[element.manuName]){
        data[element.manuName] = []
      }
      if(data[element.manuName].indexOf(element.name)=== -1 ){
        if(!data[element.manuName]){
          data[element.manuName] = [element.name]
          // console.log('FS',this.filterObject)
          // this.filterObject[element.manuName] = data[element.manuName]
          } else{
            console.log('elem',element.name)
          data[element.manuName].push(element.name)
         this.filterObject[element.manuName] = data[element.manuName]
          }
        }
      }
   
)
  
    // if(element.manuName==='projectManager'){
    //   if(!data['projectManager']){
    //   data['projectManager'] = [element.name]
    //   } else{
    //   data['projectManager'].push(element.name)
    //   }
    // }
    
    
  });
console.log(data)
console.log(this.filterObject)
console.log('SD',this.selectedData)


 this.result = this.projects.filter(o => Object.keys(this.filterObject).every(k => this.filterObject[k].some(f => o[k] === f)));
console.log(this.result)
}
  constructor(){
console.log(this.selectedData)
this.filters.forEach(ele => {
  this.filterObject[ele] = []
})
console.log(this.filterObject)
  }

  ngOnInit() {
      this.items = [
          {label: 'Project', value:'projectName'},
          {label: 'Project Manager',value:'projectManager'}
      ];

}

}


