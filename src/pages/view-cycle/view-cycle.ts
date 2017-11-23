import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { DatabaseService } from '../../services/database.service';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { EditCyclePage } from '../edit-cycle/edit-cycle';
import { PhasePage } from '../phase/phase';
import { AddActivityPage } from '../add-activity/add-activity';
import { ViewActivityPage } from '../view-activity/view-activity';
import { AsyncPipe } from '@angular/common/src/pipes/async_pipe';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

/**
 * Generated class for the ViewCyclePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-view-cycle',
  templateUrl: 'view-cycle.html'
})
export class ViewCyclePage implements OnInit{
  public cycle: any;
  public activities:any;
  public phases: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public databaseService: DatabaseService,
    public toastCtrl: ToastController) {

  }

  ngOnInit() {
    this.cycle = this.navParams.get('cycle');
    this.activities = this.databaseService.get('cycles/'+this.cycle.id+'/activities');
    this.databaseService.getPhases()
    .subscribe(phases => {
      this.phases = phases;
    });
  }

  public editCycle() {
    this.navCtrl.push(EditCyclePage, {cycle: this.cycle});
  }


  public deleteCycle() {
    let confirm = this.alertCtrl.create({
      title: 'Eliminar este cyclo de produccion?',
      message: 'Estas seguro? perderas toda la informacion de este ciclo.',
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
            this.databaseService.delete('cycles/'+this.cycle.id)
            .then(response => {
              this.navCtrl.pop();
              this.toastCtrl.create({
                message: 'Ciclo eliminado correctamente.',
                duration: 2000
              }).present();
            })
            .catch(err => {
              console.log(err);
            });
          }
        }
      ]
    });
    confirm.present();
  }

  public showPhase(phase:number) {
    this.navCtrl.push(PhasePage, {phase});
  }

  public addActivity() {
    this.navCtrl.push(AddActivityPage, {cycle: this.cycle});
  }


  public showActivity(activity:any) {
    this.navCtrl.push(ViewActivityPage, {activity});
  }

}
