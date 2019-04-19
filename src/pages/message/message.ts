import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MessageService } from '../../services/messages.service';
import { NgForm } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-message',
  templateUrl: 'message.html',
})
export class MessagePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private messageService:MessageService) {
  }
   messageList :any;
  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagePage');
    this.messageList= this.messageService.getMessages();
  }
  sendMessage(form:NgForm)
  {
   const body= {
      'text' : form.value.text,
      'user' : 1
    } 
    this.messageService.SaveMessage(body).subscribe((data)=>{
      console.log(data);
    });
    console.log(form.value.text);
  } 

}
