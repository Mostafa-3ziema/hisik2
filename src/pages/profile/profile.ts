import { Component } from '@angular/core';
import { NavController,  } from 'ionic-angular';

@Component({
  selector: 'page-profile',
  template:
  `
  <ion-card>
    
  <ion-item class="a">
    <ion-avatar item-start >
      <img src="../assets/IMG_20180627_171310300.jpg">
    </ion-avatar>
  </ion-item>
  <ion-item class="aa">
    <h2>omar ashraf</h2>
    <p>san francisko</p>
  </ion-item>
  
    <ion-card-content>
      <p>hi !  my name is omar , i'm a creative geek from san francisko , ca contact me at omar@gmail.com</p>
    </ion-card-content>
      </ion-card>


      <br>

      
      <h2>recent scan</h2>

      <br>
      
      <ion-grid class="g">
         <ion-row  >
            <ion-col class="c" >
              <ion-card >
            
                <ion-item class="r">
                    <ion-avatar  >
                        <img src="../assets/IMG_20180627_171310300.jpg">
                      </ion-avatar>
                </ion-item>
                <ion-item >
                    <p class="p" >bla bla bla</p>
                    <br>
                    <button class="pp" ion-button clear >show more</button>
              </ion-item>
            </ion-card>
            </ion-col> 
        
            <ion-col class="c" >
               <ion-card >
            
                <ion-item class="r">
                    <ion-avatar item-start >
                        <img src="../assets/IMG_20180627_171310300.jpg">
                      </ion-avatar>
                </ion-item>

                <ion-item >
                    <p class="p" >bla bla bla </p >
                      <br>
                    <button class="pp" ion-button clear >show more</button>
              </ion-item>
            </ion-card>
            </ion-col>
           
          </ion-row>
        </ion-grid>
  `
})
export class ProfilePage {

  constructor(public navCtrl: NavController) {

  }

}
