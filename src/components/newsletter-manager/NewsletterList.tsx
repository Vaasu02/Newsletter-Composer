'use client';

import { Newsletter } from '@/types/newsletter';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2, Eye, Calendar, Clock } from 'lucide-react';

interface NewsletterListProps {
  newsletters: Newsletter[];
  onEdit: (newsletter: Newsletter) => void;
  onDelete: (id: string) => void;
  onPreview: (newsletter: Newsletter) => void;
}

export const NewsletterList = ({ newsletters, onEdit, onDelete, onPreview }: NewsletterListProps) => {
  if (newsletters.length === 0) {
    return (
      <Card className="min-h-[70vh]">
        <CardContent className="text-center py-42 flex flex-col justify-center items-center h-full">
          <div className="text-gray-500 flex flex-col items-center justify-center">
            <Calendar className="h-12 w-12 mb-4 opacity-50" />
            <h3 className="text-lg font-medium mb-2">No newsletters yet</h3>
            <p>Create your first newsletter to get started.</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {newsletters.map((newsletter) => (
        <Card key={newsletter.id} className="hover:shadow-md transition-shadow">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg line-clamp-2">
                  {newsletter.metadata.subject || 'Untitled Newsletter'}
                </CardTitle>
                <div className="flex items-center gap-2 mt-2">
                  <Badge variant={newsletter.status === 'draft' ? 'secondary' : 'default'}>
                    {newsletter.status}
                  </Badge>
                  <span className="text-sm text-gray-500">
                    {newsletter.sections.length} sections
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Created: {newsletter.metadata.createdAt.toLocaleDateString()}
                </div>
                {newsletter.scheduledDate && (
                  <div className="flex items-center gap-1 mt-1">
                    <Calendar className="h-3 w-3" />
                    Scheduled: {newsletter.scheduledDate.toLocaleDateString()} at {newsletter.scheduledDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <Button
                  onClick={() => onPreview(newsletter)}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  <Eye className="h-3 w-3 mr-1" />
                  Preview
                </Button>
                <Button
                  onClick={() => onEdit(newsletter)}
                  variant="outline"
                  size="sm"
                  className="flex-1"
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button
                  onClick={() => onDelete(newsletter.id)}
                  variant="outline"
                  size="sm"
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
