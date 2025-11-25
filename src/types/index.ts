export interface City {
  name: string;
  lat: number;
  lng: number;
  description: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Quiz {
  questions: QuizQuestion[];
}

export interface TutorialStep {
  stepNumber: number;
  title: string;
  description: string;
  materials?: string[];
}

export interface Show {
  id: string;
  title: string;
  date: string;
  type: 'live' | 'past';
  videoUrl?: string;
  description: string;
}
