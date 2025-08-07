import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-report',
  imports: [CommonModule, FormsModule],
  templateUrl: './report.component.html',
  styleUrl: './report.component.css'
})
export class ReportComponent {
report = {
    name: '',
    email: '',
    description: ''
  };

  constructor(private http: HttpClient) {}

  submitReport(form: NgForm) {
    if (form.valid) {
      this.http.post('http://localhost:3000/reports', this.report).subscribe(() => {
        alert('Issue reported successfully!');
        form.resetForm();
      });
    }
  }
}
