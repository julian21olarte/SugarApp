import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { DatabaseService } from '../../services/database.service';
import { AuthService } from '../../services/auth.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';

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
export class AddCyclePage implements OnInit{
  public name:string;
  public duration:number;
  private currentUser:any;
  constructor(public navCtrl: NavController,
    public toastCtrl: ToastController,
    public db: DatabaseService,
    public authService: AuthService) {
  }

  ngOnInit() {
    this.authService.user.subscribe( user => {
      this.currentUser = user;
      console.log( this.currentUser );
    });
  }

  public addCycle() {
    if( !this.name || !this.duration) {
      this.toastCtrl.create({
        message: 'Datos invalidos!',
        duration: 3000
      }).present();
      return false;
    }
    let start_date = new Date();
    let end_date = new Date(
      new Date().setFullYear( 
        start_date.getFullYear() + (this.duration/12) 
      ));

    this.db.insert( 'cycles', {
      userId: this.currentUser.uid,
      name: this.name,
      start_date: start_date.toLocaleString(),
      end_date: end_date.toLocaleString(),
      duration: this.duration,
      activities: []
    })
    .then( response => {
      this.navCtrl.pop();
      this.toastCtrl.create({
        message: 'Ciclo agregado correctamente!',
        duration: 2000
      }).present();
    });
  }

  public cancel() {
    this.navCtrl.pop();
  }


}
