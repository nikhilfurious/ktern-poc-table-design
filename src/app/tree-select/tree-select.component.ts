import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tree-select',
  templateUrl: './tree-select.component.html',
  styleUrls: ['./tree-select.component.css']
})
export class TreeSelectComponent {

  value: string[] = ['0-0-0'];
  nodeList: []
  nodes = [
    {
      title: 'Project Manager',
      value: 'projectManager',
      key: 'projectManager',
      children: [
        {
          title: 'Manager1',
          value: 'manager1',
          key: 'manager1',
          isLeaf: true
        },
        {
          title: 'Manager2',
          value: 'manager2',
          key: 'manager2',
          isLeaf: true
        }
      ]
    },
    {
      title: 'Project Name',
      value: 'projectName',
      key: 'projectName',
      children: [
        {
          title: 'Kaar Technologies AMS',
          value: 'Kaar Tech AMS',
          key: 'Kaar Tech AMS',
          isLeaf: true
        },
        {
          title: 'Juhin',
          value: 'juhin',
          key: 'juhin',
          isLeaf: true
        },
        {
          title: 'Salaji AMS',
          value: 'salan1',
          key: 'salan1',
          isLeaf: true
        }
      ]
    }
  ];
  selectedData = []
 projectDetails = {
   Name: [{label:"All",check:false},{label:"JH",check:false}],
   Manager: [{label:"Manager1",check:false},{label:"Manager2",check:false}]
 }
 filterDetails = ["Name","Manager"]

  onChange($event: string[]): void {
    console.log(this.value)
    console.log(this.nodes)
  }
  menu :''
onMenu(event){
  console.log(event)
  this.menu = event.target.innerText
 this.selectedData = this.projectDetails[event.target.innerText]
console.log(this.selectedData)
}
checked = false
onItemCheckBox(event){
  if(event.target.defaultValue === 'All'){
  this.projectDetails[this.menu].forEach(element => {
    element.check = true
  });
  } else 
  {
  this.projectDetails[this.menu].forEach(element => {
    if(element.label===event.target.defaultValue){
      element.check = true
    }
  });


  }
}



}
