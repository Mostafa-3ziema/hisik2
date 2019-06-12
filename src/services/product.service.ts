import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Ipadress } from './IPaddress';
@Injectable()
export class ProductService
{
    productRate:number;
    productVotes:number;
    procuctStars:number;
    headers = new HttpHeaders({'Content-Type': 'application/x-www-form-urlencoded','Access-Control-Allow-Origin': 'anonymous'});
    constructor(public http:HttpClient)
    {
     
    }
    getSimilarProducts(brand :string ,category:string)
    {
      let  endpoint='';
      if(brand != null)
      {
       endpoint=Ipadress+':8000/api/product/?brand__Name__icontains='+brand;

      }else
      {
        if(category != null)
        {
          endpoint=Ipadress+':8000/api/product/?Category__Name__icontains='+category;
        }
      }
      return this.http.get(endpoint,{headers : this.headers})
    }
    getProduct(productID:number)
    {
      let endpoint=Ipadress+':8000/api/product/'+productID+'/';
      return this.http.get(endpoint,{headers : this.headers})
    }
    CalculateRate(ProID:number)
    {
       let endpoint=Ipadress+':8000/api/review/?product__id='+ProID;
       return this.http.get(endpoint,{headers : this.headers})
    }
}