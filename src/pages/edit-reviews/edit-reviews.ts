import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
//import { ReviewsPage } from '../reviews/reviews';

/**
 * Generated class for the EditReviewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-reviews',
  templateUrl: 'edit-reviews.html',
})
export class EditReviewsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditReviewsPage');
  }

  back(){
    this.navCtrl.pop();
  }

}
