import { ScannedProductsPage } from './../scanned-products/scanned-products';
import { ProfileService } from '../../services/user/profile.service';
import { Component } from '@angular/core';
import { NavController,  } from 'ionic-angular';
import { AUTHService } from './../../services/user/AUTH.service';
import { scannedproductServices } from './../../services/user/scannedproduct.services';


@Component({
  selector: 'page-profile',
  template:
  `
  <ion-card>
    
  <ion-item class="a">
    <ion-avatar item-start >
      <img src="{{user?.ImageURL}}">
    </ion-avatar>
  </ion-item>
  <ion-item class="aa">
    <h2>{{user?.UserName}}</h2>
    <p>{{user?.Email}}</p>
  </ion-item>
      <br>

      
      <h2>recent scan</h2>

      <br>
      
      <ion-grid class="g">
         <ion-row  *ngFor="let Scanned of ScannedProducts" >
            <ion-col class="c" >
              <ion-card  >
            
                <ion-item class="r">
                    <ion-avatar  >
                    <img src="{{Scanned.productDetails?.ImageURL}}">
                      </ion-avatar>
                </ion-item>
                <ion-item >
                    <p class="p" >{{Scanned.ProductDetail?.name}}</p> 
                    <br>
                    <button class="pp" ion-button clear (click)="more()" >show more</button>
              </ion-item>
            </ion-card>
            </ion-col> 
           
          </ion-row>
        </ion-grid>
  `
})
export class ProfilePage {
  Showrecent: any;


  user :any;
  ScannedProducts =[];
  constructor(public navCtrl: NavController,private ProfileService:ProfileService,public AUTHService:AUTHService ,  public scannedproductServices:scannedproductServices) {

    // this.Showrecent= this.ProfileService.show_recent_scan();
    // this.user=this.AUTHService.getUser();
    // this.userScanned(this.user.id);

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ScannedProductsPage');
    
  }

  more(){
    this.navCtrl.push(ScannedProductsPage);
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