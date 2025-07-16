import { Injectable } from '@angular/core';
import { auth } from '../firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  loginFacebook() {
    throw new Error('Method not implemented.');
  }
  private userSubject = new BehaviorSubject<User | null>(null);
  user$ = this.userSubject.asObservable();
  signInWithGoogle: any;

  constructor() {
    onAuthStateChanged(auth, (user) => {
      this.userSubject.next(user);
    });
  }

  login(email: string, password: string) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  register(email: string, password: string) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  }

  loginWithFacebook() {
    const provider = new FacebookAuthProvider();
    return signInWithPopup(auth, provider);
  }

  logout() {
    return signOut(auth);
  }
}
