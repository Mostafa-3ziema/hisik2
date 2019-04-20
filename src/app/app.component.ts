import { AUTHService } from './../services/user/AUTH.service';
import { MyReviewsPage } from './../pages/my-reviews/my-reviews';
import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { ScannedProductsPage } from '../pages/scanned-products/scanned-products';
import { FavouritesPage } from '../pages/favourites/favourites';
import { SignUpPage } from '../pages/sign-up/sign-up';
import { LogInPage } from '../pages/log-in/log-in';
import { HomePage } from '../pages/home/home';
import firebase from 'firebase';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;
  scannedProductsPage = ScannedProductsPage;
  favouritesPage = FavouritesPage;
  reviewsPage = MyReviewsPage;
  signUpPage = SignUpPage;
  logInPage=LogInPage;
  @ViewChild('nav') nav : NavController;


  user :any;
  isAuthinticated : boolean;
  imagePath="";

  constructor(platform: Platform, public menuCtrl:MenuController,statusBar: StatusBar, splashScreen: SplashScreen, private AUTHService:AUTHService) {
    firebase.initializeApp({
      apiKey: "AIzaSyC-DLZKGxENWAtBhmMhJNTn2CfNcDfDM58",
      authDomain: "hisik-7625a.firebaseapp.com",
      databaseURL: "https://hisik-7625a.firebaseio.com",
      projectId: "hisik-7625a",
      storageBucket: "hisik-7625a.appspot.com",
      messagingSenderId: "918268296551"
     });
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });


  }

  ionViewDidLoad() {
    this.user=this.AUTHService.getUser();
    this.isAuthinticated=this.AUTHService.IsAuthinticated();
    this.imagePath=this.user.ImageURL;

  }
  onLoad(page:any){
    this.nav.push(page);
    this.menuCtrl.close();
      
  }
}

