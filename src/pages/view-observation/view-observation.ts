import { EditObservationPage } from './../edit-observation/edit-observation';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseQuery } from 'angularfire2/database/interfaces';
import { DatabaseService } from '../../services/database.service';
import { FabContainer } from 'ionic-angular/components/fab/fab-container';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';

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
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public databaseService: DatabaseService,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController) {

    this.observation = this.navParams.get('observation');
    this.databaseService.getObject('observations/' + this.observation.id)
    .subscribe(observation => {
      this.observation = observation;
      if( this.observation.url ) {
        this.databaseService.downloadImg(this.observation.url)
        .then(img => {
          this.observationImg = img;
          console.log(img);
        });
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewObservationPage');
  }


  public deleteObservation(observationId:string, fab:FabContainer) {
    fab.close();

    this.alertCtrl.create({
      title: 'Eliminar esta observacion?',
      message: 'Estas seguro? perderas toda la informacion de esta observacion.',
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
            this.databaseService.delete('observations/' + observationId)
            .then(resp => {
              this.navCtrl.pop();
              this.toastCtrl.create({
                message: 'Observacion eliminada correctamente.',
                duration: 2000
              }).present();
            })
            .catch(err => {
              console.log(err);
            })
          }
        }
      ]
    }).present();
  }



  public showEditObservation(fab: FabContainer, observation:any) {
    fab.close();
    this.navCtrl.push(EditObservationPage, {observation});
  }
}
