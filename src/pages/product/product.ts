import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ReportPage } from '../report/report';
import { LinksPage } from '../links/links';
import { ReviewPage } from '../review/review';
import { ReviewsPage } from '../reviews/reviews';
import { ReplayPage } from '../replay/replay';


/**
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
  }
  AddReport()
  {
    this.navCtrl.push(ReportPage);
  }
  ShowLinks()
  {
    this.navCtrl.push(LinksPage);
  }
  AddToFavourite()
  {
    
  }
  AddReview()
  {
    this.navCtrl.push(ReviewPage);
  }
  ShowReviews()
  {
    this.navCtrl.push(ReviewsPage);
  }
  AddReplay()
  {
    this.navCtrl.push(ReplayPage);
  }

}
