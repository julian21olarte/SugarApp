import { DatabaseService } from './../../services/database.service';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { EditActivityPage } from '../edit-activity/edit-activity';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { FabContainer } from 'ionic-angular/components/fab/fab-container';
import { Observable } from 'rxjs/Observable';
import { AddObservationPage } from '../add-observation/add-observation';
import { ViewObservationPage } from '../view-observation/view-observation';

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
  public observations: Observable<any>;
  public phase:any;
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public databaseService: DatabaseService,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController) {
  }


  ngOnInit() {
    this.activity = this.navParams.get('activity');
    this.cycle_id = this.navParams.get('cycle_id');

    this.phase = this.databaseService.getObject(`phases/${this.activity.phase}`);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewObservationPage');
    this.observations = this.databaseService.getBy('observations',{
      orderByChild: 'activityId',
      equalTo: this.activity.id
    });
  }


  public showEditActivity(fabC: FabContainer) {
    fabC.close();
    let newActivity = {
      id: this.activity.id,
      name: this.activity.name,
      description: this.activity.description, 
      reminder: this.activity.reminder, 
      phase: this.activity.phase
    }
    this.navCtrl.push(EditActivityPage, {activity: newActivity, cycle: this.cycle_id});
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



  public showAddObservation(fab: FabContainer) {
    fab.close();
    this.navCtrl.push(AddObservationPage, {activity: this.activity.id});
  }


  public showObservation(observation:any) {
    this.navCtrl.push(ViewObservationPage, {observation});
  }

  
}
