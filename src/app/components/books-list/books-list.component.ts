import { Component, OnInit } from '@angular/core';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {
  books:any=[];

  constructor(private crudService:CrudService){}
  ngOnInit(): void {
   this.crudService.GetBooks().subscribe(res=>{
    console.log(res);
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

}
