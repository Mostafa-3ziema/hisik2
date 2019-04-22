import { Component } from '@angular/core';
import { NavController, NavPush, NavParams, LoadingController , AlertController, List ,IonicPage } from 'ionic-angular';
import { SearchTextPage } from '../search-text/search-text';
import { RecommandedPage } from '../recommanded/recommanded';
import { RecentSearchPage } from '../recent-search/recent-search';
import { SearchService } from '../../services/Search.Service';
import { CommonModule } from '@angular/common';
import { AUTHService } from '../../services/user/AUTH.service';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  loading: any;
  ListItemSearch:any[];
  search: any;
  popualerSearchList:any;
  recentsearch:any;
  popualeritem:any[];
  recommandeditem:any[];
  user;
  isauthinticated:boolean;


  constructor(public navCtrl: NavController, public navParams: NavParams,
     public loadingCtrl: LoadingController, public alertController:AlertController,
     public auth:AUTHService,
     public SearchService:SearchService) 
     {
       /*this.user=this.auth.getUser();
       this.RecentSearch(this.user.id);*/
       //this.isauthinticated=this.auth.IsAuthinticated();
       this.isauthinticated=true;
       this.user=1;
     }

  searchbar(){
    this.navCtrl.push(SearchTextPage);
  }

  Recommended(){
    this.navCtrl.push(RecommandedPage);
  }

  ShowRecommanded(user){
    this.SearchService.ShowRecommandedSearch(user).subscribe(
      (data:any[])=>{
        console.log(data);
        this.recommandeditem = data ;
      }
    );
  }

  PopualerSearch(){
    this.SearchService.ShowPopualerSearch().subscribe(
      (data:any[])=>{
        console.log(data);
        this.popualeritem = data ;
      }
    );
  }


ShowMore(){
  this.navCtrl.push(RecentSearchPage);
}

RecentSearch(userid){
  this.SearchService.RecentSearch(userid).subscribe(
    (data) =>{
        console.log(data);
        this.recentsearch = data;
    }
  );
}

RemoveSearch(index){
  this.SearchService.DeleteSearch(index).subscribe(
    (data)=>{
        console.log(data);
        this.loadingItemSearch();
        const alert = this.alertController.create({
          message: "Search Deleted Successfully",
          buttons: ['OK']
        });
        alert.present();

      }
      
    ,(error) => {
        console.log(error);
        const alert = this.alertController.create({
          title: 'Delete failed',
          message: error.message,
          buttons: ['OK']
        });
        alert.present();
    }
    );
}

private loadingItemSearch(){
  this.SearchService.RecentSearch(this.user.id).subscribe(
    (data:any)=>{
      if(data.length>0){
        this.recentsearch = data;
      }
      else
      {
        this.recentsearch = [];
      }
    }
  );
}

  slideOpts = {
    effect: 'flip'
  };
}
