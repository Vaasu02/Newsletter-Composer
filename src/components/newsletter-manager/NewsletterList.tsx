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
        <Card key={newsletter.id} className="group hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 border-0 bg-white/80 backdrop-blur-sm hover:bg-white hover:-translate-y-1">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-lg font-semibold line-clamp-2 text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                  {newsletter.metadata.subject || 'Untitled Newsletter'}
                </CardTitle>
                <div className="flex items-center gap-2 mt-3">
                  <Badge 
                    variant={newsletter.status === 'draft' ? 'secondary' : 'default'}
                    className={`text-xs font-medium px-2 py-1 ${
                      newsletter.status === 'draft' 
                        ? 'bg-amber-100 text-amber-700 border-amber-200' 
                        : 'bg-green-100 text-green-700 border-green-200'
                    }`}
                  >
                    {newsletter.status}
                  </Badge>
                  <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded-full">
                    {newsletter.sections.length} sections
                  </span>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              <div className="text-xs text-gray-600 space-y-2">
                <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg">
                  <Clock className="h-3 w-3 text-gray-400" />
                  <span className="font-medium">Created:</span>
                  <span>{newsletter.metadata.createdAt.toLocaleDateString()}</span>
                </div>
                {newsletter.scheduledDate && (
                  <div className="flex items-center gap-2 bg-blue-50 p-2 rounded-lg">
                    <Calendar className="h-3 w-3 text-blue-500" />
                    <span className="font-medium text-blue-700">Scheduled:</span>
                    <span className="text-blue-600">{newsletter.scheduledDate.toLocaleDateString()} at {newsletter.scheduledDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <Button
                  onClick={() => onPreview(newsletter)}
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-white hover:bg-blue-50 hover:border-blue-300 hover:text-blue-600 transition-all duration-200"
                >
                  <Eye className="h-3 w-3 mr-1" />
                  Preview
                </Button>
                <Button
                  onClick={() => onEdit(newsletter)}
                  variant="outline"
                  size="sm"
                  className="flex-1 bg-white hover:bg-green-50 hover:border-green-300 hover:text-green-600 transition-all duration-200"
                >
                  <Edit className="h-3 w-3 mr-1" />
                  Edit
                </Button>
                <Button
                  onClick={() => onDelete(newsletter.id)}
                  variant="outline"
                  size="sm"
                  className="bg-white hover:bg-red-50 hover:border-red-300 text-red-600 hover:text-red-700 transition-all duration-200"
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
