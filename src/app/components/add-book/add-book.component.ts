import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService
  ){}
  ngOnInit(): void {

  }
  bookForm=this.formBuilder.group({
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

}
