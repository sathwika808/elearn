import { Component } from '@angular/core';
import { Flashcard } from '../../models';
import { FlashcardServiceService } from '../services/flashcard-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-bookmark',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './bookmark.component.html',
  styleUrl: './bookmark.component.css'
})
export class BookmarkComponent {
  bookmarks: Flashcard[] = [];

  constructor(private bookmarkService: FlashcardServiceService) {}

  ngOnInit(): void {
    this.bookmarkService.getBookmarksFromServer().subscribe((data: any[]) => {
      this.bookmarks = data;
    });
  }
showToast = false;
removeBookmark(id: number): void {
  const confirmDelete = confirm('Are you sure you want to remove this bookmark?');
  console.log(id);

  if (confirmDelete) {
    this.bookmarkService.removeBookmarkFromServer(id).subscribe({
      next: () => {
        this.bookmarks = this.bookmarks.filter(card => card.id !== id);
        this.showToast = true;

        setTimeout(() => {
          this.showToast = false;
        }, 3000);
      },
      error: (err) => {
        console.error('Failed to remove bookmark:', err);
      }
    });
  }
}


}
