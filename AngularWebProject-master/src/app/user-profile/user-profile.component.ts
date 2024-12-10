import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.getUser().subscribe(user => {
      this.user = user;
    });
  }



  ngOnInit(): void {
  }

  async disconnect() {
    try {
      await this.authService.signOut();
      this.router.navigate(['/login']);
    } catch (error) {
      console.log(error);
    }
  }

  backToQuizSettings() {
    this.router.navigate(['/quiz-settings']);
  }

}
