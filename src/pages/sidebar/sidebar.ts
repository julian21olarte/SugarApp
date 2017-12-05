import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { ContactPage } from '../contact/contact';
import { CyclesPage } from '../cycles/cycles';
import { AuthService } from '../../services/auth.service';
import { WeatherPage } from '../weather/weather';

/**
 * Generated class for the SidebarPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-sidebar',
  templateUrl: 'sidebar.html'
})
export class SidebarPage {
  @ViewChild('content') nav: NavController;
  home = HomePage;
  public pages: Array<{title:string, component:any, icon:string}>;
  public current_user:any;

  constructor(public navParams: NavParams, public authService: AuthService) {
    this.pages = [
      {title: 'Inicio', component: HomePage, icon: 'stats'},
      {title: 'Mis Cultivos', component: CyclesPage, icon: 'leaf'},
      {title: 'Tiempo', component: WeatherPage, icon: 'cloud'},
      {title: 'Herramientas', component: ContactPage, icon: 'construct'},
      {title: 'Contacto', component: ContactPage, icon: 'contact'}
    ];
    this.authService.user
    .subscribe(user => {
      this.current_user = user;
      console.log(this.current_user.email);
    });
  }

  public setPage(component) {
    this.nav.setRoot(component);
  }

}
