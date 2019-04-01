import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { EditReviewsPage } from '../edit-reviews/edit-reviews';

/**
 * Generated class for the ReviewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-reviews',
  templateUrl: 'my-reviews.html',
})
export class MyReviewsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyReviewsPage');
  }

  back(){
    this.navCtrl.push(HomePage);
  }
  edit(){
    this.navCtrl.push(EditReviewsPage);
  }
}
