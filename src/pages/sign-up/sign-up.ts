
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AUTHService } from '../../services/user/AUTH.service';


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


  constructor(public navCtrl: NavController, public navParams: NavParams,private AUTHService:AUTHService) {
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
     'Email'    : form.value.Email,
     'IP'       : '127.0.5.1',
    }
    this.AUTHService.register(body).subscribe((data)=>{
      console.log(data);
    });
    console.log(form.value.text);
  }
 
}
