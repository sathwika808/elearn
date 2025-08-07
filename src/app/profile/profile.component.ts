import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MainserviceService } from '../services/mainservice.service';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
user: User = { id: '', username: '', email: '', password: '' };
  originalUser: User = { id: '', username: '', email: '', password: '' };
  isEditing = false;

  constructor(private mainService: MainserviceService, private http: HttpClient) {}

  ngOnInit(): void {
    const loggedIn = this.mainService.getLoggedInUser();
    if (loggedIn) {
      this.user = { ...loggedIn };
      this.originalUser = { ...loggedIn }; // store original for change check
    } else {
      const stored = localStorage.getItem('user');
      if (stored) {
        const parsed = JSON.parse(stored);
        this.user = { ...parsed };
        this.originalUser = { ...parsed };
        this.mainService.setLoggedInUser(parsed);
      }
    }
  }

  enableEditing() {
    this.isEditing = true;
  }
saveChanges() {
  console.log('Trying to save...');
  console.log('User ID:', this.user.id);

  // Check for changes
  const hasChanges =
    this.user.username !== this.originalUser.username ||
    this.user.email !== this.originalUser.email ||
    this.user.password !== this.originalUser.password;

  if (!hasChanges) {
    alert('No changes detected.');
    this.isEditing = false;
    return;
  }

  if (!this.user.id) {
    alert('User ID is missing. Cannot update.');
    return;
  }

  this.http.patch(`http://localhost:3000/users/${this.user.id}`, this.user).subscribe({
    next: () => {
      alert('Profile updated successfully!');
      this.originalUser = { ...this.user };
      this.mainService.setLoggedInUser(this.user);
      localStorage.setItem('user', JSON.stringify(this.user));
      this.isEditing = false;
    },
    error: (err) => {
      console.error('PATCH failed:', err);
      alert('Failed to save. Check console.');
    }
  });
}

}
