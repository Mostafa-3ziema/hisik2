import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { MassageService } from '../../services/messages.service';
import { ReportService } from '../../services/Report.Service';
import { AUTHService } from '../../services/user/AUTH.service';

@IonicPage()
@Component({
  selector: 'page-report',
  templateUrl: 'report.html'
})
export class ReportPage {
  user;
  constructor(public navCtrl: NavController, public navParams: NavParams
    ,private ReportService:ReportService,public auth:AUTHService) {
      this.user=this.auth.getUser();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportPage');
  }

  SendReport(form:NgForm)
  {
   const body= {
      'text' : form.value.text,
      'user' : this.user
    } 
    this.ReportService.SendReport(body).subscribe((data)=>{
      console.log(data);
    });
    console.log(form.value.text);
  } 

}