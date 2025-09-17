'use client';

import { useState } from 'react';
import { NewsletterSection } from '@/types/newsletter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2, GripVertical } from 'lucide-react';

interface NewsletterSectionsProps {
  sections: NewsletterSection[];
  onChange: (sections: NewsletterSection[]) => void;
}

export const NewsletterSections = ({ sections, onChange }: NewsletterSectionsProps) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const addSection = () => {
    const newSection: NewsletterSection = {
      id: Date.now().toString(),
      content: '',
      type: 'text',
    };
    onChange([...sections, newSection]);
  };

  const removeSection = (id: string) => {
    onChange(sections.filter(section => section.id !== id));
  };

  const updateSection = (id: string, updates: Partial<NewsletterSection>) => {
    onChange(
      sections.map(section =>
        section.id === id ? { ...section, ...updates } : section
      )
    );
  };

  const moveSection = (fromIndex: number, toIndex: number) => {
    const newSections = [...sections];
    const [movedSection] = newSections.splice(fromIndex, 1);
    newSections.splice(toIndex, 0, movedSection);
    onChange(newSections);
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== dropIndex) {
      moveSection(draggedIndex, dropIndex);
    }
    setDraggedIndex(null);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Newsletter Sections</span>
          <Button onClick={addSection} size="sm" className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Section
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {sections.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No sections yet. Click &quot;Add Section&quot; to get started.</p>
          </div>
        ) : (
          sections.map((section, index) => (
            <div
              key={section.id}
              className="border rounded-lg p-4 space-y-3"
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, index)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <GripVertical className="h-4 w-4 text-gray-400 cursor-move" />
                  <span className="text-sm font-medium">Section {index + 1}</span>
                </div>
                <Button
                  onClick={() => removeSection(section.id)}
                  variant="ghost"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div>
                <label className="text-sm font-medium">Type</label>
                <Select
                  value={section.type}
                  onValueChange={(value: 'text' | 'image' | 'button') =>
                    updateSection(section.id, { type: value })
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="button">Button</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Content (Markdown)</label>
                <Textarea
                  value={section.content}
                  onChange={(e) => updateSection(section.id, { content: e.target.value })}
                  placeholder="Enter your content using Markdown..."
                  className="mt-1 min-h-[100px]"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Supports Markdown: **bold**, *italic*, [links](url), # headers, etc.
                </p>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};
