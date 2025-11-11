import React from 'react';

export enum Level {
  Beginner = 'Débutant',
  Intermediate = 'Intermédiaire',
  Expert = 'Expert',
}

export enum Category {
  Python = 'Python',
  HTML_CSS = 'HTML/CSS',
}

export interface TestCase {
  description: string;
  input?: any;
  expected: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  level: Level;
  category: Category;
  initialCode: string;
  solution: string; // A simplified check by comparing the code output or structure
  points: number;
}

export interface User {
  id: string;
  username: string;
  progress: UserProgress;
}

export interface UserProgress {
  completedChallenges: string[];
  points: number;
  badges: string[]; // Stores badge IDs
}

export interface Badge {
    id: string;
    title: string;
    description: string;
    icon: React.FC<{ className?: string }>;
}
