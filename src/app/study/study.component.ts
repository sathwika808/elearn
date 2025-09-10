// // import { Component } from '@angular/core';
// // import { card, Flashcard } from '../../models';
// // import { ActivatedRoute } from '@angular/router';
// // import { FlashcardServiceService } from '../services/flashcard-service.service';
// // import { CommonModule } from '@angular/common';
// // import { FormsModule } from '@angular/forms';

// // @Component({
// //   selector: 'app-study',
// //   imports: [CommonModule, FormsModule],
// //   templateUrl: './study.component.html',
// //   styleUrl: './study.component.css'
// // })
// // export class StudyComponent {
// //   set?: card;
// //   currentIndex = 0;
// //   isFlipped = false;
// //   hasError = false;

// //   constructor(
// //     private route: ActivatedRoute,
// //     private flashcardService: FlashcardServiceService
// //   ) {}

// //   ngOnInit() {
// //     const id = this.route.snapshot.paramMap.get('id');
// //     if (!id) {
// //       this.hasError = true;
// //       return;
// //     }
// //     this.flashcardService.getSet(id).subscribe({
// //       next: (data) => {
// //         console.log(data);
        
// //         // Ensure all cards have a favorite field
// //         data.cards.forEach((card: any) => {
// //           card.favorite = false;
// //           card.bookmarkEntryId = null;
// //         });

// //         this.set = data;
// //         this.currentIndex = 0;
// //         this.isFlipped = false;

// //         this.loadBookmarks();
// //         this.markCardAsReviewed(this.set.cards[0]);
// //       },
// //       error: (err) => {
// //         console.error('Failed to load set:', err);
// //         this.hasError = true;
// //       }
// //     });
// //   }

// //   loadBookmarks() {
// //     this.flashcardService.getBookmarksFromServer().subscribe((bookmarks: any[]) => {
// //       if (!this.set) return;

// //       this.set.cards.forEach(card => {
// //   const match = bookmarks.find(b => b.cardId === card.id);
// //   if (match) {
// //     card.favorite = true;
// //     card.bookmarkEntryId = match.id;
// //   }
// // });

// //     });
// //   }

// //   markCardAsReviewed(card: Flashcard) {
// //     if (!card.isReviewed) {
// //       card.isReviewed = true;
// //       this.flashcardService.updateSet(this.set!.id, this.set!).subscribe(() => {
// //         console.log(`Card ${card.id} marked as reviewed ✅`);
// //       });
// //     }
// //   }

// //   get currentCard(): Flashcard {
// //     if (!this.set || !this.set.cards || this.set.cards.length === 0) {
// //       return {
// //   id: 0,
// //   question: 'No card',
// //   answer: 'No answer',
// //   favorite: false,
// //   difficulty: 'Easy',
// //   IsReviewed: undefined,

// // };
// //     }
// //     return this.set.cards[this.currentIndex];
// //   }

// //   // toggleFavorite(card: any) {
// //   //   if (!card.favorite) {
// //   //     this.flashcardService.addBookmarkToServer({
// //   //       cardId: card.id,
// //   //       question: card.question,
// //   //       answer: card.answer
// //   //     }).subscribe((res: any) => {
// //   //       card.favorite = true;
        
// //   //       this.flashcardService.updateSet(this.set!.id, this.set!).subscribe();
// //   //     });
// //   //   } else {
// //   //     this.flashcardService.removeBookmarkFromServer(card.bookmarkEntryId).subscribe(() => {
// //   //       card.favorite = false;
// //   //       card.bookmarkEntryId = null;
// //   //       this.flashcardService.updateSet(this.set!.id, this.set!).subscribe();
// //   //     });
// //   //   }
// //   // }
// // toggleFavorite(card: any) {
// //   console.log(card)
// //   console.log("Sending bookmark request with:", { cardId: card.id });

// //   this.flashcardService.toggleBookmarkOnServer({ cardId: card.id }) // or card.cardId
// //     .subscribe({
// //       next: (res) => {
// //         console.log("Bookmark response:", res);
// //         card.favorite = res.isBookmarked;
// //         card.bookmarkEntryId = res.id;
// //       },
// //       error: (err) => {
// //         console.error("Bookmark error:", err);
// //       }
// //     });
// // }





// //   flip() {
// //     this.isFlipped = !this.isFlipped;
// //   }

// //   nextCard() {
// //     if (!this.set || !this.set.cards.length) return;
// //     this.currentIndex = (this.currentIndex + 1) % this.set.cards.length;
// //     this.isFlipped = false;
// //     this.markCardAsReviewed(this.set.cards[this.currentIndex]);
// //   }

// //   prevCard() {
// //     if (!this.set || !this.set.cards.length) return;
// //     this.currentIndex = (this.currentIndex - 1 + this.set.cards.length) % this.set.cards.length;
// //     this.isFlipped = false;
// //     this.markCardAsReviewed(this.set.cards[this.currentIndex]);
// //   }
// // }
// import { Component } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { FlashcardServiceService } from '../services/flashcard-service.service';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';

// @Component({
//   selector: 'app-study',
//   imports: [CommonModule, FormsModule],
//   templateUrl: './study.component.html',
//   styleUrl: './study.component.css'
// })
// export class StudyComponent {
//   set: any;              // full set from backend
//   currentIndex = 0;      // current card index
//   isFlipped = false;     // front/back flip
//   hasError = false;

//   constructor(
//     private route: ActivatedRoute,
//     private flashcardService: FlashcardServiceService
//   ) {}

//   ngOnInit() {
//     const id = this.route.snapshot.paramMap.get('id');
//     if (!id) {
//       this.hasError = true;
//       return;
//     }

//     this.flashcardService.getSet(id).subscribe({
//       next: (data) => {
//         console.log(data)
//         this.set = data;
//         this.currentIndex =0;
//         this.isFlipped = false;

//         // mark first card as reviewed
//         if (this.set.cards?.length > 0) {
//           this.markReviewed(this.set.cards[0]);
//         }
//       },
//       error: (err) => {
//         console.error("Failed to load set:", err);
//         this.hasError = true;
//       }
//     });
//   }

//   // ✅ current card (from backend, no fake objects)
//   get currentCard() {
//     return this.set?.cards?.[this.currentIndex];
//   }

//   // ✅ flip card
//   flip() {
//     this.isFlipped = !this.isFlipped;
//   }

//   // ✅ next card
//   nextCard() {
//     if (!this.set?.cards?.length) return;
//     this.currentIndex = (this.currentIndex + 1) % this.set.cards.length;
//     this.isFlipped = false;
//     this.markReviewed(this.currentCard);
//   }

//   // ✅ previous card
//   prevCard() {
//     if (!this.set?.cards?.length) return;
//     this.currentIndex = (this.currentIndex - 1 + this.set.cards.length) % this.set.cards.length;
//     this.isFlipped = false;
//     this.markReviewed(this.currentCard);
//   }

//   // ✅ mark reviewed → send update to backend
//   markReviewed(card: any) {
//     if (!card?.isReviewed) {
//       card.isReviewed = true;
//       this.flashcardService.updateSet(this.set.id, this.set).subscribe(() => {
//         console.log(`Card ${card.id} marked as reviewed ✅`);
//       });
//     }
//   }

//   // ✅ toggle bookmark → always send real backend id
//   toggleFavorite(card: any) {
//     if (!card) return;

//     console.log("Bookmark clicked for card:", card.id);

//     this.flashcardService.toggleBookmarkOnServer({ cardId: card.id }).subscribe({
//       next: (res) => {
//         console.log("Bookmark response:", res);
//         card.favorite = res.isBookmarked;
//         card.bookmarkEntryId = res.id;
//       },
//       error: (err) => {
//         console.error("Bookmark error:", err);
//       }
//     });
//   }
// }


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

flip() {
  this.isFlipped = !this.isFlipped;

  if (this.isFlipped && this.set?.courseId && this.set.cards[this.currentIndex]?.isReviewed === false) {
    this.markReviewed(this.set.cards[this.currentIndex]);
  }
}



  nextCard() {
    if (!this.set?.cards?.length) return;
    this.currentIndex = (this.currentIndex + 1) % this.set.cards.length;
    this.isFlipped = false;
  }

  
  prevCard() {
    if (!this.set?.cards?.length) return;
    this.currentIndex = (this.currentIndex - 1 + this.set.cards.length) % this.set.cards.length;
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
