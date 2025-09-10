import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { card, Flashcard } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class FlashcardServiceService {
  private setsUrl = 'http://localhost:60831/api/Course';   // for flashcard sets

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
    return this.http.delete(`http://localhost:60831/api/Course/${id}` ,  { responseType: 'text' });
  }

  // ✅ Server-based Bookmark System
  private bookmarksUrl = 'http://localhost:60831/api/BookMark'; // ⚡ use your .NET port


  // ✅ GET all bookmarks from server
  getBookmarksFromServer(): Observable<any[]> {
    return this.http.get<any[]>(this.bookmarksUrl);
  }

  // ✅ Add a new bookmark (POST)
  addBookmarkToServer(bookmark: { cardId: number }): Observable<any> {
    return this.http.post<any>(this.bookmarksUrl, bookmark);
  }

  // ✅ Remove a bookmark by ID (DELETE)
  removeBookmarkFromServer(bookmarkId: number): Observable<any> {
    return this.http.delete(`${this.bookmarksUrl}/${bookmarkId}` , { responseType: 'text' });
  }
// ✅ Toggle (Add/Remove Bookmark)
toggleBookmarkOnServer(bookmark: { cardId: number }): Observable<{ id: number | null, isBookmarked: boolean }> {
  return this.http.post<{ id: number | null, isBookmarked: boolean }>(
    `${this.bookmarksUrl}/toggle`,
    bookmark
  );
}

// 🔹 Mark a specific card as reviewed
markReviewed(courseId: number, cardId: number): Observable<any> {
  return this.http.put<any>(
    `http://localhost:60831/api/Card/${courseId}/Card/${cardId}/review`,
    {}
  );
}



}