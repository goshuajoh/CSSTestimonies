// src/components/TestimonyCard/CardFront.tsx
import { type FC } from 'react';
import { type Student } from '../../types/student';

interface CardFrontProps {
  student: Student;
}

export const CardFront: FC<CardFrontProps> = ({ student }) => {
  return (
    <div className="absolute backface-hidden w-full h-full rounded-xl border border-gray-200 bg-white shadow-lg">
      <div className="p-4 flex flex-col items-center">
        <div className="w-40 h-40 rounded-full overflow-hidden mb-4">
          <img 
            src={student.imageUrl} 
            alt={student.name} 
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xl font-semibold text-gray-800">{student.name}</h3>
        <p className="text-gray-600">{student.year}</p>
      </div>
    </div>
  );
};