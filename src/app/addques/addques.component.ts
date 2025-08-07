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
courseId!: string;
  question = '';
  answer = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.courseId = this.route.snapshot.paramMap.get('id')!;
  }

  submitQuestion() {
    const newCard = {
      id: Date.now(),
      question: this.question,
      answer: this.answer,
      favorite: false
    };

    this.http.get<any[]>(`http://localhost:3000/courses?id=${this.courseId}`)
      .subscribe((courses) => {
        const course = courses[0];
        course.cards.push(newCard);
        this.http.patch(`http://localhost:3000/courses/${this.courseId}`, { cards: course.cards })
          .subscribe(() => alert('✅ Question added successfully!'));
          this.reset()
      });
  }
reset(){
  this.question=''
  this.answer=''
}
}
