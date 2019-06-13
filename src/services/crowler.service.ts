import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ipadress } from './IPaddress';
@Injectable()
export class LinksService 
{
  
  headers = new HttpHeaders({'Content-Type':'application/json'});
  constructor(public http:HttpClient)
  {

  }

  getShoppingLinks(product:string)
  {
    let endpoint = "http://mostafaaziema.pythonanywhere.com/api/product/links/"+product+"/"  
    return this.http.get(endpoint,{headers : this.headers})
  }
  getShoppingPlaces(latitude:number,Langitude:number,product:string)
  {
    let endpoint = "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location="+Langitude+","+latitude+"&radius=5000&keyword="+product+"&key=AIzaSyCbhWzvIoqHmBSEC6RQtsG-xmLDuI19ViM"   
    return this.http.get(endpoint,{headers : this.headers})
  }

}