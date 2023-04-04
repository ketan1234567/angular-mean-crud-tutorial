import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Book } from './book';
import { Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  //node and express api 
  Rest_api='http://localhost:8000/api';

  //http headers 
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(private httpClient: HttpClient) {}
  //Add 
  addbook(data:any):Observable<any>{
    let api_url=`${this.Rest_api}/add-book`;
    return this.httpClient
    .post(api_url,data)
    .pipe(catchError(this.handleError))
  }
  //Get All Objects
  GetBooks(){
    return this.httpClient.get(`${this.Rest_api}`);
  }
  //Get Single object
  GetBook(id:any):Observable<any>{
    let api_url=`${this.Rest_api}/read-book/${id}`
    return this.httpClient.get(api_url,{headers:this.httpHeaders}).pipe(
      map((res:any)=>{
        return res || {};

    }),
    catchError(this.handleError)
    )
  }
  //Update Book
  updatebook(data:any){
    let api_url=`${this.Rest_api}/update-book/${data.id}`;
    return  this.httpClient
    .put(api_url,data,{headers:this.httpHeaders}).pipe(catchError(this.handleError))
    .pipe(catchError(this.handleError));
  }
  deletebook(id:any):Observable<any>{
   let api_url= `${this.Rest_api}/delete-book/${id}`;
   return this.httpClient
   .delete(api_url,{headers:this.httpHeaders}).pipe(catchError(this.handleError))
  }
  // Error
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(() => {
      errorMessage;
    });
  }
}
