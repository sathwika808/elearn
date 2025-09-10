// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';
// import { User, UserDto } from '../../models';

// @Injectable({
//   providedIn: 'root'
// })
// export class MainserviceService {

//   constructor(private http: HttpClient) {
//       const stored = localStorage.getItem('user');
//     if (stored) {
//       this.loggedInUserSubject.next(JSON.parse(stored));
//     }
//   }


//   private loggedInUserSubject = new BehaviorSubject<User | null>(null);
//   loggedInUser$ = this.loggedInUserSubject.asObservable();

//   // API URLs
//   private courseUrl = 'http://localhost:60831/api/Course';
//   private userUrl = 'http://localhost:60831/api/User';
//   private loginUrl = 'http://localhost:60831/api/User/Login';

//   //  COURSE METHODS 
//   getCourses(): Observable<any[]> {
//     return this.http.get<any[]>(this.courseUrl);
//   }

//   getCourseById(id: number): Observable<any> {
//     return this.http.get<any>(`${this.courseUrl}/${id}`);
//   }

//   //  USER METHODS 
//   register(user: User): Observable<any> {
//     return this.http.post<User>(this.userUrl, user);
//   }

//   // login(email: string, password: string): Observable<User | null> {
//   //   return this.http.get<User[]>(`${this.userUrl}?email=${email}&password=${password}`).pipe(
//   //     map(users => {
//   //       if (users.length > 0) {
//   //         const user = users[0];
//   //         this.setLoggedInUser(user);  // store user in memory
//   //         return user;
//   //       }
//   //       return null;
//   //     }),
//   //     catchError(err => throwError(() => new Error('Login failed')))
//   //   );
//   // }

//   getUsers(): Observable<User[]> {
//     return this.http.get<User[]>(this.userUrl);
//   }

//   addUser(user: User): Observable<any> {
//     return this.http.post(this.userUrl, user, { responseType: 'text' });
//   }

//   updateUser(id: number, user: User): Observable<User> {
//     return this.http.patch<User>(`${this.userUrl}/${id}`, user);
//   }

//   // JWT LOGIN 
//   jwtLogin(loginData: UserDto): Observable<any> {
//     return this.http.post<any>(this.loginUrl, loginData).pipe(
//       map((res: any) => {
//         // assume backend returns { token: "....", user: {..} }
//         if (res && res.token) {
//           localStorage.setItem('token', res.token);   // save token
//           localStorage.setItem('user', JSON.stringify(res.user)); // save user
//           this.loggedInUser = res.user;               // also keep in memory
//         }
//         return res;
//       })
//     );
//   }

//   // ---------- AUTH HELPER METHODS ----------
//   private loggedInUser: any = null;

// setLoggedInUser(user: User | null) {
//   if (user) {
//     localStorage.setItem('user', JSON.stringify(user));
//   } else {
//     localStorage.removeItem('user');
//   }
//   this.loggedInUserSubject.next(user);
// }
//  getLoggedInUser(): User | null {
//     return this.loggedInUserSubject.value;
//   }

//   getToken(): string | null {
//     return localStorage.getItem('token');
//   }

//   logout() {
//     this.loggedInUser = null;
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//   }

//   // Example of protected API call (requires token)
//   getProtectedUsers(): Observable<User[]> {
//     const token = this.getToken();
//     const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
//     return this.http.get<User[]>(this.userUrl, { headers });
//   }
// }

// 

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User, UserDto } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class MainserviceService {
  private loggedInUserSubject = new BehaviorSubject<User | null>(null);
  loggedInUser$ = this.loggedInUserSubject.asObservable();

  private loggedInUser: User | null = null;

  // API URLs
  private courseUrl = 'http://localhost:60831/api/Course';
  private userUrl = 'http://localhost:60831/api/User';
  private loginUrl = 'http://localhost:60831/api/User/Login';

  constructor(private http: HttpClient) {
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        const parsed: User = JSON.parse(stored);
        this.loggedInUserSubject.next(parsed);
        this.loggedInUser = parsed;
      } catch (e) {
        console.error("Invalid JSON in localStorage for 'user':", stored);
        localStorage.removeItem('user');
      }
    }
  }

  // ---------------- COURSE METHODS ----------------
  getCourses(): Observable<any[]> {
    return this.http.get<any[]>(this.courseUrl);
  }

  getCourseById(id: number): Observable<any> {
    return this.http.get<any>(`${this.courseUrl}/${id}`);
  }

  // ---------------- USER METHODS ----------------
  register(user: User): Observable<any> {
    return this.http.post<User>(this.userUrl, user);
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl);
  }

  addUser(user: User): Observable<any> {
    return this.http.post(this.userUrl, user, { responseType: 'text' });
  }

  updateUser(id: number, user: User): Observable<User> {
    return this.http.patch<User>(`${this.userUrl}/${id}`, user);
  }

  // ---------------- JWT LOGIN ----------------
  jwtLogin(loginData: UserDto): Observable<any> {
    return this.http.post<any>(this.loginUrl, loginData).pipe(
      map((res: any) => {
        if (res && res.token) {
          localStorage.setItem('token', res.token);

          // 👇 build consistent user object
          const user: User = {
            id: res.userId, username: res.userName,
            email: res.email,
            password: res.password
          };

          localStorage.setItem('user', JSON.stringify(user));
          this.loggedInUser = user;
          this.loggedInUserSubject.next(user);
        }
        return res;
      })
    );
  }

  // ---------------- AUTH HELPER METHODS ----------------
  setLoggedInUser(user: User | null) {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
    this.loggedInUserSubject.next(user);
  }

  getLoggedInUser(): User | null {
    return this.loggedInUserSubject.value;
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  logout() {
    this.loggedInUser = null;
    this.loggedInUserSubject.next(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  // Example of protected API call (requires token)
  getProtectedUsers(): Observable<User[]> {
    const token = this.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User[]>(this.userUrl, { headers });
  }
}
