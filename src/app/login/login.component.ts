// import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MainserviceService } from '../services/mainservice.service';
import { User, UserDto } from '../../models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private ro: Router, private userService: MainserviceService) {}
  // model for form
  user: UserDto = {
    username: '',
    password: ''
  };

  loginError = '';

  onSubmit(form: any) {
    if (form.invalid) return;

    // call backend to login with jwt
    this.userService.jwtLogin(this.user).subscribe({
      next: (response: any) => {
        console.log('Login successful!', response);

        // ✅ Save token in localStorage
        localStorage.setItem('token', response.token);

        // ✅ Navigate to main page
        this.ro.navigate(['/main']);
      },
      error: (err) => {
        this.loginError = 'Invalid username or password';
        console.error('Login failed', err);
      },
    });
  }
}