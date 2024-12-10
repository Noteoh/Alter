import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AuthService } from '../auth.service';
import { categoryMap } from '../category-map';

@Component({
  selector: 'app-quiz-results',
  templateUrl: './quiz-results.component.html',
  styleUrls: ['./quiz-results.component.scss']
})
export class QuizResultsComponent implements OnInit {
  user: any;
  quizResults: any[] = [];
  displayedColumns: string[] = ['category', 'type', 'difficulty', 'amount', 'date', 'score'];

  constructor(private authService: AuthService, private db: AngularFireDatabase) {}

  ngOnInit() {
    this.authService.getUser().subscribe((user) => {
      this.user = user;
      let userName = ""
      if (this.user.displayName == null) {
        console.log("THIS GUY IS CONNECTED WITH HIS EMAIL :");
        userName = this.user.email.split("@")[0]; ;
        console.log(userName);
      } else {
        console.log("THIS GUY IS CONNECTED WITH GMAIL");
        userName = this.user.displayName;
      }
      this.db.list(`quizResults/${userName}`).valueChanges().subscribe((results) => {
        this.quizResults = results;
      });
    });
  }

  getCategoryName(categoryId: string): string {
    return categoryMap[categoryId] || 'Unknown';
  }
}
