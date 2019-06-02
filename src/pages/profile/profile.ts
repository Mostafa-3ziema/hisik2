import { ProductPage } from './../product/product';
import { ScannedProductsPage } from './../scanned-products/scanned-products';
import { ProfileService } from '../../services/user/profile.service';
import { Component } from '@angular/core';
import { NavController,  } from 'ionic-angular';
import { AUTHService } from './../../services/user/AUTH.service';
import { scannedproductServices } from './../../services/user/scannedproduct.services';
import { ScanService } from '../../services/scan.Service';


@Component({
  selector: 'page-profile',
  template:
  `
  <ion-card class="card">
    
  <ion-item class="sora">
    <ion-avatar item-start >
      <img *ngIf="isauthinticated" src="{{user?.ImageURL}}">
      <img *ngIf="!isauthinticated" src="../assets/imgs/download.jpg">
    </ion-avatar>
  </ion-item>
  <ion-item class="details" *ngIf="isauthinticated">
    <h2 class="details">{{user?.UserName}}</h2>
    <p  class="details">{{user?.Email}}</p>
  </ion-item>
  <ion-item  *ngIf="!isauthinticated">
  <h2 class="hint" >please, log in </h2>
  <h2 class="hint" > or create an acccount</h2>
  </ion-item>

  </ion-card>

      <br>

      <h3>recent scan</h3>
      

      <br>
     
      <ion-grid class="g" *ngIf="isauthinticated">
      <div *ngFor="let Scanned of ScannedProducts; let i = index">
       <div *ngIf="i<=1">
       <ion-row>
         <ion-col class="c" >
           <ion-card>
             <ion-item class="r"  *ngIf="Scanned?.product != ''">
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
           </ion-card>
         </ion-col> 
        </ion-row>
       </div>
      </div>
     </ion-grid>
     <ion-item  *ngIf=" (isauthinticated) && (ScannedProducts?.length >0)" > 
            <button class="pp" ion-button clear (click)="more()" >show more</button>
     </ion-item>
    <h2 *ngIf="!isauthinticated">please, log in or create an acccount</h2>
  `
})
export class ProfilePage {
  isauthinticated:boolean=false;
  user :any;
  ScannedProducts:any[] =[];
  constructor(public navCtrl: NavController,public AUTHService:AUTHService ,public scannedproductServices:ScanService) {
    if(this.AUTHService.IsAuthinticated())
    {
      this.user=this.AUTHService.getUser();
      this.userScanned(this.user.id);
      this.isauthinticated=true;
    }else
    { 
      this.isauthinticated=false;
    }
  }
 ionViewDidLoad() 
  {
    console.log('ionViewDidLoad ScannedProductsPage');
    
  }
 detail(product)
  {
    this.navCtrl.push(ProductPage,{'products':product});
  }
 more()
  {
    this.navCtrl.push(ScannedProductsPage);
  }

 userScanned(userid)
 {
  this.scannedproductServices.getRecentScan(userid)
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