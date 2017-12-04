import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseQuery } from 'angularfire2/database/interfaces';
import { DatabaseService } from '../../services/database.service';

/**
 * Generated class for the ViewObservationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-view-observation',
  templateUrl: 'view-observation.html',
})
export class ViewObservationPage {

  public observation: any;
  public observationImg:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public databaseService: DatabaseService) {
    this.observation = this.navParams.get('observation');
    if( this.observation.url ) {
      this.databaseService.downloadImg(this.observation.url)
      .then(img => {
        this.observationImg = img;
        console.log(img);
      });
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewObservationPage');
  }

}
