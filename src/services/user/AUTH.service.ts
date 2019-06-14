import { Device } from '@ionic-native/device';

import { HttpClient,HttpHeaders } from '@angular/common/http';

import { Injectable} from '@angular/core';
import 'rxjs/Rx';
import { Observable} from 'rxjs';
import { stringify } from '@angular/core/src/render3/util';
import { AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { global } from '@angular/core/src/util';
import { EmailComposer } from '@ionic-native/email-composer';
import { Ipadress } from '../IPaddress';
const endpoint= 'http://mostafaaziema.pythonanywhere.com/api/user/';
const endpoint2='http://mostafaaziema.pythonanywhere.com/api/user/?';
@Injectable()
export class AUTHService{
   Login:Boolean=false;
   checkUser:Boolean=false;
   user:any=
   {
    "id": 4,
    "FirstName": "Mohamed",
    "LastName": "Mahfouz",
    "UserName": "Mohamed12",
    "Password": "Walid@22",
    "Email": "walid.mahfouz22@gmail.com",
    "DeviceID": "84d84ece72865e5e",
    "FCMToken": "",
    "Status": null,
    "ImageURL": null,
    "WarningScore": null,
    "updated": "2019-06-14T11:02:03.630651Z",
    "timestamp": "2019-06-14T11:02:03.636381Z",
    "BlockedBy": null
   };
   
    constructor(private http:HttpClient ,
       private emailComposer: EmailComposer,
       public alertCtrl: AlertController , 
       private device: Device,
       private storage: Storage)
    {
      
    }
    register(message)
    {
        const headers = new HttpHeaders({'Content-Type':'application/json'});
        return this.http.post(endpoint,message,{headers:headers})
    }
    updateUser(userid,user)
    {
        const headers = new HttpHeaders({'Content-Type':'application/json'});
        return this.http.put(endpoint+userid+"/",user,{headers:headers})
    }    

    forgetpassword(email)
    {
        const headers = new HttpHeaders({'Content-Type':'application/json'});
        this.http.get(endpoint+"?Email="+email,{headers:headers}).subscribe((data:any[])=>
        {
           if(data.length>0)
           {
            console.log(data); 
            let userID= data[0]['id'];
            data[0]['Password']=Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
            let body= {
              'FirstName'     : data[0].FirstName,
              'LastName'      : data[0].LastName,
              'UserName'      : data[0].UserName,
              'Password'      : data[0].Password,
              'Email'         : data[0].Email,
              'DeviceID'      : this.device.uuid,
              'Status'        : false,
              'ImageURL'      : "",
              'WarningScore'  : 0,
              'BlockedBy'     : "",
             }
            if(data[0]['Status'])
            {
              body.Status=data[0]['Status'];
            }else
            {
              body.Status=false;
            }

            if(data[0]['ImageURL'])
            {
              body.Status=data[0]['ImageURL'];
            }else
            {
              body.ImageURL="";
            }

            if(data[0]['WarningScore'])
            {
              body.WarningScore=data[0]['WarningScore'];
            }else
            {
              body.WarningScore=0;
            }

            if(data[0]['BlockedBy'])
            {
              body.Status=data[0]['BlockedBy'];
            }else
            {
              body.BlockedBy="";
            }
            
             console.log(body);
            this.http.put(endpoint+userID+'/',body,{headers:headers}).subscribe((data)=>
            {
                this.emailComposer.isAvailable().then((available: boolean) =>{
                    if(available) {
                        let emailContent = {
                            to: email,
                            subject: 'Hisik Updated your Password',
                            body: 'the new password is :'+data[0]['Password'],
                            isHtml: true,
                            app:'Gmail'
                          };
                        this.emailComposer.open(emailContent);  
                    }
                    
                   }); 
                   console.log(data);
              this.store_user(data,true);
              const alert = this.alertCtrl.create({
                title: 'hint!',
                subTitle: 'password was updated and sent to this eamil:'+ email,
                buttons: ['OK']
              });
              alert.present();
            },(err)=>{console.log(err)})
           }else
           {
            const alert = this.alertCtrl.create({
                title: 'Warning!',
                subTitle: 'this email :'+email+' not exist plaese write the email you signUp with!',
                buttons: ['OK']
              });
              alert.present();    
           } 
        },(err)=>{});
    }

    login(email:string,password:string)
    { 
        const headers = new HttpHeaders({'Content-Type':'application/json'});
        return this.http.get(endpoint2+"Email="+email+"&Password="+password,{headers:headers})
    }

    store_user(user,loginvalue)
    {
         this.user=user;
         return true;  
        /*this.storage.set('login',loginvalue)
        .then(()=>
          {
           this.Login=true
          this.storage.set('user',user)
          .then(()=>
          { 
            this.checkUser=true;
            console.log(this.login,this.checkUser);
            return true;
          })
          .catch((err)=>{
            this.checkUser=false
           console.log("first condition",this.Login,this.checkUser);
           return false;
        });
         }).catch((err)=>
         {
           this.Login=false;
           console.log("first condition",this.Login,this.checkUser);
           return false;
          });
        
        if (this.Login==true && this.checkUser == true)
        {
          console.log(this.Login,this.checkUser);
           return true;
           
        }
        else
        {
          console.log("else condition",this.Login,this.checkUser);
           return false; 
           
        }*/
    }

    getUser()
    {
      /*let user;
      this.storage.get('user').then((val:any) => {
          user = val;  
        });
        console.log(user);*/
      return this.user;
    }

    IsAuthinticated()
    {
      /*let isauth :boolean =false;
      this.storage.get('login')
      .then((val)=>
      {
        if (val==true )
        {
           isauth= true; 
        }
        else
        {
          isauth= false; 
        }

      }
      ).catch(()=>{
        isauth= false;
        const alert = this.alertCtrl.create({
          title: 'Warning!',
          subTitle: ' user is authinticated!',
          buttons: ['OK']
        });
        alert.present(); });*/
      
      return true;
    }

    logout()
    {
       /*let login,checkUser; 
       this.storage.set('login',false).then(()=>login=true).catch((err)=>login=false);
       this.storage.set('user','').then(()=>checkUser=true).catch((err)=>checkUser=false);
       if (login==true && checkUser == true)
        {
           return true; 
        }
        else
        {
           return false; 
        }*/
        return true;
    }
}