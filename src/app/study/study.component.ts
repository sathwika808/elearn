import { Component } from '@angular/core';
import { card, Flashcard } from '../../models';
import { ActivatedRoute } from '@angular/router';
import { FlashcardServiceService } from '../services/flashcard-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-study',
  imports: [CommonModule, FormsModule],
  templateUrl: './study.component.html',
  styleUrl: './study.component.css'
})
export class StudyComponent {
  set?: card;
  currentIndex = 0;
  isFlipped = false;
  hasError = false;

  constructor(
    private route: ActivatedRoute,
    private flashcardService: FlashcardServiceService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.hasError = true;
      return;
    }
    this.flashcardService.getSet(id).subscribe({
      next: (data) => {
        // Ensure all cards have a favorite field
        data.cards.forEach((card: any) => {
          card.favorite = false;
          card.bookmarkEntryId = null;
        });

        this.set = data;
        this.currentIndex = 0;
        this.isFlipped = false;

        this.loadBookmarks();
        this.markCardAsReviewed(this.set.cards[0]);
      },
      error: (err) => {
        console.error('Failed to load set:', err);
        this.hasError = true;
      }
    });
  }

  loadBookmarks() {
    this.flashcardService.getBookmarksFromServer().subscribe((bookmarks: any[]) => {
      if (!this.set) return;

      this.set.cards.forEach(card => {
        const match = bookmarks.find(b => b.cardId === card.id);
        if (match) {
          card.favorite = true;
          card.bookmarkEntryId = match.id;
        }
      });
    });
  }

  markCardAsReviewed(card: Flashcard) {
    if (!card.isReviewed) {
      card.isReviewed = true;
      this.flashcardService.updateSet(this.set!.id, this.set!).subscribe(() => {
        console.log(`Card ${card.id} marked as reviewed ✅`);
      });
    }
  }

  get currentCard(): Flashcard {
    if (!this.set || !this.set.cards || this.set.cards.length === 0) {
      return {
        id: 0,
        question: 'No card',
        answer: 'No answer',
        favorite: false,
        difficulty: 'Easy'
      };
    }
    return this.set.cards[this.currentIndex];
  }

  toggleFavorite(card: any) {
    if (!card.favorite) {
      this.flashcardService.addBookmarkToServer({
        cardId: card.id,
        question: card.question,
        answer: card.answer
      }).subscribe((res: any) => {
        card.favorite = true;
        card.bookmarkEntryId = res.id;
        this.flashcardService.updateSet(this.set!.id, this.set!).subscribe();
      });
    } else {
      this.flashcardService.removeBookmarkFromServer(card.bookmarkEntryId).subscribe(() => {
        card.favorite = false;
        card.bookmarkEntryId = null;
        this.flashcardService.updateSet(this.set!.id, this.set!).subscribe();
      });
    }
  }

  flip() {
    this.isFlipped = !this.isFlipped;
  }

  nextCard() {
    if (!this.set || !this.set.cards.length) return;
    this.currentIndex = (this.currentIndex + 1) % this.set.cards.length;
    this.isFlipped = false;
    this.markCardAsReviewed(this.set.cards[this.currentIndex]);
  }

  prevCard() {
    if (!this.set || !this.set.cards.length) return;
    this.currentIndex = (this.currentIndex - 1 + this.set.cards.length) % this.set.cards.length;
    this.isFlipped = false;
    this.markCardAsReviewed(this.set.cards[this.currentIndex]);
  }
}
