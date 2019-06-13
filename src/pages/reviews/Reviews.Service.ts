import { HttpHeaders } from '@angular/common/http';
import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import { Ipadress } from '../../services/IPaddress';

@Injectable()
export class MyReviews{
    constructor(private http:Http)
    {
      
    }

    headers = new Headers({'Content-Type':'application/json'});

    GetLikes(reviewid:number)
    {
      let endpoint='http://mostafaaziema.pythonanywhere.com/api/like/?review__id='+reviewid;
      return this.http.get(endpoint,{headers : this.headers})
      .map((response)=> {return response.json();});
    }

    Like(userID:number,reviewid:number)
    {
      const like_data={'review':reviewid,'user':userID} ; 
      let endpoint='http://mostafaaziema.pythonanywhere.com/api/like/';
      return this.http.post(endpoint,like_data,{headers : this.headers})
      .map((response)=>{return response.json();});
    }
    DeleteLike(likeID:number)
    {
       let endpoint='http://mostafaaziema.pythonanywhere.com/api/like/'+likeID+'/';
      return this.http.delete(endpoint,{headers : this.headers})
      .map((response)=>{return response.json();});
    }
    
 get_product_reviews(productid:number){
      const endpoint='http://mostafaaziema.pythonanywhere.com/api/review/?product__id='
    return this.http.get(endpoint+productid,{headers:this.headers})
    .map((response)=> {return response.json();});


  }

  get_reply(reviewid)
  {
   const endpoint ="http://mostafaaziema.pythonanywhere.com/api/replay/?review__id="
   return this.http.get(endpoint+reviewid,{headers:this.headers})
   .map((response)=> {return response.json();});

 
  }
  update_myreviews(review_id,info){
    const endpoint='http://mostafaaziema.pythonanywhere.com/api/review/'
  return this.http.put(endpoint+review_id+'/',info,{headers:this.headers})
  .map((response)=> {return response.json();});

}

 delete_myreviews(review_id){
  const endpoint='http://mostafaaziema.pythonanywhere.com/api/review/'
  return this.http.delete(endpoint+review_id+'/',{headers:this.headers})
  .map((response)=> {return response.json();});


 }

 

}