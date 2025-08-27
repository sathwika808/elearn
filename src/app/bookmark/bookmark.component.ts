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

  if (confirmDelete) {
    this.bookmarkService.removeBookmarkFromServer(id).subscribe(() => {
      this.bookmarks = this.bookmarks.filter(card => card.id !== id);
      this.showToast = true;

      setTimeout(() => {
        this.showToast = false;
      }, 3000);
    });
  }
  this.bookmarkService.removeBookmarkFromServer(id).subscribe(() => {
    this.bookmarks = this.bookmarks.filter(card => card.id !== id);
    this.showToast = true;

    // Auto-hide after 3 secondsii
    setTimeout(() => {
      this.showToast = false;
    }, 3000);
  });
}


}
