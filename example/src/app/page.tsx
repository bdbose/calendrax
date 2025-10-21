'use client'

import { useState } from 'react'
import { DatePicker } from 'calendrax'
import type { SelectDateType, CalendarEvent } from 'calendrax'
import 'calendrax/styles.css'

export default function Home() {
  const [open, setOpen] = useState(false)
  const [dates, setDates] = useState<SelectDateType>({ 
    checkin: null, 
    checkout: null 
  })

  const today = new Date()

  const events: CalendarEvent[] = [
    { start_date: "2025-10-02", end_date: "2025-10-05", name: "Dusshera Weekend", specific_teams: "All Teams" },
    { start_date: "2025-10-18", end_date: "2025-10-22", name: "Diwali Weekend", specific_teams: "All Teams" },
    { start_date: "2025-12-25", end_date: "2025-12-28", name: "Christmas Weekend", specific_teams: "All Teams" },
    { start_date: "2026-01-01", end_date: "2026-01-04", name: "New Year Weekend", specific_teams: "All Teams" },
    { start_date: "2026-01-14", end_date: "2026-01-14", name: "Makar Sankranti", specific_teams: "Team A, Team B, Team C, Team Q, Team D, Team G" },
    { start_date: "2026-01-15", end_date: "2026-01-15", name: "Pongal", specific_teams: "Team F - South" },
    { start_date: "2026-01-24", end_date: "2026-01-26", name: "Republic Day Weekend", specific_teams: "All Teams" },
    { start_date: "2026-02-28", end_date: "2026-03-04", name: "Holi Weekend", specific_teams: "Team A, Team B, Team C, Team Q, Team D, Team G" },
    { start_date: "2026-04-04", end_date: "2026-04-05", name: "Good Friday Weekend", specific_teams: "All Teams" },
    { start_date: "2026-05-01", end_date: "2026-05-03", name: "Maharashtra Day Weekend", specific_teams: "Team A, Team B, Team C, Team Q" },
    { start_date: "2026-07-17", end_date: "2026-07-19", name: "Eid Weekend", specific_teams: "All Teams" },
    { start_date: "2026-08-15", end_date: "2026-08-16", name: "Independence Day Weekend", specific_teams: "All Teams" },
    { start_date: "2026-09-04", end_date: "2026-09-06", name: "Janmashtami Weekend", specific_teams: "All Teams" },
    { start_date: "2026-10-02", end_date: "2026-10-04", name: "Gandhi Jayanti Weekend", specific_teams: "All Teams" }
  ]

  // Example blocked dates - these dates cannot be selected
  const blockedDates: string[] = [
    "2025-10-28", // Blocked single date
    "2025-10-29",
    "2025-10-30",
    "2025-11-10", // Blocked dates in November
    "2025-11-11",
    "2025-12-15", // Blocked dates in December
    "2025-12-16",
  ]

  return (
    <main>
      <div className="container">
        <h1>Calendrax Next.js Example</h1>
        <p>A beautiful React calendar component with event support and date range selection</p>

        <div className="demo-section">
          <h2>Desktop Calendar with Events & Blocked Dates</h2>
          <p style={{ color: '#666', fontSize: '14px', marginBottom: '16px' }}>
            Try selecting dates! Some dates are blocked (e.g., Oct 28-30, Nov 10-11, Dec 15-16). 
            You cannot select a range that includes blocked dates.
          </p>
          <div className="calendar-wrapper">
            <DatePicker
              dates={dates}
              setDates={setDates}
              open={true}
              setOpen={setOpen}
              mobile={false}
              events={events}
              showEvents={true}
              blockedDates={blockedDates}
              startMonth={today.getMonth() + 1}
              startYear={today.getFullYear()}
            >
              <button 
                onClick={() => setOpen(!open)}
                style={{
                  padding: '12px 24px',
                  fontSize: '16px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  background: '#fff',
                  cursor: 'pointer'
                }}
              >
                {(dates.checkin && dates.checkin.toDateString()) || "Check-in"} | {(dates.checkout && dates.checkout.toDateString()) || "Check-out"}
              </button>
            </DatePicker>
          </div>

          {(dates.checkin || dates.checkout) && (
            <div className="selected-dates">
              <p><strong>Selected Dates:</strong></p>
              <p>Check-in: {dates.checkin ? dates.checkin.toDateString() : 'Not selected'}</p>
              <p>Check-out: {dates.checkout ? dates.checkout.toDateString() : 'Not selected'}</p>
            </div>
          )}
        </div>

        <div className="demo-section">
          <h2>Installation</h2>
          <div className="code-block">
            <code>npm install calendrax</code>
          </div>
        </div>

        <div className="demo-section">
          <h2>Usage</h2>
          <div className="code-block">
            <code>{`import { DatePicker } from 'calendrax'
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
      name: "Event Name",
      specific_teams: "All Teams" 
    }
  ]

  // Dates in 'YYYY-MM-DD' format that should be blocked
  const blockedDates: string[] = [
    "2025-10-28",
    "2025-10-29",
    "2025-11-10"
  ]

  return (
    <DatePicker
      dates={dates}
      setDates={setDates}
      open={open}
      setOpen={setOpen}
      events={events}
      showEvents={true}
      blockedDates={blockedDates}
      mobile={false}
    />
  )
}`}</code>
          </div>
        </div>
      </div>
    </main>
  )
}

