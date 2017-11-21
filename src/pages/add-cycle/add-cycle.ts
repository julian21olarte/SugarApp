import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { DatabaseService } from '../../services/database.service';
import { AuthService } from '../../services/auth.service';

/**
 * Generated class for the AddCyclePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-cycle',
  templateUrl: 'add-cycle.html',
  providers: [DatabaseService, AuthService]
})
export class AddCyclePage {
  public name:string;
  public duration:number;
  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    public db: DatabaseService,
    public authService: AuthService) {
  }

  public addCycle() {
    if( !this.name || !this.duration) {
      this.toastCtrl.create({
        message: 'Datos invalidos!',
        duration: 3000
      }).present();
      return false;
    }

    this.db.insert( 'cycle', {name: this.name, duration: this.duration} )
    .then( response => {
      this.toastCtrl.create({
        message: 'Ciclo agregado correctamente!',
        duration: 2000
      }).present();
    });
  }

  public cancel() {

  }


}
