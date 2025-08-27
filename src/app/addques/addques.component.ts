import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-addques',
  imports: [CommonModule, FormsModule],
  templateUrl: './addques.component.html',
  styleUrl: './addques.component.css'
})
export class AddquesComponent {
  courseId!: number;
  question = '';
  answer = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    // Get courseId from route params
    this.courseId = Number(this.route.snapshot.paramMap.get('id'));
  }

submitQuestion() {
  const newCard = {
    question: this.question,
    answer: this.answer,
    favorite: false,
    isReviewed: false,
  
    courseId: this.courseId
  };

  this.http.post('http://localhost:60831/api/Card', newCard, { responseType: 'text' })
    .subscribe(() => {
      alert("Card added");
      // ✅ reset fields manually
      this.question = '';
      this.answer = '';
    });
}

}
