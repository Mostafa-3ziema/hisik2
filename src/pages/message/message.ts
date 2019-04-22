import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MassageService } from '../../services/messages.service';
import { NgForm } from '@angular/forms';
import { AUTHService } from '../../services/user/AUTH.service';

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {
  user;
  constructor(public navCtrl: NavController, public navParams: NavParams,private messageService:MassageService
    ,public auth:AUTHService) {
      this.user=this.auth.getUser();
  }
   messageList :any;
  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagePage');
    this.messageList= this.messageService.RetriveMassage();
  }
  sendMessage(form:NgForm)
  {
   const body= {
      'text' : form.value.text,
      'user' : this.user
    } 
    this.messageService.SendMassage(body).subscribe((data)=>{
      console.log(data);
    });
    console.log(form.value.text);
  } 

}
