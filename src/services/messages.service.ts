import { HttpClient,HttpHeaders } from '@angular/common/http';

import { Injectable} from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs';

const endpoint = '';
@Injectable()
export class MassageService {
    constructor(private http:HttpClient){

    }

    SendMassage(massage){
        const headers = new HttpHeaders({'Contant-Type':'application/json'});
        return this.http.post(endpoint,massage,{headers:headers});
    }

    RetriveMassage(){
        const headers = new HttpHeaders({'Contant-Type':'application/json'});
        return this.http.get(endpoint,{headers:headers});
    }

}
