import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Loading } from 'ionic-angular';
@Injectable()
export class LinksService 
{
  headers = new Headers({'Content-Type':'application/json'});
  constructor(public http:Http)
  {

  }

  getShoppingLinks(product:string)
  {
    let endpoint = "http://127.0.0.1:8000/api/product/links/"+product+"/"  
    return this.http.get(endpoint,{headers : this.headers})
    .map((response)=> {return response.json();});
  }
  getShoppingPlaces(latitude:number,Langitude:number,product:string)
  {
    let endpoint = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+Langitude+","+latitude+"&radius=5000&keyword="+product+"&key=AIzaSyCbhWzvIoqHmBSEC6RQtsG-xmLDuI19ViM"   
    return this.http.get(endpoint,{headers : this.headers})
      .map((response)=> {return response.json();});
  }

}