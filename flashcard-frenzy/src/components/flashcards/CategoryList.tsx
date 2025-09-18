import React from 'react';
import { Card } from '../ui/Card';

interface Category {
  name: string;
  count: number;
}

interface CategoryListProps {
  categories: Category[];
  onSelectCategory: (category: string) => void;
}

export function CategoryList({ categories, onSelectCategory }: CategoryListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((category) => (
        <Card
          key={category.name}
          className="cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => onSelectCategory(category.name)}
        >
          <div className="p-4">
            <h3 className="text-lg font-semibold">{category.name}</h3>
            <p className="text-gray-600">{category.count} sets</p>
          </div>
        </Card>
      ))}
    </div>
  );
}