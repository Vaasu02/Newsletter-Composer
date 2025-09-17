'use client';

import { useState, useEffect } from 'react';
import { Newsletter } from '@/types/newsletter';
import { NewsletterEditor } from '@/components/newsletter-editor/NewsletterEditor';
import { NewsletterList } from './NewsletterList';
import { NewsletterPreviewDrawer } from './NewsletterPreviewDrawer';
import { Navbar } from '@/components/ui/navbar';

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
        onBack={() => setIsEditing(false)}
      />
    );
  }

  return (
    <div className="bg-gray-50">
      <Navbar onNewNewsletter={startNewNewsletter} />
      
      <div className="container mx-auto px-4 py-8">
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
