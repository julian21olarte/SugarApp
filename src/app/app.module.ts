import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
//import { CalendarModule } from 'ionic3-calendar';
import { MyApp } from './app.component';


//pages
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SidebarPage } from '../pages/sidebar/sidebar';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';
import { CyclesPage } from '../pages/cycles/cycles';
import { AddCyclePage } from '../pages/add-cycle/add-cycle';
import { EditCyclePage } from '../pages/edit-cycle/edit-cycle';
import { ViewCyclePage } from '../pages/view-cycle/view-cycle';

//angular-firebase modules
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AuthService } from '../services/auth.service';
import { DatabaseService } from '../services/database.service';
import { firebaseConfig } from './firebase';
import { PhasePage } from '../pages/phase/phase';
import { AddActivityPage } from '../pages/add-activity/add-activity';
import { ViewActivityPage } from '../pages/view-activity/view-activity';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    SidebarPage,
    CyclesPage,
    AddCyclePage,
    EditCyclePage,
    ViewCyclePage,
    PhasePage,
    AddActivityPage,
    ViewActivityPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    LoginPage,
    RegisterPage,
    SidebarPage,
    CyclesPage,
    AddCyclePage,
    EditCyclePage,
    ViewCyclePage,
    PhasePage,
    AddActivityPage,
    ViewActivityPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthService,
    DatabaseService
  ]
})
export class AppModule {}
