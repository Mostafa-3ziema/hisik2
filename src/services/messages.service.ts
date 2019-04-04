
import { HttpClient,HttpHeaders } from '@angular/common/http';

import { Injectable} from '@angular/core';
import 'rxjs/Rx';
import { Observable} from 'rxjs';

const endpoint= 'http://127.0.0.1:8000/api/message/';
@Injectable()
export class MessageService{
    constructor(private http:HttpClient)
    {
      
    }

    SaveMessage(message)
    {
        const headers = new HttpHeaders({'Content-Type':'application/json'});
        return this.http.post(endpoint,message,{headers:headers})
    }

    getMessages()
    {
        const headers = new HttpHeaders({'Content-Type':'application/json'});
        return this.http.get(endpoint,{headers:headers})
    }
        
}