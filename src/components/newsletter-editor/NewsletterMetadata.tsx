'use client';

import { useState } from 'react';
import { Newsletter } from '@/types/newsletter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Settings } from 'lucide-react';

interface NewsletterMetadataProps {
  metadata: Newsletter['metadata'];
  onChange: (metadata: Partial<Newsletter['metadata']>) => void;
}

export const NewsletterMetadata = ({ metadata, onChange }: NewsletterMetadataProps) => {
  const [subject, setSubject] = useState(metadata.subject);

  const handleSubjectChange = (value: string) => {
    setSubject(value);
    onChange({ subject: value });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Newsletter Metadata
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="subject">Subject Line</Label>
          <Input
            id="subject"
            value={subject}
            onChange={(e) => handleSubjectChange(e.target.value)}
            placeholder="Enter newsletter subject..."
            className="mt-1"
          />
        </div>
        <div className="text-sm text-gray-500">
          <p>Created: {metadata.createdAt.toLocaleDateString()}</p>
          <p>Last Updated: {metadata.updatedAt.toLocaleDateString()}</p>
        </div>
      </CardContent>
    </Card>
  );
};
