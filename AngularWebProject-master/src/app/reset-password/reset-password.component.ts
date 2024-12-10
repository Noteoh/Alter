import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {
  email = '';

  constructor(private authService: AuthService) {}

  resetPassword(): void {
    this.authService.resetPassword(this.email);
  }
}
