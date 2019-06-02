import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
@Injectable()
export class ProductService
{
    productRate:number;
    productVotes:number;
    procuctStars:number;
    headers = new HttpHeaders({'Content-Type':'application/json'});
    constructor(public http:HttpClient)
    {
     
    }
    getSimilarProducts(brand :string ,category:string)
    {
      let endpoint='http://127.0.0.1:8000/api/product/?brand__Name__icontains='+brand+'&Category__Name__icontains='+category;
      return this.http.get(endpoint,{headers : this.headers})
    }
    getProduct(productID:number)
    {
      let endpoint='http://127.0.0.1:8000/api/product/'+productID+'/';
      return this.http.get(endpoint,{headers : this.headers})
    }
    CalculateRate(ProID:number)
    {
       let endpoint='http://127.0.0.1:8000/api/review/?product__id='+ProID;
       return this.http.get(endpoint,{headers : this.headers})
    }
}