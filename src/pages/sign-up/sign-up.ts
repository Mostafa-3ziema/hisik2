import { HomePage } from './../home/home';

import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AUTHService } from '../../services/user/AUTH.service';
import { Device } from '@ionic-native/device';


/**
 * Generated class for the SignUpPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {


  constructor(public alertCtrl: AlertController,private device: Device,public navCtrl: NavController, public navParams: NavParams,private AUTHService:AUTHService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  Register(form:NgForm)
  {
   const body= {
     'FirstName': form.value.FirstName,
     'LastName' : form.value.LastName,
     'UserName' : form.value.UserName,
     'Password' : form.value.Password,
     'Email'    : form.value.Email
     //'DeviceID' : this.device.uuid
    }
    this.AUTHService.register(body).subscribe((res)=>{
      let check=this.AUTHService.store_user(res,true);
        if(check) 
         {
          this.navCtrl.push(HomePage);
         
         } 
        else
         {
          const alert = this.alertCtrl.create({
            title: 'error!',
            subTitle: 'something is wrong! ',
            buttons: ['OK']
          });
          alert.present();
         }
    },(err)=>
    {
      if(err.status == 400)
      {
        const alert = this.alertCtrl.create({
          title: 'error!',
          subTitle: 'user name or email is already exixt!',
          buttons: ['OK']
        });
        alert.present();
      }
    });
    console.log(form.value.text);
  }
 
}
