import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ForgetpasswordPage } from '../forgetpassword/forgetpassword';
import { SignUpPage } from '../sign-up/sign-up';
import { AUTHService } from '../../services/user/AUTH.service';
import { NgForm } from '@angular/forms';

/**
 * Generated class for the LogInPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-log-in',
  templateUrl: 'log-in.html',
})
export class LogInPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private AUTHService:AUTHService) {
  }

  ionViewDidLoad() { 
    console.log('ionViewDidLoad LogInPage');
  }

  forget(){
    this.navCtrl.push(ForgetpasswordPage);
  }

  Create(){
    this.navCtrl.push(SignUpPage);
  }


  login(form:NgForm)
  {
 
    this.AUTHService.login(form.value.Email,form.value.Password).subscribe((data)=>{
      console.log(data);
    });
    console.log(form.value.text);
  }


}
