import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Download, FileText, Check, BookOpen } from 'lucide-react';

export interface Resource {
  id: string;
  name: string;
  description: string;
  type: 'pdf' | 'checklist' | 'guide';
  url: string;
  size?: string;
}

interface ResourcesDownloadProps {
  lessonId: string;
  moduleId: string;
}

// Mock resources - in a real app, these would come from a database
const resourcesByLesson: Record<string, Resource[]> = {
  'lesson-1-1': [
    {
      id: 'res-1-1-1',
      name: 'Computer Components Cheat Sheet',
      description: 'Quick reference guide for CPU, RAM, Storage, and I/O devices',
      type: 'checklist',
      url: '#',
      size: '2.4 MB',
    },
    {
      id: 'res-1-1-2',
      name: 'Computer Basics Study Guide',
      description: 'Comprehensive PDF guide covering all lesson topics',
      type: 'pdf',
      url: '#',
      size: '5.8 MB',
    },
  ],
  'lesson-2-1': [
    {
      id: 'res-2-1-1',
      name: 'CIA Triad Poster',
      description: 'Visual reference for the CIA Triad principles',
      type: 'pdf',
      url: '#',
      size: '1.2 MB',
    },
    {
      id: 'res-2-1-2',
      name: 'Security Checklist',
      description: 'Practical checklist for implementing CIA principles',
      type: 'checklist',
      url: '#',
      size: '0.8 MB',
    },
  ],
  'lesson-3-1': [
    {
      id: 'res-3-1-1',
      name: 'VirtualBox Installation Guide',
      description: 'Step-by-step guide for setting up VirtualBox',
      type: 'guide',
      url: '#',
      size: '3.5 MB',
    },
  ],
  'lesson-3-2': [
    {
      id: 'res-3-2-1',
      name: 'Kali Linux Setup Guide',
      description: 'Complete guide for installing and configuring Kali Linux',
      type: 'guide',
      url: '#',
      size: '4.2 MB',
    },
  ],
};

export function ResourcesDownload({ lessonId }: ResourcesDownloadProps) {
  const resources = resourcesByLesson[lessonId] || [];

  if (resources.length === 0) {
    return null;
  }

  const getIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-5 h-5" />;
      case 'checklist':
        return <Check className="w-5 h-5" />;
      case 'guide':
        return <BookOpen className="w-5 h-5" />;
      default:
        return <Download className="w-5 h-5" />;
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'pdf':
        return 'PDF';
      case 'checklist':
        return 'Checklist';
      case 'guide':
        return 'Guide';
      default:
        return 'Resource';
    }
  };

  return (
    <div className="space-y-4 border-t border-border pt-8">
      <h3 className="text-lg font-bold flex items-center gap-2">
        <Download className="w-5 h-5 text-primary" />
        Downloadable Resources
      </h3>

      <div className="grid gap-3">
        {resources.map((resource) => (
          <Card
            key={resource.id}
            className="bg-card border-border p-4 hover:border-primary/50 transition-all"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="text-primary mt-1">{getIcon(resource.type)}</div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm mb-1">{resource.name}</h4>
                  <p className="text-xs text-muted-foreground mb-2">{resource.description}</p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="px-2 py-0.5 bg-secondary/50 rounded">
                      {getTypeLabel(resource.type)}
                    </span>
                    {resource.size && <span>{resource.size}</span>}
                  </div>
                </div>
              </div>
              <Button
                size="sm"
                className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 flex-shrink-0"
                onClick={() => {
                  // In a real app, this would trigger the download
                  alert(`Downloading: ${resource.name}`);
                }}
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Download</span>
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
