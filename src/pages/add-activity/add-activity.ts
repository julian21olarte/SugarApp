import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import moment from 'moment';
import { DatabaseService } from '../../services/database.service';

/**
 * Generated class for the AddActivityPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-activity',
  templateUrl: 'add-activity.html',
})
export class AddActivityPage {
  public name:string;
  public description:string;
  public reminder:any;
  public phase: number;
  public minDate:string;
  public cycle_id:string;
  public monthShortNames: Array<string>;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public database: DatabaseService,
    public toastCtrl: ToastController) {
    this.reminder = moment().format();
    this.minDate = moment().format();
    this.monthShortNames = [
      'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
    ];
    this.cycle_id = this.navParams.get('cycle_id');

  }


  addActivity() {
    if( !this.name || !this.description || !this.reminder ) {
      this.toastCtrl.create({
        message: 'Datos invalidos!',
        duration: 2000
      }).present();
      return;
    }
    let data = {
      name: this.name,
      description: this.description,
      reminder: new Date(this.reminder).getTime(),
      phase: this.phase
    };
    this.database.insert('cycles/'+this.cycle_id+'/activities', data)
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


  cancel() {
    this.navCtrl.pop();
  }

}
