# Songless Unlimited

## Overview

Songless Unlimited is a music guessing game where players listen to song intros and try to identify the correct song from a list of options. The game features multiple rounds with progressive hint systems (skips that reveal more of the song), scoring based on attempts, and a clean, dark-themed interface inspired by Spotify's design language.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React with TypeScript, using Vite as the build tool and development server.

**UI Component Library**: shadcn/ui components built on Radix UI primitives, providing accessible and customizable components with a consistent design system.

**Styling**: Tailwind CSS with a dark-first theme. Custom CSS variables define the color palette, supporting both light and dark modes. The design follows Spotify-inspired aesthetics with Circular Std as the primary font family.

**State Management**: 
- React hooks (useState, useEffect) for local component state
- TanStack Query (React Query) for server state management and data fetching
- No global state management library - state is lifted to parent components as needed

**Routing**: The application uses a single-page architecture with conditional rendering based on game state (start, playing, results) rather than client-side routing.

**Game Flow**: Three main screens managed by App.tsx:
- StartScreen: Entry point with "Start Game" and "How to Play" options
- GameScreen: Core gameplay with audio player, guess input, and round progression
- ResultScreen: Final score display with round-by-round breakdown

### Backend Architecture

**Server Framework**: Express.js running on Node.js with TypeScript.

**API Design**: RESTful endpoints serving game configuration and static audio files. The main endpoint `/api/game-config` returns game settings and song metadata.

**Static File Serving**: Audio files (MP3s) are served from the `/songs` directory via Express static middleware.

**Development Setup**: Vite middleware integration for HMR (Hot Module Replacement) during development, with separate production build process using esbuild for server bundling.

**Session Management**: Basic in-memory storage implementation with interfaces designed for future database integration (IStorage interface supports CRUD operations).

### Data Storage Solutions

**Current Implementation**: In-memory storage using JavaScript Map for user data (MemStorage class).

**Database Schema**: Drizzle ORM schema defined for PostgreSQL with a users table (id, username, password). The schema is prepared for database integration but currently uses in-memory fallback.

**Configuration Storage**: Game configuration stored in JSON file (`songs/game-config.json`) containing:
- Game settings (rounds, duration limits, skip behavior)
- Song metadata (id, title, artist, filename)

**Rationale**: File-based configuration allows non-technical users to modify game content without database access. In-memory storage provides a lightweight development experience with clear migration path to PostgreSQL.

### External Dependencies

**UI Components**: 
- Radix UI primitives (@radix-ui/*) for accessible, unstyled component foundations
- shadcn/ui design system for consistent styling
- Lucide React for iconography

**Styling & Utilities**:
- Tailwind CSS for utility-first styling
- class-variance-authority for component variant management
- clsx and tailwind-merge for className composition

**Data Fetching**: 
- TanStack Query for server state management
- Built-in Fetch API for HTTP requests

**Form Management**:
- React Hook Form for form state
- Zod for schema validation
- @hookform/resolvers for validation integration

**Build Tools**:
- Vite for frontend bundling and dev server
- esbuild for optimized server bundling
- TypeScript for type safety across the stack

**Database (Prepared)**:
- Drizzle ORM as the database toolkit
- drizzle-zod for schema-to-validation integration
- PostgreSQL driver (pg) ready for connection

**Audio Playback**: Native HTML5 Audio API via React refs, no external audio libraries required.

**Development Tools**:
- Replit-specific plugins for runtime error handling and dev experience
- Express session management infrastructure (express-session, connect-pg-simple) prepared but not actively used