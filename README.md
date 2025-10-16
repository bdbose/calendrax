# Calendrax

A React/TypeScript calendar component library with event support and date range selection.

[![npm version](https://img.shields.io/npm/v/calendrax.svg)](https://www.npmjs.com/package/calendrax)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## Features

✨ **Date Range Selection** - Check-in and check-out date picking  
📅 **Event Display** - Show events with custom styling and labels  
📱 **Responsive Design** - Optimized for both mobile and desktop  
🎨 **Customizable** - Flexible styling and configuration options  
⚡ **TypeScript** - Full TypeScript support with type definitions  
🔄 **Multiple Months** - Display multiple months simultaneously  

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
import type { SelectDateType, CalendarEvent } from 'calendrax'
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

  return (
    <DatePicker
      dates={dates}
      setDates={setDates}
      open={open}
      setOpen={setOpen}
      events={events}
      showEvents={true}
      mobile={false}
      startMonth={new Date().getMonth() + 1}
      startYear={new Date().getFullYear()}
    />
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

## Styling

The library includes default styles, but you can customize them:

```css
/* Override default styles */
.day-wrapper {
  /* Custom date cell styling */
}

.event-label {
  /* Custom event label styling */
}

.day-wrapper.checkin,
.day-wrapper.checkout {
  /* Custom selected date styling */
}
```

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
