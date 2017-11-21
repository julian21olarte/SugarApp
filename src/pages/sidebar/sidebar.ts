import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { ContactPage } from '../contact/contact';
import { CyclesPage } from '../cycles/cycles';

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

  constructor(public navParams: NavParams) {
    this.pages = [
      {title: 'Inicio', component: HomePage, icon: 'home'},
      {title: 'Ciclos', component: CyclesPage, icon: 'leaf'},
      {title: 'Contacto', component: ContactPage, icon: 'contact'}
    ];
  }

  public setPage(component) {
    this.nav.setRoot(component);
  }

}
