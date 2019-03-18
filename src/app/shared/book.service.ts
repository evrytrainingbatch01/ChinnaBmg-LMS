import { Injectable } from '@angular/core';
import { FormControl,FormGroup,Validators} from '@angular/forms'
import { AngularFireDatabase,AngularFireList} from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private firebase:AngularFireDatabase) { }
  booklist:AngularFireList<any>;

  form= new FormGroup({

     $key: new FormControl(null),
     bookname: new FormControl('',Validators.required),
     author: new FormControl('',Validators.required),
     price: new FormControl('',Validators.required),
     rating: new FormControl('',[Validators.required,Validators.minLength(1)])
  });
  
  getBooks(){
    this.booklist=this.firebase.list("books");
    return this.booklist.snapshotChanges();
  }

  insertBook(book){
    this.booklist.push({
       bookname:book.bookname,
       author:book.author,
       price:book.price,
       rating:book.rating
    })
  }
  
  populatedForm(book){
    this.form.setValue(book)
  }

  updateBook(book){
    this.booklist.update(book.$key,
      {
        bookname:book.bookname,
        author:book.author,
        price:book.price,
        rating:book.rating
      }
      );
  }

  bookDelete($key:string){
    this.booklist.remove($key);
  }
  
}
