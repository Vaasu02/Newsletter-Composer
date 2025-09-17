'use client';

import { Mail, Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left side - App info */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Mail className="h-4 w-4" />
            <span>Newsletter Composer</span>
          </div>

          {/* Center - Copyright */}
          <div className="text-sm text-gray-500 text-center">
            © 2025 Newsletter Composer. Built with Next.js & React Email.
          </div>

          {/* Right side - Made with love */}
          <div className="flex items-center gap-1 text-sm text-gray-600">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500" />
            <span>for financial advisors</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
