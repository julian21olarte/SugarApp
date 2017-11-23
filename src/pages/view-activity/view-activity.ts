import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ViewActivityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-view-activity',
  templateUrl: 'view-activity.html',
})
export class ViewActivityPage {

  public activity:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.activity = this.navParams.get('activity');
  }

}
