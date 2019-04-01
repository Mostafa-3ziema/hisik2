import { Chart } from 'chart.js';
import { Component ,ViewChild} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the ReviewsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reviews',
  templateUrl: 'reviews.html',
})

export class ReviewsPage {
  @ViewChild('chartCanvas') chartCanvas;
  chartVar: any;  
  constructor(public navCtrl: NavController, public navParams: NavParams) {
   
  }
  ngAfterViewInit() {
    this.showChart();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReviewsPage');
  }
  showChart() {
    
    this.chartVar = new Chart(this.chartCanvas.nativeElement, {
      type: 'doughnut',
      data: {
        datasets: [{
          data: [1 , 2, 3 , 4 , 5 ],
          backgroundColor: [
            'rgb(217, 15, 36)',
            'rgb(234, 174, 28)',
            'rgb(220, 121, 25)',
            'rgb(219, 73, 30)',
            'rgb(219, 24, 22)',

          ]
        }],
        labels: [
          'dope',
          'nope'
        ]
 
      },
 
      options: {
        legend: {
          display: false
        },
        tooltips: {
          enabled: true
        }
      }
 
    })
  }

}
