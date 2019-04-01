import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-search-resualt',
  templateUrl: 'search-resualt.html',
})
export class SearchResualtPage implements OnInit {
  q:string;
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

ngOnInit(){
  this.q=this.navParams.get('search');
}

}
