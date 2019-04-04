
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { Injectable} from '@angular/core';
import 'rxjs/Rx';
import { Observable} from 'rxjs';

const endpoint= 'http://127.0.0.1:8000/api/user/';
const endpoint2= 'http://127.0.0.1:8000/api/user/?';
@Injectable()
export class AUTHService{
    constructor(private http:HttpClient)
    {
      
    }
    register(message)
    {
        const headers = new HttpHeaders({'Content-Type':'application/json'});
        return this.http.post(endpoint,message,{headers:headers})
    }
        

    login(email:string,password:string)
    {
        const headers = new HttpHeaders({'Content-Type':'application/json'});
        return this.http.get(endpoint2+"Email="+email+"&Password="+password,{headers:headers})
    }
}