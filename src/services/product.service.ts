import { HttpHeaders } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
@Injectable()
export class ProductService
{
    productRate:number;
    productVotes:number;
    procuctStars:number;
    headers = new Headers({'Content-Type':'application/json'});
    constructor(public http:Http)
    {
     
    }
    getSimilarProducts(brand :string ,category:string)
    {
      let endpoint='http://127.0.0.1:8000/api/product/?brand__Name__icontains='+brand+'&Category__Name__icontains='+category;
      return this.http.get(endpoint,{headers : this.headers})
      .map((response)=> {return response.json();});
    }
    getProduct(productID:number)
    {
      let endpoint='http://127.0.0.1:8000/api/product/'+productID+'/';
      return this.http.get(endpoint,{headers : this.headers})
      .map((response)=> {return response.json();});
    }
    CalculateRate(ProID:number)
    {
       let endpoint='http://127.0.0.1:8000/api/review/?product__id='+ProID;
       this.http.get(endpoint,{headers : this.headers})
      .map((response)=>{return response.json();}).subscribe(
          (data)=>
          {
            if(data)
            {
                let rate5:number=0 ,rate4:number=0 ,rate3:number=0 ,rate2:number=0 ,rate1 :number =0; 
                console.log(data);
                data.forEach(review => {
                    if(review.rate == 5)
                    {
                        rate5=rate5+1;
                    }else if(review.rate == 4)
                    {
                        rate4=rate4+1;
                    }else if(review.rate == 3)
                    {
                        rate3=rate3+1;
                    }else if(review.rate == 2)
                    {
                        rate2=rate2+1;
                    }else if(review.rate == 1)
                    {
                        rate1=rate1+1;
                    }
                });
             this.productRate=((1*rate1)+(2*rate2)+(3*rate3)+(4*rate4)+(5*rate5))/data.length;
             this.productVotes=data.length;
             this.procuctStars=Math.round(this.productRate);
             console.log(this.procuctStars+" "+this.productVotes+" "+this.productRate);
            }else
            {
             this.procuctStars=0;
             this.productRate=0.0;
             this.productVotes=0;
            }
          }
          );
    }
}