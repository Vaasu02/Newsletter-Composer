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
    <nav className="bg-white/95 backdrop-blur-md border-b border-gray-200/60 sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo and Title */}
          <div className="flex items-center gap-6">
            {/* Back Button - Only show when needed */}
            {showBackButton && onBack && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onBack}
                className="flex items-center gap-2 hover:bg-gray-100 transition-colors duration-200"
              >
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline font-medium">Back</span>
              </Button>
            )}
            
            {/* Logo - Hidden on mobile */}
            <div className="hidden md:block">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center shadow-sm">
                <Image
                  src="/logo.png"
                  alt="Newsletter Composer Logo"
                  width={24}
                  height={24}
                  className="object-contain filter brightness-0 invert"
                />
              </div>
            </div>
            
            {/* Title and Subtitle */}
            <div className={`flex flex-col ${showBackButton ? 'hidden md:flex' : 'flex'}`}>
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                Newsletter Composer
              </h1>
              <p className="text-xs md:text-sm text-gray-500 font-medium">
                Create & manage email campaigns
              </p>
            </div>
          </div>

          {/* New Newsletter Button */}
          <Button 
            onClick={onNewNewsletter} 
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            size="sm"
          >
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline font-semibold">New Newsletter</span>
            <span className="sm:hidden font-semibold">New</span>
          </Button>
        </div>
      </div>
    </nav>
  );
};
