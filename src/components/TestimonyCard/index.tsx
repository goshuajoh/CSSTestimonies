// src/components/TestimonyCard/index.tsx
import { type FC, useState } from 'react';
import { type Student } from '../../types/student';
import { CardFront } from './CardFront';
import { CardBack } from './CardBack';
import { ExpandedView } from './ExpandedView';

interface TestimonyCardProps {
  student: Student;
}

export const TestimonyCard: FC<TestimonyCardProps> = ({ student }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <div 
        className="group perspective-1000 cursor-pointer w-64 h-96"
        onClick={() => setIsExpanded(true)}
      >
        <div className="relative preserve-3d duration-500 w-full h-full group-hover:rotate-y-180">
          <CardFront student={student} />
          <CardBack student={student} />
        </div>
      </div>

      {isExpanded && (
        <ExpandedView 
          student={student} 
          onClose={() => setIsExpanded(false)} 
        />
      )}
    </>
  );
};