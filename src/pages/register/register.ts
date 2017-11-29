import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
import { LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [AuthService]
})
export class RegisterPage {
  email:string;
  password:string;
  constructor(public navCtrl: NavController,
    public authService: AuthService,
    public loading: LoadingController,
    public toastCtrl: ToastController) {
  }

  public register() {
    if( !this.email || !this.password ) {
      this.toastCtrl.create({
        message: 'Datos invalidos!',
        duration: 3000
      }).present();
      return false;
    }
    if( this.password.length<=6 ) {
      this.toastCtrl.create({
        message: 'La contraseña debe tener mas de 6 caracteres',
        duration: 3000
      }).present();
      return false;
    }
    this.authService.signup(this.email, this.password)
    .then(response => {
      response.sendEmailVerification();
      let load = this.loading.create({
        content: 'Cargando...',
        duration: 2000
      });
      load.present();
      load.onDidDismiss(() => {
        this.navCtrl.push(LoginPage);
      });
    });
  }

}
