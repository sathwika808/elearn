import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { card, Flashcard } from '../../models';
import { ActivatedRoute, Router } from '@angular/router';
import { FlashcardServiceService } from '../services/flashcard-service.service';

@Component({
  selector: 'app-quiz',
  imports: [CommonModule, FormsModule],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent {
  set?: card;
  currentQuestionIndex = 0;
  options: string[] = [];
  selectedAnswer: string = '';
  showAnswer = false;
  score = 0;

  constructor(
    private route: ActivatedRoute,
    private flashcardService: FlashcardServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.flashcardService.getSet(id).subscribe(set => {
        this.set = set;
        this.loadQuestion();
      });
    }
  }

  get currentCard(): Flashcard {
    return this.set!.cards[this.currentQuestionIndex];
  }

  loadQuestion() {
    if (!this.set) return;

    const correct = this.currentCard.answer;
    const allAnswers = this.set.cards.map(card => card.answer);
    const wrongAnswers = allAnswers.filter(ans => ans !== correct);
    const randomWrong = wrongAnswers.sort(() => 0.5 - Math.random()).slice(0, 3);

    this.options = [...randomWrong, correct].sort(() => 0.5 - Math.random());
    this.selectedAnswer = '';
    this.showAnswer = false;
  }

  selectAnswer(answer: string) {
    this.selectedAnswer = answer;
    this.showAnswer = true;

    if (answer === this.currentCard.answer) {
      this.score++;
    }
  }

  next() {
    if (this.currentQuestionIndex + 1 < this.set!.cards.length) {
      this.currentQuestionIndex++;
      this.loadQuestion();
    } else {
      alert(`🎉 Quiz finished! Your score: ${this.score} / ${this.set!.cards.length}`);
    }
  }

  skip() {
    if (!this.set) return;

    const skippedCard = this.set.cards.splice(this.currentQuestionIndex, 1)[0];
    this.set.cards.push(skippedCard);

    // If we're at end of array, reset index
    if (this.currentQuestionIndex >= this.set.cards.length) {
      this.currentQuestionIndex = 0;
    }

    this.loadQuestion();
  }
}
