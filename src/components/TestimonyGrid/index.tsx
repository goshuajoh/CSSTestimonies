// src/components/TestimonyGrid/index.tsx
import { type FC, useState, useMemo } from 'react';
// Remove the Student import since it's not directly used
import { TestimonyCard } from '../TestimonyCard';
import { SearchAndFilter } from '../SearchAndFilter';
import { testimonies } from '../../data/testimonies';

export const TestimonyGrid: FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('All Years');
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);
  const [isFilterExpanded, setIsFilterExpanded] = useState(false);

  const allHobbies = useMemo(() => {
    const hobbiesSet = new Set<string>();
    testimonies.forEach(student => {
      student.hobbies.forEach(hobby => hobbiesSet.add(hobby));
    });
    return Array.from(hobbiesSet).sort();
  }, []);

  const filteredStudents = useMemo(() => {
    return testimonies.filter((student) => {
      const searchPattern = searchQuery.toLowerCase();
      const matchesSearch = searchQuery === '' || 
        student.name.toLowerCase().includes(searchPattern) ||
        student.testimony.toLowerCase().includes(searchPattern) ||
        student.verse.toLowerCase().includes(searchPattern) ||
        student.hobbies.some(hobby => hobby.toLowerCase().includes(searchPattern));

      const matchesYear = selectedYear === 'All Years' || student.year === selectedYear;

      const matchesHobbies = selectedHobbies.length === 0 || 
        selectedHobbies.every(hobby => student.hobbies.includes(hobby));

      return matchesSearch && matchesYear && matchesHobbies;
    });
  }, [searchQuery, selectedYear, selectedHobbies]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Student Testimonies</h1>
      
      <SearchAndFilter
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedHobbies={selectedHobbies}
        setSelectedHobbies={setSelectedHobbies}
        allHobbies={allHobbies}
        isFilterExpanded={isFilterExpanded}
        setIsFilterExpanded={setIsFilterExpanded}
      />
      
      {filteredStudents.length === 0 ? (
        <div className="text-center text-gray-600 py-12">
          <p>No students found matching your criteria.</p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedYear('All Years');
              setSelectedHobbies([]);
            }}
            className="mt-4 text-blue-500 hover:text-blue-700"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {filteredStudents.map((student) => (
            <TestimonyCard key={student.id} student={student} />
          ))}
        </div>
      )}
    </div>
  );
};