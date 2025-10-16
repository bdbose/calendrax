# Calendrax Next.js Example

This example demonstrates how to use the Calendrax calendar component in a Next.js application.

## Getting Started

1. Install dependencies:

```bash
npm install
```

2. Run the development server:

```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Features Demonstrated

- ✅ Date range selection (check-in/check-out)
- ✅ Event display with custom styling
- ✅ Desktop and mobile responsive views
- ✅ TypeScript integration
- ✅ Next.js App Router compatibility

## Code Example

```tsx
'use client'

import { useState } from 'react'
import { DatePicker } from 'calendrax'
import type { SelectDateType, CalendarEvent } from 'calendrax'
import 'calendrax/styles.css'

export default function Home() {
  const [dates, setDates] = useState<SelectDateType>({ 
    checkin: null, 
    checkout: null 
  })
  const [open, setOpen] = useState(false)

  const events: CalendarEvent[] = [
    { 
      start_date: "2025-10-02", 
      end_date: "2025-10-05", 
      name: "Dusshera Weekend",
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
    />
  )
}
```

## Learn More

- [Calendrax Documentation](../README.md)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)

