// src/components/TestimonyCard/CardBack.tsx
import { type FC } from 'react';
import { type Student } from '../../types/student';

interface CardBackProps {
  student: Student;
}

export const CardBack: FC<CardBackProps> = ({ student }) => {
  return (
    <div className="absolute backface-hidden rotate-y-180 w-full h-full rounded-xl border border-gray-200 bg-white shadow-lg">
      <div className="p-4 flex flex-col h-full">
        <h4 className="text-lg font-semibold mb-2">Favorite Verse</h4>
        <p className="text-gray-600 italic mb-4">{student.verse}</p>
        
        <h4 className="text-lg font-semibold mb-2">Hobbies</h4>
        <div className="flex flex-wrap gap-2">
          {student.hobbies.map((hobby) => (
            <span 
              key={hobby} 
              className="bg-gray-100 px-2 py-1 rounded-full text-sm text-gray-700"
            >
              {hobby}
            </span>
          ))}
        </div>
        
        <h4 className="text-lg font-semibold mb-2 mt-4">Brief Testimony</h4>
        <p className="text-gray-600 line-clamp-4">{student.shortTestimony}</p>
      </div>
    </div>
  );
};