# COLREGS Academy

An advanced educational web application designed to teach maritime collision prevention regulations (COLREGS) through interactive, engaging learning experiences.

![COLREGS Academy](./generated-icon.png)

## 🚢 Overview

COLREGS Academy is a comprehensive maritime safety education platform that teaches the International Regulations for Preventing Collisions at Sea (1972). The application provides interactive learning modules, comprehensive quizzes, progress tracking, and certification for all 41 official COLREGS rules across 6 parts.

### Key Features

- **📚 Complete COLREGS Coverage**: All 41 official rules from the 1972 Convention
- **🎯 Interactive Learning**: Plain English explanations with key points and scenarios
- **📝 Comprehensive Quizzes**: Multiple difficulty levels with immediate feedback
- **📊 Progress Tracking**: User progress persistence with completion statistics
- **🏆 Assessment System**: Timed assessments with performance analytics
- **🎓 Certification**: Downloadable certificates for passing grades (70%+)
- **🏅 Achievement System**: Maritime-themed badges with social sharing capabilities
- **🔐 User Authentication**: Google OAuth integration for progress tracking
- **📱 Responsive Design**: Mobile-first design with collapsible navigation
- **🔍 SEO Optimized**: Schema.org markup and comprehensive meta tags

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript for type-safe component development
- **Wouter** for lightweight client-side routing
- **TanStack Query** for server state management and caching
- **Tailwind CSS** with custom maritime theme colors
- **Radix UI + shadcn/ui** for accessible component primitives
- **Vite** for fast development and optimized builds

### Backend
- **Node.js 20** with Express.js server
- **TypeScript** with ES modules for type safety
- **PostgreSQL** with Neon serverless database
- **Drizzle ORM** for type-safe database operations
- **Express Sessions** with PostgreSQL store for session management
- **Passport.js** with Google OAuth 2.0 for user authentication

### Database
- **PostgreSQL 16** for persistent data storage
- **Drizzle Kit** for schema management and migrations
- **Neon Database** for serverless PostgreSQL hosting

### Development Tools
- **tsx** for TypeScript execution in Node.js
- **esbuild** for fast JavaScript bundling
- **React Helmet** for dynamic SEO meta tag management

## 🚀 Getting Started

### Prerequisites

- Node.js 20 or higher (`brew install node@20` on macOS)
- npm package manager
- A free [Neon](https://neon.tech) account for the database

> **Note:** This project uses the Neon serverless PostgreSQL HTTP driver (`@netlify/neon`), which requires a Neon database. A standard local PostgreSQL server is not compatible without code modifications.

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd colregs-academy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Create a Neon database**
   - Sign up at [neon.tech](https://neon.tech) (free tier available)
   - Create a new project
   - Copy the connection string (format: `postgresql://user:pass@ep-xxx.neon.tech/neondb?sslmode=require`)

4. **Set up environment variables**

   Create or edit the `.env` file in the root directory:
   ```env
   NETLIFY_DATABASE_URL=postgresql://user:password@ep-xxx.us-east-1.aws.neon.tech/neondb?sslmode=require
   NODE_ENV=development
   SESSION_SECRET=your-random-session-secret
   JWT_SECRET=your-random-jwt-secret

   # Optional: Email magic link login (Resend)
   RESEND_API_KEY=your_resend_api_key

   # Optional: Google OAuth for user authentication
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

5. **Push the database schema**
   ```bash
   npm run db:push
   ```

6. **Seed the database with COLREGS data**
   ```bash
   npx tsx -e "import('./server/seed.ts').then(m => m.clearAndReseed()).then(() => { console.log('Seeding complete'); process.exit(0); }).catch(e => { console.error(e); process.exit(1); })"
   ```

7. **Start the development server**
   ```bash
   npm run dev
   ```

8. **Open your browser**

   Navigate to `http://localhost:5000` to access the application.

### Alternative Setup with Netlify

This project is designed to deploy on Netlify with a provisioned Neon database. See [NETLIFY_DEPLOYMENT.md](./NETLIFY_DEPLOYMENT.md) for full deployment instructions.

## 🔐 Authentication Setup (Optional)

COLREGS Academy supports Google OAuth for user authentication and progress tracking. The app works without authentication (using local storage), but authenticated users get persistent progress tracking.

### Google OAuth Configuration

1. **Create a Google Cloud Project**
   - Visit [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable the Google+ API

2. **Configure OAuth Consent Screen**
   - Go to "OAuth consent screen" in the left sidebar
   - Set up your app information and authorized domains

3. **Create OAuth Credentials**
   - Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client IDs"
   - Application type: Web application
   - Add authorized redirect URIs:
     - Local development: `http://localhost:5000/api/auth/google/callback`
     - Production: `https://your-domain.com/api/auth/google/callback`

4. **Configure Environment Variables**
   ```env
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   ```

5. **Test Authentication**
   - Restart your application
   - Click "Sign In" button to test Google OAuth flow

### Authentication Features

- **Persistent Progress**: Progress saved across devices and sessions
- **User Profiles**: Display user name and profile picture
- **Secure Sessions**: Express sessions with PostgreSQL store
- **Guest Mode**: App functions without authentication using default user

## 🏅 Achievement System

COLREGS Academy features a comprehensive achievement system with maritime-themed badges to motivate and track user progress.

### Available Achievements

- **🧭 Navigator's Compass**: Earn by completing your first quiz
- **⚓ Anchor Badge**: Complete all quizzes in any Part
- **🗼 Lighthouse Keeper**: Achieve perfect scores on multiple quizzes
- **🚢 Ship Master**: Complete all rules in multiple Parts
- **👑 Fleet Commander**: Master all COLREGS parts with high scores

### Achievement Features

- **Real-time Notifications**: Instant badge notifications upon earning achievements
- **Social Sharing**: Share achievements with colleagues and instructors
- **Progress Tracking**: Visual progress indicators for each achievement
- **Maritime Theme**: Authentic nautical symbols and terminology
- **Persistent Storage**: Achievements saved to user profiles

### How to Earn Achievements

1. **Complete Quizzes**: Take and pass quizzes to unlock basic achievements
2. **Achieve High Scores**: Score 80% or higher to unlock advanced badges
3. **Master Sections**: Complete entire Parts to earn part-specific achievements
4. **Consistent Performance**: Maintain high scores across multiple attempts
5. **Full Coverage**: Complete all rules to earn the ultimate Fleet Commander badge

## 📖 Usage Guide

### For Students

1. **Start Learning**: Begin with Rule 1 and progress through all COLREGS parts
2. **Interactive Content**: Read official text and plain English explanations
3. **Take Quizzes**: Test your knowledge with multiple-choice questions
4. **Track Progress**: Monitor completion status and quiz scores
5. **Earn Achievements**: Unlock maritime-themed badges as you progress
6. **Assessment**: Take comprehensive assessments covering multiple rules
7. **Certification**: Download certificates upon successful completion

### For Educators

1. **Course Structure**: Use the organized part-based structure for curriculum planning
2. **Progress Monitoring**: Track student progress through completion statistics
3. **Assessment Tools**: Utilize timed assessments with detailed performance analytics
4. **Difficulty Levels**: Assign questions based on easy, medium, or hard difficulty

## 🗂️ Project Structure

```
colregs-academy/
├── client/                 # Frontend React application
│   ├── public/            # Static assets
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility libraries
│   │   ├── pages/         # Route components
│   │   └── main.tsx       # Application entry point
│   └── index.html         # HTML template
├── server/                # Backend Express application
│   ├── complete-colregs-*.ts  # COLREGS rule data
│   ├── routes.ts          # API route definitions
│   ├── storage.ts         # Database interface
│   ├── db.ts              # Database configuration
│   ├── seed.ts            # Database seeding
│   └── index.ts           # Server entry point
├── shared/                # Shared types and schemas
│   └── schema.ts          # Drizzle database schema
├── package.json           # Dependencies and scripts
├── tailwind.config.ts     # Tailwind CSS configuration
├── vite.config.ts         # Vite build configuration
└── drizzle.config.ts      # Database configuration
```

## 🎯 Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run db:push` - Push schema changes to database
- `npm run check` - TypeScript type checking

## 🏗️ Architecture Overview

### Data Flow

1. **Client Requests**: React components use TanStack Query for server state
2. **API Layer**: Express routes handle CRUD operations
3. **Storage Layer**: Drizzle ORM provides type-safe database access
4. **Database**: PostgreSQL stores persistent data with full ACID compliance
5. **Caching**: Client-side caching via TanStack Query with optimistic updates

### Key Components

- **Rules System**: Complete 41-rule COLREGS implementation with parts A-F
- **Quiz Engine**: Multiple-choice questions with explanations and difficulty levels
- **Progress Tracking**: User completion status and quiz performance
- **Assessment System**: Comprehensive testing with certification
- **SEO Framework**: Schema.org markup and dynamic meta tags

## 📊 Database Schema

### Core Tables

- **`rules`**: COLREGS rule information (rule number, title, text, explanations)
- **`quizzes`**: Multiple-choice questions with answers and explanations
- **`users`**: User profiles with Google OAuth integration
- **`user_progress`**: User completion status and quiz scores
- **`assessments`**: Comprehensive assessment records
- **`assessment_results`**: Individual assessment question results

### Schema Management

The project uses Drizzle ORM for type-safe database operations:

```typescript
// Example rule schema
export const rules = pgTable("rules", {
  id: serial("id").primaryKey(),
  ruleNumber: varchar("rule_number", { length: 10 }).notNull(),
  title: varchar("title", { length: 255 }).notNull(),
  part: varchar("part", { length: 10 }).notNull(),
  partTitle: varchar("part_title", { length: 255 }).notNull(),
  officialText: text("official_text").notNull(),
  plainEnglish: text("plain_english").notNull(),
  // ... additional fields
});
```

## 🎨 UI Components

The application uses a consistent design system built with:

- **Radix UI Primitives**: Accessible, unstyled components
- **shadcn/ui**: Pre-styled component library
- **Tailwind CSS**: Utility-first styling
- **Custom Maritime Theme**: Navy blue and ocean-inspired colors

### Key UI Features

- **Responsive Navigation**: Collapsible sidebar for mobile devices
- **Progress Visualization**: Progress bars and completion indicators
- **Interactive Cards**: Hover effects and transition animations
- **Accessibility**: ARIA labels and keyboard navigation support

## 📈 SEO & Performance

### SEO Features

- **Schema.org Markup**: Educational content structured data
- **Dynamic Meta Tags**: Page-specific titles and descriptions
- **Open Graph Tags**: Social media sharing optimization
- **Sitemap Generation**: Automatic sitemap.xml creation
- **Mobile Optimization**: Responsive design with mobile-first approach

### Performance Optimizations

- **Code Splitting**: Route-based code splitting with React lazy loading
- **Image Optimization**: SVG icons and optimized asset loading
- **Database Indexing**: Optimized queries with proper indexing
- **Caching Strategy**: Client-side caching with TanStack Query

## 🔧 Configuration

### Environment Variables

```env
# Database (required) — Neon serverless PostgreSQL connection string
NETLIFY_DATABASE_URL=postgresql://user:password@ep-xxx.neon.tech/neondb?sslmode=require

# Development
NODE_ENV=development

# Session & JWT Security (required)
SESSION_SECRET=your-random-session-secret
JWT_SECRET=your-random-jwt-secret

# Authentication (Optional)
GOOGLE_CLIENT_ID=your_google_oauth_client_id
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret

# Email magic links (Optional — requires Resend account)
RESEND_API_KEY=your_resend_api_key
APP_URL=http://localhost:5000
```

### Tailwind Configuration

Custom maritime theme colors:

```javascript
theme: {
  extend: {
    colors: {
      primary: 'hsl(214, 100%, 27%)',  // Navy blue
      secondary: 'hsl(197, 71%, 73%)', // Light blue
      // ... additional colors
    }
  }
}
```

## 🚀 Deployment

### Replit Deployment

1. Click the "Deploy" button in Replit
2. Configure autoscale deployment settings
3. Set up custom domain (optional)
4. The application will be available at `your-app.replit.app`

### Traditional Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Set up production database**
   ```bash
   npm run db:push
   npm run seed
   ```

3. **Start production server**
   ```bash
   npm start
   ```

4. **Configure reverse proxy** (nginx/Apache) for domain routing

## 🧪 Testing

### Manual Testing Checklist

- [ ] All 41 COLREGS rules load correctly
- [ ] Quiz functionality works across all difficulty levels
- [ ] Progress tracking persists between sessions
- [ ] Assessment system generates certificates
- [ ] Responsive design works on mobile devices
- [ ] SEO meta tags render correctly

### Database Testing

```bash
# Verify data integrity
npm run db:studio

# Test database seeding
npm run seed
```

## 🤝 Contributing

### Development Guidelines

1. **Code Style**: Follow TypeScript best practices
2. **Component Structure**: Use functional components with hooks
3. **Database Changes**: Always use Drizzle migrations
4. **Testing**: Test on multiple devices and browsers
5. **Documentation**: Update README.md for significant changes

### Adding New Features

1. **Schema Changes**: Update `shared/schema.ts` first
2. **API Routes**: Add routes in `server/routes.ts`
3. **Frontend Components**: Create reusable components
4. **Data Seeding**: Update seed files for new data

## 📞 Support

For technical support or questions:

1. **Documentation**: Check this README and `replit.md`
2. **Issues**: Create GitHub issues for bugs or feature requests
3. **Contact**: Reach out through project repository

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **International Maritime Organization (IMO)**: For the official COLREGS regulations
- **1972 Convention**: International Regulations for Preventing Collisions at Sea
- **Maritime Safety Community**: For feedback and testing
- **Open Source Libraries**: All the amazing tools that made this possible

---

**COLREGS Academy** - Making Maritime Safety Education Accessible to Everyone 🌊⚓

*Built with ❤️ for the maritime community*