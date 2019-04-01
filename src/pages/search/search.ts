import { Component } from '@angular/core';
import { NavController, NavPush, NavParams } from 'ionic-angular';
import { SearchTextPage } from '../search-text/search-text';
import { RecommandedPage } from '../recommanded/recommanded';
import { RecentSearchPage } from '../recent-search/recent-search';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  searchbar(){
    this.navCtrl.push(SearchTextPage);
  }

  Recommended(){
    this.navCtrl.push(RecommandedPage);
  }


RecentSearch(){
  this.navCtrl.push(RecentSearchPage);
}

  slideOpts = {
    effect: 'flip'
  };
}
