import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FabContainer } from 'ionic-angular/components/fab/fab-container';
import moment from 'moment';

/**
 * Generated class for the EditActivityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit-activity',
  templateUrl: 'edit-activity.html',
})
export class EditActivityPage {

  public activity: any;
  public cycle_id:string;
  public monthShortNames:Array<string>;
  public minDate:string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.activity = this.navParams.get('activity');
    this.cycle_id = this.navParams.get('cycle_id');
    this.minDate = moment().format();
    this.monthShortNames = [
      'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
    ];
  }



  cancel(fab: FabContainer) {
    fab.close();
    this.navCtrl.pop();
  }

  editActivity() {

  }

}
