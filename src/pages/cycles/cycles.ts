import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AddCyclePage } from '../add-cycle/add-cycle';
import { DatabaseService } from '../../services/database.service';
import { FabContainer } from 'ionic-angular/components/fab/fab-container';
import { ViewCyclePage } from '../view-cycle/view-cycle';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import moment from 'moment';
import { AuthService } from '../../services/auth.service';

moment.locale('es');

/**
 * Generated class for the CyclesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-cycles',
  templateUrl: 'cycles.html'
})
export class CyclesPage implements OnInit{
  public cycles:any;
  public current_user:any;
  public showLoading:boolean;
  constructor(public navCtrl: NavController, public database: DatabaseService, public authService: AuthService) {
    this.authService.user.subscribe(user => {
      this.current_user = user;
    });
    this.cycles = [];
    this.showLoading = true;
  }

  ngOnInit() {
    /*this.database.get('cycles').subscribe(cycles => {
      this.cycles = cycles;
    });*/
    this.database.getBy('cycles',{
      orderByChild: 'userId',
      equalTo: this.current_user.uid
      //equalTo: '6dXqbMxveXbcl6KNrYyTDHD6KvR2'
    }).subscribe(cycles => {
      this.cycles = cycles;
      this.showLoading = false;
    });
  }


  addCyclePage(fab: FabContainer) {
    fab.close();
    this.navCtrl.push(AddCyclePage);
  }


  public viewCycle(cycle: any) {
    this.navCtrl.push(ViewCyclePage, {cycle});
  }

}
