import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Feedback } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class FeedbackservicueService {

   private apiUrl = 'http://localhost:60831/api/FeedBack';

  constructor(private http: HttpClient) {}

  submitFeedback(feedback: any) {
    return this.http.post(this.apiUrl, feedback, { responseType: 'text' });
  }
}
