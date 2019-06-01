import { HttpHeaders } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'

@Injectable()
export class ScanService
{
    headers = new Headers({'Content-Type':'application/json'});
    constructor(public http:Http)
    {
    }
    getRecentScan(userid:number)
    {
      let endpoint='http://127.0.0.1:8000/api/scan/?search='+userid;
      return this.http.get(endpoint,{headers : this.headers})
      .map((response)=> {return response.json();});
    }
    AddScan(Scan:any)
    {
      let endpoint='http://127.0.0.1:8000/api/scan/';
      return this.http.post(endpoint,Scan,{headers : this.headers})
      .map((response)=>{return response.json();});
    }
    UpdateScan(scanid:number,Scan:any)
    {
      let endpoint='http://127.0.0.1:8000/api/scan/'+scanid+'/';
      return this.http.post(endpoint,Scan,{headers : this.headers})
      .map((response)=>{return response.json();});
    }
    DeleteUserScan(scanID:number)
    {
       let endpoint='http://127.0.0.1:8000/api/scan/'+scanID+'/';
      return this.http.delete(endpoint,{headers : this.headers})
      .map((response)=>{return response.json();});
    }
}