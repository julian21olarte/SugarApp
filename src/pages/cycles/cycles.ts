import { MomentModule } from 'angular2-moment';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AddCyclePage } from '../add-cycle/add-cycle';
import { DatabaseService } from '../../services/database.service';
import { FabContainer } from 'ionic-angular/components/fab/fab-container';
import { ViewCyclePage } from '../view-cycle/view-cycle';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import moment from 'moment';

moment.locale('es');

/**
 * Generated class for the CyclesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-cycles',
  templateUrl: 'cycles.html',
  providers: [DatabaseService]
})
export class CyclesPage implements OnInit{
  public cycles:any;
  constructor(public navCtrl: NavController, public database: DatabaseService) {
    
  }

  ngOnInit() {
    /*this.database.get('cycles').subscribe(cycles => {
      this.cycles = cycles;
    });*/
    this.cycles = this.database.get('cycles');
    console.log('se cargo');
  }


  addCyclePage(fab: FabContainer) {
    fab.close();
    this.navCtrl.push(AddCyclePage);
  }


  public viewCycle(cycle: any) {
    this.navCtrl.push(ViewCyclePage, {cycle});
  }

}
