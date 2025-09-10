// // import { CommonModule } from '@angular/common';
// // import { HttpClient } from '@angular/common/http';
// // import { Component, ElementRef, ViewChild } from '@angular/core';
// // import { FormsModule, NgForm } from '@angular/forms';
// // import { FeedbackservicueService } from '../services/feedbackservicue.service';
// // import { from } from 'rxjs';
// // import { Router, RouterLink, RouterModule } from '@angular/router';
// // import { MainserviceService } from '../services/mainservice.service';
// // import { FlashcardServiceService } from '../services/flashcard-service.service';
// // import { animate, style, transition, trigger } from '@angular/animations';
// // import { Flashcard } from '../../models';

// // @Component({
// //   selector: 'app-main',
// //   imports: [CommonModule, FormsModule, RouterModule],
// //   templateUrl: './main.component.html',
// //   styleUrl: './main.component.css',
// //   animations: [
// //     trigger('fadeUp', [
// //       transition(':enter', [
// //         style({ opacity: 0, transform: 'translateY(40px)' }),
// //         animate('800ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
// //       ])
// //     ])
// //   ]
// // })
// // export class MainComponent {
// //   countReviewed(cards: Flashcard[]): number {
// //     return cards.filter(card => card.isReviewed).length;
// //   }

// //   getProgress(cards: Flashcard[]): number {
// //     if (!cards.length) return 0;
// //     return Math.round((this.countReviewed(cards) / cards.length) * 100);
// //   }

// //   showSection = false;
// //   @ViewChild('carousel', { static: true }) carousel!: ElementRef;

// //   scrollLeft() {
// //     this.carousel.nativeElement.scrollBy({
// //       left: -300,
// //       behavior: 'smooth'
// //     });
// //   }

// //   scrollRight() {
// //     this.carousel.nativeElement.scrollBy({
// //       left: 300,
// //       behavior: 'smooth'
// //     });
// //   }

// //   feedback = {
// //     name: '',
// //     email: '',
// //     message: '',
// //     rating: ''
// //   };
// // report(){
// //   this.router.navigate(['report'])
// // }
// //   username: string = ''; // ✅ ADDED

// //   constructor(
// //     private http: HttpClient,
// //     private service: FeedbackservicueService,
// //     private router: Router,
// //     private mainservice: MainserviceService,
// //     private flashserv: FlashcardServiceService
// //   ) {}

// //   onsubmit(form: NgForm) {
// //     if (form.invalid) return;
// //     this.service.submitFeedback(this.feedback).subscribe(() => {
// //       console.log('submiteed fedback');
// //       this.reset();
// //     });
// //   }

// //   onlogout() {
// //     alert('do you want to logout');
// //     this.router.navigate(['login']);
// //   }

// //   reset() {
// //     this.feedback = {
// //       name: '',
// //       email: '',
// //       message: '',
// //       rating: ''
// //     };
// //   }

// //   courses: any[] = [];
// //   filteredCourses: any[] = [];
// //   searchTerm: string = '';

// //   goToProfile() {
// //     this.router.navigate(['profile']);
// //   }

// // ngOnInit(): void {
// //   this.mainservice.getCourses().subscribe((data) => {
// //     this.courses = data;
// //     this.filteredCourses = data;
// //   });

// //   // ✅ Try getting from memory first
// //   const user = this.mainservice.getLoggedInUser();

// //   // ✅ Fallback to localStorage
// //   if (!user) {
// //     const stored = localStorage.getItem('user');
// //     if (stored) {
// //       const parsed = JSON.parse(stored);
// //       this.mainservice.setLoggedInUser(parsed); // Restore it in memory
// //       this.username = parsed.username || '';
// //     }
// //   } else {
// //     this.username = user.username || '';
// //   }
// // }

// //   onSearch(): void {
// //     const term = this.searchTerm.toLowerCase();
// //     this.filteredCourses = this.courses.filter(course =>
// //       course.title.toLowerCase().includes(term)
// //     );
// //   }

// //   viewStudy(courseId: number) {
// //     this.router.navigate(['study', courseId]);
// //   }

// //   startQuiz(courseId: number) {
// //     this.router.navigate(['quiz', courseId]);
// //   }

// //   dontsuggest(id: string) {
// //     const confirmDelete = confirm('Are you sure you want to delete this course from suggestions?');

// //     if (confirmDelete) {
// //       this.flashserv.deleteSet(id).subscribe({
// //         next: () => {
// //           alert('Deleted successfully!');
// //           this.courses = this.courses.filter(course => course.id !== id);
// //         },
// //         error: (err) => {
// //           console.error('Delete failed:', err);
// //           alert('Something went wrong while deleting.');
// //         }
// //       });
// //     }
// //   }

// //   showAddCard = false;
// //   selectedCourseId = '';
// //   newCard = {
// //     question: '',
// //     answer: '',
// //     favorite: false
// //   };

// //   navigateToAddQuestion(courseId: string) {
// //     this.router.navigate(['/add-question', courseId]);
// //   }

// //   submitCard() {
// //     if (!this.selectedCourseId || !this.newCard.question || !this.newCard.answer) return;

// //     const courseIndex = this.courses.findIndex(c => c.id === this.selectedCourseId);
// //     if (courseIndex === -1) return;

// //     const newId = Date.now(); // or generate smarter ID if needed
// //     const cardToAdd = { ...this.newCard, id: newId };

// //     this.courses[courseIndex].cards.push(cardToAdd);

// //     this.http.patch(`http://localhost:3000/courses/${this.selectedCourseId}`, {
// //       cards: this.courses[courseIndex].cards
// //     }).subscribe(() => {
// //       alert('Card added!');
// //       this.newCard = { question: '', answer: '', favorite: false };
// //       this.showAddCard = false;
// //     });
// //   }

// //   @ViewChild('sectionRef') sectionRef!: ElementRef;

// //   ngAfterViewInit() {
// //     const observer = new IntersectionObserver(entries => {
// //       if (entries[0].isIntersecting) {
// //         this.showSection = true;
// //       }
// //     }, { threshold: 0.3 });

// //     observer.observe(this.sectionRef.nativeElement);
// //   }
// //   bookmark(){
// //     this.router.navigate(['bookmark'])
// //   }
// //   refer(){
// //     this.router.navigate(['refer'])
// //   }
// // }
// 
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FeedbackservicueService } from '../services/feedbackservicue.service';
import { Router, RouterModule } from '@angular/router';
import { MainserviceService } from '../services/mainservice.service';
import { FlashcardServiceService } from '../services/flashcard-service.service';
import { animate, style, transition, trigger } from '@angular/animations';
import { Flashcard } from '../../models';

@Component({
  selector: 'app-main',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css',
  animations: [
    trigger('fadeUp', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(40px)' }),
        animate('800ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class MainComponent {
  countReviewed(cards: Flashcard[]): number {
    return cards.filter(card => card.isReviewed).length;
  }

  getProgress(cards: Flashcard[]): number {
    if (!cards.length) return 0;
    return Math.round((this.countReviewed(cards) / cards.length) * 100);
  }

  showSection = false;
  @ViewChild('carousel', { static: true }) carousel!: ElementRef;

  scrollLeft() {
    this.carousel.nativeElement.scrollBy({ left: -300, behavior: 'smooth' });
  }

  scrollRight() {
    this.carousel.nativeElement.scrollBy({ left: 300, behavior: 'smooth' });
  }

  feedback = { name: '', email: '', message: '', rating: '' };
  username: string = '';

  courses: any[] = [];
  filteredCourses: any[] = [];
  searchTerm: string = '';

  showAddCard = false;
  selectedCourseId = '';
  newCard = { question: '', answer: '', favorite: false };

  constructor(
    private http: HttpClient,
    private service: FeedbackservicueService,
    private router: Router,
    private mainservice: MainserviceService,
    private flashserv: FlashcardServiceService
  ) {}

  // ---------------- FEEDBACK ----------------
  onsubmit(form: NgForm) {
    if (form.invalid) return;

    this.service.submitFeedback(this.feedback).subscribe({
      next: () => {
        console.log('submitted feedback');
        this.reset(form);
      },
      error: (err) => {
        console.error('Error submitting feedback:', err);
      }
    });
  }

  reset(form: NgForm) {
    this.feedback = { name: '', email: '', message: '', rating: '' };
    form.resetForm();
  }

  // ---------------- NAVIGATION ----------------
  report() {
    this.router.navigate(['report']);
  }

  goToProfile() {
    this.router.navigate(['profile']);
  }

  bookmark() {
    this.router.navigate(['bookmark']);
  }

  refer() {
    this.router.navigate(['refer']);
  }

  onlogout() {
    if (confirm('Do you want to logout?')) {
      this.mainservice.logout();
      this.router.navigate(['login']);
    }
  }

  // ---------------- INIT ----------------
  ngOnInit(): void {
    this.mainservice.getCourses().subscribe((data) => {
      this.courses = data;
      this.filteredCourses = data;
    });

    const stored = localStorage.getItem('user');
    console.log(stored)
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        this.username = parsed.username || '';
        this.mainservice.setLoggedInUser(parsed);
      } catch (e) {
        console.error('Invalid JSON in localStorage.user', e);
        this.username = '';
        this.mainservice.setLoggedInUser(null);
      }
    }
  }

//SEARCH 
  onSearch(): void {
    const term = this.searchTerm.toLowerCase();
    this.filteredCourses = this.courses.filter(course =>
      course.title.toLowerCase().includes(term)
    );
  }

  //  COURSE ACTIONS
  viewStudy(courseId: number) {
    this.router.navigate(['/study', courseId]);
  }

  startQuiz(courseId: number) {
    this.router.navigate(['quiz', courseId]);
  }

  dontsuggest(id: string) {
    if (confirm('Are you sure you want to delete this course from suggestions?')) {
      this.flashserv.deleteSet(id).subscribe({
        next: () => {
          alert('Deleted successfully!');
          this.courses = this.courses.filter(course => course.id !== id);
        },
        error: (err) => {
          console.error('Delete failed:', err);
          alert('Something went wrong while deleting.');
        }
      });
    }
  }

  navigateToAddQuestion(courseId: string) {
    this.router.navigate(['/add-question', courseId]);
  }

  submitCard() {
    if (!this.selectedCourseId || !this.newCard.question || !this.newCard.answer) return;

    const courseIndex = this.courses.findIndex(c => c.id === this.selectedCourseId);
    if (courseIndex === -1) return;

    const newId = Date.now();
    const cardToAdd = { ...this.newCard, id: newId };
    this.courses[courseIndex].cards.push(cardToAdd);

    this.http.patch(`http://localhost:3000/courses/${this.selectedCourseId}`, {
      cards: this.courses[courseIndex].cards
    }).subscribe(() => {
      alert('Card added!');
      this.newCard = { question: '', answer: '', favorite: false };
      this.showAddCard = false;
    });
  }

  // ---------------- ANIMATION ----------------
  @ViewChild('sectionRef') sectionRef!: ElementRef;

  ngAfterViewInit() {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        this.showSection = true;
      }
    }, { threshold: 0.3 });
    observer.observe(this.sectionRef.nativeElement);
  }
}

























