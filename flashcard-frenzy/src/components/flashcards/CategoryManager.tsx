import React, { useState, useEffect } from 'react';
import { CategoryList } from './CategoryList';

export function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();
      
      // Transform the data to include count
      const categoriesWithCount = data.map(category => ({
        name: category,
        count: 0 // You can add an API endpoint to get actual counts
      }));
      
      setCategories(categoriesWithCount);
    } catch (err) {
      setError('Failed to load categories');
    } finally {
      setLoading(false);
    }
  };

  const handleCategorySelect = (category: string) => {
    // Navigate to category detail or filter flashcards
    window.location.href = `/flashcards?category=${encodeURIComponent(category)}`;
  };

  if (loading) return <div>Loading categories...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Categories</h2>
      <CategoryList 
        categories={categories}
        onSelectCategory={handleCategorySelect}
      />
    </div>
  );
}