import { Component, OnInit } from '@angular/core';

import { BookService } from '../shared/book.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  submitted:boolean;
  showSuccessMessage:boolean;

  formControls=this.bookService.form.controls;
  constructor(private bookService:BookService) { }

  ngOnInit() {
  }
 onSubmit(){
   this.submitted= true;
  if(this.bookService.form.valid){
   if(this.bookService.form.get('$key').value==null)
   this.bookService.insertBook(this.bookService.form.value)
   else
   this.bookService.updateBook(this.bookService.form.value)
   
   this.showSuccessMessage=true;
   setTimeout(()=> this.showSuccessMessage=false,3000)
    this.submitted=false;
    this.bookService.form.reset();
   }
 }
}
