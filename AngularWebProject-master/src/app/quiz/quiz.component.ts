import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AngularFireDatabase} from '@angular/fire/compat/database';
import {AuthService} from '../auth.service';
import {Router} from '@angular/router';

interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
  all_answers?: string[]; // Add this line
}

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {

  user: any;
  selectedAnswers: string[] = [];
  score = 0;
  submitted = false;
  questions: Question[] = [];
  quizSettings: any;

  constructor(private http: HttpClient, private db: AngularFireDatabase, private authService: AuthService, private router: Router) {
    this.authService.getUser().subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    this.quizSettings = JSON.parse(localStorage.getItem('quizSettings') || '{}');
    this.fetchQuestions();
  }

  fetchQuestions() {
    const {category, difficulty, type, amount} = this.quizSettings;
    const apiUrl = `https://opentdb.com/api.php?amount=${amount}&category=${category}&difficulty=${difficulty}&type=${type}`;

    this.http.get<{ results: Question[] }>(apiUrl).subscribe((response) => {
      this.questions = response.results.map((question) => {
        // Decode question
        question.question = this.decodeHtmlEntities(question.question);
        // Decode correct_answer
        question.correct_answer = this.decodeHtmlEntities(question.correct_answer);
        // Decode incorrect_answers
        question.incorrect_answers = question.incorrect_answers.map((answer: string) =>
          this.decodeHtmlEntities(answer)
        );
        // Shuffle answers
        question.all_answers = this.shuffle([...question.incorrect_answers, question.correct_answer]);
        return question;
      });
    });
  }


  shuffle<T>(array: T[]): T[] {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    return shuffledArray;
  }


  submitQuiz() {
    this.submitted = true;
    this.score = this.questions.filter((q, i) => q.correct_answer === this.selectedAnswers[i]).length;

    console.log('User:', this.user.displayName);
    console.log('Score:', this.score);
    console.log('Quiz settings:', this.quizSettings);

    const quizResult = {
      settings: this.quizSettings,
      score: this.score,
      date: new Date().toISOString(),
    };

    let userName = ""
    if (this.user.displayName == null) {
      console.log("THIS GUY IS CONNECTED WITH HIS EMAIL :");
      userName = this.user.email.split("@")[0]; ;
      console.log(userName);
    } else {
      console.log("THIS GUY IS CONNECTED WITH GMAIL");
      userName = this.user.displayName;
    }
    this.db.list(`quizResults/${userName}`).push(quizResult);
    this.submitted = true;
  }

  backToQuizSettings() {
    this.router.navigate(['/quiz-settings']);
  }

  decodeHtmlEntities(text: string): string {
    const textArea = document.createElement('textarea');
    textArea.innerHTML = text;
    return textArea.value;
  }


}
