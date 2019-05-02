import { AUTHService } from './../../services/user/AUTH.service';
import { ReplayPage } from './../replay/replay';
import { Chart } from 'chart.js';
import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import {MyReviews} from'../reviews/Reviews.Service';




/**
 * Generated class for the ReviewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reviews',
  templateUrl: 'reviews.html',
})

export class ReviewsPage {
  user;
  productid;
  Reviews:any=[];
  ReviewsLikeResult=[];
  ReviewsReplayResult=[];
  likeID:number=null;
  islike:Boolean=false;
  ReplayCount=0;
  likecount=0;

  
  @ViewChild('chartCanvas') chartCanvas;
  chartVar: any;  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    private MyReviews:MyReviews
    ,public toastCtrl:ToastController
    ,public auth:AUTHService
    ) {
  }
  ngAfterViewInit() {
    this.showChart();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewsPage');
    this.productid=this.navParams.get('productid');
    this.product_Reviews();
    this.user=this.auth.getUser();
  }
  showChart() {
    this.chartVar = new Chart(this.chartCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [10, 4, 8 , 20 , 5 ],
          backgroundColor: [
            'rgb(217, 15, 36)',
            'rgb(234, 174, 28)',
            'rgb(220, 121, 25)',
            'rgb(219, 73, 30)',
            'rgb(219, 24, 22)',

          ]
        }],
        labels: [
          '5',
          '4',
          '3',
          '2',
          '1',
        ]
 
      },
 
      options: {
        legend: {
          display: false
        },
        tooltips: {
          enabled: true
        }
      }
 
    })
  }
  product_Reviews()
  {
    this.MyReviews.get_product_reviews(this.productid).subscribe((data:any[])=>
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
  AddReplay(reviewId)
  {
    this.navCtrl.push(ReplayPage,{'reviewid':reviewId});
  }
}

  






  

  






