// import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MainserviceService } from '../services/mainservice.service';
import { User } from '../../models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private ro: Router, private userService: MainserviceService) {}

  user = {
    username: '',
    password: '',
    remember: false
  };

  loginError = '';

  onSubmit(form: any) {
    if (form.invalid) {
      return;
    }

    this.userService.getUsers().subscribe(
      (users: User[]) => {
        const foundUser = users.find(
          (u) => u.username === this.user.username && u.password === this.user.password
        );

        if (foundUser) {
          // ✅ If user has no ID, assign one and update db.json
          if (!foundUser.id || foundUser.id === 0) {
            foundUser.id +=1 ;
            this.userService.addUser(foundUser).subscribe(() => {
              console.log('User with new ID created in db.json');
            });
          }

          // ✅ Always store the latest logged-in user in localStorage
          localStorage.setItem('user', JSON.stringify(foundUser));

          // ✅ Also store in service memory
          this.userService.setLoggedInUser(foundUser);

          // ✅ Navigate to main page
          this.ro.navigate(['/main']);
        } else {
          this.loginError = 'Invalid username or password.';
        }
      },
      (error) => {
        this.loginError = 'Server error. Please try again later.';
        console.error('Login fetch error', error);
      }
    );
  }
}
 