import { HttpClient,HttpHeaders } from '@angular/common/http';

import { Injectable} from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

const endpoint = 'http://127.0.0.1:8000/api/message/';
@Injectable()
export class MassageService {
    constructor(private http:HttpClient){

    }

    SendMassage(massage){
        const headers = new HttpHeaders({'Content-Type':'application/json'});
        return this.http.post(endpoint,massage,{headers:headers});
    }


}
