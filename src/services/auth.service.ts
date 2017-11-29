import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
//import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {
  user: Observable<firebase.User>;
  userData:any;
  
  constructor( private firebaseAuth: AngularFireAuth ) { 
    this.user = firebaseAuth.authState;
    this.user.subscribe(userData => {
      this.userData = userData;
    })
  }

//signup new user
  signup(email: string, password: string): any {
    return this.firebaseAuth
      .auth
      .createUserWithEmailAndPassword(email, password); 
  }

  //login
  public login(email: string, password: string): any {
    console.log(email);
    console.log(password);
    return this.firebaseAuth
      .auth
      .signInWithEmailAndPassword(email, password);
  }


  //logout
  logout() {
    this.firebaseAuth.auth.signOut();
  }

}