import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireAuthModule} from '@angular/fire/compat/auth';
import {environment} from '../environments/environment';
import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {AngularFireAuthGuard, redirectUnauthorizedTo} from '@angular/fire/compat/auth-guard';
import { HttpClientModule } from '@angular/common/http';
import { QuizSettingsComponent } from './quiz-settings/quiz-settings.component';
import { QuizComponent } from './quiz/quiz.component';
import {MatRadioModule} from "@angular/material/radio";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import { QuizResultsComponent } from './quiz-results/quiz-results.component';
import {MatTableModule} from "@angular/material/table";



const appRoutes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'sign-up', component: SignUpComponent},
  {path: 'reset-password', component: ResetPasswordComponent},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'reset-password', component: ResetPasswordComponent},
  {
    path: 'user-profile',
    component: UserProfileComponent,
    canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: () => redirectUnauthorizedTo(['/login'])}
  },
  {path:'quiz-settings', component : QuizSettingsComponent,canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: () => redirectUnauthorizedTo(['/login'])}},
  {path:'quiz', component : QuizComponent,canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: () => redirectUnauthorizedTo(['/login'])}},
  { path: 'quiz-results', component: QuizResultsComponent,canActivate: [AngularFireAuthGuard],
    data: {authGuardPipe: () => redirectUnauthorizedTo(['/login'])}
  },

];


@NgModule({
  declarations: [AppComponent, LoginComponent, SignUpComponent, ResetPasswordComponent, UserProfileComponent, QuizSettingsComponent, QuizComponent, QuizResultsComponent],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MatSnackBarModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatOptionModule,
    MatSelectModule,
    MatTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
