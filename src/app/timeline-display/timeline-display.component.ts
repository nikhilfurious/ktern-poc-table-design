import { Component, Input, OnInit } from '@angular/core';
import { MessageService, PrimeIcons, PrimeNGConfig, SelectItem } from 'primeng/api';
import { Product } from '../product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-timeline-display',
  templateUrl: './timeline-display.component.html',
  styleUrls: ['./timeline-display.component.css']
})
export class TimelineDisplayComponent implements OnInit{
  // events1: any[];
  // constructor() { }

  // ngOnInit() {
  //   // this.events1 = [
  //   //   {
  //   //     status: "Ordered",
  //   //     date: "15/10/2020 10:30",
  //   //     icon: PrimeIcons.SHOPPING_CART,
     
  //   //     image: "game-controller.jpg"
  //   //   },
  //   //   {
  //   //     status: "Processing",
  //   //     date: "15/10/2020 14:00",
  //   //     icon: PrimeIcons.COG,
       
  //   //   },
  //   //   {
  //   //     status: "Shipped",
  //   //     date: "15/10/2020 16:15",
  //   //     icon: PrimeIcons.ENVELOPE,
      
  //   //   },
  //   //   {
  //   //     status: "Delivered",
  //   //     date: "16/10/2020 10:00",
  //   //     icon: PrimeIcons.CHECK,
       
  //   //   }
  //   // ];
  // }

  // products: Product[];
    
  // cols: any[];

  // _selectedColumns: any[];

  // constructor(private productService: ProductService,  private primengConfig: PrimeNGConfig) { }

  // ngOnInit() {
  //     this.productService.getProductsSmall().then(data => this.products = data);

  //     this.cols = [
  //         { field: 'name', header: 'Name' },
  //         { field: 'category', header: 'Category' },
  //         { field: 'quantity', header: 'Quantity' },
  //         { field: 'description', header: 'Description' },
          
  //     ];
 
  //     this._selectedColumns = this.cols;
  //     console.log(this._selectedColumns)
  // }

  // @Input() get selectedColumns(): any[] {
  //     return this._selectedColumns;
  // }

  // set selectedColumns(val: any[]) {
  //     //restore original order
  //     console.log("Selected columns",val)

  //     this._selectedColumns = this.cols.filter(col => val.includes(col));
  // }
items=[]
menu(event){
    console.log('Click',event)
}
 ngOnInit(){
 }

}
