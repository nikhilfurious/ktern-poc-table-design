import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular-table-prime-ng';
  books = [
    {"name": "The Godfather", "price": 10, "author": "Mario Puzo"},
  {"name": "The Fellowship of the Ring", "price": 15, "author": "J.R.R. Tolkien"},
  {"name": "Harry Potter and the Deathly Hallows", "price": 20, "author": "J.K. Rowling  "}]
}
