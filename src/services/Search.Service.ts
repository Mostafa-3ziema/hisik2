import { HttpClient,HttpHeaders , HttpClientModule  } from '@angular/common/http';

import { Injectable} from '@angular/core';
import 'rxjs/Rx';
import { Observable } from 'rxjs';


const endpoint = 'http://127.0.0.1:8000/api/search/?search=';
@Injectable()
export class SearchService {
    private search:any;
    public data:any[];
    public brand:any;
    public cate:any;
    loading: any;

    constructor(private http:HttpClient){

    }

    RecentSearch(id){
        const headers = new HttpHeaders({'Content-Type':'application/json'});
        return this.http.get(endpoint+id,{headers:headers});
    }

    SearchProduct(text:string){
        let endpoint="http://127.0.0.1:8000/api/product/?name__icontains="+text;
        const headers = new HttpHeaders({'Content-Type':'application/json'});
        return this.http.get(endpoint,{headers:headers});
    }

    SearchBrand(text:string){
        let endpoint="http://127.0.0.1:8000/api/brand/?search="+text;
        const headers = new HttpHeaders({'Content-Type':'application/json'});
        return this.http.get(endpoint,{headers:headers});
    }

    SearchCategory(text:string){
        let endpoint="http://127.0.0.1:8000/api/category/?search="+text;
        const headers = new HttpHeaders({'Content-Type':'application/json'});
        return this.http.get(endpoint,{headers:headers});
    }

    Categoryproduct(text:string){
        let endpoint="http://127.0.0.1:8000/api/product/?Category__Name__icontains="+text;
        const headers = new HttpHeaders({'Content-Type':'application/json'});
        return this.http.get(endpoint,{headers:headers});
    }

    BrandProduct(text:string){
        let endpoint="http://127.0.0.1:8000/api/product/?brand__Name__icontains="+text;
        const headers = new HttpHeaders({'Content-Type':'application/json'});
        return this.http.get(endpoint,{headers:headers});
    }

    
    ShowPopualerSearch(){
        let endpoint4 = 'http://127.0.0.1:8000/api/search/popular/';
        const headers = new HttpHeaders({'Content-Type':'application/json'});
        return this.http.get(endpoint4,{headers:headers});
    }

    ShowRecommandedSearch(id:number){
        let endpoint4 = 'http://127.0.0.1:8000/api/search/recommanded/'+id+'/';
        const headers = new HttpHeaders({'Content-Type':'application/json'});
        return this.http.get(endpoint4,{headers:headers});
    }

    DeleteSearch(id:number){
        let endpoint="http://127.0.0.1:8000/api/search/"+id+"/";
        const headers = new HttpHeaders({'Content-Type':'application/json'});
        return this.http.delete(endpoint,{headers:headers});
    }

    PostSearch(info){
        let endpoint="http://127.0.0.1:8000/api/search/";
        const headers = new HttpHeaders({'Content-Type':'application/json'});
        return this.http.post(endpoint,info,{headers:headers});
    }

    UpdatSearch(info,id){
        let endpoint="http://127.0.0.1:8000/api/search/"+id+"/";
        const headers = new HttpHeaders({'Content-Type':'application/json'});
        return this.http.put(endpoint,info,{headers:headers});
    }

}