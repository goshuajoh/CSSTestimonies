// src/components/AdminPanel/index.tsx
import { useState } from 'react';
import { type Student } from '../../types/student';

type FormData = {
  name: string;
  year: Student['year']; // This ensures it accepts all valid year values
  verse: string;
  hobbies: string;
  testimony: string;
};

export const AdminPanel = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    year: 'Year 1',
    verse: '',
    hobbies: '',
    testimony: '',
  });
  const [generatedCode, setGeneratedCode] = useState('');

  const escapeText = (text: string) => {
    return text
      .replace(/\\/g, '\\\\')
      .replace(/"/g, '\\"')
      .replace(/\n/g, '\\n')
      .trim();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const shortTestimony = formData.testimony.split('.')[0] 
      ? formData.testimony.split('.')[0] + '...'
      : formData.testimony + '...';

    const newTestimony: Student = {
      id: crypto.randomUUID(),
      name: formData.name,
      year: formData.year,
      imageUrl: `/images/${formData.name.toLowerCase().replace(/\s+/g, '-')}.jpg`,
      verse: formData.verse,
      hobbies: formData.hobbies.split(',').map(hobby => hobby.trim()).filter(Boolean),
      testimony: formData.testimony,
      shortTestimony: shortTestimony
    };

    const codeOutput = `  {
    id: "${newTestimony.id}",
    name: "${escapeText(newTestimony.name)}",
    year: "${newTestimony.year}",
    imageUrl: "${newTestimony.imageUrl}",
    verse: "${escapeText(newTestimony.verse)}",
    hobbies: ${JSON.stringify(newTestimony.hobbies)},
    testimony: "${escapeText(newTestimony.testimony)}",
    shortTestimony: "${escapeText(newTestimony.shortTestimony)}"
  },`;

    setGeneratedCode(codeOutput);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Add New Testimony</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="mt-1 w-full rounded-md border p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Year</label>
          <select
            value={formData.year}
            onChange={e => setFormData(prev => ({ 
              ...prev, 
              year: e.target.value as Student['year']
            }))}
            className="mt-1 w-full rounded-md border p-2"
            required
          >
            <option value="Year 1">Year 1</option>
            <option value="Year 2">Year 2</option>
            <option value="Year 3">Year 3</option>
            <option value="Year 4">Year 4</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Bible Verse</label>
          <input
            type="text"
            value={formData.verse}
            onChange={e => setFormData(prev => ({ ...prev, verse: e.target.value }))}
            className="mt-1 w-full rounded-md border p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Hobbies (comma-separated)
          </label>
          <input
            type="text"
            value={formData.hobbies}
            onChange={e => setFormData(prev => ({ ...prev, hobbies: e.target.value }))}
            className="mt-1 w-full rounded-md border p-2"
            placeholder="Choir, Photography, Bible Study"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Testimony</label>
          <textarea
            value={formData.testimony}
            onChange={e => setFormData(prev => ({ ...prev, testimony: e.target.value }))}
            rows={6}
            className="mt-1 w-full rounded-md border p-2"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Generate Code
        </button>
      </form>

      {generatedCode && (
        <div className="mt-8">
          <h2 className="text-lg font-semibold mb-2">Generated Code:</h2>
          <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto whitespace-pre-wrap">
            {generatedCode}
          </pre>
          <button
            onClick={() => navigator.clipboard.writeText(generatedCode)}
            className="mt-2 px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Copy to Clipboard
          </button>
          <p className="mt-2 text-sm text-gray-600">
            1. Copy this code and paste it into src/data/testimonies.ts
            2. Save the student's photo as {formData.name.toLowerCase().replace(/\s+/g, '-')}.jpg in public/images/
          </p>
        </div>
      )}
    </div>
  );
};