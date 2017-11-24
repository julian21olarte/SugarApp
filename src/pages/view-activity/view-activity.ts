import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { DatabaseService } from './../../services/database.service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EditActivityPage } from '../edit-activity/edit-activity';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { FabContainer } from 'ionic-angular/components/fab/fab-container';

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
  public cycle_id:string;
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public databaseService: DatabaseService,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController) {
    this.activity = this.navParams.get('activity');
    this.cycle_id = this.navParams.get('cycle_id');
  }


  public showEditActivity(fabC: FabContainer, activity: any) {
    fabC.close();
    this.navCtrl.push(EditActivityPage, {activity: activity, cycle_id: this.cycle_id});
  }


  public deleteActivity(activity_id: string) {
    this.alertCtrl.create({
      title: 'Eliminar esta actividad?',
      message: 'Estas seguro? perderas toda la informacion de esta actividad.',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'OK',
          handler: () => {
            console.log('Agree clicked');
            this.databaseService.delete('cycles/'+this.cycle_id+'/'+this.activity.id)
            .then(response => {
              this.navCtrl.pop();
              this.toastCtrl.create({
                message: 'Actividad eliminada correctamente.',
                duration: 2000
              }).present();
            })
            .catch(err => {
              console.log(err);
            });
          }
        }
      ]
    }).present();
  }
}
