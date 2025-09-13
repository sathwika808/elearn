
import { Component } from '@angular/core';
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
  set: any;             
  currentIndex = 0;      // which card we are on
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

    // ✅ Load set from backend (with real ids for cards)
    this.flashcardService.getSet(id).subscribe({
      next: (data) => {
        console.log("Loaded set:", data);
        this.set = data;
        this.currentIndex = 0;
        this.isFlipped = false;

        // mark first card reviewed
        if (this.set.cards?.length > 0) {
          this.markReviewed(this.set.cards[0]);
        }
      },
      error: (err) => {
        console.error("Failed to load set:", err);
        this.hasError = true;
      }
    });
  }
showVideo = false;  

flip() {
  this.isFlipped = !this.isFlipped;
  if (this.isFlipped && this.set?.courseId && this.set.cards[this.currentIndex]?.isReviewed === false) {
    this.markReviewed(this.set.cards[this.currentIndex]);
  }
}

prevCard() {
  if (!this.set?.cards?.length) return;
  this.currentIndex = (this.currentIndex - 1 + this.set.cards.length) % this.set.cards.length;
  this.isFlipped = false;
}

nextCard() {
  if (!this.set?.cards?.length) return;
  this.currentIndex = (this.currentIndex + 1) % this.set.cards.length;
  this.isFlipped = false;
}


  
markReviewed(card: any) {
  if (!card?.isReviewed) {
    card.isReviewed = true;
    this.flashcardService.markReviewed(this.set.courseId, card.id).subscribe({
      next: (res) => {
        console.log(`Card ${card.id} marked as reviewed ✅`, res);
      },
      error: (err) => console.error("Error marking reviewed:", err) 
    });
  }
}


  toggleFavorite(card: any) {
    if (!card) return;

    console.log("Bookmark clicked for backend card id:", card.id);

    this.flashcardService.toggleBookmarkOnServer({ cardId: card.id }).subscribe({
      next: (res) => {
        console.log("Bookmark response:", res);
        card.favorite = res.isBookmarked;
        card.bookmarkEntryId = res.id; 
      },
      error: (err) => {
        console.error("Bookmark error:", err);
      }
    });
  }
}
