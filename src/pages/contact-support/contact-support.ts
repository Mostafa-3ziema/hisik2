import { MessagePage } from './../message/message';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-contact-support',
  templateUrl: 'contact-support.html',
})

export class ContactSupportPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactSupportPage');
  }

  openMessage()
  {
    this.navCtrl.push(MessagePage);
  }
}
