import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import {Observable} from "rxjs";
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth,private router: Router,private snackBar: MatSnackBar) { }

  async signUpWithEmail(email: string, password: string): Promise<boolean> {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
      this.sendVerificationEmail();
      this.router.navigate(['/user-profile']);
      this.snackBar.open('Signed up successfully.', '', { duration: 3000 });
      return true;
    } catch (error) {
      this.snackBar.open('Error signing up :'+error, '', { duration: 3000 });
      return false;
    }
  }

  async loginWithEmail(email: string, password: string): Promise<boolean> {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(email, password);
      await this.router.navigate(['/user-profile']);
      this.snackBar.open('Logged in successfully.', '', { duration: 3000 });
      return true;

    } catch (error) {
      this.snackBar.open('Error logging in: ' + error, '', { duration: 3000 });

      return false;
    }
  }

  async loginWithGoogle(): Promise<boolean> {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const result = await this.afAuth.signInWithPopup(provider);
      await this.router.navigate(['/user-profile']);
      return true;

    } catch (error) {
      console.error('Error logging in with Google:', error);
      return false;
    }
  }

  async resetPassword(email: string): Promise<boolean> {
    try {
      await this.afAuth.sendPasswordResetEmail(email);
      return true;
    } catch (error) {
      console.error('Error resetting password:', error);
      return false;
    }
  }


  async signOut() {
    try {
      return await this.afAuth.signOut();
    } catch (error) {
      console.error(error);
    }
  }

  async sendVerificationEmail(): Promise<void> {
    try {
      const user = await this.afAuth.currentUser;
      if (user) {
        await user.sendEmailVerification();
      }
      this.snackBar.open('Signed up successfully.', '', { duration: 3000 });
    } catch (error) {
      console.error('Error sending verification email:', error);
    }
  }

  getUser(): Observable<firebase.User | null> {
    return this.afAuth.authState;
  }

}
