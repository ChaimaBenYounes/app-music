import { Injectable } from '@angular/core';
// Importez les modules nécessaires pour l'authentification
import * as firebase from 'firebase/app';
import 'firebase/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor() { }
  // méthode d'authentification
  auth(email: string, password: string): Promise<any> {
      return firebase.auth().signInWithEmailAndPassword(email, password);
  }
}
