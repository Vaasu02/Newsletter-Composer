export interface NewsletterSection {
  id: string;
  content: string;
  type: 'text' | 'image' | 'button';
}

export interface NewsletterMetadata {
  subject: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Newsletter {
  id: string;
  metadata: NewsletterMetadata;
  sections: NewsletterSection[];
  layout: 'simple' | 'header-content-footer';
  status: 'draft' | 'scheduled';
  scheduledDate?: Date;
}

export interface NewsletterTemplate {
  id: string;
  name: string;
  description: string;
  layout: 'simple' | 'header-content-footer';
  defaultSections: NewsletterSection[];
}
