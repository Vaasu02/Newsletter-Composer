# Newsletter Composer

A modern, responsive newsletter creation and management platform built with Next.js, TypeScript, and React Email. This application allows users to compose, preview, and manage email newsletters with rich text editing capabilities and predefined templates.

## Features

### ✨ Core Functionality
- **Newsletter Composition**: Create newsletters with rich text sections using Markdown
- **Predefined Layouts**: Choose from multiple email templates (Simple Text, Header + Content + Footer)
- **Live Preview**: Real-time preview of newsletters using React Email
- **Section Management**: Add, remove, and reorder content sections
- **Save & Manage**: Save newsletters as drafts or schedule them for later
- **Local Storage**: Persistent storage without backend requirements

### 🎨 User Experience
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS
- **Drag & Drop**: Reorder sections with intuitive drag and drop functionality
- **Template Selection**: Easy template switching with visual previews
- **Newsletter Library**: Manage all your newsletters in one place

### 🛠️ Technical Features
- **TypeScript**: Full type safety throughout the application
- **React Email**: Professional email rendering and preview
- **Markdown Support**: Rich text editing with Markdown syntax
- **Component Architecture**: Modular, reusable components
- **State Management**: Efficient state handling with React hooks

## Tech Stack

- **Framework**: Next.js 15.5.3
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Email Rendering**: React Email
- **Icons**: Lucide React
- **State Management**: React Hooks + Local Storage

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd nlcomposer
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
nlcomposer/
├── src/
│   ├── app/                    # Next.js app directory
│   │   ├── globals.css        # Global styles
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/
│   │   ├── ui/                # shadcn/ui components
│   │   ├── email-templates/   # React Email templates
│   │   ├── newsletter-editor/ # Editor components
│   │   └── newsletter-manager/ # Management components
│   ├── lib/                   # Utility functions
│   └── types/                 # TypeScript type definitions
├── public/                    # Static assets
└── package.json
```

## Usage Guide

### Creating a Newsletter

1. **Start New Newsletter**: Click "New Newsletter" on the main page
2. **Choose Template**: Select from available email templates
3. **Add Metadata**: Enter the newsletter subject line
4. **Edit Content**: Add and customize content sections using Markdown
5. **Preview**: See live preview of your newsletter
6. **Save**: Save as draft or schedule for later

### Managing Newsletters

- **View All**: See all your newsletters in a grid layout
- **Edit**: Click edit to modify existing newsletters
- **Preview**: Click preview to see the rendered email
- **Delete**: Remove newsletters you no longer need

### Content Editing

- **Markdown Support**: Use Markdown syntax for rich text formatting
- **Section Types**: Choose from text, image, or button sections
- **Drag & Drop**: Reorder sections by dragging them
- **Live Preview**: See changes in real-time

## Email Templates

### Simple Text Template
- Clean, minimal design
- Perfect for text-only newsletters
- Single content area

### Header + Content + Footer Template
- Professional layout with header and footer
- Multiple content sections
- Call-to-action button support
- Structured design for business newsletters

## Deployment

### Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Connect your GitHub repository to Vercel
   - Deploy automatically on every push

### Other Platforms

The application can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Development

### Adding New Templates

1. Create a new template component in `src/components/email-templates/`
2. Add the template to `src/lib/newsletter-templates.ts`
3. Update the template selection UI

### Customizing Styles

- Modify `src/app/globals.css` for global styles
- Use Tailwind CSS classes for component styling
- Customize shadcn/ui theme in the CSS variables

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

