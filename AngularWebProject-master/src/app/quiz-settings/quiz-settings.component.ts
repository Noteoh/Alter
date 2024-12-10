import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-settings',
  templateUrl: './quiz-settings.component.html',
  styleUrls: ['./quiz-settings.component.scss']
})
export class QuizSettingsComponent implements OnInit {
  quizSettingsForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.quizSettingsForm = this.fb.group({
      category: ['', Validators.required],
      difficulty: ['', Validators.required],
      type: ['', Validators.required],
      amount: [10, [Validators.required, Validators.min(1), Validators.max(50)]],
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log('Form submitted:', this.quizSettingsForm.value);
    if (this.quizSettingsForm.valid) {
      localStorage.setItem('quizSettings', JSON.stringify(this.quizSettingsForm.value));
      this.router.navigate(['/quiz']);
    } else {
      console.warn('Form is not valid');
    }
  }

}
