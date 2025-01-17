import { type FC, useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { type Student } from '../../types/student';

interface ExpandedViewProps {
  student: Student;
  onClose: () => void;
}
export const ExpandedView: FC<ExpandedViewProps> = ({ student, onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger animation after mount
    requestAnimationFrame(() => {
      setIsVisible(true);
    });
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Wait for animation to complete before unmounting
    setTimeout(onClose, 300);
  };
  
  return (
    <div 
      className={`fixed inset-0 bg-black transition-opacity duration-300 flex items-center justify-center z-50 p-4 ${
        isVisible ? 'bg-opacity-50' : 'bg-opacity-0'
      }`}
      onClick={handleClose}
    >
      <div 
        className={`bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative transition-all duration-300 ${
          isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        onClick={e => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-24 h-24 rounded-full overflow-hidden">
              <img 
                src={student.imageUrl}
                alt={student.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h2 className="text-2xl font-bold">{student.name}</h2>
              <p className="text-gray-600">{student.year}</p>
            </div>
          </div>
          
          <section className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Favorite Bible Verse</h3>
            <blockquote className="border-l-4 border-blue-500 pl-4 italic">
              {student.verse}
            </blockquote>
          </section>
          
          <section className="mb-6">
            <h3 className="text-xl font-semibold mb-2">Hobbies & Interests</h3>
            <div className="flex flex-wrap gap-2">
              {student.hobbies.map((hobby) => (
                <span 
                  key={hobby} 
                  className="bg-gray-100 px-3 py-1 rounded-full text-sm"
                >
                  {hobby}
                </span>
              ))}
            </div>
          </section>
          
          <section>
            <h3 className="text-xl font-semibold mb-2">Full Testimony</h3>
            <p className="text-gray-700 whitespace-pre-wrap">{student.testimony}</p>
          </section>
        </div>
      </div>
    </div>
  );
};