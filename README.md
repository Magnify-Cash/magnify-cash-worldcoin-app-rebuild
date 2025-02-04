# Magnify World App V2 🌟

## Overview
A modern DeFi dashboard application built with React, TypeScript, and Supabase. This application provides users with a comprehensive interface for managing digital assets, tracking loans, and monitoring market analytics.

## 🚀 Features

### User Management
- Profile management with verification tiers
- Secure authentication via Supabase
- Customizable user settings

### Asset Management
- Real-time wallet balance tracking
- NFT collateral management
- Transaction history

### DeFi Integration
- Loan management system
- Liquidity pool interactions
- MAG token rewards system

## 🛠 Technical Stack

### Frontend
- **React 18** - Modern UI library
- **TypeScript** - Type-safe development
- **Vite** - Next-generation frontend tooling
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality UI components
- **Framer Motion** - Animation library

### Backend & Data
- **Supabase** - Backend-as-a-Service
  - Authentication
  - PostgreSQL Database
  - Real-time subscriptions
  - Edge Functions

### State Management & Data Fetching
- **TanStack Query** - Server state management
- **React Context** - Local state management

## 📦 Project Structure

```
src/
├── components/         # Reusable UI components
│   ├── Dashboard/     # Dashboard-specific components
│   ├── Header/        # Navigation components
│   └── ui/            # shadcn/ui components
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
├── pages/             # Route components
├── services/          # API service layers
└── types/             # TypeScript definitions
```

## 🔧 Component Documentation

### Profile Component
The Profile component (`src/pages/Profile.tsx`) displays user information and NFT collaterals.

#### Features:
- User information display
- NFT collateral management
- Verification status
- Interactive card layout

#### Props:
```typescript
interface ProfileProps {
  // Component currently doesn't accept props
}
```

#### Usage:
```typescript
import Profile from '@/pages/Profile';

// In your router
<Route path="/profile" element={<Profile />} />
```

### Header Component
The Header component (`src/components/Header/`) provides navigation and menu functionality.

#### Features:
- Back navigation
- Title display
- Dropdown menu
- Mobile responsiveness

#### Props:
```typescript
interface HeaderProps {
  title: string;
  showBack?: boolean;
}
```

## 🚀 Getting Started

1. **Clone the repository**
```bash
git clone <repository-url>
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npm run dev
```

4. **Build for production**
```bash
npm run build
```

## 🔒 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📝 Code Style Guide

- Use TypeScript for all new components
- Follow the existing component structure
- Use shadcn/ui components when possible
- Implement responsive design
- Add proper TypeScript types
- Use meaningful component and variable names

## 🔍 Testing

```bash
# Run tests
npm run test

# Run tests in watch mode
npm run test:watch
```

## 📱 Responsive Design

The application is fully responsive with breakpoints:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

## 🔐 Security

- Authentication handled by Supabase
- Row Level Security (RLS) policies in place
- Environment variables for sensitive data
- Input validation on all forms

## 🌐 Deployment

The application can be deployed using:
1. Lovable's built-in deployment
2. Manual deployment to services like Netlify
3. Custom deployment pipeline

## 📚 Additional Resources

- [Lovable Documentation](https://docs.lovable.dev/)
- [shadcn/ui Documentation](https://ui.shadcn.com/)
- [Supabase Documentation](https://supabase.com/docs)

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.