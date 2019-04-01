import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RecommandedResualtPage } from '../recommanded-resualt/recommanded-resualt';

@IonicPage()
@Component({
  selector: 'page-recommanded',
  templateUrl: 'recommanded.html',
})
export class RecommandedPage {
  tshirt = 'T-shirt'
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RecommandedPage');
  }

  RecReslt(q:string){
    this.navCtrl.push(RecommandedResualtPage,{search:q});
  }

}
