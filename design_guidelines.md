# Songless Unlimited - Design Guidelines

## Design Approach
**Reference-Based Approach**: Drawing inspiration from Spotify's music player interface combined with Songless.org's game mechanics. This is a utility-focused application where clarity and usability drive the experience.

### Core Principles
- **Dark-first design**: Optimized for extended listening sessions
- **Focus on audio controls**: Player interface is the hero element
- **Clear feedback**: Immediate visual response to game actions
- **Minimal distractions**: Clean interface that keeps attention on gameplay

## Typography System

### Font Stack
Primary: Circular Std, Helvetica Neue, Arial, sans-serif (matching Spotify's typography)

### Hierarchy
- **Game Title/Logo**: 32px, bold weight
- **Round Headers**: 24px, semi-bold (e.g., "Round 2 of 3")
- **Song Titles/Results**: 20px, medium weight
- **Input Labels**: 16px, regular weight
- **Body Text/Instructions**: 14px, regular weight
- **Secondary Info**: 12px, regular weight (timer, score details)

## Layout & Spacing System

### Spacing Primitives
Use Tailwind units: **2, 4, 6, 8, 12, 16** (e.g., p-4, gap-8, mt-12)
- Tight spacing: p-2, gap-4 (within components)
- Standard spacing: p-6, gap-8 (between sections)
- Generous spacing: p-12, mt-16 (major sections)

### Container Structure
- **Max-width**: 800px for main game container (centered)
- **Mobile padding**: px-4 on small screens, px-6 on medium+
- **Vertical rhythm**: py-8 between major sections, py-4 within cards

### Grid System
- **Single-column layout** for main game flow (mobile-first)
- **Two-column split** for stats display (attempts | score)
- **Three-column grid** for skip/hint buttons if multiple actions

## Component Library

### Audio Player Card
Central component with elevated treatment:
- **Rounded corners**: 12px border radius
- **Padding**: p-8 for desktop, p-6 for mobile
- **Waveform/Progress Bar**: Full-width, height of 8px, rounded ends
- **Playback Controls**: Centered, 64px play/pause button with 48px icons
- **Timer Display**: Flanking progress bar (0:00 — 0:16)
- **Album Art Placeholder**: 240x240px centered above controls with subtle glow effect

### Search Input Component
- **Full-width** within game container
- **Height**: 56px for comfortable touch targets
- **Border radius**: 28px (pill-shaped)
- **Padding**: px-6 for text input
- **Icon placement**: Magnifying glass icon at left (20px)
- **Focus state**: 2px border treatment

### Button Styles
- **Primary (Submit)**: Fully rounded (9999px), px-8 py-3, bold text
- **Secondary (Skip/Next)**: Outlined style, same dimensions as primary
- **Size**: Minimum 48px height for accessibility

### Score Display
- **Position**: Top-right of game container
- **Layout**: Flex row with gap-4
- **Typography**: Larger numbers (24px) with smaller labels (12px)
- **Visual treatment**: Subtle border or background differentiation

### Modal (How to Play)
- **Overlay**: Full-screen with backdrop
- **Dialog**: Max-width 600px, centered, p-8
- **Close button**: Top-right corner, 32px touch target
- **Content structure**: Ordered list with gap-4 between items

### Game State Screens
**Start Screen**:
- Logo at top (80px height)
- Game title and tagline
- "Start Game" CTA button (prominent)
- "How to Play" link below

**Result Screen (per round)**:
- Correct/Incorrect indicator (48px icon)
- Song title reveal (24px)
- Artist name (16px)
- Score update animation
- "Next Round" button

**Final Score Screen**:
- Large score display (64px)
- Performance message
- Share results option
- "Play Again" CTA

## Interaction Patterns

### Progressive Reveal
- Snippet starts at 1 second, extends with each skip (up to 16 seconds total)
- Visual indicator shows unlocked duration on progress bar

### Feedback States
- **Correct guess**: Green accent flash on input, celebratory micro-animation
- **Incorrect guess**: Red border flash, shake animation
- **Loading**: Subtle pulse on play button while audio loads

### Responsive Behavior
- **Desktop (>768px)**: Comfortable spacing, larger controls
- **Tablet (768px)**: Slightly condensed, same layout
- **Mobile (<640px)**: Stack all elements, increase touch targets to 48px minimum

## Images

**Album Art Placeholders**:
- Position: Centered above audio player controls
- Size: 240x240px on desktop, 200x200px on mobile
- Treatment: Subtle shadow or glow effect in the dark theme
- Fallback: Music note icon if no album art available

**No Hero Image**: This is a game application focused on functionality, not a marketing landing page. The game interface itself is the primary visual element.

## Navigation
- **Header**: Fixed top bar with logo (left), score (right), height 64px
- **Footer**: Minimal, py-4 with attribution/version info

## Accessibility
- All interactive elements minimum 48x48px
- Focus indicators on all inputs and buttons (2px offset outline)
- ARIA labels for icon-only buttons
- Keyboard navigation support (Enter to submit, Space for play/pause)