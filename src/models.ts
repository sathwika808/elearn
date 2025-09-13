export interface Feedback {
  name: string;
  email: string;
  message: string;
  rating: string;
}
export interface Flashcard{
  IsReviewed: any;
  id: number;
  
cardId :number;
  question: string;
  answer: string;
  favorite?: boolean;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  isReviewed? :boolean;
  bookmarkEntryId?: number | null;
}
export interface card {
  courseId: number;
  title: string;
  description: string;
  videoUrl?: string;   
  cards: Flashcard[];
}

// models.ts
export interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

export interface UserDto {
  username: string;
  password: string;
}
