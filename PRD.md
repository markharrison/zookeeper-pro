# Planning Guide

A comprehensive animal management system for zookeepers to track, monitor, and care for their animals with intuitive organization and quick access to critical information.

**Experience Qualities**:
1. **Efficient** - Quick access to animal records with minimal clicks, streamlined data entry for busy zookeepers
2. **Trustworthy** - Clear visual hierarchy and data validation ensure accurate record-keeping for animal welfare
3. **Organized** - Logical grouping by species, habitat, or health status helps manage large collections systematically

**Complexity Level**: Light Application (multiple features with basic state)
  - Multiple interrelated features (animal profiles, feeding schedules, health records) with persistent state management and filtering capabilities

## Essential Features

### Animal Profile Management
- **Functionality**: Create, view, edit, and archive animal records with comprehensive details (name, species, age, habitat, diet, medical notes)
- **Purpose**: Centralized record-keeping ensures continuity of care across shifts and staff changes
- **Trigger**: Click "Add Animal" button or select existing animal from list
- **Progression**: View animal list → Select/Create animal → View/Edit profile form → Save changes → Return to updated list
- **Success criteria**: All animal data persists between sessions, edits reflect immediately, validation prevents incomplete records

### Health Status Tracking
- **Functionality**: Monitor and update animal health status with visual indicators (healthy, needs attention, critical)
- **Purpose**: Quickly identify animals requiring immediate care or veterinary attention
- **Trigger**: Status badge on animal card or dedicated health filter
- **Progression**: View animal list → Filter by health status → Identify animals → Update status in profile → Visual indicator updates
- **Success criteria**: Color-coded health badges visible at-a-glance, filter shows accurate results, urgent cases stand out

### Feeding Schedule Management
- **Functionality**: Track feeding times, diet requirements, and last fed timestamp for each animal
- **Purpose**: Ensure proper nutrition and prevent overfeeding/underfeeding across staff shifts
- **Trigger**: "Mark as Fed" button on animal card or feeding schedule view
- **Progression**: View animals → Identify feeding needs → Mark as fed → Timestamp updates → Next feeding time calculates
- **Success criteria**: Feeding status persists, timestamps accurate, visual indicators show overdue feedings

### Search and Filter System
- **Functionality**: Search by name, filter by species, habitat, or health status
- **Purpose**: Quickly locate specific animals or groups requiring attention in large collections
- **Trigger**: Type in search field or select filter criteria
- **Progression**: Enter search/filter criteria → Results update live → Clear filters to reset → View filtered subset
- **Success criteria**: Instant filtering, multiple filters combine logically, empty states guide users

## Edge Case Handling
- **Empty State**: Show welcoming message with "Add Your First Animal" when no animals exist, guide new users
- **Missing Data**: Allow optional fields but clearly mark required ones (name, species), handle incomplete profiles gracefully
- **Duplicate Names**: Allow duplicates but show species badge for disambiguation, warn if exact match exists
- **Long Lists**: Implement smooth scrolling and maintain filter state, consider pagination if needed
- **Concurrent Edits**: Last-write-wins strategy with timestamp validation, show when record was last updated

## Design Direction

The design should feel professional yet warm and approachable - balancing the serious responsibility of animal care with the joy of working with wildlife. Clean and efficient like veterinary software but inviting like a nature documentary. Minimal interface that prioritizes critical information and reduces cognitive load during busy shifts.

## Color Selection

Triadic color scheme (three equally spaced colors) inspired by natural environments - earth, sky, and foliage - creating harmony while maintaining distinct functional zones.

- **Primary Color**: Forest Green (oklch(0.55 0.12 155)) - Communicates growth, nature, health; represents the living environment
- **Secondary Colors**: 
  - Warm Terracotta (oklch(0.65 0.10 45)) - Earthy, stable, grounding; used for habitat/housing sections
  - Sky Blue (oklch(0.70 0.10 235)) - Calm, trustworthy, clean; used for medical/health information
- **Accent Color**: Vibrant Coral (oklch(0.68 0.18 25)) - Attention-grabbing for critical actions and urgent health alerts
- **Foreground/Background Pairings**:
  - Background (Soft Cream oklch(0.97 0.01 85)): Dark Charcoal text (oklch(0.25 0.01 155)) - Ratio 12.8:1 ✓
  - Card (White oklch(0.99 0 0)): Dark Charcoal text (oklch(0.25 0.01 155)) - Ratio 14.2:1 ✓
  - Primary (Forest Green): White text (oklch(0.99 0 0)) - Ratio 4.9:1 ✓
  - Secondary (Warm Terracotta): White text (oklch(0.99 0 0)) - Ratio 5.2:1 ✓
  - Accent (Vibrant Coral): White text (oklch(0.99 0 0)) - Ratio 4.8:1 ✓
  - Muted (Light Sage oklch(0.92 0.02 155)): Medium Gray text (oklch(0.50 0.01 155)) - Ratio 5.1:1 ✓

## Font Selection

Typography should convey professionalism and clarity while remaining friendly and approachable, using a clean sans-serif for excellent readability in various lighting conditions (indoor/outdoor zoo environments).

Primary typeface: **Inter** - A highly legible sans-serif with excellent clarity at all sizes, neutral personality perfect for data-dense interfaces.

- **Typographic Hierarchy**:
  - H1 (Page Title "My Animals"): Inter Bold / 32px / -0.02em letter spacing / 1.2 line height
  - H2 (Section Headers): Inter SemiBold / 24px / -0.01em letter spacing / 1.3 line height
  - H3 (Animal Names): Inter SemiBold / 20px / normal letter spacing / 1.4 line height
  - Body (Details & Descriptions): Inter Regular / 16px / normal letter spacing / 1.6 line height
  - Caption (Timestamps, Metadata): Inter Medium / 14px / normal letter spacing / 1.5 line height
  - Label (Form Labels): Inter Medium / 14px / normal letter spacing / 1.4 line height

## Animations

Animations should be subtle and purposeful, supporting workflow efficiency rather than showiness - quick confirmations and smooth transitions that feel responsive without delaying tasks during busy zoo operations.

- **Purposeful Meaning**: Gentle fade-ins for new animals celebrate additions, smooth card hover lifts provide tactile feedback, health status badges pulse softly for critical alerts
- **Hierarchy of Movement**: Priority on feedback for critical actions (marking fed, updating health status), secondary emphasis on navigation transitions, minimal decoration

Specific animations:
- Health badge pulse for critical status (subtle, continuous during critical state)
- "Mark as Fed" button success animation (quick scale + check mark, 200ms)
- Card hover lift (subtle elevation increase, 150ms)
- Filter/search results (stagger fade-in, 50ms delay between items)
- Modal slide-in for animal profile (300ms ease-out from right)

## Component Selection

- **Components**:
  - Card: Primary container for animal profiles in grid view, with subtle shadows
  - Dialog: Full animal profile editor with form fields
  - Button: Various states for primary actions (Add Animal, Save), secondary actions (Edit, Delete)
  - Badge: Health status and species indicators with color coding
  - Input: Search field and form fields with clear labels
  - Select: Dropdowns for species, habitat, health status selection
  - Textarea: Medical notes and general observations
  - Tabs: Switch between "All Animals", "Feeding Schedule", "Health Alerts" views
  - Avatar: Animal photo placeholder with species icon fallback
  - ScrollArea: Smooth scrolling for long animal lists
  - Separator: Visual division between card sections

- **Customizations**:
  - Animal grid cards with custom layout (photo, name, species badge, health indicator, feeding status)
  - Custom health status badge variants (healthy-green, attention-amber, critical-red)
  - Feeding timestamp component showing "Fed 2h ago" with relative time
  
- **States**:
  - Buttons: Clear hover states with slight elevation, active press feedback, disabled state for incomplete forms
  - Cards: Subtle hover lift (4px), active state on selection, focus ring for keyboard navigation
  - Inputs: Focus state with primary color border, error state with destructive color, success checkmark for validated fields
  - Health badges: Distinct background colors per status, optional pulse animation for critical

- **Icon Selection**:
  - Plus (Add new animal)
  - MagnifyingGlass (Search)
  - Funnel (Filter options)
  - Heart (Health/medical)
  - Clock (Feeding schedule/timestamp)
  - PencilSimple (Edit animal)
  - Trash (Delete/archive)
  - Check (Confirm/mark complete)
  - Warning (Health alerts)
  - PawPrint (Species indicator)

- **Spacing**:
  - Card padding: p-6
  - Grid gap: gap-6
  - Form field spacing: space-y-4
  - Section margins: mb-8
  - Button padding: px-6 py-3 (primary), px-4 py-2 (secondary)
  - Consistent 8px base unit (Tailwind's spacing scale)

- **Mobile**:
  - Grid: 1 column on mobile (<768px), 2 columns on tablet (768-1024px), 3+ columns on desktop (>1024px)
  - Dialog: Full-screen on mobile, modal on desktop
  - Navigation: Bottom-aligned action buttons on mobile, top-right on desktop
  - Search/Filter: Stack vertically on mobile with collapsible filter panel
  - Touch targets: Minimum 44px height for all interactive elements
  - Card actions: Show on card always on mobile (tap), show on hover for desktop
