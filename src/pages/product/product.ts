import { AUTHService } from './../../services/user/AUTH.service';
import { FavouriteService } from './../../services/favourite.service';
import { ProductService } from './../../services/product.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Toast, ToastController } from 'ionic-angular';
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
  user;
  product;
  scanimage='';
  productRate:number;
  productVotes:number;
  procuctStars:number;
  isFavourite:boolean;
  favID:number;
  constructor(public navCtrl: NavController,
    public productService:ProductService,
    public navParams: NavParams,
    public favoriteService:FavouriteService,
    public auth:AUTHService,
    public toastCtrl:ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
    this.product=this.navParams.get('product');
    console.log(this.product)
    this.scanimage=this.navParams.get('scanimage');
    //this.user=this.auth.getUser();
    this.CalculateRate();
    //this.ISFavourite()
  }
  CalculateRate()
  {
    this.productService.CalculateRate(this.product.id).subscribe(
        (data)=>
        {
          if(data)
          {
              let rate5:number=0 ,rate4:number=0 ,rate3:number=0 ,rate2:number=0 ,rate1 :number =0; 
              console.log(data);
              data.forEach(review => {
                  if(review.rate == 5)
                  {
                      rate5=rate5+1;
                  }else if(review.rate == 4)
                  {
                      rate4=rate4+1;
                  }else if(review.rate == 3)
                  {
                      rate3=rate3+1;
                  }else if(review.rate == 2)
                  {
                      rate2=rate2+1;
                  }else if(review.rate == 1)
                  {
                      rate1=rate1+1;
                  }
              });
           this.productRate=((1*rate1)+(2*rate2)+(3*rate3)+(4*rate4)+(5*rate5))/data.length;
           this.productVotes=data.length;
           this.procuctStars=Math.round(this.productRate);
           console.log(this.procuctStars+" "+this.productVotes+" "+this.productRate);
          }else
          {
           this.procuctStars=0;
           this.productRate=0.0;
           this.productVotes=0;
          }
        }
        );
  }
  AddReport()
  {
    this.navCtrl.push(ReportPage);
  }
  ShowLinks()
  {
    this.navCtrl.push(LinksPage);
  }
  ISFavourite()
  {
   this.favoriteService.MyFavourites(this.user.id).subscribe((data)=>
   {
       console.log(data);
       data.forEach(favourite =>
       {
           if(favourite.product == this.product.id)
           {
               this.isFavourite=true;
               this.favID=favourite.id
           }else
           {
               this.isFavourite=false;
           }
       });
   });
  }
  AddToFavourite()
  {
    this.favoriteService.AddToFovourite(this.user.id,this.product.id).subscribe(
      (data)=>
      {
        if(data)
        {
          this.isFavourite=true;
          this.toastCtrl.create({
            message:'the product is added to your favourites list',
            duration:3000
          }).present();
        }
      }
    );
  }
  RemoveFromFavourite()
  {
    this.favoriteService.DeleteFavourite(this.favID).subscribe(
      (data)=>
      {
        if(data)
        {
          this.isFavourite=false;
          this.toastCtrl.create({
            message:'the product is removed from your favourites list',
            duration:3000
          }).present();
        }
      }
    );
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
