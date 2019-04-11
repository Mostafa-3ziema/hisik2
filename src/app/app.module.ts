import { Device } from '@ionic-native/device';
import { HttpModule } from '@angular/http';
import { CameraPreview } from '@ionic-native/camera-preview';
import { SearchTextPage } from './../pages/search-text/search-text';
import { SearchResualtPage } from './../pages/search-resualt/search-resualt';
import { SearchPage } from './../pages/search/search';
import { TimelineTimeComponent } from './../components/timelinetime/timelinetime';
import { TimelineItemComponent } from './../components/timelineitem/timelineitem';
import { TimelineComponent } from './../components/timeline/timeline';
import { TopBarPage } from './../pages/top-bar/top-bar';
import { ComponentsModule } from './../components/components.module';
import { ProfilePage } from './../pages/profile/profile';
import { MyReviewsPage } from './../pages/my-reviews/my-reviews';
import { ForgetpasswordPage } from './../pages/forgetpassword/forgetpassword';
import { LogInPage } from './../pages/log-in/log-in';
import { SignUpPage } from './../pages/sign-up/sign-up';
import { EditReviewsPage } from './../pages/edit-reviews/edit-reviews';
import { ScannedProductsPage } from './../pages/scanned-products/scanned-products';
import { FavouritesPage } from './../pages/favourites/favourites';
import { ProductPage } from './../pages/product/product';
import { FabCameraPage } from './../pages/fab-camera/fab-camera';
import { ContactSupportPage } from './../pages/contact-support/contact-support';
import { FaqHelpPage } from './../pages/faq-help/faq-help';
import { SettingPage } from './../pages/setting/setting';
import { OptionsPage } from './../pages/options/options';
import { MessagePage } from './../pages/message/message';
import { NotificationPage } from './../pages/notification/notification';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { NotificationPageModule } from '../pages/notification/notification.module';
import { StarRatingModule } from 'ionic3-star-rating';
import { ReplayPage } from './../pages/replay/replay';
import { ReplaysPage } from './../pages/replays/replays';
import { ReportPage } from './../pages/report/report';
import { ReviewPage } from './../pages/review/review';
import { ReviewsPage } from './../pages/reviews/reviews'; 
import { LinksPage } from './../pages/links/links';
import { RecentSearchPage } from '../pages/recent-search/recent-search';
import { RecommandedPage } from '../pages/recommanded/recommanded';
import { RecommandedResualtPage } from '../pages/recommanded-resualt/recommanded-resualt';
import { ScanPage } from '../pages/scan/scan';
import { Camera } from '@ionic-native/camera';
import { scannedproductServices } from '../services/user/scannedproduct.services';
import { ProfileService } from '../services/user/profile.service';
import { MessageService } from '../services/messages.service';
import { HttpClientModule } from '@angular/common/http';
import { AUTHService } from '../services/user/AUTH.service';
import { Storage, IonicStorageModule } from '@ionic/storage';
import { EmailComposer } from '@ionic-native/email-composer';
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    //NotificationPage,
    MessagePage,
    OptionsPage,
    SettingPage,
    FaqHelpPage,
    ContactSupportPage,
    FabCameraPage,
    ProductPage,
    ReplayPage,
    ReplaysPage,
    ReportPage,
    ReviewPage,
    ReviewsPage,
    LinksPage,
    ProfilePage,
    FavouritesPage,
    MyReviewsPage,
    ScannedProductsPage,
    EditReviewsPage,
    SignUpPage,
    LogInPage,
    ForgetpasswordPage,
    SearchPage,
    SearchResualtPage,
    SearchTextPage,
    RecentSearchPage,
    RecommandedPage,
    RecommandedResualtPage,
    TopBarPage,
    ScanPage
    ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    HttpClientModule,
    //ComponentsModule,
    IonicStorageModule.forRoot(),
    NotificationPageModule,
    StarRatingModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    NotificationPage,
    MessagePage,
    OptionsPage,
    SettingPage,
    FaqHelpPage,
    ContactSupportPage,
    FabCameraPage,
    ProductPage,
    ReplayPage,
    ReplaysPage,
    ReportPage,
    ReviewPage,
    ReviewsPage,
    LinksPage,
    ProfilePage,
    FavouritesPage,
    MyReviewsPage,
    ScannedProductsPage,
    EditReviewsPage,
    SignUpPage,
    LogInPage,
    ForgetpasswordPage,
    SearchPage,
    SearchResualtPage,
    SearchTextPage,
    RecentSearchPage,
    RecommandedPage,
    RecommandedResualtPage,
    TopBarPage,
    ScanPage
    ],
  providers: [
    StatusBar,
    SplashScreen,
    CameraPreview,
    Camera,
    MessageService,
    ProfileService,
    scannedproductServices,
    AUTHService,
    Device,
    EmailComposer,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
