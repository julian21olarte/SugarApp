import { Component, Pipe } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { DatabaseService } from '../../services/database.service';
import { AddActivityPage } from '../add-activity/add-activity';
import { ViewActivityPage } from '../view-activity/view-activity';


/**
 * Generated class for the ActivitiesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-activities',
  templateUrl: 'activities.html'
})
export class ActivitiesPage {

  private cycle_id: string;
  private activities: any
  constructor(public navCtrl: NavController, public navParams: NavParams, public databaseService: DatabaseService) {
    this.cycle_id = this.navParams.get('cycle_id');
    this.activities = this.databaseService.get('cycles/'+this.cycle_id+'/activities');
  }


  public viewActivity(activity: any) {
    this.navCtrl.push(ViewActivityPage, {activity: activity, cycle_id: this.cycle_id});

  }

  public getCurrentTime() {
    return new Date().getTime();
  }


  public addActivity() {
    this.navCtrl.push(AddActivityPage, {cycle_id: this.cycle_id});
  }



}
