import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { card, Flashcard } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class FlashcardServiceService {
  private setsUrl = 'http://localhost:3000/courses';   // for flashcard sets
  private bookmarksUrl = 'http://localhost:3000/bookmarks'; // for bookmarks

  constructor(private http: HttpClient) {}

  // 🔹 GET a specific flashcard set by ID
  getSet(id: string): Observable<card> {
    return this.http.get<card>(`${this.setsUrl}/${id}`);
  }

  // 🔹 Update the flashcard set (for marking reviewed)
  updateSet(id: string, set: card): Observable<card> {
    return this.http.put<card>(`${this.setsUrl}/${id}`, set);
  }

  // 🔹 Delete a flashcard set (if needed)
  deleteSet(id: string): Observable<any> {
    return this.http.delete(`${this.setsUrl}/${id}`);
  }

  // ✅ Server-based Bookmark System

  // GET all bookmarks from server
  getBookmarksFromServer(): Observable<any[]> {
    return this.http.get<any[]>(this.bookmarksUrl);
  }

  // Add a new bookmark (POST)
  addBookmarkToServer(bookmark: { cardId: number; question: string; answer: string }): Observable<any> {
    return this.http.post<any>(this.bookmarksUrl, bookmark);
  }

  // Remove a bookmark by ID (DELETE)
  removeBookmarkFromServer(bookmarkId: number): Observable<any> {
    return this.http.delete(`${this.bookmarksUrl}/${bookmarkId}`);
  }

  deleteBookmark(id: number) {
  return this.http.delete(`http://localhost:3000/bookmarks/${id}`);
}

}
