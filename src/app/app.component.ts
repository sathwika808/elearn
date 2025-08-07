import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./login/login.component";
import { ReferComponent } from "./refer/refer.component";

@Component({
  selector: 'app-root',
  imports: [LoginComponent, RouterOutlet, ReferComponent] ,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'e-learn';
}
