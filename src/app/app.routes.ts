import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { StudyComponent } from './study/study.component';
import { QuizComponent } from './quiz/quiz.component';
import { AddquesComponent } from './addques/addques.component';
import { ProfileComponent } from './profile/profile.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { report } from 'process';
import { ReportComponent } from './report/report.component';
import { BookmarkComponent } from './bookmark/bookmark.component';
import { ReferComponent } from './refer/refer.component';

export const routes: Routes = [
    {path:'login' , component:LoginComponent},
    {path:'main', component:MainComponent},
    {path:'study/:id' , component:StudyComponent},
    {path:'quiz/:id' , component:QuizComponent},
   { path: 'add-question/:id', component: AddquesComponent },
   {path:'profile' , component:ProfileComponent},
   {path:'' , component:SignUpComponent , pathMatch: 'full'},
   {path:'report' , component:ReportComponent},
   {path:'bookmark',component:BookmarkComponent},
   {path:'refer', component:ReferComponent}

];
