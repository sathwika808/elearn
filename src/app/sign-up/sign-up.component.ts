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
    id: 0, 
    username: '',
    email: '',
    password: ''
  };
 
  signupError: string = '';

  constructor(private userService: MainserviceService, private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.invalid) return;

    this.userService.getUsers().subscribe({
  next: (users) => {
    const exists = users.find(u => u.email === this.user.email);
    if (exists) {
      this.signupError = 'User with this email already exists.';
      return;
    }

    // Post the new user
this.userService.addUser(this.user).subscribe({
  next: (res) => {
    console.log("Signup success, response:", res);
    this.router.navigate(['login']);
  },
  error: (err) => {
    console.error("Signup failed:", err);
    this.signupError = 'Server error. Try again later.';
  }
});






  },
  error: (err) => {
    console.error(err);
    this.signupError = 'Failed to fetch users.';
  }
});

  }
}
