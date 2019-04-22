import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams , AlertController } from 'ionic-angular';
import { SearchResualtPage } from '../search-resualt/search-resualt';
import { SearchService } from '../../services/Search.Service';
import { ProductPage } from '../product/product';
import { AUTHService } from '../../services/user/AUTH.service';
import { FavouriteService } from '../../services/favourite.service';
import { ProductService } from '../../services/product.service';
import { SignUpPage } from '../sign-up/sign-up';
import { LogInPage } from '../log-in/log-in';


@IonicPage()
@Component({
  selector: 'page-search-text',
  templateUrl: 'search-text.html',
})
export class SearchTextPage {
  myInput:string;
  searchText:string='';
  products:any=[];
  Branditem;
  categoryitem;
  userSearch:any;
  items:any[];
  finalResult:any=[];
  productRate:number=0;
  productVotes:number=0;
  procuctStars:number=0;
  user;
  constructor(public navCtrl: NavController
    ,public SearchService:SearchService
    ,public FavouriteService:FavouriteService
    ,public productService:ProductService
    ,public auth:AUTHService,
    public alertController:AlertController) {
   /* this.showproduct('fff');
    this.showBrand('rolex');
    this.showCategory('watches');*/
    this.user=this.auth.getUser();
    this.initializeItems();
  }


  showproduct(text){
    this.SearchService.SearchProduct(text).subscribe(
      (data:any)=>{
        console.log(data);
        this.products = data;
        this.CalculateRate();
      }
    );
  }

  showBrand(text){
    this.SearchService.SearchBrand(text).subscribe(
      (data:any)=>{
        console.log(data);
        this.Branditem = data;
      }
    );
  }

  showCategory(text){
    this.SearchService.SearchCategory(text).subscribe(
      (data)=>{
        console.log(data);
        this.categoryitem = data;
      }
    );
  }

  search(text:string) {
    this.initializeItems();
    this.searchText=text;
    if(text)
    {
      if(this.auth.IsAuthinticated())
      {
        let info = {
          'text':text, 
          'user':this.user.id,
          'product':null,
         };
         console.log(info);
        this.SearchService.PostSearch(info).subscribe((data)=>{
          console.log("success");
          this.userSearch=data;
          this.showproduct(text);
          this.showBrand(text);
          this.showCategory(text);
        },err=>
        console.log(err));
      }else
      {
          this.showproduct(text);
          this.showBrand(text);
          this.showCategory(text);
      }
      
    }else{
      console.log('no text entered')
        const alert = this.alertController.create({
        title: "Warning",
        message: "No Search Text Entered",
        buttons: ['OK']
      });
      alert.present();
    }
  
  }
  CalculateRate()
  {
   this.products.forEach(product=>
    { 
      let fav:boolean=false;
      if(this.auth.IsAuthinticated())
      {
        this.FavouriteService.MyFavourites(this.user.id).subscribe((data)=>{
          data.forEach(favourite =>
            {
                if(favourite.product == product.id)
                {
                   fav=true;
                }else
                {
                   fav=false;
                }
            });
          }
        );
       }
       this.productService.CalculateRate(product.id).subscribe(
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
           this.finalResult.push({'product':product,'rate':this.productRate,'stars':this.procuctStars,'fav':fav});
          }else
          {
           this.procuctStars=0;
           this.productRate=0.0;
           this.productVotes=0;
          }
        }
        );
    });
  }

  SearchResualt(page:string,textSearch:string,search){
    this.navCtrl.push(SearchResualtPage , {'page':page,'textSearch':textSearch,'search':search});
  }

  SearchResualt3(product){
    let isauthinticated=this.auth.IsAuthinticated();
    if(isauthinticated)
    {
     let info = {
      'text':this.userSearch.text, 
      'user':this.user.id,
      'product':product.id,
     };
      console.log(info);
      this.SearchService.UpdatSearch(info,this.userSearch.id).subscribe((data)=>{
      this.navCtrl.push(ProductPage,{'product':product});
    });
   }else
   {
     this.showAlert()
   }
  }
  initializeItems(){
      this.items = [
        'ffff'
       // this.productitem,
       // this.Branditem,
       // this.categoryitem
      ];
  }

  FindName(text){

    this.initializeItems();

      // set val to the value of the ev target
      var val = text.target.value;
  
      // if the value is an empty string don't filter the items
      if (val && val.trim() != '') {
        this.items = this.items.filter((item) => {
          return (item.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      }

  }
  showAlert() {
    const alert = this.alertController.create({
      title: 'Warning',
      subTitle: 'you must be logged in',
      buttons: [
        {
          text: 'make an account!',
          handler: () => {
            this.navCtrl.push(SignUpPage)
          }
        },
        {
          text: 'LogIin!',
          handler: () => {
            this.navCtrl.push(LogInPage)
          }
        },
        {
          text: 'Cancel',
        }
      ]
    });
    alert.present();
  }

}
