import { NewsletterTemplate } from '@/types/newsletter';

export const newsletterTemplates: NewsletterTemplate[] = [
  {
    id: 'simple',
    name: 'Simple Text',
    description: 'Clean, text-only newsletter layout',
    layout: 'simple',
    defaultSections: [
      {
        id: '1',
        content: '# Welcome to our Newsletter\n\nThis is a simple text-only newsletter template. You can edit this content using markdown.',
        type: 'text'
      }
    ]
  },
  {
    id: 'header-content-footer',
    name: 'Header + Content + Footer',
    description: 'Professional layout with header, content sections, and footer',
    layout: 'header-content-footer',
    defaultSections: [
      {
        id: '1',
        content: '# Your Company Newsletter\n\n**Monthly Update**',
        type: 'text'
      },
      {
        id: '2',
        content: '## Main Content\n\nThis is the main content section. You can add multiple sections and customize them as needed.\n\n- Feature 1\n- Feature 2\n- Feature 3',
        type: 'text'
      },
      {
        id: '3',
        content: '## Call to Action\n\n[Visit Our Website](https://example.com)',
        type: 'button'
      },
      {
        id: '4',
        content: '---\n\n*Thank you for reading our newsletter. If you have any questions, please contact us.*',
        type: 'text'
      }
    ]
  }
];
