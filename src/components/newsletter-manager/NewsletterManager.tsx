'use client';

import { useState, useEffect } from 'react';
import { Newsletter } from '@/types/newsletter';
import { NewsletterEditor } from '@/components/newsletter-editor/NewsletterEditor';
import { NewsletterList } from './NewsletterList';
import { NewsletterPreviewDrawer } from './NewsletterPreviewDrawer';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

export const NewsletterManager = () => {
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [selectedNewsletter, setSelectedNewsletter] = useState<Newsletter | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [previewNewsletterData, setPreviewNewsletterData] = useState<Newsletter | null>(null);

  useEffect(() => {
    // Load newsletters from localStorage
    const savedNewsletters = localStorage.getItem('newsletters');
    if (savedNewsletters) {
      try {
        const parsed = JSON.parse(savedNewsletters);
        // Convert date strings back to Date objects
        const newslettersWithDates = parsed.map((nl: Newsletter) => ({
          ...nl,
          metadata: {
            ...nl.metadata,
            createdAt: new Date(nl.metadata.createdAt),
            updatedAt: new Date(nl.metadata.updatedAt),
          },
          scheduledDate: nl.scheduledDate ? new Date(nl.scheduledDate) : undefined,
        }));
        setNewsletters(newslettersWithDates);
      } catch (error) {
        console.error('Error loading newsletters:', error);
      }
    }
  }, []);

  const saveNewsletter = (newsletter: Newsletter) => {
    const updatedNewsletters = newsletters.find(nl => nl.id === newsletter.id)
      ? newsletters.map(nl => nl.id === newsletter.id ? newsletter : nl)
      : [...newsletters, newsletter];

    setNewsletters(updatedNewsletters);
    localStorage.setItem('newsletters', JSON.stringify(updatedNewsletters));
    setIsEditing(false);
    setSelectedNewsletter(null);
  };

  const deleteNewsletter = (id: string) => {
    const updatedNewsletters = newsletters.filter(nl => nl.id !== id);
    setNewsletters(updatedNewsletters);
    localStorage.setItem('newsletters', JSON.stringify(updatedNewsletters));
  };

  const startNewNewsletter = () => {
    setSelectedNewsletter(null);
    setIsEditing(true);
  };

  const editNewsletter = (newsletter: Newsletter) => {
    setSelectedNewsletter(newsletter);
    setIsEditing(true);
  };

  const previewNewsletter = (newsletter: Newsletter) => {
    setPreviewNewsletterData(newsletter);
  };

  const closePreview = () => {
    setPreviewNewsletterData(null);
  };

  if (isEditing) {
    return (
      <NewsletterEditor
        newsletter={selectedNewsletter || undefined}
        onSave={saveNewsletter}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Newsletter Manager</h1>
            <p className="text-gray-600 mt-2">Manage your email campaigns</p>
          </div>
          <Button onClick={startNewNewsletter} className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Newsletter
          </Button>
        </div>

        <NewsletterList
          newsletters={newsletters}
          onEdit={editNewsletter}
          onDelete={deleteNewsletter}
          onPreview={previewNewsletter}
        />

        {previewNewsletterData && (
          <NewsletterPreviewDrawer
            newsletter={previewNewsletterData}
            onClose={closePreview}
          />
        )}
      </div>
    </div>
  );
};
