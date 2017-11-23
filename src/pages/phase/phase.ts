import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PhasePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-phase',
  templateUrl: 'phase.html',
})
export class PhasePage {
  public phase:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.phase = this.navParams.get('phase');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhasePage');
  }

}
