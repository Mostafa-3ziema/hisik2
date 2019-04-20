import { AUTHService } from './../../services/user/AUTH.service';
import { scannedproductServices } from './../../services/user/scannedproduct.services';
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

  user :any;
  ScannedProducts =[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public AUTHService:AUTHService ,  public scannedproductServices:scannedproductServices) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScannedProductsPage');
    //this.user=this.AUTHService.getUser();
    this.userScanned(1);
    
  }


  detail(product){
    this.navCtrl.push(ProductPage,{'products':product});
  }


  userScanned(userid)
{
  this.scannedproductServices.showscannedproduct(userid)
  .subscribe(
    (data:any[])=>
    {
      if(data.length>0)
      {
        this.ScannedProducts=data;
        console.log(this.ScannedProducts);
      }
      else
      {
        this.ScannedProducts=[];
      }
    }
    );

}
  
}
