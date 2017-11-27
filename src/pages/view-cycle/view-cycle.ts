import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { DatabaseService } from '../../services/database.service';
import { ToastController } from 'ionic-angular/components/toast/toast-controller';
import { EditCyclePage } from '../edit-cycle/edit-cycle';
import { PhasePage } from '../phase/phase';
import { AddActivityPage } from '../add-activity/add-activity';
import { ViewActivityPage } from '../view-activity/view-activity';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import * as _ from 'lodash';
import { ActivitiesPage } from '../activities/activities';
import { FabContainer } from 'ionic-angular/components/fab/fab-container';

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
  public activities:Array<any>;
  public phases: any;
  public nextAct: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public databaseService: DatabaseService,
    public toastCtrl: ToastController) {

  }

  ngOnInit() {
    this.cycle = this.navParams.get('cycle');

    this.databaseService.get('cycles/'+this.cycle.id+'/activities')
    .subscribe(acts => {
      this.activities = acts;
      this.nextAct = this.nextActivity();
      console.log(this.nextAct);
    });

    this.databaseService.getPhases()
    .subscribe(phases => {
      this.phases = phases;
    });
  }

  public editCycle(fab: FabContainer) {
    fab.close();
    let newCycle = {
      id: this.cycle.id,
      name: this.cycle.name,
      start_date: this.cycle.start_date,
      end_date: this.cycle.end_date,
      duration:this.cycle.duration,
      userId: this.cycle.userId,
      activities: this.cycle.activities
    }

    this.navCtrl.push(EditCyclePage, {cycle: newCycle});
  }


  public deleteCycle(fab: FabContainer) {
    fab.close();
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

  public addActivity(fab: FabContainer) {
    fab.close();
    this.navCtrl.push(AddActivityPage, {cycle_id: this.cycle.id});
  }


  public showActivity(activity:any) {
    this.navCtrl.push(ViewActivityPage, {activity:activity, cycle_id: this.cycle.id});
  }


  private nextActivity() {
    return _.find(_.sortBy(this.activities, 'reminder', 'asc'), function( act ) {
      let current = new Date().getTime();
      return act.reminder > current;
    });
  }


  public showAllActivities() {
    this.navCtrl.push(ActivitiesPage, {cycle_id: this.cycle.id});
  }

}
