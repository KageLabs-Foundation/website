# KageLabs Website - Codebase Map

**Last Updated:** March 24, 2026  
**Maintained By:** KageDev (Junior)

---

## Folder Structure
```
website-main/
├── App.tsx                      # Main router and theme provider
├── index.tsx                    # React DOM mount point
├── index.css                    # Global styles (Tailwind)
├── index.html                   # HTML entry point
├── types.ts                     # Global TypeScript definitions
├── metadata.json                # Project metadata/SEO
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite build configuration
├── package.json                 # Dependencies and scripts
├── CONTEXT.md                   # Development tracking (THIS FILE)
├── CODEBASE.md                  # Codebase documentation (THIS FILE)
├── components/                  # Reusable React components
│   ├── Navbar.tsx              # Top navigation bar
│   ├── Footer.tsx              # Page footer
│   ├── Hero.tsx                # Landing page hero section
│   ├── Features.tsx            # Features showcase section
│   ├── About.tsx               # About section
│   ├── Team.tsx                # Team showcase section
│   ├── Contact.tsx             # Contact form/section
│   ├── Community.tsx           # Community section
│   ├── FAQ.tsx                 # FAQ accordion
│   ├── VisionRoadmap.tsx       # Vision and roadmap display
│   └── CustomCursor.tsx        # Animated custom cursor
└── pages/                       # Full-page route components
    ├── LandingPage.tsx         # Home page (route: /)
    ├── VisionPage.tsx          # Vision details (route: /vision)
    ├── TeamPage.tsx            # Team details (route: /team)
    ├── KageAIPage.tsx          # KageAI features (route: /kageai)
    ├── KageAIChatPage.tsx      # KageAI Chat interface (route: /kageai/chat)
    ├── KageComicsPage.tsx      # KageComics product (route: /kagecomics)
    ├── KageAnalyticsPage.tsx   # KageAnalytics product (route: /kageanalytics)
    ├── KageStudyPage.tsx       # KageStudy product (route: /kagestudy)
    └── KageSystemPage.tsx      # KageSystem product (route: /kagesystem)
```

---

## Components Reference

### Navbar.tsx
- **Purpose:** Top navigation bar with logo, links, and theme toggle
- **Props:** `setInteractionState: (state: InteractionState) => void`, `isDarkMode: boolean`, `toggleTheme: () => void`
- **Key Features:** Theme toggle, responsive navigation, custom cursor interaction states
- **Imports:** React Router v7 for navigation links
- **Styling:** Tailwind CSS with dark mode support

### Footer.tsx
- **Purpose:** Site-wide footer with links, contact info, and branding
- **Props:** TBD (needs audit)
- **Key Features:** Responsive grid layout, social links, legal links
- **Styling:** Dark-first design matching brand colors

### CustomCursor.tsx
- **Purpose:** Animated custom cursor that reacts to interaction states
- **Props:** `interactionState: InteractionState` (enum from types.ts)
- **Key Features:** State-based cursor animations, smooth transitions
- **Styling:** Positioned fixed, z-index managed

### Hero.tsx
- **Purpose:** Eye-catching hero section with headline and CTA
- **Props:** TBD (needs audit)
- **Key Features:** Large typography, gradient effects, call-to-action buttons

### Features.tsx
- **Purpose:** Showcase key product features in cards or grid
- **Props:** TBD (needs audit)
- **Key Features:** Responsive grid, icon support via Lucide React

### About.tsx
- **Purpose:** Company/project information and values
- **Props:** TBD (needs audit)
- **Styling:** Narrative layout with clean typography

### Team.tsx
- **Purpose:** Display team member profiles
- **Props:** TBD (needs audit)
- **Key Features:** Cards for each member, avatar images

### Contact.tsx
- **Purpose:** Contact form for user inquiries
- **Props:** TBD (needs audit)
- **Key Features:** Form validation, error/success states

### Community.tsx
- **Purpose:** Community engagement section
- **Props:** TBD (needs audit)

### FAQ.tsx
- **Purpose:** Frequently asked questions with accordion UI
- **Props:** TBD (needs audit)
- **Key Features:** Collapsible Q&A items, smooth animations

### VisionRoadmap.tsx
- **Purpose:** Display project vision and product roadmap
- **Props:** TBD (needs audit)
- **Key Features:** Timeline or milestone visualization

---

## Pages Reference

### LandingPage.tsx
- **Route:** `/`
- **Purpose:** Main entry point - company overview and product showcase
- **Components Used:** Navbar, Hero, Features, About, Team, Community, FAQ, Footer, CustomCursor
- **Key Data:** Product highlights, CTA sections

### VisionPage.tsx
- **Route:** `/vision`
- **Purpose:** Detailed vision statement, roadmap, and company direction
- **Components Used:** Navbar, VisionRoadmap, Footer
- **Key Data:** 5-year plan, mission statement, product strategy

### TeamPage.tsx
- **Route:** `/team`
- **Purpose:** Full team bios and organizational structure
- **Components Used:** Navbar, Team, Contact, Footer
- **Key Data:** Team member details, roles, backgrounds

### KageAIPage.tsx
- **Route:** `/kageai`
- **Purpose:** KageAI product landing page
- **Components Used:** Navbar, Hero, Features, CTA sections, Footer
- **Key Data:** AI capabilities, use cases, pricing info
- **Buttons:** "Try Demo" (links to `/kageai/chat`), "Join Discord for Updates"
- **API Integration:** Groq API (via KageAIChatPage)

### KageAIChatPage.tsx
- **Route:** `/kageai/chat`
- **Purpose:** Premium chat interface with full conversation management - designed like ChatGPT with persistent history
- **Architecture:** Sidebar + main chat area with fixed header/input
- **Key Components:**
  - **Sidebar (w-64):** Chat history, new chat buttons, manage existing chats
    - Active/archived chat lists with sorting (updatedAt)
    - Inline rename UI with escape-to-cancel
    - Three-dot menu: Rename, Archive, Delete
    - New Chat & Private Chat buttons
    - Mobile responsive (fixed sidebar that slides in/out)
  - **Main Area:** Header + Messages Area + Input
    - Header shows current chat name, back button, new chat button
    - Messages display with proper bubbles (rounded, styled)
    - Empty state with welcome message and example prompts
    - Loading state with "Thinking..." spinner
  - **Mobile:** Menu toggle button to show/hide sidebar
  
- **State Management:**
  - `currentChatId`: Currently active chat
  - `messages`: Current chat's messages (synced with localStorage)
  - `showSidebar/showArchived`: Mobile & archived section toggles
  - `editingChatId`: Inline editing state for renaming
  - `openMenuId`: Three-dot menu state
  
- **Features:**
  - ✓ New chat creation (public/private)
  - ✓ Chat auto-naming from first user message
  - ✓ Rename chats inline with validation
  - ✓ Archive/unarchive chats
  - ✓ Delete chats with safety (auto-switch to next chat)
  - ✓ Private chat indicator (Lock badge)
  - ✓ Persistent storage via localStorage
  - ✓ Auto-scroll to latest message
  - ✓ Loading/error states
  
- **Storage:** Uses `useChatStorage` hook (custom hook in hooks/useChatStorage.ts)
- **API:** Groq API (Llama 3.3 70B) with system prompt

### KageComicsPage.tsx
- **Route:** `/kagecomics`
- **Purpose:** KageComics product landing page
- **Components Used:** Navbar, Features, CTA, Footer
- **Key Data:** Comic catalog, reader features

### KageAnalyticsPage.tsx
- **Route:** `/kageanalytics`
- **Purpose:** KageAnalytics product landing page
- **Components Used:** Navbar, Features, Dashboard preview, CTA, Footer
- **Key Data:** Analytics features, use cases

### KageStudyPage.tsx
- **Route:** `/kagestudy`
- **Purpose:** KageStudy product landing page
- **Components Used:** Navbar, Features, CTA, Footer
- **Key Data:** Study features, curriculum info

### KageSystemPage.tsx
- **Route:** `/kagesystem`
- **Purpose:** KageSystem product landing page
- **Components Used:** Navbar, Features, CTA, Footer
- **Key Data:** System architecture highlights

---

## Global Types (types.ts)

```typescript
// Enum for custom cursor interaction states
enum InteractionState {
  IDLE,        // Default cursor state
  HOVER_BUTTON,// Hovering over clickable element
  HOVER_TEXT   // Hovering over text content
}

// Chat message interface
interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

// Complete chat session interface
interface Chat {
  id: string;                    // Unique identifier (timestamp-based)
  name: string;                  // Display name (auto-generated or user-renamed)
  messages: ChatMessage[];       // Array of messages in conversation
  createdAt: number;             // Unix timestamp
  updatedAt: number;             // Unix timestamp (updated on each message)
  isPrivate: boolean;            // Private mode flag
  isArchived: boolean;           // Archived status flag
}
```

---

## Environment Variables

Required for Gemini API integration:
```
GEMINI_API_KEY=<your-api-key>
```

Exposed in Vite config via:
- `process.env.GEMINI_API_KEY`
- `process.env.API_KEY` (aliased)

---

## Known Patterns

### Component Props Typing
- All components use `React.FC<Props>` pattern with explicit TypeScript interfaces
- No `any` types without comments justifying necessity

### Theme Management
- Dark/light mode controlled at App.tsx level
- Persisted to localStorage key `theme`
- Applied via `dark` class on `<html>` element
- Colors use Tailwind utilities: `dark:bg-[#050505]`, `bg-zinc-50`, `dark:text-white`, etc.

### Cursor Interactions
- Global `InteractionState` enum controls custom cursor appearance
- Passed down through Navbar to components that modify state
- CustomCursor component subscribed to state changes for animations

### Styling System
- Tailwind CSS utility-first approach
- Dark mode prefix `dark:` for theme-aware utilities
- Custom colors via bracket notation: `dark:bg-[#050505]`, orange-500 accent
- Custom fonts loaded via CDN (Space Grotesk, Inter)
- Responsive design follows mobile-first paradigm

### Routing
- React Router v7 with component-based routes
- Routes defined in App.tsx via `<Routes>` and `<Route>` components
- Page components handle their own sub-navigation (e.g., KageAI → KageAIChat)

### API Integration
- Google Gemini API via @google/genai package
- Currently integrated in KageAIChatPage.tsx
- API key stored in environment variables

---

## Dependencies Overview

| Package | Version | Purpose |
|---------|---------|---------|
| React | ^19.2.3 | UI library |
| React DOM | ^19.2.3 | React renderer |
| React Router DOM | ^7.0.0 | Client-side routing |
| Lucide React | ^0.562.0 | Icon library |
| @google/genai | ^1.34.0 | Gemini AI API client (currently unused) |
| Vite | ^6.2.0 | Build tool |
| TypeScript | ~5.8.2 | Language/type checking |
| @vitejs/plugin-react | ^5.0.0 | Vite React support |

---

## Custom Hooks

### useChatStorage (hooks/useChatStorage.ts)
- **Purpose:** Manages chat data persistence with localStorage
- **State Management:** Handles loading, saving, and updating Chat[] in browser storage
- **Key Methods:**
  - `createChat(isPrivate)` - Create new chat
  - `updateChat(id, updates)` - Update chat properties
  - `renameChat(id, newName)` - Rename chat
  - `updateChatMessages(id, messages)` - Update messages + auto-name on first message
  - `archiveChat/unarchiveChat(id)` - Toggle archive status
  - `deleteChat(id)` - Permanently delete chat
  - `getChat(id)` - Get single chat
  - `getActiveChats()` - Get unarchived chats sorted by updatedAt
  - `getArchivedChats()` - Get archived chats sorted by updatedAt
- **Storage:** localStorage key: `kageai_chats`
- **Auto-naming:** Generates chat name from first user message (truncated to 50 chars)

--- 

## Build & Development

| Script | Purpose |
|--------|---------|
| `yarn dev` | Start Vite dev server on port 3000 |
| `yarn build` | Build optimized production bundle |
| `yarn preview` | Preview production build locally |

Development server configured to listen on `0.0.0.0:3000` for network access.

---

## Next Steps for Codebase Growth
- [ ] Document all component props with TypeScript interfaces in types.ts
- [ ] Audit component lifecycle and state management patterns
- [ ] Establish API service layer for Gemini integration
- [ ] Create shared utilities folder (hooks, formatters, validators)
- [ ] Document responsive breakpoint strategy
- [ ] Set up error boundary and error handling patterns
