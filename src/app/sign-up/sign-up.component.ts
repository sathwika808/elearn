import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../models';
import { MainserviceService } from '../services/mainservice.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {
  user: User = {
    id: '', // Will be generated
    username: '',
    email: '',
    password: ''
  };
   generateUserId(): string {
    return 'user-' + Math.floor(Math.random() * 10000);
  }
  signupError: string = '';

  constructor(private userService: MainserviceService, private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    this.userService.getUsers().subscribe((users) => {
      const exists = users.find(u => u.email === this.user.email);
      if (exists) {
        this.signupError = 'User with this email already exists.';
        return;
      }

      // Post the new user
      this.userService.addUser(this.user).subscribe(() => {
        this.router.navigate(['login']);
      }, err => {
        console.error(err);
        this.signupError = 'Server error. Try again later.';
      });
    });
  }
}
