import { ProductPage } from './../product/product';
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
      <img *ngIf="isauthinticated" src="{{user?.ImageURL}}">
      <img *ngIf="!isauthinticated" src="../assets/imgs/download.jpg">
    </ion-avatar>
  </ion-item>
  <ion-item class="aa" *ngIf="isauthinticated">
    <h2>{{user?.UserName}}</h2>
    <p>{{user?.Email}}</p>
  </ion-item>
  <ion-item class="aa" *ngIf="!isauthinticated">
    <h2>please, log in or create an acccount</h2>
  </ion-item>
      <br>

      
      <h2>recent scan</h2>

      <br>
      <ion-grid class="g" *ngIf="isauthinticated">
      <ion-row  *ngFor="let Scanned of ScannedProducts; let i= index;"  >
         <ion-col class="c" >
           <ion-card  >
             <ion-item class="r" *ngIf="i<2" *ngIf="Scanned?.product != '' ">
                 <ion-avatar  >
                   <img src="{{Scanned.productDetails?.ImageURL}}" >
                 </ion-avatar>
                 <p >{{Scanned.ProductDetail?.name}}</p>
                 <br>
                 <button class="pp" ion-button clear (click)="detail(Scanned?.ProductDetail)">details</button>
             </ion-item>
           <ion-item *ngIf="Scanned?.product == '' ">
            <p >this scan has no product</p>
           </ion-item>
            <ion-item>
                 <button class="pp" ion-button clear (click)="more()" >show more</button>
            </ion-item>
         </ion-card>
         </ion-col> 
        
       </ion-row>
     </ion-grid>
      <h2 *ngIf="!isauthinticated">please, log in or create an acccount</h2>

     
  `
})
export class ProfilePage {
  Showrecent: any;
  isauthinticated:boolean=false;

  user :any;
  ScannedProducts =[];
  constructor(public navCtrl: NavController,private ProfileService:ProfileService,public AUTHService:AUTHService ,  public scannedproductServices:scannedproductServices) {
    if(this.AUTHService.IsAuthinticated())
    {
      this.Showrecent= this.ProfileService.show_recent_scan();
      this.user=this.AUTHService.getUser();
      this.userScanned(this.user.id);
      this.isauthinticated=true;
    }else
    { 
      this.isauthinticated=false;
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ScannedProductsPage');
    
  }
  detail(product){
    this.navCtrl.push(ProductPage,{'products':product});
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