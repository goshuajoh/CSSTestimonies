// src/types/student.ts
export interface Student {
  id: string;
  name: string;
  year: 'Year 1' | 'Year 2' | 'Year 3' | 'Year 4';
  imageUrl: string;
  verse: string;
  hobbies: string[];
  testimony: string;
  shortTestimony: string;
}