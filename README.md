# Calendrax

A powerful React/TypeScript calendar component library with advanced date range selection, event management, and booking features.

[![npm version](https://img.shields.io/npm/v/calendrax.svg)](https://www.npmjs.com/package/calendrax)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Features

✨ **Date Range Selection** - Check-in and check-out date picking with smart validation  
📅 **Event Display** - Show events with custom styling and labels  
🚫 **Blocked Dates** - Prevent selection of specific dates with range validation  
🏨 **Minimum Nights** - Enforce minimum stay requirements for booking systems  
💰 **Day Info Display** - Show custom text below dates (prices, availability, etc.)  
📱 **Responsive Design** - Optimized for both mobile and desktop  
🎨 **Customizable Cell Sizes** - Adjustable date cell dimensions (desktop)  
⚡ **TypeScript** - Full TypeScript support with type definitions  
🔄 **Multiple Months** - Display multiple months simultaneously  
🎯 **Smart Navigation** - Context-aware arrow placement  
🌓 **Same-Day Checkout** - Optional same-day check-in/checkout support  
📆 **Past Dates Control** - Enable/disable past date selection  

## Installation

```bash
npm install calendrax
# or
yarn add calendrax
# or
pnpm add calendrax
```

## Quick Start

```tsx
'use client' // For Next.js App Router

import { useState } from 'react'
import { DatePicker } from 'calendrax'
import type { SelectDateType, CalendarEvent, DayInfo, MinNights } from 'calendrax'
import 'calendrax/styles.css'

function App() {
  const [dates, setDates] = useState<SelectDateType>({ 
    checkin: null, 
    checkout: null 
  })
  const [open, setOpen] = useState(false)

  const events: CalendarEvent[] = [
    { 
      start_date: "2025-10-02", 
      end_date: "2025-10-05", 
      name: "Holiday",
      specific_teams: "All Teams" 
    }
  ]

  // Dates that cannot be selected (YYYY-MM-DD format)
  const blockedDates: string[] = [
    "2025-10-28",
    "2025-10-29",
    "2025-11-10"
  ]

  // Display custom info below dates (e.g., prices)
  const dayInfo: DayInfo[] = [
    { date: "2025-10-22", text: "$150", textColor: "#0066cc", backgroundColor: "#e6f2ff" },
    { date: "2025-10-23", text: "$180", textColor: "#0066cc", backgroundColor: "#e6f2ff" }
  ]

  // Minimum nights requirement for specific check-in dates
  const minNights: MinNights = {
    "2025-10-24": 3,  // Requires minimum 3 nights
    "2025-10-31": 2   // Requires minimum 2 nights
  }

  return (
    <DatePicker
      dates={dates}
      setDates={setDates}
      open={open}
      setOpen={setOpen}
      events={events}
      showEvents={true}
      blockedDates={blockedDates}
      dayInfo={dayInfo}
      minNights={minNights}
      allowSameDay={true}
      allowPastDates={false}
      cellWidth={80}
      cellHeight={80}
      mobile={false}
      count={2}
      startMonth={new Date().getMonth() + 1}
      startYear={new Date().getFullYear()}
    >
      <button>Select Dates</button>
    </DatePicker>
  )
}
```

## Props

### DatePicker

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `dates` | `SelectDateType` | Yes | Selected date range |
| `setDates` | `Dispatch<SetStateAction<SelectDateType>>` | Yes | Function to update dates |
| `open` | `boolean` | Yes | Calendar visibility state |
| `setOpen` | `Dispatch<SetStateAction<boolean>>` | Yes | Function to toggle calendar |
| `mobile` | `boolean` | No | Enable mobile view (default: `false`) |
| `events` | `CalendarEvent[]` | No | Array of events to display |
| `showEvents` | `boolean` | No | Show/hide events (default: `true`) |
| `blockedDates` | `BlockedDates` | No | Array of dates to block (YYYY-MM-DD format) |
| `allowPastDates` | `boolean` | No | Allow selection of past dates (default: `false`) |
| `allowSameDay` | `boolean` | No | Allow same-day check-in/checkout (default: `false`) |
| `dayInfo` | `DayInfo[]` | No | Custom info to display below dates |
| `minNights` | `MinNights` | No | Minimum nights requirement per date |
| `cellWidth` | `number` | No | Width of date cells in pixels (default: `80`, desktop only) |
| `cellHeight` | `number` | No | Height of date cells in pixels (default: `80`, desktop only) |
| `startMonth` | `number` | No | Starting month (1-12) |
| `startYear` | `number` | No | Starting year |
| `count` | `number` | No | Number of months to display (default: `2`) |
| `children` | `ReactNode` | No | Trigger element |

### Types

```typescript
type SelectDateType = {
  checkin: Date | null
  checkout: Date | null
}

type CalendarEvent = {
  start_date: string  // Format: "YYYY-MM-DD"
  end_date: string    // Format: "YYYY-MM-DD"
  name: string
  specific_teams?: string
}

type BlockedDates = string[]  // Array of "YYYY-MM-DD" strings

type DayInfo = {
  date: string              // Format: "YYYY-MM-DD"
  text: string              // Text to display below the date
  textColor?: string        // Optional text color
  backgroundColor?: string  // Optional background color
}

type MinNights = {
  [date: string]: number    // Key: "YYYY-MM-DD", Value: minimum nights required
}
```

## Components

- **DatePicker**: Main calendar component with dropdown positioning
- **DesktopMonths**: Desktop view with navigation controls
- **MobileMonths**: Mobile view with infinite scroll
- **MonthView**: Wrapper component for responsive rendering
- **Months**: Individual month rendering with event labels
- **Dates**: Individual date cells with selection states

## Examples

### Next.js Integration

Check out the [example folder](./example) for a complete Next.js implementation.

```bash
cd example
npm install
npm run dev
```

### With Custom Styling

```tsx
import { DatePicker } from 'calendrax'
import 'calendrax/styles.css'
import './my-custom-styles.css' // Your custom overrides
```

### Mobile View

```tsx
<DatePicker
  {...props}
  mobile={true}
  count={6}  // More months for scrolling
/>
```

### Desktop View with Multiple Months

```tsx
<DatePicker
  {...props}
  mobile={false}
  count={3}  // Display 3 months side by side
/>
```

## Event System

Events are displayed as labels at the top of date cells. The event system supports:

- **Multi-day events** - Events spanning multiple consecutive dates
- **Row boundaries** - Events break at week boundaries
- **Dynamic width** - Labels adapt to screen size
- **Future filtering** - Events only show on future dates (not past dates)

### Event Example

```typescript
const events: CalendarEvent[] = [
  {
    start_date: "2025-12-24",
    end_date: "2025-12-26",
    name: "Christmas Holiday",
    specific_teams: "All Teams"
  },
  {
    start_date: "2026-01-01",
    end_date: "2026-01-01",
    name: "New Year",
    specific_teams: "Engineering"
  }
]
```

## Blocked Dates

You can prevent users from selecting specific dates by providing a `blockedDates` array. This is useful for:

- **Maintenance periods** - Block dates when the service is unavailable
- **Fully booked dates** - Prevent bookings on sold-out dates
- **Holidays** - Restrict selection on non-working days
- **Custom business rules** - Any date-specific restrictions

### How It Works

1. **Date Format**: Blocked dates must be in `YYYY-MM-DD` format
2. **Click Prevention**: Users cannot click on blocked dates
3. **Range Validation**: If a user selects a check-in date and tries to select a check-out date, the selection will fail if any blocked dates exist between them
4. **Visual Feedback**: Blocked dates appear grayed out (same styling as past dates)

### Blocked Dates Example

```typescript
const blockedDates: string[] = [
  "2025-10-28",  // Single blocked date
  "2025-10-29",
  "2025-10-30",
  "2025-11-10",  // Another blocked date
  "2025-11-11",
  "2025-12-25",  // Christmas - fully booked
]

<DatePicker
  dates={dates}
  setDates={setDates}
  open={open}
  setOpen={setOpen}
  blockedDates={blockedDates}
  // ... other props
/>
```

### Blocked Dates Behavior

- **Scenario 1**: User clicks a blocked date → Nothing happens
- **Scenario 2**: User selects Oct 25 as check-in, then clicks Oct 31 as check-out, but Oct 28-30 are blocked → Selection resets to Oct 31 as new check-in
- **Scenario 3**: User can select Oct 25 as check-in and Oct 27 as check-out (no blocked dates in between) → Selection succeeds

## Day Info Display

Display custom information below each date, perfect for showing prices, availability, or any per-day data.

### Day Info Example

```typescript
const dayInfo: DayInfo[] = [
  { 
    date: "2025-10-22", 
    text: "$150",
    textColor: "#0066cc",
    backgroundColor: "#e6f2ff"
  },
  { 
    date: "2025-10-23", 
    text: "$180 🔥",  // Hot deal!
    textColor: "#cc0000",
    backgroundColor: "#ffe6e6"
  },
  {
    date: "2025-10-24",
    text: "Sold Out",
    textColor: "#999",
    backgroundColor: "#f5f5f5"
  }
]

<DatePicker
  dates={dates}
  setDates={setDates}
  open={open}
  setOpen={setOpen}
  dayInfo={dayInfo}
  // ... other props
/>
```

### Use Cases

- **Hotels**: Display nightly rates
- **Vacation Rentals**: Show pricing tiers
- **Events**: Display ticket availability
- **Appointments**: Show available time slots

## Minimum Nights Requirement

Enforce minimum stay requirements for specific check-in dates, perfect for booking systems with weekend or holiday minimums.

### How It Works

1. **Define Requirements**: Specify which dates require minimum stays
2. **Visual Indicator**: Black "Min N Nights" label appears when date is selected as check-in
3. **Validation**: Users cannot select checkout dates that don't meet the requirement
4. **Strike-Through**: Insufficient dates are crossed out with a red line
5. **Conflict Detection**: Automatically disabled if blocked dates exist in range

### Minimum Nights Example

```typescript
const minNights: MinNights = {
  "2025-10-24": 3,  // Friday requires 3-night minimum
  "2025-10-31": 2,  // Halloween weekend requires 2-night minimum
  "2025-12-24": 7,  // Christmas week requires 7-night minimum
}

<DatePicker
  dates={dates}
  setDates={setDates}
  open={open}
  setOpen={setOpen}
  minNights={minNights}
  // ... other props
/>
```

### Behavior Example

User selects **Oct 24** as check-in (requires 3 nights):
- Oct 24: Shows **"Min 3 Nights"** label (black background)
- Oct 25: ~~Struck through~~ (can't select)
- Oct 26: ~~Struck through~~ (can't select)
- Oct 27: ✓ First valid checkout (3 nights)
- Oct 28+: ✓ All valid

### Use Cases

- **Hotels**: Weekend minimums
- **Vacation Rentals**: Peak season requirements
- **Event Venues**: Multi-day minimums
- **Resorts**: Holiday packages

## Customizable Cell Sizes (Desktop)

Adjust the size of date cells to fit your design needs. This feature only affects desktop view.

```typescript
// Large calendar (100x100px cells)
<DatePicker
  cellWidth={100}
  cellHeight={100}
  {...props}
/>

// Compact calendar (60x60px cells)
<DatePicker
  cellWidth={60}
  cellHeight={60}
  {...props}
/>

// Default (80x80px cells)
<DatePicker {...props} />
```

**Note**: Mobile view automatically adapts to screen width regardless of these settings.

## Additional Options

### Allow Past Dates

```typescript
<DatePicker
  allowPastDates={true}  // Users can select past dates
  {...props}
/>
```

### Allow Same-Day Checkout

```typescript
<DatePicker
  allowSameDay={true}  // Check-in and checkout can be same day
  {...props}
/>
```

### Smart Navigation

Navigation arrows automatically appear beside month names:
- **2 months**: ← Month1  Month2 →
- **3 months**: ← Month1  Month2  Month3 →
- Left arrow on first month, right arrow on last month

## Styling

The library includes default styles, but you can customize them:

```css
/* Override default styles */
.day-wrapper {
  /* Custom date cell styling */
  border: 2px solid #your-color !important;
}

.event-label {
  /* Custom event label styling */
  background: #your-color !important;
  font-size: 12px !important;
}

.event-label.min-nights {
  /* Minimum nights label styling */
  background: #000 !important;
  color: #fff !important;
}

.day-wrapper.checkin,
.day-wrapper.checkout {
  /* Custom selected date styling */
  background: #your-brand-color !important;
}

.day-wrapper.strikethrough {
  /* Strikethrough date styling */
  color: #999 !important;
}

.day-info {
  /* Custom day info badge styling */
  font-size: 11px !important;
  padding: 3px 5px !important;
}

.month-nav-arrow {
  /* Navigation arrow styling */
  border: 2px solid #your-color !important;
}
```

### CSS Classes

- `.day-wrapper` - Individual date cell
- `.day-wrapper.checkin` - Selected check-in date
- `.day-wrapper.checkout` - Selected checkout date
- `.day-wrapper.inRange` - Dates between check-in and checkout
- `.day-wrapper.blocked` - Blocked/past dates
- `.day-wrapper.strikethrough` - Dates blocked by minNights
- `.event-label` - Event labels
- `.event-label.min-nights` - Minimum nights labels
- `.day-info` - Day info badges
- `.month-nav-arrow` - Navigation arrows

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build library
npm run build

# Run example
cd example
npm install
npm run dev
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [Bidipto Bose](https://bdbose.in)

## Links

- [GitHub Repository](https://github.com/bdbose/calendrax)
- [npm Package](https://www.npmjs.com/package/calendrax)
- [Issues](https://github.com/bdbose/calendrax/issues)
- [Author Website](https://bdbose.in)# calendrax
