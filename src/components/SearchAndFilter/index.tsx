// src/components/SearchAndFilter/index.tsx
import { type FC } from 'react';
import { Search, Filter, X } from 'lucide-react';

interface SearchAndFilterProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  selectedHobbies: string[];
  setSelectedHobbies: (hobbies: string[]) => void;
  allHobbies: string[];
  isFilterExpanded: boolean;
  setIsFilterExpanded: (expanded: boolean) => void;
}

export const SearchAndFilter: FC<SearchAndFilterProps> = ({
  searchQuery,
  setSearchQuery,
  selectedYear,
  setSelectedYear,
  selectedHobbies,
  setSelectedHobbies,
  allHobbies,
  isFilterExpanded,
  setIsFilterExpanded,
}) => {
  const years = ['All Years', 'Year 1', 'Year 2', 'Year 3', 'Year 4'];

  const handleHobbyToggle = (hobby: string) => {
    if (selectedHobbies.includes(hobby)) {
      setSelectedHobbies(selectedHobbies.filter(h => h !== hobby));
    } else {
      setSelectedHobbies([...selectedHobbies, hobby]);
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedYear('All Years');
    setSelectedHobbies([]);
  };

  const hasActiveFilters = searchQuery || selectedYear !== 'All Years' || selectedHobbies.length > 0;

  return (
    <div className="mb-8 space-y-4">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search by name, testimony, or bible verse..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>

      {/* Filter Toggle and Clear Filters */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsFilterExpanded(!isFilterExpanded)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
        >
          <Filter className="h-4 w-4" />
          {isFilterExpanded ? 'Hide Filters' : 'Show Filters'}
        </button>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-red-600 hover:text-red-800 flex items-center gap-1"
          >
            <X className="h-4 w-4" />
            Clear Filters
          </button>
        )}
      </div>

      {/* Expanded Filters */}
      {isFilterExpanded && (
        <div className="bg-gray-50 p-4 rounded-lg space-y-4">
          {/* Year Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Year
            </label>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            >
              {years.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          {/* Hobbies Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hobbies
            </label>
            <div className="flex flex-wrap gap-2">
              {allHobbies.map((hobby) => (
                <button
                  key={hobby}
                  onClick={() => handleHobbyToggle(hobby)}
                  className={`px-3 py-1 rounded-full text-sm ${
                    selectedHobbies.includes(hobby)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {hobby}
                </button>
              ))}
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="pt-2 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-2">Active Filters:</p>
              <div className="flex flex-wrap gap-2">
                {selectedYear !== 'All Years' && (
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {selectedYear}
                  </span>
                )}
                {selectedHobbies.map((hobby) => (
                  <span 
                    key={hobby}
                    className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center gap-1"
                  >
                    {hobby}
                    <X 
                      className="h-3 w-3 cursor-pointer"
                      onClick={() => handleHobbyToggle(hobby)}
                    />
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};