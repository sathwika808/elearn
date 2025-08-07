import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { User } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class MainserviceService {
private url = "http://localhost:3000/courses"
  constructor(private http:HttpClient) { }
  getCourses() {
  return this.http.get<any[]>(this.url);
}

getCourseById(id: number) {
  return this.http.get<any>(`${this.url}/${id}`);
}
 private baseUrl = 'http://localhost:3000/users';
private apiUrl='http://localhost:3000/users'
 

  register(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl, user);
  }
login(email: string, password: string): Observable<User | null> {
  return this.http.get<User[]>(`${this.baseUrl}?email=${email}&password=${password}`).pipe(
    map(users => {
      if (users.length > 0) {
        const user = users[0];
        this.setLoggedInUser(user);  // <--- store the user
        return user;
      }
      return null;
    }),
    catchError(err => throwError(() => new Error('Login failed')))
  );
}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, user);
  }
private loggedInUser: any = null;

setLoggedInUser(user: any) {
  this.loggedInUser = user;
}

getLoggedInUser() {
  return this.loggedInUser;
} 
updateUser(id: string, user: User): Observable<User> {
  return this.http.patch<User>(`${this.apiUrl}/${id}`, user);
}

}
