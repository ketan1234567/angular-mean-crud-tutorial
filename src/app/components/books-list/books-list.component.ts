import { Component, Input, NgZone, OnInit, ViewChild } from '@angular/core';
import { CrudService } from 'src/app/service/crud.service';
import { AddBookComponent } from '../add-book/add-book.component';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';



@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {
  books:any=[];
  articleIdToUpdate:any
  constructor(private crudService:CrudService,
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone
    
    ){}
  bookForm=this.formBuilder.group({
    id:[''],
    name:[''],
    price:[''],
    brand:['']
  })

    onSubmit() {
      this.crudService.addbook(this.bookForm.value)
      .subscribe(() => {
          console.log('Data added successfully!')
          this.ngZone.run(() => this.router.navigateByUrl('/books-list'))
        }, (err) => {
          console.log(err);
      });
    
  }
  ngOnInit() {
   this.crudService.GetBooks().subscribe(res=>{
    this.books=res;
   })
  }
  delete(id:any,i:any){
    console.log(id);
    if(window.confirm('Do you want to go ahead?')) {
      this.crudService.deletebook(id).subscribe((res) => {
        this.books.splice(i, 1);
      })
    } 
      
  }
  loadArticleToEdit(articleId: any) {
    this.crudService.GetBook(articleId)
      .subscribe(article => {
        console.log(article);
        this.articleIdToUpdate = article._id;
        console.log(this.articleIdToUpdate);
        
        this.bookForm.setValue({ id:this.articleIdToUpdate, name:article.name, price:article.price,brand:article.brand});
        //this.getAllArticles();
      },
        );
  }
  updateUser() {
    if(window.confirm('Do you want to Update ')) {
      this.crudService.updatebook(this.bookForm.value).subscribe(item => {
        console.log(item);
    })
  }


  }
}
