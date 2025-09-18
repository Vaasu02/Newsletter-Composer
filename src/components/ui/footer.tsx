'use client';

import { Mail, Github, Twitter, Linkedin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-50/80 backdrop-blur-sm border-t border-gray-200/60 mt-auto">
      <div className="container mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left side - Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Mail className="h-4 w-4 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">Newsletter Composer</h3>
              <p className="text-xs text-gray-500">Professional email campaigns</p>
            </div>
          </div>

          {/* Center - Links */}
          <div className="flex items-center gap-6">
            <a 
              href="#" 
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              <Github className="h-4 w-4" />
            </a>
            <a 
              href="#" 
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              <Twitter className="h-4 w-4" />
            </a>
            <a 
              href="#" 
              className="text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              <Linkedin className="h-4 w-4" />
            </a>
          </div>

          {/* Right side - Copyright */}
          <div className="text-xs text-gray-500 text-center md:text-right">
            © 2025 Newsletter Composer. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};
