# Calendrax

A React/TypeScript calendar component library with event support and date range selection.

## Features

- Date range selection with check-in and check-out dates
- Event display and management
- Mobile and desktop responsive views
- Customizable month count and start dates
- Event labels spanning multiple days

## How to Run

To run the development server, execute the following command in your terminal:

```bash
npm run dev
```

## How to Test

To run the tests for this project, execute the following command in your terminal:

```bash
npm test
```

## Usage

The calendar component can be used in both mobile and desktop modes:

```tsx
import { DatePicker } from 'calendrax';

<DatePicker
  dates={dates}
  setDates={setDates}
  open={true}
  setOpen={setOpen}
  mobile={false}
  events={events}
  showEvents={true}
  startMonth={today.getMonth() + 1}
  startYear={today.getFullYear()}
/>
```

## Components

- **DatePicker**: Main calendar component with dropdown positioning
- **DesktopMonths**: Desktop view with navigation controls
- **MobileMonths**: Mobile view with infinite scroll
- **Months**: Individual month rendering with event labels
- **Dates**: Individual date cells with selection states

## Event System

Events are displayed as labels spanning multiple days when they occur on consecutive dates. The event system supports:

- Event name display
- Date range spanning
- Team-specific events
- Future date filtering (events don't show on past dates)

## Installation

```bash
npm install
npm run dev
```# calendrax
