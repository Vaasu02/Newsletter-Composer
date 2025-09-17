'use client';

import { Button } from '@/components/ui/button';
import { Plus, ArrowLeft } from 'lucide-react';
import Image from 'next/image';

interface NavbarProps {
  onNewNewsletter: () => void;
  showBackButton?: boolean;
  onBack?: () => void;
}

export const Navbar = ({ onNewNewsletter, showBackButton, onBack }: NavbarProps) => {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Title */}
          <div className="flex items-center gap-4">
            {/* Back Button - Only show when needed */}
            {showBackButton && onBack && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back</span>
              </Button>
            )}
            
            {/* Logo - Hidden on mobile */}
            <div className="hidden md:block">
              <Image
                src="/logo.png"
                alt="Newsletter Composer Logo"
                width={40}
                height={40}
                className="object-contain"
              />
            </div>
            
            {/* Title and Subtitle */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                Newsletter Manager
              </h1>
              <p className="text-sm text-gray-600 -mt-1">
                Manage your email campaigns
              </p>
            </div>
          </div>

          {/* New Newsletter Button */}
          <Button 
            onClick={onNewNewsletter} 
            className="flex items-center gap-2"
            size="sm"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">New Newsletter</span>
            <span className="sm:hidden">New</span>
          </Button>
        </div>
      </div>
    </nav>
  );
};
