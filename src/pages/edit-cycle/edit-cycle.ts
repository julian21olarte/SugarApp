import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../services/database.service';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import moment from 'moment';
import { FabContainer } from 'ionic-angular/components/fab/fab-container';

/**
 * Generated class for the EditCyclePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-edit-cycle',
  templateUrl: 'edit-cycle.html',
})
export class EditCyclePage {
  public cycle:any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public database: DatabaseService,
    public toasCtrl: ToastController) {
    this.cycle = this.navParams.get('cycle');
    console.log(this.cycle);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditCyclePage');
  }


  editCycle() {
    this.cycle.end_date = 
    new Date(
      new Date().setFullYear( 
        new Date(this.cycle.start_date)
        .getFullYear() + (this.cycle.duration/12) 
      )).getTime();

    this.database.update('cycles/'+this.cycle.id, this.cycle)
    .then(response => {
      this.navCtrl.pop();
      this.toasCtrl.create({
        message: 'Ciclo editado correctamente!',
        duration: 2000
      }).present();
    });
  }

  cancel() {
    this.navCtrl.pop();
  }
}
