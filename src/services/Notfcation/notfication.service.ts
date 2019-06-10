import { Header } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable()
export class NotficationService{
    constructor( private http:HttpClient,private Header:HttpHeaders)
    {

    }
    PushGeneralNotfiation(title:string,Body:string)
    {
        let body = {
            "notification":{
              "title":title,
              "body":Body,
              "sound":"default",
              "click_action":"FCM_PLUGIN_ACTIVITY",
              "icon":"fcm_push_icon"
            },
              "to":"/topics/all",
              "priority":"high",
              "restricted_package_name":""
          }
          let options = new HttpHeaders().set('Content-Type','application/json');
          this.http.post("https://fcm.googleapis.com/fcm/send",body,{
            headers: options.set('Authorization', 'key=AAAAfpOaUnk:APA91bF4BHLlm5qFRfYcnyr-v4ZyJznr7moEs_sacdBnMHp0PNXSymtBhNpGMkj7kPv2ird68OsxKW1rss4xNEuIaQVVfL3uU5FrlA0kFTAbHbctLBHD8qxgGCmEboLr66J10mZfsk_I'),
          }).subscribe();
    }
    pushNoticationForUser(title:string,Body:string,token)
    {
        let body = {
            "notification":{
              "title":title,
              "body":Body,
              "sound":"default",
              "click_action":"FCM_PLUGIN_ACTIVITY",
              "icon":"fcm_push_icon"
            },
              "to":token,
              "priority":"high",
              "restricted_package_name":""
          }
          let options = new HttpHeaders().set('Content-Type','application/json');
          this.http.post("https://fcm.googleapis.com/fcm/send",body,{
            headers: options.set('Authorization', 'key=AAAAfpOaUnk:APA91bF4BHLlm5qFRfYcnyr-v4ZyJznr7moEs_sacdBnMHp0PNXSymtBhNpGMkj7kPv2ird68OsxKW1rss4xNEuIaQVVfL3uU5FrlA0kFTAbHbctLBHD8qxgGCmEboLr66J10mZfsk_I'),
          }).subscribe();
    }

    
}