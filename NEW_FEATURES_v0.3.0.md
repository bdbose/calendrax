# New Features - v0.3.0

## 🎉 Three Powerful New Features!

Version 0.3.0 introduces three optional features to make Calendrax even more flexible and powerful for your use case.

---

## 1. ✅ Allow Past Dates Selection

### Feature: `allowPastDates`

**Type:** `boolean` (optional, default: `false`)

By default, Calendrax blocks all dates before today. Enable this prop to allow users to select past dates.

### Use Cases:
- **Historical data entry** - Let users log past check-ins
- **Retroactive bookings** - Add bookings for dates that already passed
- **Reporting** - Select date ranges that include past dates
- **Data migration** - Import historical data

### Example:

```tsx
<DatePicker
  dates={dates}
  setDates={setDates}
  open={open}
  setOpen={setOpen}
  allowPastDates={true}  // ← Enable past date selection
/>
```

### Behavior:
- `allowPastDates={false}` (default): Past dates are grayed out and unclickable
- `allowPastDates={true}`: Past dates are selectable like any other date

---

## 2. 🔄 Same-Day Check-in/Checkout

### Feature: `allowSameDay`

**Type:** `boolean` (optional, default: `false`)

Allow users to select the same date for both check-in and check-out.

### Use Cases:
- **Hourly bookings** - Day use only, no overnight stay
- **Event spaces** - Same-day venue rentals
- **Day passes** - Hotels offering day use rooms
- **Meeting rooms** - Book for just a few hours on the same day

### Example:

```tsx
<DatePicker
  dates={dates}
  setDates={setDates}
  open={open}
  setOpen={setOpen}
  allowSameDay={true}  // ← Enable same-day selection
/>
```

### Behavior:
- `allowSameDay={false}` (default): Clicking the check-in date again does nothing
- `allowSameDay={true}`: Clicking the check-in date again sets it as check-out (same day)

---

## 3. 💰 Day Info Display

### Feature: `dayInfo`

**Type:** `DayInfo[]` (optional)

Display custom text below each date with optional colors. Perfect for showing prices, availability, or any per-date information.

### Type Definition:

```typescript
type DayInfo = {
  date: string;              // Format: 'YYYY-MM-DD'
  text: string;              // Text to display below the date
  textColor?: string;        // Optional text color (CSS color)
  backgroundColor?: string;  // Optional background color (CSS color)
}
```

### Use Cases:
- **Hotel pricing** - Show nightly rates
- **Availability** - "3 left", "Sold out", etc.
- **Seasonal info** - "Peak season", "Low season"
- **Events** - "Concert", "Holiday", etc.
- **Custom indicators** - Any per-date information

### Example:

```tsx
import type { DayInfo } from 'calendrax'

const dayInfo: DayInfo[] = [
  { 
    date: "2025-10-22", 
    text: "$150", 
    textColor: "#0066cc", 
    backgroundColor: "#e6f2ff" 
  },
  { 
    date: "2025-10-23", 
    text: "$180", 
    textColor: "#0066cc", 
    backgroundColor: "#e6f2ff" 
  },
  { 
    date: "2025-10-24", 
    text: "$200", 
    textColor: "#cc0000",      // Red for expensive dates
    backgroundColor: "#ffe6e6" 
  },
  { 
    date: "2025-10-25", 
    text: "Sold Out", 
    textColor: "#999", 
    backgroundColor: "#f5f5f5" 
  },
]

<DatePicker
  dates={dates}
  setDates={setDates}
  open={open}
  setOpen={setOpen}
  dayInfo={dayInfo}  // ← Add day info
/>
```

### Styling:
- Info appears as a small badge below the date number
- Auto-adjusts for mobile screens (smaller text)
- Truncates with ellipsis if text is too long
- Both colors are optional (uses default styling if not provided)

### Default Styling:
- Font size: 10px (desktop), 9px (mobile)
- Padding: 2px 4px (desktop), 1px 3px (mobile)
- Border radius: 3px
- Max width: 90% of cell width

---

## 🔄 Complete Example

Here's how to use all three features together:

```tsx
'use client'

import { useState } from 'react'
import { DatePicker } from 'calendrax'
import type { SelectDateType, DayInfo } from 'calendrax'
import 'calendrax/styles.css'

export default function BookingCalendar() {
  const [dates, setDates] = useState<SelectDateType>({ 
    checkin: null, 
    checkout: null 
  })
  const [open, setOpen] = useState(false)

  // Define pricing for each date
  const dayInfo: DayInfo[] = [
    { date: "2025-10-22", text: "$150", textColor: "#0066cc", backgroundColor: "#e6f2ff" },
    { date: "2025-10-23", text: "$180", textColor: "#0066cc", backgroundColor: "#e6f2ff" },
    { date: "2025-10-24", text: "$200", textColor: "#cc0000", backgroundColor: "#ffe6e6" },
    { date: "2025-10-25", text: "$180", textColor: "#0066cc", backgroundColor: "#e6f2ff" },
    { date: "2025-10-26", text: "3 left", textColor: "#ff6600", backgroundColor: "#fff3e6" },
  ]

  // Blocked dates (maintenance, sold out, etc.)
  const blockedDates: string[] = [
    "2025-10-28",
    "2025-10-29",
  ]

  return (
    <div>
      <DatePicker
        dates={dates}
        setDates={setDates}
        open={open}
        setOpen={setOpen}
        
        // New features!
        allowPastDates={true}   // Allow historical bookings
        allowSameDay={true}     // Allow day-use bookings
        dayInfo={dayInfo}       // Show prices per night
        
        // Existing features
        blockedDates={blockedDates}
        showEvents={true}
        mobile={false}
      >
        <button onClick={() => setOpen(!open)}>
          {dates.checkin?.toDateString() || "Check-in"} 
          {" | "} 
          {dates.checkout?.toDateString() || "Check-out"}
        </button>
      </DatePicker>
    </div>
  )
}
```

---

## 📋 Updated Props Table

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `dates` | `SelectDateType` | Yes | - | Selected date range |
| `setDates` | `Dispatch<SetStateAction<SelectDateType>>` | Yes | - | Function to update dates |
| `open` | `boolean` | Yes | - | Calendar visibility state |
| `setOpen` | `Dispatch<SetStateAction<boolean>>` | Yes | - | Function to toggle calendar |
| `mobile` | `boolean` | No | `false` | Enable mobile view |
| `events` | `CalendarEvent[]` | No | - | Array of events to display |
| `showEvents` | `boolean` | No | `true` | Show/hide events |
| `blockedDates` | `string[]` | No | - | Dates to block (YYYY-MM-DD) |
| **`allowPastDates`** | **`boolean`** | **No** | **`false`** | **Allow past date selection** |
| **`allowSameDay`** | **`boolean`** | **No** | **`false`** | **Allow same-day check-in/checkout** |
| **`dayInfo`** | **`DayInfo[]`** | **No** | **-** | **Custom info below each date** |
| `startMonth` | `number` | No | current | Starting month (1-12) |
| `startYear` | `number` | No | current | Starting year |
| `count` | `number` | No | `2` | Number of months to display |
| `children` | `ReactNode` | No | - | Trigger element |

---

## 🎨 Styling Day Info

You can customize the day info styling in your CSS:

```css
/* Customize day info appearance */
.day-info {
  font-size: 11px !important;
  font-weight: 600 !important;
  padding: 3px 5px !important;
  border-radius: 4px !important;
}

/* Mobile customization */
@media (max-width: 768px) {
  .day-info {
    font-size: 10px !important;
  }
}
```

---

## 🔧 TypeScript Support

All new features are fully typed:

```typescript
import type { DayInfo, SelectDateType } from 'calendrax'

// DayInfo type
type DayInfo = {
  date: string;
  text: string;
  textColor?: string;
  backgroundColor?: string;
}

// Props are fully typed
const props = {
  allowPastDates: true,    // boolean
  allowSameDay: true,       // boolean
  dayInfo: dayInfoArray,    // DayInfo[]
}
```

---

## ⚡ Performance Notes

- **Day Info Map**: Internally uses a Map for O(1) lookups
- **Memoization**: `dayInfo` array is memoized to prevent unnecessary recalculations
- **No performance impact** if features are not used (props are optional)

---

## 🐛 Edge Cases Handled

### allowSameDay
- ✅ Works with blockedDates (can't select blocked dates as same-day)
- ✅ Works with allowPastDates (can select past same-day dates if enabled)
- ✅ Visual feedback: Both check-in and check-out highlighting on same date

### dayInfo
- ✅ Long text truncates with ellipsis
- ✅ Mobile responsive (smaller text)
- ✅ Colors are optional (falls back to default styling)
- ✅ No dayInfo for a date? No problem (just shows the date)

### allowPastDates
- ✅ Combines with blockedDates (blocked dates are still blocked even if in the past)
- ✅ Events still show on past dates if `showEvents={true}`
- ✅ Visual styling remains consistent

---

## 📦 Migration Guide

### From v0.2.0 to v0.3.0

**No breaking changes!** All new features are optional props.

**Before (v0.2.0):**
```tsx
<DatePicker
  dates={dates}
  setDates={setDates}
  open={open}
  setOpen={setOpen}
  blockedDates={blockedDates}
/>
```

**After (v0.3.0 - optional enhancements):**
```tsx
<DatePicker
  dates={dates}
  setDates={setDates}
  open={open}
  setOpen={setOpen}
  blockedDates={blockedDates}
  allowPastDates={true}      // NEW
  allowSameDay={true}         // NEW
  dayInfo={dayInfoArray}      // NEW
/>
```

---

## 🎯 Real-World Use Cases

### Hotel Booking System
```tsx
<DatePicker
  allowSameDay={true}        // Day-use rooms
  dayInfo={pricePerNight}    // Show nightly rates
  blockedDates={soldOut}     // Fully booked dates
/>
```

### Vacation Rental
```tsx
<DatePicker
  allowPastDates={true}      // Admin can add historical bookings
  dayInfo={seasonalPricing}  // Peak/off-peak pricing
  blockedDates={maintenance} // Maintenance dates
/>
```

### Meeting Room Booking
```tsx
<DatePicker
  allowSameDay={true}        // Same-day meetings
  dayInfo={availability}     // "3 slots left"
  blockedDates={holidays}    // Office closed
/>
```

### Event Venue
```tsx
<DatePicker
  allowSameDay={true}        // Day events
  dayInfo={eventInfo}        // "Concert", "Wedding", etc.
  blockedDates={booked}      // Already booked dates
/>
```

---

## 📊 Summary

| Feature | Prop | Type | Use Case |
|---------|------|------|----------|
| Past Dates | `allowPastDates` | `boolean` | Historical bookings, reporting |
| Same Day | `allowSameDay` | `boolean` | Day-use, hourly bookings |
| Day Info | `dayInfo` | `DayInfo[]` | Prices, availability, notes |

---

**Version:** 0.3.0  
**Author:** Bidipto Bose (@bdbose)  
**Package:** calendrax  
**Date:** October 21, 2025

