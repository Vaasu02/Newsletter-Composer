'use client';

import { useState, useEffect } from 'react';
import { Newsletter, NewsletterSection } from '@/types/newsletter';
import { newsletterTemplates } from '@/lib/newsletter-templates';
import { NewsletterMetadata } from './NewsletterMetadata';
import { NewsletterSections } from './NewsletterSections';
import { NewsletterPreview } from './NewsletterPreview';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DateTimePicker } from '@/components/ui/date-picker';
import { Navbar } from '@/components/ui/navbar';
import { Save, Eye, Plus, Calendar, Clock } from 'lucide-react';

interface NewsletterEditorProps {
  newsletter?: Newsletter;
  onSave: (newsletter: Newsletter) => void;
  onBack?: () => void;
}

export const NewsletterEditor = ({ newsletter, onSave, onBack }: NewsletterEditorProps) => {
  const [currentNewsletter, setCurrentNewsletter] = useState<Newsletter>(
    newsletter || {
      id: Date.now().toString(),
      metadata: {
        subject: '',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      sections: [],
      layout: 'simple',
      status: 'draft',
    }
  );

  const [selectedTemplate, setSelectedTemplate] = useState(newsletterTemplates[0]);
  const [scheduledDate, setScheduledDate] = useState<Date | undefined>(
    newsletter?.scheduledDate
  );

  useEffect(() => {
    if (!newsletter) {
      // Initialize with first template for new newsletter
      const template = newsletterTemplates[0];
      setCurrentNewsletter(prev => ({
        ...prev,
        layout: template.layout,
        sections: [...template.defaultSections],
      }));
      setSelectedTemplate(template);
    } else {
      // Set the correct template based on the newsletter's layout
      const template = newsletterTemplates.find(t => t.layout === newsletter.layout) || newsletterTemplates[0];
      setSelectedTemplate(template);
    }
  }, [newsletter]);

  const handleTemplateChange = (templateId: string) => {
    const template = newsletterTemplates.find(t => t.id === templateId);
    if (template) {
      setSelectedTemplate(template);
      setCurrentNewsletter(prev => ({
        ...prev,
        layout: template.layout,
        sections: [...template.defaultSections],
        metadata: {
          ...prev.metadata,
          updatedAt: new Date(),
        },
      }));
    }
  };

  const handleMetadataChange = (metadata: Partial<Newsletter['metadata']>) => {
    setCurrentNewsletter(prev => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        ...metadata,
        updatedAt: new Date(),
      },
    }));
  };

  const handleSectionsChange = (sections: NewsletterSection[]) => {
    setCurrentNewsletter(prev => ({
      ...prev,
      sections,
      metadata: {
        ...prev.metadata,
        updatedAt: new Date(),
      },
    }));
  };

  const handleSaveAsDraft = () => {
    const newsletterToSave = {
      ...currentNewsletter,
      status: 'draft' as const,
      scheduledDate: undefined,
    };
    onSave(newsletterToSave);
  };

  const handleSchedule = () => {
    if (!scheduledDate) {
      alert('Please select a date and time to schedule the newsletter');
      return;
    }
    
    const newsletterToSave = {
      ...currentNewsletter,
      status: 'scheduled' as const,
      scheduledDate: scheduledDate,
    };
    onSave(newsletterToSave);
  };

  return (
    <div className="bg-gray-50">
      <Navbar 
        onNewNewsletter={() => {}} 
        showBackButton={true}
        onBack={onBack}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Newsletter Composer</h1>
          <p className="text-gray-600 mt-2">Create and preview your email campaigns</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Editor Panel */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Plus className="h-5 w-5" />
                  Template Selection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {newsletterTemplates.map((template) => (
                    <div
                      key={template.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                        selectedTemplate.id === template.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => handleTemplateChange(template.id)}
                    >
                      <h3 className="font-semibold text-gray-900">{template.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <NewsletterMetadata
              metadata={currentNewsletter.metadata}
              onChange={handleMetadataChange}
            />

            <NewsletterSections
              sections={currentNewsletter.sections}
              onChange={handleSectionsChange}
            />

            {/* Scheduling Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Schedule Newsletter
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-gray-600">
                  Choose when to send your newsletter. Leave empty to save as draft.
                </div>
                <DateTimePicker
                  date={scheduledDate}
                  onDateTimeChange={setScheduledDate}
                  placeholder="Select date and time to schedule"
                />
                {scheduledDate && (
                  <div className="text-sm text-green-600 bg-green-50 p-3 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      <span>
                        Newsletter will be scheduled for: {scheduledDate.toLocaleString()}
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Preview Panel */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Live Preview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <NewsletterPreview newsletter={currentNewsletter} />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Save Buttons */}
        <div className="mt-8 flex justify-end gap-4">
          <Button 
            onClick={handleSaveAsDraft} 
            variant="outline"
            className="flex items-center gap-2"
          >
            <Save className="h-4 w-4" />
            Save as Draft
          </Button>
          <Button 
            onClick={handleSchedule}
            className="flex items-center gap-2"
            disabled={!scheduledDate}
          >
            <Calendar className="h-4 w-4" />
            Schedule Newsletter
          </Button>
        </div>
      </div>
    </div>
  );
};
