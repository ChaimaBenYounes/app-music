import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // état de la connexion
  private authState: boolean = false;

  constructor(private router: Router) {
    firebase.auth().onAuthStateChanged( (user) => {
      if (user) {
        this.authState = true;
        return true;
      } else {
        this.authState = null;
        return false;
      }
    });
  }

  // méthode d'authentification
  auth(email: string, password: string): Promise<any> {
      return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  authenticated(){
    return this.authState;
  }

}
