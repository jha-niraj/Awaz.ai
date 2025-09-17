# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Awaz.ai is a multilingual voice outreach platform built with Next.js 15 that enables small and medium businesses in India and Nepal to reach customers through automated voice calls in local languages. The platform integrates NextAuth.js v5 for authentication, Prisma ORM for data management, ElevenLabs for text-to-speech, and Twilio for voice call delivery.

## Development Commands

### Setup and Installation
```bash
npm install --legacy-peer-deps  # Use legacy peer deps flag if installation fails
cp .env.example .env.local      # Copy environment template
npx prisma generate             # Generate Prisma client
npx prisma db push              # Push schema to database
```

### Voice & Calling Setup
```bash
# Test ElevenLabs TTS integration
npm run test:tts

# Test Twilio voice calls (development only)
npm run test:voice

# Validate campaign data
npm run validate:campaign
```

### Development Workflow
```bash
npm run dev         # Start development server on localhost:3000
npm run build       # Build for production
npm start          # Start production server
npm run lint       # Run ESLint
```

### Database Operations
```bash
npx prisma generate              # Regenerate Prisma client after schema changes
npx prisma db push              # Push schema changes to database
npx prisma studio               # Open Prisma Studio for database inspection
npx prisma db seed              # Run database seeding (if configured)
npx prisma migrate reset        # Reset database and apply all migrations
```

## Architecture Overview

### Core Platform Features
- **Multilingual Voice Campaigns** with ElevenLabs TTS (10+ Indian languages)
- **Automated Call Delivery** via Twilio Voice API with retry logic
- **Contact Management** supporting CSV/Excel/Google Sheets import
- **Script Personalization** with dynamic variables ({{name}}, {{amount}}, {{date}})
- **Real-time Campaign Monitoring** with delivery status tracking
- **Compliance Framework** including DLT integration and opt-out management

### Authentication Flow
- **NextAuth.js v5** with JWT strategy and custom credentials provider
- **Email verification** via OTP system with Resend email service
- **Password reset** functionality with secure tokens
- **Google OAuth** integration as alternative login method
- **Role-based routing** with USER, SELLER, ADMIN roles

### Core Structure
```
app/
├── (auth)/              # Authentication-related pages (signin, signup, verify, etc.)
├── (main)/              # Main application dashboard and campaign management
├── (admin)/             # Admin-only pages with role restriction
├── (seller)/            # Seller-specific pages
├── api/
│   ├── campaigns/       # Campaign management endpoints
│   ├── voice/           # ElevenLabs TTS integration
│   ├── calls/           # Twilio voice call handling
│   └── register/        # User registration endpoint

actions/
├── auth.action.ts       # Server actions for auth operations
├── campaign.action.ts   # Campaign creation and management
├── voice.action.ts      # Voice generation and testing
└── onboarding.action.ts # User onboarding logic

components/
├── (landingpage)/       # Landing page sections
├── dashboard/           # Campaign dashboard components
├── voice/               # Voice preview and testing components
├── navbar.tsx           # Main navigation component
├── footer.tsx          # Site footer
├── mainnavbar.tsx      # Authenticated user navbar
├── mainsidebar.tsx     # Sidebar for authenticated users
└── onboardingcheck.tsx # Onboarding status checker

lib/
├── prisma.ts           # Prisma client singleton
├── elevenlabs.ts       # ElevenLabs API integration
├── twilio.ts           # Twilio voice API integration
├── email-templates.ts  # Email template definitions
├── cloudinary.ts       # Cloudinary integration
└── utils.ts           # Utility functions
```

### Database Schema
- **User model** with role-based permissions, email verification fields, and password reset tokens
- **Account model** for OAuth provider data (NextAuth.js requirement)
- **PostgreSQL** as the primary database with support for MySQL/SQLite alternatives

### Key Features
- **OTP-based email verification** with 10-minute expiry
- **Password reset flow** with secure token generation
- **Role-based access control** with middleware protection
- **Responsive design** using Tailwind CSS and Radix UI components
- **Dark/light theme support** with next-themes

## Environment Variables

Required environment variables in `.env.local`:
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/awaz_db"

# Authentication
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# OAuth
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_SECRET_ID="your-google-client-secret"  # Note: uses SECRET_ID not CLIENT_SECRET

# Voice & Calling APIs
ELEVENLABS_API_KEY="your-elevenlabs-api-key"
TWILIO_ACCOUNT_SID="your-twilio-account-sid"
TWILIO_AUTH_TOKEN="your-twilio-auth-token"
TWILIO_PHONE_NUMBER="your-twilio-phone-number"

# Email Service
RESEND_API_KEY="your-resend-api-key"

# File Storage
CLOUDINARY_CLOUD_NAME="your-cloudinary-cloud-name"
CLOUDINARY_API_KEY="your-cloudinary-api-key"
CLOUDINARY_API_SECRET="your-cloudinary-api-secret"

# Payment Processing
STRIPE_PUBLISHABLE_KEY="your-stripe-publishable-key"
STRIPE_SECRET_KEY="your-stripe-secret-key"
RAZORPAY_KEY_ID="your-razorpay-key-id"
RAZORPAY_KEY_SECRET="your-razorpay-key-secret"
```

## Development Notes

### Authentication Implementation
- **Duplicate auth configuration**: Both `auth.ts` and `middleware.ts` contain identical NextAuth configurations - `auth.ts` is the primary source
- **Special password handling**: The system uses `"verified"` as a special password value for post-OTP authentication
- **Edge Runtime compatibility**: JWT callback includes Edge Runtime detection to prevent Prisma queries in middleware

### Database Considerations
- Use `npx prisma db push` for development schema changes
- The User model includes both verification and reset token fields with expiry dates
- Default user image is provided via Cloudinary CDN
- Email verification is required before password-based login

### Email System
- **Resend** is used for transactional emails
- Templates are defined in `lib/email-templates.ts`
- Branded as "ValidateX" in email communications (update for your brand)

### Role-Based Routing
- Route groups in `app/` directory correspond to user roles
- Middleware handles route protection based on user roles
- Onboarding flow can be extended based on `roleExplicitlyChosen` field

### Testing Authentication
1. Register new user → triggers OTP email
2. Verify email with 6-digit OTP → enables login
3. Test password reset flow → generates secure token
4. Test Google OAuth → auto-verifies email

### Common Patterns
- Server actions in `actions/` directory for data mutations
- Prisma client is instantiated as singleton in `lib/prisma.ts`
- Form validation should use Zod schemas (already configured)
- Toast notifications via Sonner library