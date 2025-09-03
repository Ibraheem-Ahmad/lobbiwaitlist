# Lobbi - Social Discovery App

## Overview

Lobbi is a map-based social discovery application designed to help users find activities, join lobbies, and meet new people in their city. The project is currently in development with a landing page and waitlist functionality implemented. The application features a modern React frontend with a Node.js/Express backend, using PostgreSQL for data persistence and Drizzle ORM for database operations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **UI Framework**: shadcn/ui components built on top of Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens and CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation for type-safe form management

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **API Design**: RESTful API structure with dedicated route handlers
- **Error Handling**: Centralized error handling middleware with structured error responses
- **Logging**: Custom request/response logging with performance metrics

### Data Storage
- **Database**: PostgreSQL with connection via Neon Database serverless
- **ORM**: Drizzle ORM for type-safe database operations and schema management
- **Schema**: Shared schema definitions between frontend and backend using Drizzle-Zod integration
- **Migrations**: Drizzle Kit for database migrations and schema synchronization
- **Fallback Storage**: In-memory storage implementation for development/testing scenarios

### Authentication & Session Management
- **Session Storage**: PostgreSQL-backed sessions using connect-pg-simple
- **Session Configuration**: Secure session handling with proper cookie settings
- **User Management**: Basic user schema with username/password authentication structure

### Development & Build Process
- **Development Server**: Vite dev server with HMR and TypeScript support
- **Build Process**: Vite for frontend bundling, esbuild for backend compilation
- **Development Tools**: tsx for TypeScript execution, custom error overlay integration
- **Environment**: Environment-based configuration with database URL validation

### Code Organization
- **Monorepo Structure**: Client, server, and shared code in dedicated directories
- **Shared Types**: Common schema definitions and types accessible to both frontend and backend
- **Path Aliases**: Configured path mapping for clean imports (@/, @shared/, @assets/)
- **Component Architecture**: Modular component structure with UI components separated from business logic

### External Dependencies
- **UI Components**: Extensive use of Radix UI primitives for accessibility
- **Styling**: Tailwind CSS with autoprefixer for cross-browser compatibility
- **Validation**: Zod for runtime type checking and validation schemas
- **Database**: Neon Database for serverless PostgreSQL hosting
- **Fonts**: Google Fonts (Inter) for typography
- **Icons**: Lucide React for consistent iconography
- **Development**: Replit-specific tooling for cloud development environment

## External Dependencies

### Database & ORM
- **@neondatabase/serverless**: Serverless PostgreSQL database connection
- **drizzle-orm**: Type-safe ORM for database operations
- **drizzle-kit**: Database migration and schema management tools
- **connect-pg-simple**: PostgreSQL session store for Express

### UI & Styling
- **@radix-ui/***: Comprehensive set of accessible UI primitives
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Type-safe variant API for component styling
- **clsx**: Utility for constructing className strings

### State Management & Data Fetching
- **@tanstack/react-query**: Server state management and caching
- **react-hook-form**: Performant forms with minimal re-renders
- **@hookform/resolvers**: Validation resolvers for React Hook Form

### Development & Build Tools
- **vite**: Fast build tool and development server
- **@vitejs/plugin-react**: React support for Vite
- **esbuild**: Fast JavaScript bundler for production builds
- **tsx**: TypeScript execution engine for development

### Validation & Type Safety
- **zod**: TypeScript-first schema validation
- **drizzle-zod**: Integration between Drizzle ORM and Zod validation

### Additional Libraries
- **wouter**: Minimalist routing for React
- **date-fns**: Date utility library
- **embla-carousel-react**: Carousel component for React
- **cmdk**: Command palette component