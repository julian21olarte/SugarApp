import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AddCyclePage } from '../add-cycle/add-cycle';

/**
 * Generated class for the CyclesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-cycles',
  templateUrl: 'cycles.html',
})
export class CyclesPage {

  constructor(public navCtrl: NavController) {
  }

  addCyclePage() {
    this.navCtrl.push(AddCyclePage);
  }

}
