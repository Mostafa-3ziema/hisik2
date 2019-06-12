import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'
import { Ipadress } from './IPaddress';


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
      let endpoint=Ipadress+':8000/api/favourite/?user__id='+userid;
      return this.http.get(endpoint,{headers : this.headers})
    }
    ProductsFavourite(proid)
    {
      let endpoint=Ipadress+':8000/api/favourite/?product__id='+proid;
      return this.http.get(endpoint,{headers : this.headers})
    }
    AddToFovourite(userID:number,ProID:number)
    {
      const favourite={'user':userID,'product':ProID} ; 
      let endpoint=Ipadress+':8000/api/favourite/';
      return this.http.post(endpoint,favourite,{headers : this.headers})
     
    }
    DeleteFavourite(FavouriteID:number)
    {
       let endpoint=Ipadress+':8000/api/favourite/'+FavouriteID+'/';
      return this.http.delete(endpoint,{headers : this.headers})
    }
   
}