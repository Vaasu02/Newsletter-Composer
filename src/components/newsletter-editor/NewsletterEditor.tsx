'use client';

import { useState, useEffect } from 'react';
import { Newsletter, NewsletterSection } from '@/types/newsletter';
import { newsletterTemplates } from '@/lib/newsletter-templates';
import { NewsletterMetadata } from './NewsletterMetadata';
import { NewsletterSections } from './NewsletterSections';
import { NewsletterPreview } from './NewsletterPreview';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Save, Eye, Plus } from 'lucide-react';

interface NewsletterEditorProps {
  newsletter?: Newsletter;
  onSave: (newsletter: Newsletter) => void;
}

export const NewsletterEditor = ({ newsletter, onSave }: NewsletterEditorProps) => {
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

  useEffect(() => {
    if (!newsletter) {
      // Initialize with first template
      const template = newsletterTemplates[0];
      setCurrentNewsletter(prev => ({
        ...prev,
        layout: template.layout,
        sections: [...template.defaultSections],
      }));
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

  const handleSave = () => {
    onSave(currentNewsletter);
  };

  return (
    <div className="min-h-screen bg-gray-50">
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

        {/* Save Button */}
        <div className="mt-8 flex justify-end">
          <Button onClick={handleSave} className="flex items-center gap-2">
            <Save className="h-4 w-4" />
            Save Newsletter
          </Button>
        </div>
      </div>
    </div>
  );
};
