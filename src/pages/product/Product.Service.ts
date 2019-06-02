
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { Injectable} from '@angular/core';
import { Header } from 'ionic-angular';
@Injectable()
export class ProductReviews{
    constructor(private http:HttpClient)
    {
      
    }

    
 get_product_reviews(productid){
      const endpoint='http://localhost:8000/api/review/?product__id='
    const headers = new HttpHeaders({'Content-Type':'application/json'});
    return this.http.get(endpoint+productid,{headers:headers})
  }

 Add_like(reviewid){

  const endpoint='http://localhost:800/api/like'
  const headers= new HttpHeaders({'Content-Type':'application/json'});
  return this.http.post(endpoint+reviewid,{headers:headers})
 
 }


  


 

}