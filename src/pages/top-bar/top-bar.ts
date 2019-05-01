import { Component, Input } from '@angular/core';
import { IonicPage, NavController, NavParams, PopoverController } from 'ionic-angular';
import { FaqHelpPage } from './../faq-help/faq-help';
import { SettingPage } from './../setting/setting';
import { OptionsPage } from './../options/options';
import { ContactSupportPage } from '../contact-support/contact-support';

/**
 * Generated class for the TopBarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-top-bar',
  template:
  `
<ion-navbar> 
<ion-title>
  {{title}}
</ion-title>
<ion-buttons right>
<button ion-button icon-only large id="notification" (click)="OpenNotification()">
  <ion-icon color="primary" name="notifications"   isActive="true"></ion-icon>
  <ion-badge color="accent" *ngIf="UnreadNotificationNumber>0 || UnreadNotificationNumber=='99+' " id="Notifcationbadge"><p>{{UnreadNotificationNumber}}</p></ion-badge>  
</button>
<button ion-button icon-only large (click)="OpenMore($event)">
  <ion-icon name="more" ></ion-icon>
</button>
</ion-buttons>
<ion-buttons left>
<button ion-button icon-only color="royal" menuToggle>
  <ion-icon name="md-menu"></ion-icon>
</button>
</ion-buttons>
</ion-navbar>
  `,
  inputs:['Pagetitle','Noifictaion']
})
export class TopBarPage {
  @Input('Pagetitle') title:string
  @Input('Noifictaion') UnreadNotificationNumber:any
  constructor(public navCtrl: NavController,public options:PopoverController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TopBarPage');
  }
  OpenNotification()
  {
   this.navCtrl.push("NotificationPage");
   this.UnreadNotificationNumber=0;
  }
  OpenMore(myevent:MouseEvent)
  {
   const more =this.options.create(OptionsPage);
   more.present({ev : myevent});
   more.onDidDismiss(
     (option:number)=>
       {
         switch (option) {
          case 1:
             this.navCtrl.push(SettingPage,{'product':"rolex"});
             break;
          case 2:
             this.navCtrl.push(FaqHelpPage);
             break;
          case 3:
             this.navCtrl.push(ContactSupportPage);
             break;
          default:
             break;
         }
       }
   );
  }


}
