import { ScanResultPage } from './../scan-result/scan-result';
import { HttpClient } from '@angular/common/http';
import { HomePage } from './../home/home';
import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';
import { Camera } from '@ionic-native/camera';

/**
 * Generated class for the ScanPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html',
})


export class ScanPage {
  public err ;
  imageResult;
  Drow = false;
  public result;
  public ROOT_URL = 'https://vision.googleapis.com';
  public API_KEY = 'AIzaSyAdDscyxa7qmSXQjMPRUMU516yD_AI_7xg'; // YOUR CLOUD PLATFORM API KEY
  public visionRequest = {
    "requests": [{
        "image": {
          "content": ""
        },
        "features": [{
            "type": "FACE_DETECTION",
            "maxResults": 10
        },
       ]
    }]
  };
  canvas = document.getElementById('tempCanvas');
  @ViewChild('layout')canvasref;
  public visionResult ;
  picture: string;

  cameraOpts: CameraPreviewOptions = {
    x: 0,
    y: 0,
    width: window.innerWidth,
    height: window.innerHeight,
    toBack: true
  };

  cameraPictureOpts: CameraPreviewPictureOptions = {
    width: window.innerWidth,
    height: window.innerHeight,
    quality: 100
  };
  constructor( public cameraPreview: CameraPreview 
              ,public toastCtrl :ToastController
              ,private loader :LoadingController
              ,public navCtrl   :NavController
              ,public navParams: NavParams,
              public http: HttpClient,
              public alertCtrl: AlertController,
               ) {}
  
 ionViewDidLoad() {
    this.startCamera();
  }

  async startCamera() {
    this.picture = null;
    const result = await this.cameraPreview.startCamera(this.cameraOpts);
    console.log(result);
  }

  switchCamera() {
    this.cameraPreview.switchCamera();
  }
  gohome(){
    this.navCtrl.push(HomePage)
  }
  async takePicture() {
    await this.cameraPreview.takePicture(this.cameraPictureOpts).then(
      (res) => {
        this.picture = `data:image/jpeg;base64,${res}`;
        console.log(res)
        let loader = this.loader.create({
          content: "Processing..."
        });
        loader.present(); 
        this.imageResult = 'data:image/jpeg;base64,' + res;
        const visionRequest = {
          "requests": [{
              "image": {
                "content": res[0]
              },
              "features": [
              {
                "type": "TEXT_DETECTION",
                "maxResults": 10
              },
              {
                "type": "OBJECT_LOCALIZATION",
                "maxResults": 10
              },
              {
                "type": "LOGO_DETECTION",
                "maxResults": 5
              },
              {
                "type": "LABEL_DETECTION",
                "maxResults": 10
              },       
              {
                "type": "SAFE_SEARCH_DETECTION",
                "maxResults": 10
              },       
             ]
          }]
        };
        this.http.post(`${this.ROOT_URL}/v1/images:annotate?key=${this.API_KEY}`, visionRequest)
        .subscribe((data: any) => {
          this.visionResult = data;
          console.log(data,'working');
          loader.dismiss(); // hide loading component
         
        }, (err) => {
          loader.dismiss(); // hide loading component
          this.err = err;
          this.showAlert('');
          console.log(err);
        })
        console.log('google api');
    

      },
      (err) => {
        console.log(err)
      });
    
    await this.cameraPreview.stopCamera();
    
  }
  goback()
  {
    console.log('baaack');
    this.navCtrl.pop();
  }
  classify(){
    this.navCtrl.push(ScanResultPage,this.visionResult);
  }

  showAlert(message) {
    let alert = this.alertCtrl.create({
      title: 'Hisik',
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  presentToast(message) {
    let toast = this.toastCtrl.create({
      message,
      duration: 3000
    });
    toast.present();
  }
  drow ()
  {
    let image = this.picture;
    
      let canvas = this.canvasref.nativeElement;
      let context = this.canvasref.getContext('2d');

      let source = new Image(); 
      source.crossOrigin = 'Anonymous';
      source.onload = () => {
          canvas.height = source.height;
          canvas.width = source.width;
          context.drawImage(source, 0, 0);

          context.font = "100px impact";
          context.textAlign = 'center';
          context.fillStyle = 'black';
          context.fillText('HELLO WORLD', canvas.width / 2, canvas.height * 0.8);

          image = canvas.toDataURL();  
      };
      source.src = image;
      
    
  }

}

