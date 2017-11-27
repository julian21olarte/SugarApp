import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { FabContainer } from 'ionic-angular/components/fab/fab-container';
import moment from 'moment';
import { DatabaseService } from '../../services/database.service';

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
  public activityRefresh:any;
  public cycle_id:string;
  public monthShortNames:Array<string>;
  public minDate:string;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public databaseService: DatabaseService,
    public toastCtrl: ToastController) {
    this.activity = this.navParams.get('activity');
    this.activityRefresh = this.navParams.get('activity');
    this.cycle_id = this.navParams.get('cycle_id');
    this.minDate = moment().format();
    this.activity.reminder = moment(this.activity.reminder).format();
    this.monthShortNames = [
      'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
    ];
  }



  cancel() {
    this.activity = this.activityRefresh;
    this.navCtrl.pop();
  }

  editActivity() {
    if( !this.activity.name || !this.activity.description || !this.activity.reminder ) {
      this.toastCtrl.create({
        message: 'Datos invalidos!',
        duration: 2000
      }).present();
      return;
    }
    this.activity.reminder = new Date(this.activity.reminder).getTime();
    this.databaseService.update('cycles/'+this.cycle_id+'/activities/'+this.activity.id, this.activity)
    .then(response => {
      this.toastCtrl.create({
        message: 'Actividad agregada correctamente!',
        duration: 2000
      }).present();
      this.navCtrl.pop();
    })
    .catch(err => {
      this.toastCtrl.create({
        message: 'No se pudo agregar la actividad, intentelo mas tarde.',
        duration: 2000
      }).present();
    });
  }

}
