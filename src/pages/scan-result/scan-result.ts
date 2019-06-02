import { AUTHService } from './../../services/user/AUTH.service';
import { SimilarProductsPage } from './../similar-products/similar-products';
import { ScanService } from './../../services/scan.Service';
import { ProductService } from './../../services/product.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, AlertController, LoadingController } from 'ionic-angular';
import { TextToSpeech } from '@ionic-native/text-to-speech';

/**
 * Generated class for the ScanResultPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scan-result',
  templateUrl: 'scan-result.html',
})
export class ScanResultPage {
  visionResponse;
  labelAnotation :Array<any> = [];
  localizedObjectAnnotations :Array<any> = [];
  adults :Array<any> = [];
  text :Array<any> = [];
  logo :Array<any> = [];
  image; 
  scan;
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     private tts: TextToSpeech,
     public productService:ProductService,
     public scanService: ScanService,
     public toastCtrl:ToastController,
     public alertCtrl :AlertController,
     public loadCtrl:LoadingController,
     public auth:AUTHService) {
  }

  ionViewDidLoad() {
    this.visionResponse = this.navParams.get('visionresult');
    this.image=this.navParams.get('ScannedImage');
    if(this.auth.IsAuthinticated())
    {
      this.scan=this.navParams.get('scan');
    }
    console.log(this.visionResponse.responses[0].labelAnnotations);
    this.labelAnotation = this.visionResponse.responses[0].labelAnnotations;
    //console.log(this.visionResponse.responses[0].labelAnnotations);
    this.logo   = this.visionResponse.responses[0].logoAnnotations;
    //console.log(this.visionResponse.responses[0].labelAnnotations);
    this.text   = this.visionResponse.responses[0].textAnnotations;
    console.log(this.labelAnotation,'anotation');
    this.adults = this.visionResponse.responses[0].safeSearchAnnotation;
    console.log(this.adults,'adults');
    this.localizedObjectAnnotations = this.visionResponse.responses[0].localizedObjectAnnotations;
    console.log(this.localizedObjectAnnotations,'multible objects');
  }

  speak(message)
  {
   this.tts.speak(message)
   .then(() => console.log('Success'))
   .catch((reason: any) => console.log(reason));
  }

  SimilarCategoryProduct(Category:string)
  {
    const loading = this.loadCtrl.create({
    content:"Searching ...",
     });
    loading.present();
    this.productService.getSimilarProducts('',Category).subscribe(
     (data:any[])=>
     { 
       loading.dismiss();
     
       if(data.length>0)
       {
        if(this.auth.IsAuthinticated())
        {
          this.navCtrl.push(SimilarProductsPage,{'products':data,'scan':this.scan});
        }else
        {
          this.navCtrl.push(SimilarProductsPage,{'products':data});
        }
       }else
       {
        loading.dismiss();
        this.toastCtrl.create({
          message:'there is no products for this category',
          duration:3000
        }).present();
       }
     }
   );
  }

  SimilarBrandsProduct(brand:string)
  {
    const loading = this.loadCtrl.create({
    content:"Searching ...",
     });
    loading.present();
    this.productService.getSimilarProducts(brand,'').subscribe(
     (data:any[])=>
     { 
       loading.dismiss();
     
       if(data.length>0)
       {
        if(this.auth.IsAuthinticated())
        {
          this.navCtrl.push(SimilarProductsPage,{'products':data,'scan':this.scan});
        }else
        {
          this.navCtrl.push(SimilarProductsPage,{'products':data});
        }
       }else
       {
        loading.dismiss();
        this.toastCtrl.create({
          message:'there is no products for this brand',
          duration:3000
        }).present();
       }
     }
   );
  }

}
