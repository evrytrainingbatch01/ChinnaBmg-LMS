import { Component, OnInit } from '@angular/core';

import { BookService } from '../shared/book.service';


@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.css']
})
export class BooklistComponent implements OnInit {

  constructor(private bookService:BookService) { }

  bookArray=[];
  showDeletedMessage:boolean;
  searchText: string="";

  ngOnInit() {
    this.bookService.getBooks().subscribe(
      list=>{
        this.bookArray=list.map(item =>{
          return {
            $key:item.key,
              ...item.payload.val()
          };
        });
      });
  }
    deletefun($key){
      if(confirm("Aru you sure delete this record.")){
        this.bookService.bookDelete($key);
        this.showDeletedMessage=true;
        setTimeout(()=>this.showDeletedMessage=false,3000);
      }
    }

    filterCondition(book){
      return book.bookname.toLowerCase().indexOf(this.searchText.toLocaleLowerCase()) !=-1
    }
}
