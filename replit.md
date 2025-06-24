# COLREGS Academy - replit.md

## Overview

COLREGS Academy is a maritime safety education web application that teaches the International Regulations for Preventing Collisions at Sea (COLREGS). The application provides an interactive learning platform with rule explanations, quizzes, and progress tracking to help users understand maritime navigation rules.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **UI Components**: Radix UI with shadcn/ui component library
- **Styling**: Tailwind CSS with custom maritime theme colors
- **State Management**: TanStack Query for server state and React hooks for local state
- **Build Tool**: Vite for fast development and building

### Backend Architecture
- **Runtime**: Node.js with Express.js server
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Development**: Hot module replacement via Vite integration
- **Session Management**: Express sessions with PostgreSQL store

### Database Architecture
- **ORM**: Drizzle with PostgreSQL dialect
- **Schema**: Shared schema between client and server
- **Tables**: Rules, quizzes, and user progress tracking
- **Migrations**: Drizzle Kit for schema management

## Key Components

### Data Models
1. **Rules Table**: Stores COLREGS rule information including rule number, title, official text, plain English explanations, key points, and related rules
2. **Quizzes Table**: Contains questions, multiple choice options, correct answers, and explanations for each rule
3. **User Progress Table**: Tracks user completion status, quiz scores, and completion timestamps

### Core Features
1. **Rule Browser**: Navigate through COLREGS rules organized by parts
2. **Interactive Learning**: Plain English explanations with key points and common violations
3. **Quiz System**: Multiple choice quizzes with immediate feedback and explanations
4. **Progress Tracking**: User progress persistence with completion status
5. **Responsive Design**: Mobile-first design with collapsible sidebar navigation

### Storage Layer
- **Interface**: IStorage abstraction for data operations
- **Implementation**: In-memory storage for development (MemStorage class)
- **Database Integration**: Ready for PostgreSQL via Drizzle ORM

## Data Flow

1. **Client Requests**: React components use TanStack Query to fetch data from REST API endpoints
2. **API Layer**: Express routes handle CRUD operations for rules, quizzes, and progress
3. **Storage Layer**: Storage interface abstracts database operations
4. **Database**: PostgreSQL stores persistent data with Drizzle ORM handling queries
5. **State Management**: Client-side caching via TanStack Query with optimistic updates

## External Dependencies

### Core Libraries
- **@neondatabase/serverless**: PostgreSQL driver for Neon database
- **drizzle-orm**: Type-safe ORM for database operations
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight React router
- **date-fns**: Date manipulation utilities

### UI Libraries
- **@radix-ui/***: Accessible UI primitives (20+ components)
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Conditional CSS class composition
- **lucide-react**: Icon library

### Development Tools
- **vite**: Build tool and development server
- **tsx**: TypeScript execution for Node.js
- **esbuild**: Fast JavaScript bundler for production

## Deployment Strategy

### Development Environment
- **Runtime**: Node.js 20 with Replit modules
- **Database**: PostgreSQL 16 instance
- **Hot Reload**: Vite dev server with HMR
- **Port Configuration**: Internal port 5000, external port 80

### Production Build
- **Frontend**: Vite builds static assets to `dist/public`
- **Backend**: esbuild bundles server code to `dist/index.js`
- **Database**: Drizzle migrations applied via `npm run db:push`
- **Deployment**: Autoscale deployment target on Replit

### Environment Configuration
- **Database URL**: Required environment variable for PostgreSQL connection
- **Static Assets**: Served from `dist/public` in production
- **API Routes**: Prefixed with `/api` and logged in development

## Changelog

Changelog:
- June 24, 2025. Initial setup

## User Preferences

Preferred communication style: Simple, everyday language.