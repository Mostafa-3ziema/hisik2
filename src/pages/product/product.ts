import { LikesPage } from './../likes/likes';
import { AUTHService } from './../../services/user/AUTH.service';
import { FavouriteService } from './../../services/favourite.service';
import { ProductService } from './../../services/product.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Toast, ToastController, ModalController } from 'ionic-angular';
import { ReportPage } from '../report/report';
import { LinksPage } from '../links/links';
import { ReviewPage } from '../review/review';
import { ReviewsPage } from '../reviews/reviews';
import { ReplayPage } from '../replay/replay';
import { MyReviews } from '../reviews/Reviews.Service';


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
  proEvalute={
    productRate:null,
    productVotes:null,
    procuctStars:null,
    favorite:null
  };

///reviews
  review=1;
  Reviews:any=[];
  ReviewsLikeResult=[];
  ReviewsReplayResult=[];
  likeID:number=null;
  islike:Boolean=false;
  ReplayCount=0;
  likecount=0;
  constructor(public navCtrl: NavController,
    public productService:ProductService,
    public navParams: NavParams,
    public favoriteService:FavouriteService,
    public auth:AUTHService,
    public toastCtrl:ToastController,public modalCtrl: ModalController, 
    private MyReviews:MyReviews) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductPage');
    this.product=this.navParams.get('product');
    console.log(this.product)
    this.scanimage=this.navParams.get('scanimage');
    this.user=this.auth.getUser();
    this.CalculateRate();
    this.ISFavourite();
    this.proEvalute.procuctStars=this.procuctStars;
    this.proEvalute.productRate=this.productRate;
    this.proEvalute.productVotes=this.productVotes;
    this.proEvalute.favorite=this.ISFavourite;
    this.product_Reviews();
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
    this.navCtrl.push(ReportPage,{'product':this.product});
  }
  ShowLinks()
  {
    this.navCtrl.push(LinksPage,{'product':this.product.name});
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
               console.log(this.isFavourite);
               this.favID=favourite.id
           }else
           {
               this.isFavourite=false;
               console.log(this.isFavourite);
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
/////////////////////////////////////////////////////////////////////////////////////////////////////
AddReview()
  {
    let reviewModal = this.modalCtrl.create(ReviewPage, {'productid':this.product.id});
    reviewModal.onDidDismiss(data => {
     if(data)
     {
      this.ReviewsLikeResult.push({'review':data,'likeid':null,
      'islike':false,'likecount':0});  
      this.ReviewsReplayResult.push({'review':data,'replayCount':0});
     } 
    });
    reviewModal.present();
  }
  ShowReviews()
  {
    this.navCtrl.push(ReviewsPage,{'productid':this.product.id});
  }
  AddReplay(reviewId)
  {
    this.navCtrl.push(ReplayPage,{'reviewid':reviewId});
  }

  product_Reviews()
  {
    this.MyReviews.get_product_reviews(this.product.id).subscribe((data:any[])=>
    {
      data.forEach(review=>
        {
          //console.log(data);
          this.Reviews.push(review);
        });
        console.log(this.Reviews);
        this.IsLiked();
        this.ReplayCounts();
    },(err)=>{

      console.log(err);
    })
  }
  IsLiked()
  {
    this.Reviews.forEach(review=>
      { 
        console.log(review);
        this.MyReviews.GetLikes(review.id).subscribe(
        (data)=>
        {
         if(data)
         {
            this.likecount=data.length;
            console.log(data);
            data.forEach((like)=>
            {
              if(like.user==this.user.id)
              {
                this.islike=true;
                this.likeID=like.id
              }else
              {
                this.islike=false;
              }
            });
         }else
         {
           console.log(data);
           this.likecount=data.length;
           this.islike=false;
         }
         this.ReviewsLikeResult.push({'review':review,'likeid':this.likeID,'islike':this.islike,'likecount':this.likecount});  
         this.islike=false;
         this.likecount=0;
         this.ReplayCount=0;
        });
      });
      console.log(this.ReviewsLikeResult);
  }
  ReplayCounts()
  {
    this.Reviews.forEach(review=>
      {  
       this.MyReviews.get_reply(review.id).subscribe(
       (data)=>
       {
        if(data)
        {
          this.ReplayCount=data.length;
        }else
        {
         this.ReplayCount=0;
        }
        this.ReviewsReplayResult.push({'review':review,'replayCount':this.ReplayCount})
      }); 
    });
    console.log(this.ReviewsReplayResult);
  }
  Like(reviewindex:number,reivewID:number){
    console.log(reivewID);
    console.log(reviewindex);
    this.ReviewsLikeResult[reviewindex].islike=true;
    this.ReviewsLikeResult[reviewindex].likecount+=1;
    this.MyReviews.Like(this.user.id,reivewID).subscribe((data)=>{

      if(data){
        this.ReviewsLikeResult[reviewindex].likeid=data.id;
        this.toastCtrl.create({
          message:'you liked this review',
          duration:3000
        }).present();
      }else
      {
        this.ReviewsLikeResult[reviewindex].islike=false;
        this.ReviewsLikeResult[reviewindex].likecount-=1;
      }
    },err=>
    {
      this.ReviewsLikeResult[reviewindex].islike=false;
      this.ReviewsLikeResult[reviewindex].likecount-=1;
    });
  }

  dislike(reviewindex:number,likeID:number){
    console.log(likeID);
    console.log(reviewindex);
    this.MyReviews.DeleteLike(likeID).subscribe((data)=>{

        this.ReviewsLikeResult[reviewindex].islike=false;
        this.ReviewsLikeResult[reviewindex].likecount-=1;
        this.toastCtrl.create({
          message:'you disliked this review',
          duration:3000
        }).present();
      
    });

  }
  showlikes(reviewid:number)
  {
   let likesModal = this.modalCtrl.create(LikesPage, {'reviewid':reviewid});
   likesModal.onDidDismiss(data => {
    console.log('likespage close')
   });
   likesModal.present();
  }
}
