import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
  email!: string;
  password!: string;

  constructor(private authService: AuthService) { }

  async signUp() {
    const result = await this.authService.signUpWithEmail(this.email, this.password);
    if (result) {
      console.log('Signed up successfully. Please check your email for verification.');
    }
  }

  async signUpWithGoogle() {
    const result = await this.authService.loginWithGoogle();
    if (result) {
      console.log('Signed up successfully with Google.');
    }
  }
}
