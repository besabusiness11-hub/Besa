# BeSa - Italian B2B Marketplace Platform

## Overview

BeSa is an Italian B2B marketplace platform that connects suppliers with professional buyers across various industries. The platform facilitates product discovery, supplier verification, and business connections for sectors including restaurants, dental practices, retail, and other professional services. Built as a full-stack TypeScript application with React frontend and Express backend, the system uses PostgreSQL for data persistence and provides a modern, responsive user interface.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server, providing fast HMR and optimized production builds
- Wouter for lightweight client-side routing instead of React Router
- Component architecture follows a feature-based structure with reusable UI components

**UI Component Library**
- Shadcn/ui components based on Radix UI primitives for accessible, customizable components
- Tailwind CSS for utility-first styling with custom design tokens
- CSS variables for theming support (light/dark modes)
- New York style variant selected for component aesthetics
- Custom splash screen component with animated transitions (fade-in, hold, fade-out with slide-up)

**State Management**
- TanStack Query (React Query) for server state management, caching, and data synchronization
- Custom query client configuration with disabled auto-refetching for controlled data updates
- Form state managed through React Hook Form with Zod validation

**Key Design Decisions**
- Path aliases configured for clean imports (`@/`, `@shared/`, `@assets/`)
- Separation of concerns: UI components in `/components/ui`, feature components in `/components`
- Page-based routing structure in `/pages` directory
- Italian language as primary interface language for target market
- Splash screen animation on initial app load with "BESA" branding (fades in, displays for ~2s, then reveals main content)

### Backend Architecture

**Server Framework**
- Express.js with TypeScript for type-safe API development
- ESM module system for modern JavaScript patterns
- Custom middleware for request logging and JSON response capturing
- Development and production build scripts using tsx and esbuild

**API Design**
- RESTful API endpoints following resource-based routing
- `/api/categories` - Category listing and detail endpoints
- `/api/products` - Product catalog with filtering capabilities
- Query parameter-based filtering (categoryId, search, price range, ratings)
- Currently using in-memory storage (MemStorage) for development with interface designed for easy database integration

**Storage Layer Architecture**
- IStorage interface defines contract for data operations
- MemStorage implementation provides seeded data for development
- Architecture supports seamless migration to database-backed storage (PostgreSQL via Drizzle ORM)
- Separation of storage logic from route handlers enables testing and flexibility

**Development Tools**
- Custom Vite integration for SSR-like development experience
- Request/response logging middleware for debugging
- Error handling with structured error responses

### Data Storage Solutions

**Database Schema (Drizzle ORM)**
- PostgreSQL as the target database (configured via Neon serverless)
- Schema defined in `/shared/schema.ts` for shared frontend/backend types
- Three core tables:
  - `users` - User accounts with supplier/buyer differentiation
  - `categories` - Product categorization with slug-based routing
  - `products` - Product catalog with supplier relationships and ratings

**Type Safety**
- Drizzle-Zod integration for runtime validation
- Shared TypeScript types between frontend and backend
- Insert schemas with automatic type inference

**Migration Strategy**
- Drizzle Kit for schema migrations
- Push-based deployment (`db:push` script)
- Schema evolution tracked in `/migrations` directory

### External Dependencies

**Third-Party UI Libraries**
- Radix UI primitives (accordion, dialog, dropdown, select, etc.) for accessible components
- Embla Carousel for image galleries and carousels
- Lucide React for consistent iconography
- CMDK for command palette functionality
- Date-fns for date formatting and manipulation

**Database & ORM**
- Drizzle ORM for type-safe database queries
- @neondatabase/serverless for PostgreSQL connection
- connect-pg-simple for session storage (configured but not actively used)

**Development Tools**
- Replit-specific plugins for development environment integration
- @replit/vite-plugin-runtime-error-modal for error overlay
- @replit/vite-plugin-cartographer for code mapping
- PostCSS with Tailwind and Autoprefixer for CSS processing

**Build & Type Checking**
- TypeScript with strict mode enabled
- ESBuild for server-side bundling
- Vite for client-side bundling and optimization

### Authentication & Authorization

**Current State**
- User schema includes authentication fields (username, password, email)
- isSupplier flag differentiates between supplier and buyer accounts
- No active authentication implementation (prepared for future integration)

**Architectural Considerations**
- Session-based authentication prepared via connect-pg-simple
- User context designed for role-based access control
- Supplier-specific features isolated for future permission checks

### Deployment Architecture

**Build Process**
- Client: Vite builds to `/dist/public` with asset optimization
- Server: ESBuild bundles to `/dist/index.js` with external dependencies
- Separate development and production environments via NODE_ENV

**Environment Configuration**
- DATABASE_URL required for PostgreSQL connection
- Vite configuration supports both development HMR and production serving
- Static file serving handled by Express in production