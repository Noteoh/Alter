import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email!: string;
  password!: string;

  constructor(private authService: AuthService,private router: Router) { }

  async login() {
    const result = await this.authService.loginWithEmail(this.email, this.password);
    if (result) {
      console.log('Logged in successfully.');
    }
  }

  async loginWithGoogle() {
    const result = await this.authService.loginWithGoogle();
    if (result) {
      console.log('Logged in successfully with Google.');
    }
  }
  goToSignUp(): void {
    this.router.navigate(['/sign-up']);
  }
  goToResetPassword(): void {
    this.router.navigate(['/reset-password']);
  }
}
