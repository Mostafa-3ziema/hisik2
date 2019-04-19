import { HttpHeaders } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
@Injectable()
export class FavouriteService
{
    isFavourite :boolean =false;
    called :boolean=false;
    headers = new Headers({'Content-Type':'application/json'});
    constructor(public http:Http)
    { 
     
    } 
    MyFavourites(userid:number)
    {
      let endpoint='http://127.0.0.1:8000/api/favourite/?search='+userid;
      return this.http.get(endpoint,{headers : this.headers})
      .map((response)=> {return response.json();});
    }
    AddToFovourite(userID:number,ProID:number)
    {
      const favourite={'user':userID,'product':ProID} ; 
      let endpoint='http://127.0.0.1:8000/api/scan/';
      return this.http.post(endpoint,favourite,{headers : this.headers})
      .map((response)=>{return response.json();});
    }
    DeleteFavourite(FavouriteID:number)
    {
       let endpoint='http://127.0.0.1:8000/api/scan/'+FavouriteID+'/';
      return this.http.delete(endpoint,{headers : this.headers})
      .map((response)=>{return response.json();});
    }
    IsFavourite(UserID:number,ProId:number)
    {
        let endpoint='http://127.0.0.1:8000/api/favourite/?search='+UserID;
        return this.http.get(endpoint,{headers : this.headers})
        .map((response)=> {return response.json();})
        .subscribe((data)=>
        {
            console.log(data);
            data.forEach(favourite =>
            {
                if(favourite.product == ProId)
                {
                    this.isFavourite=true;
                }else
                {
                    this.isFavourite=false;
                }
            });
        });
    }
}