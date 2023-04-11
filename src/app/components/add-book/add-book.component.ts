import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  ngOnInit(): void {
   
  }
  constructor(private formBuilder:FormBuilder,private services:CrudService){}
  onSubmit(){
    console.log( this.LoginForm.value);
    const data=this.LoginForm.value
    this.services.LoginForm(data).subscribe((result)=>{
      console.log(result);
      
    })
    
  }

  LoginForm=this.formBuilder.group({
    username:[''],
    password:['']
  });

}
