import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,private tts: TextToSpeech) {
    this.visionResponse = this.navParams.data;
    console.log(this.visionResponse.responses[0].labelAnnotations);
    this.labelAnotation = this.visionResponse.responses[0].labelAnnotations;
    console.log(this.labelAnotation,'anotation');
    this.adults         = this.visionResponse.responses[0].safeSearchAnnotation;
    console.log(this.adults,'adults');
    this.localizedObjectAnnotations = this.visionResponse.responses[0].localizedObjectAnnotations;
    console.log(this.localizedObjectAnnotations,'multible objects');
    

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ScanResultPage');
  }
  speak(message)
  {
  this.tts.speak(message)
  .then(() => console.log('Success'))
  .catch((reason: any) => console.log(reason));
  }

}
