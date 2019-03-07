import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // état de la connexion
  private authState: boolean = false;
  subjectState = new Subject<boolean>();

  constructor(private router: Router) {
    firebase.auth().onAuthStateChanged( (user) => {
      if (user) {
        this.authState = true;
        this.subjectState.next(this.authState);
      } else {
        this.authState = false;
        this.subjectState.next(this.authState);
      }
    });
  }

  authenticated(): boolean{ 
    return this.authState == true;
  }

  // logIn
  auth(email: string, password: string): Promise<any> {
      return firebase.auth().signInWithEmailAndPassword(email, password);
  }
  
  //logout
  logout(){
    firebase.auth().signOut().then(
      ()=> {
      this.authState = false;
      this.router.navigate(['albums']);
      }
    )
  }
  
}
