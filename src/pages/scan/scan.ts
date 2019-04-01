import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CameraPreview, CameraPreviewPictureOptions, CameraPreviewOptions, CameraPreviewDimensions } from '@ionic-native/camera-preview';

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
  constructor(public cameraPreview: CameraPreview,public navCtrl: NavController, public navParams: NavParams) {
  
  }
  async startCamera() {
    this.picture = null;
    this.cameraPreview.startCamera(this.cameraOpts).then(
      (res) => {
        console.log(res)
      },
      (err) => {
        console.log(err)
      });
   
  }

  switchCamera() {
    this.cameraPreview.switchCamera();
  }

  async takePicture() {
    const result = await this.cameraPreview.takePicture(this.cameraPictureOpts);
    await this.cameraPreview.stopCamera();
    this.picture = `data:image/jpeg;base64,${result}`;
  }

  ionViewDidLoad() {
    this.startCamera();
    console.log('ionViewDidLoad ScanPage');
  }

}
