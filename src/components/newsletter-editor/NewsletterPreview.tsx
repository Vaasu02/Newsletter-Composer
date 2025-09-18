'use client';

import { useState, useEffect } from 'react';
import { render } from '@react-email/render';
import { Newsletter } from '@/types/newsletter';
import { SimpleTemplate } from '@/components/email-templates/SimpleTemplate';
import { HeaderContentFooterTemplate } from '@/components/email-templates/HeaderContentFooterTemplate';

interface NewsletterPreviewProps {
  newsletter: Newsletter;
}

export const NewsletterPreview = ({ newsletter }: NewsletterPreviewProps) => {
  const [emailHtml, setEmailHtml] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const renderEmail = async () => {
      setIsLoading(true);
      try {
        let html: string;
        if (newsletter.layout === 'simple') {
          html = await render(<SimpleTemplate newsletter={newsletter} />);
        } else {
          html = await render(<HeaderContentFooterTemplate newsletter={newsletter} />);
        }
        setEmailHtml(html);
      } catch (error) {
        console.error('Error rendering email:', error);
        setEmailHtml('<p>Error rendering preview</p>');
      } finally {
        setIsLoading(false);
      }
    };

    renderEmail();
  }, [newsletter]);

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-600">
        <p><strong>Layout:</strong> {newsletter.layout}</p>
        <p><strong>Sections:</strong> {newsletter.sections.length}</p>
        <p><strong>Subject:</strong> {newsletter.metadata.subject || 'No subject'}</p>
      </div>
      
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700">
          Email Preview
        </div>
        <div className="bg-white p-4 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-gray-500">Loading preview...</div>
            </div>
          ) : (
            <div 
              className="p-2"
              dangerouslySetInnerHTML={{ __html: emailHtml }} 
            />
          )}
        </div>
      </div>
    </div>
  );
};
