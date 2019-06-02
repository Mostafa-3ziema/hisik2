
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { Injectable} from '@angular/core';
import 'rxjs/Rx';
import { Observable} from 'rxjs';

const endpoint= 'http://127.0.0.1:8000/api/user/';
@Injectable()
export class ProfileService{
    constructor(private http:HttpClient)
    {
      
    }



    show_recent_scan()
    {
        const headers = new HttpHeaders({'Content-Type':'application/json'});
        return this.http.get(endpoint,{headers:headers})
    }
        
}