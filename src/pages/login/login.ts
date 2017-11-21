import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { AuthService } from '../../services/auth.service';
//import { HomePage } from '../home/home';
import { RegisterPage } from '../register/register';
import { SidebarPage } from '../sidebar/sidebar';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [AuthService]
})
export class LoginPage {
  public email:string;
  public password:string;
  public register = RegisterPage;
  constructor(public navCtrl: NavController, 
    public authService: AuthService,
    public loading: LoadingController,
    public toastCtrl: ToastController ) {
      
  }

  public login() {

    if( !this.email || !this.password) {
      this.toastCtrl.create({
        message: 'Datos invalidos!',
        duration: 3000
      }).present();
      return false;
    }
    let load = this.loading.create({
      content: 'Cargando...',
      duration: 2000
    });
    load.present();
    load.onDidDismiss(() => {
      this.authService.login(this.email, this.password)
      .then(response => {
        this.navCtrl.push(SidebarPage);
      })
      .catch(err => {
        this.toastCtrl.create({
          message: 'No se pudo iniciar sesion, intentelo mas tarde',
          duration: 3000
        }).present();
        return false;
      });
    });
    
  }

}
