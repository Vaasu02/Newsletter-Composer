'use client';

import { useState, useEffect } from 'react';
import { render } from '@react-email/render';
import { Newsletter } from '@/types/newsletter';
import { SimpleTemplate } from '@/components/email-templates/SimpleTemplate';
import { HeaderContentFooterTemplate } from '@/components/email-templates/HeaderContentFooterTemplate';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface NewsletterPreviewDrawerProps {
  newsletter: Newsletter;
  onClose: () => void;
}

export const NewsletterPreviewDrawer = ({ newsletter, onClose }: NewsletterPreviewDrawerProps) => {
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
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold">
              {newsletter.metadata.subject || 'Untitled Newsletter'}
            </h2>
            <p className="text-sm text-gray-600">
              Layout: {newsletter.layout} • {newsletter.sections.length} sections
            </p>
          </div>
          <Button onClick={onClose} variant="ghost" size="sm">
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="text-gray-500">Loading preview...</div>
            </div>
          ) : (
            <div 
              className="bg-white border rounded-lg overflow-hidden"
              dangerouslySetInnerHTML={{ __html: emailHtml }}
            />
          )}
        </div>
      </div>
    </div>
  );
};
