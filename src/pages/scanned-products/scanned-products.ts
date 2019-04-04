import { ProductPage } from './../product/product';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the ScannedProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scanned-products',
  templateUrl: 'scanned-products.html',
})
export class ScannedProductsPage { 
  title:string="Scannned Product";
  UnreadNotificationNumber:any=1;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScannedProductsPage');
  }


  detail(){
    this.navCtrl.push(ProductPage);
  }
  
}
