import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'


@Injectable()
export class FavouriteService
{
    isFavourite :boolean =false;
    called :boolean=false;
    headers = new HttpHeaders({'Content-Type':'application/json'});
    constructor(public http:HttpClient)
    { 
     
    } 
    MyFavourites(userid:number)
    {
      let endpoint='http://127.0.0.1:8000/api/favourite/?user__id='+userid;
      return this.http.get(endpoint,{headers : this.headers})
    }
    ProductsFavourite(proid)
    {
      let endpoint='http://127.0.0.1:8000/api/favourite/?product__id='+proid;
      return this.http.get(endpoint,{headers : this.headers})
    }
    AddToFovourite(userID:number,ProID:number)
    {
      const favourite={'user':userID,'product':ProID} ; 
      let endpoint='http://127.0.0.1:8000/api/scan/';
      return this.http.post(endpoint,favourite,{headers : this.headers})
     
    }
    DeleteFavourite(FavouriteID:number)
    {
       let endpoint='http://127.0.0.1:8000/api/scan/'+FavouriteID+'/';
      return this.http.delete(endpoint,{headers : this.headers})
    }
   
}