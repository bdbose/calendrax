'use client'

import { useState } from 'react'
import { DatePicker } from 'calendrax'
import type { SelectDateType, CalendarEvent, DayInfo, MinNights } from 'calendrax'
import 'calendrax/styles.css'

export default function Home() {
  // State for different calendar instances
  const [hotelDates, setHotelDates] = useState<SelectDateType>({ checkin: null, checkout: null })
  const [hotelOpen, setHotelOpen] = useState(false)

  const [eventDates, setEventDates] = useState<SelectDateType>({ checkin: null, checkout: null })
  const [eventOpen, setEventOpen] = useState(false)

  const [mobileDates, setMobileDates] = useState<SelectDateType>({ checkin: null, checkout: null })
  const [mobileOpen, setMobileOpen] = useState(false)

  const [customDates, setCustomDates] = useState<SelectDateType>({ checkin: null, checkout: null })
  const [customOpen, setCustomOpen] = useState(false)

  const today = new Date()

  // === USE CASE 1: HOTEL BOOKING WITH PRICING ===
  const hotelPricing: DayInfo[] = [
    { date: "2025-10-22", text: "$120", textColor: "#0066cc", backgroundColor: "#e6f2ff" },
    { date: "2025-10-23", text: "$120", textColor: "#0066cc", backgroundColor: "#e6f2ff" },
    { date: "2025-10-24", text: "$180", textColor: "#cc6600", backgroundColor: "#fff3e6" },
    { date: "2025-10-25", text: "$180", textColor: "#cc6600", backgroundColor: "#fff3e6" },
    { date: "2025-10-26", text: "$180", textColor: "#cc6600", backgroundColor: "#fff3e6" },
    { date: "2025-10-27", text: "$150", textColor: "#0066cc", backgroundColor: "#e6f2ff" },
    { date: "2025-10-28", text: "$150", textColor: "#0066cc", backgroundColor: "#e6f2ff" },
    { date: "2025-10-29", text: "$150", textColor: "#0066cc", backgroundColor: "#e6f2ff" },
    { date: "2025-10-30", text: "$150", textColor: "#0066cc", backgroundColor: "#e6f2ff" },
    { date: "2025-10-31", text: "$220", textColor: "#cc0000", backgroundColor: "#ffe6e6" },
    { date: "2025-11-01", text: "$200", textColor: "#cc6600", backgroundColor: "#fff3e6" },
    { date: "2025-11-02", text: "$180", textColor: "#cc6600", backgroundColor: "#fff3e6" },
  ]

  const hotelMinNights: MinNights = {
    "2025-10-24": 3,  // Weekend minimum
    "2025-10-31": 2,  // Halloween weekend
  }

  const hotelBlockedDates: string[] = [
    "2025-11-10", "2025-11-11", "2025-11-12", // Fully booked
  ]

  const hotelEvents: CalendarEvent[] = [
    { start_date: "2025-10-24", end_date: "2025-10-26", name: "Music Festival 🎵", specific_teams: "Special Event" },
    { start_date: "2025-10-31", end_date: "2025-11-01", name: "Halloween Party 🎃", specific_teams: "Special Event" },
  ]

  // === USE CASE 2: EVENT CALENDAR ===
  const companyEvents: CalendarEvent[] = [
    { start_date: "2025-10-02", end_date: "2025-10-05", name: "Tech Conference", specific_teams: "All Teams" },
    { start_date: "2025-10-18", end_date: "2025-10-22", name: "Company Retreat", specific_teams: "All Teams" },
    { start_date: "2025-11-14", end_date: "2025-11-14", name: "Team Building", specific_teams: "Engineering" },
    { start_date: "2025-11-15", end_date: "2025-11-15", name: "Product Launch", specific_teams: "Marketing" },
    { start_date: "2025-12-25", end_date: "2025-12-28", name: "Holiday Break", specific_teams: "All Teams" },
  ]

  const eventBlockedDates: string[] = [
    "2025-11-28", "2025-11-29", // Thanksgiving
  ]

  // === USE CASE 3: VACATION RENTAL ===
  const rentalInfo: DayInfo[] = [
    { date: "2025-10-22", text: "Available", textColor: "#00aa00", backgroundColor: "#e6ffe6" },
    { date: "2025-10-23", text: "Available", textColor: "#00aa00", backgroundColor: "#e6ffe6" },
    { date: "2025-10-24", text: "Last 2", textColor: "#cc6600", backgroundColor: "#fff3e6" },
    { date: "2025-10-25", text: "Booked", textColor: "#999", backgroundColor: "#f5f5f5" },
  ]

  const rentalMinNights: MinNights = {
    "2025-12-24": 7,  // Christmas week
    "2025-12-31": 4,  // New Year
  }

  return (
    <main>
      <div className="container">
        <div className="header">
          <h1>🗓️ Calendrax Examples</h1>
          <p>A powerful React calendar component with advanced booking features</p>
          <div className="badges">
            <span className="badge">TypeScript</span>
            <span className="badge">Responsive</span>
            <span className="badge">Customizable</span>
          </div>
        </div>

        {/* USE CASE 1: HOTEL BOOKING */}
        <div className="demo-section">
          <h2>🏨 Hotel Booking System</h2>
          <p className="subtitle">
            Features: Dynamic pricing, minimum nights, blocked dates, weekend requirements
          </p>
          <div className="features-list">
            <span className="feature-tag">💰 Price Display</span>
            <span className="feature-tag">🌙 Min Nights</span>
            <span className="feature-tag">🚫 Blocked Dates</span>
            <span className="feature-tag">🎉 Special Events</span>
          </div>
          
          <div className="calendar-wrapper">
            <button 
              className="trigger-btn"
              onClick={() => setHotelOpen(!hotelOpen)}
            >
              {hotelDates.checkin 
                ? `${hotelDates.checkin.toLocaleDateString()} → ${hotelDates.checkout?.toLocaleDateString() || 'Select checkout'}`
                : 'Select Hotel Dates'}
            </button>

            <DatePicker
              dates={hotelDates}
              setDates={setHotelDates}
              open={hotelOpen}
              setOpen={setHotelOpen}
              mobile={false}
              events={hotelEvents}
              showEvents={true}
              blockedDates={hotelBlockedDates}
              dayInfo={hotelPricing}
              minNights={hotelMinNights}
              allowSameDay={false}
              allowPastDates={false}
              cellWidth={80}
              cellHeight={80}
              count={2}
              startMonth={today.getMonth() + 1}
              startYear={today.getFullYear()}
            />
          </div>

          {hotelDates.checkin && (
            <div className="result-box">
              <h3>Booking Summary</h3>
              <p><strong>Check-in:</strong> {hotelDates.checkin.toDateString()}</p>
              <p><strong>Check-out:</strong> {hotelDates.checkout?.toDateString() || 'Not selected'}</p>
              {hotelDates.checkout && (
                <p><strong>Nights:</strong> {Math.ceil((hotelDates.checkout.getTime() - hotelDates.checkin.getTime()) / (1000 * 60 * 60 * 24))}</p>
              )}
            </div>
          )}

          <div className="info-box">
            <h4>How it works:</h4>
            <ul>
              <li>🔵 Blue prices = Standard rates</li>
              <li>🟠 Orange prices = Weekend/Event rates</li>
              <li>🔴 Red prices = Peak/Holiday rates</li>
              <li>⚫ "Min 3 Nights" = Weekend requirement (try Oct 24)</li>
              <li>❌ Strikethrough = Can't select as checkout</li>
              <li>🚫 Gray = Fully booked dates</li>
            </ul>
          </div>
        </div>

        {/* USE CASE 2: COMPANY EVENTS */}
        <div className="demo-section">
          <h2>📅 Company Event Calendar</h2>
          <p className="subtitle">
            Features: Multiple events, team-specific events, holiday blocking
          </p>
          <div className="features-list">
            <span className="feature-tag">📆 Events</span>
            <span className="feature-tag">👥 Teams</span>
            <span className="feature-tag">🏖️ Holidays</span>
          </div>

          <div className="calendar-wrapper">
            <button 
              className="trigger-btn secondary"
              onClick={() => setEventOpen(!eventOpen)}
            >
              {eventDates.checkin 
                ? `${eventDates.checkin.toLocaleDateString()} → ${eventDates.checkout?.toLocaleDateString() || 'Select end'}`
                : 'View Company Events'}
            </button>

            <DatePicker
              dates={eventDates}
              setDates={setEventDates}
              open={eventOpen}
              setOpen={setEventOpen}
              mobile={false}
              events={companyEvents}
              showEvents={true}
              blockedDates={eventBlockedDates}
              allowPastDates={false}
              allowSameDay={true}
              cellWidth={90}
              cellHeight={90}
              count={3}
              startMonth={today.getMonth() + 1}
              startYear={today.getFullYear()}
            />
          </div>

          <div className="info-box">
            <h4>Features:</h4>
            <ul>
              <li>📊 View events across 3 months</li>
              <li>🎯 Larger cells (90x90px) for better readability</li>
              <li>✅ Same-day selection enabled</li>
              <li>🏖️ Holiday dates blocked</li>
            </ul>
          </div>
        </div>

        {/* USE CASE 3: MOBILE VIEW */}
        <div className="demo-section">
          <h2>📱 Mobile Responsive View</h2>
          <p className="subtitle">
            Features: Touch-friendly, infinite scroll, adaptive sizing
          </p>
          <div className="features-list">
            <span className="feature-tag">📱 Mobile</span>
            <span className="feature-tag">♾️ Scroll</span>
            <span className="feature-tag">👆 Touch</span>
          </div>

          <div className="mobile-container">
            <DatePicker
              dates={mobileDates}
              setDates={setMobileDates}
              open={true}
              setOpen={setMobileOpen}
              mobile={true}
              events={companyEvents}
              showEvents={true}
              blockedDates={eventBlockedDates}
              allowPastDates={false}
              count={12}
              startMonth={today.getMonth() + 1}
              startYear={today.getFullYear()}
            />
          </div>

          <div className="info-box">
            <h4>Mobile Features:</h4>
            <ul>
              <li>📱 Full-width responsive design</li>
              <li>♾️ Infinite scrolling through months</li>
              <li>👆 Touch-optimized tap targets</li>
              <li>🎨 Clean, borderless aesthetic</li>
            </ul>
          </div>
        </div>

        {/* USE CASE 4: CUSTOM CONFIGURATION */}
        <div className="demo-section">
          <h2>⚙️ Custom Configuration</h2>
          <p className="subtitle">
            Features: Compact size, past dates enabled, same-day checkout
          </p>
          <div className="features-list">
            <span className="feature-tag">📏 Compact</span>
            <span className="feature-tag">⏮️ Past Dates</span>
            <span className="feature-tag">🌓 Same Day</span>
          </div>

          <div className="calendar-wrapper">
            <button 
              className="trigger-btn tertiary"
              onClick={() => setCustomOpen(!customOpen)}
            >
              {customDates.checkin 
                ? `${customDates.checkin.toLocaleDateString()} → ${customDates.checkout?.toLocaleDateString() || 'Select end'}`
                : 'Compact Calendar (60x60)'}
            </button>

            <DatePicker
              dates={customDates}
              setDates={setCustomDates}
              open={customOpen}
              setOpen={setCustomOpen}
              mobile={false}
              events={[]}
              showEvents={false}
              allowPastDates={true}
              allowSameDay={true}
              cellWidth={60}
              cellHeight={60}
              count={4}
              startMonth={today.getMonth() + 1}
              startYear={today.getFullYear()}
            />
          </div>

          <div className="info-box">
            <h4>Configuration:</h4>
            <ul>
              <li>📏 Compact 60x60px cells</li>
              <li>📅 4 months displayed</li>
              <li>⏮️ Past dates selectable</li>
              <li>🌓 Same-day checkout allowed</li>
              <li>📆 No events shown</li>
            </ul>
          </div>
        </div>

        {/* INSTALLATION & USAGE */}
        <div className="demo-section">
          <h2>📦 Installation</h2>
          <div className="code-block">
            <code>npm install calendrax</code>
          </div>
        </div>

        <div className="demo-section">
          <h2>💻 Basic Usage</h2>
          <div className="code-block">
            <pre>{`import { DatePicker } from 'calendrax'
import type { SelectDateType, DayInfo, MinNights } from 'calendrax'
import 'calendrax/styles.css'

function App() {
  const [dates, setDates] = useState<SelectDateType>({ 
    checkin: null, 
    checkout: null 
  })
  const [open, setOpen] = useState(false)
  
  const pricing: DayInfo[] = [
    { date: "2025-10-22", text: "$150", textColor: "#0066cc" }
  ]
  
  const minNights: MinNights = {
    "2025-10-24": 3  // Weekend minimum
  }

  return (
    <DatePicker
      dates={dates}
      setDates={setDates}
      open={open}
      setOpen={setOpen}
      dayInfo={pricing}
      minNights={minNights}
      blockedDates={["2025-11-10"]}
      allowSameDay={true}
      cellWidth={80}
      cellHeight={80}
      count={2}
    >
      <button>Select Dates</button>
    </DatePicker>
  )
}`}</pre>
          </div>
        </div>

        {/* FEATURES LIST */}
        <div className="demo-section">
          <h2>✨ All Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>🎯 Date Selection</h3>
              <p>Smart check-in/checkout with validation</p>
            </div>
            <div className="feature-card">
              <h3>💰 Day Info</h3>
              <p>Display prices or custom text per day</p>
            </div>
            <div className="feature-card">
              <h3>🌙 Min Nights</h3>
              <p>Enforce minimum stay requirements</p>
            </div>
            <div className="feature-card">
              <h3>🚫 Blocked Dates</h3>
              <p>Prevent selection of specific dates</p>
            </div>
            <div className="feature-card">
              <h3>📅 Events</h3>
              <p>Display events with custom labels</p>
            </div>
            <div className="feature-card">
              <h3>📱 Responsive</h3>
              <p>Desktop and mobile optimized</p>
            </div>
            <div className="feature-card">
              <h3>📏 Customizable</h3>
              <p>Adjust cell sizes and styling</p>
            </div>
            <div className="feature-card">
              <h3>⚡ TypeScript</h3>
              <p>Full type safety included</p>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="footer">
          <p>
            <a href="https://github.com/bdbose/calendrax" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
            {' • '}
            <a href="https://www.npmjs.com/package/calendrax" target="_blank" rel="noopener noreferrer">
              npm
            </a>
            {' • '}
            <a href="https://bdbose.in" target="_blank" rel="noopener noreferrer">
              Author
            </a>
          </p>
          <p className="copyright">
            © 2025 Calendrax by Bidipto Bose • MIT License
          </p>
        </div>
      </div>

      <style jsx>{`
        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 40px 20px;
        }

        .header {
          text-align: center;
          margin-bottom: 60px;
        }

        .header h1 {
          font-size: 48px;
          margin-bottom: 12px;
          color: #111;
        }

        .header p {
          font-size: 20px;
          color: #666;
          margin-bottom: 16px;
        }

        .badges {
          display: flex;
          gap: 12px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .badge {
          padding: 6px 16px;
          background: #f0f7ff;
          color: #0066cc;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 500;
        }

        .demo-section {
          margin-bottom: 60px;
          padding: 32px;
          background: #fff;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.06);
        }

        .demo-section h2 {
          font-size: 32px;
          margin-bottom: 8px;
          color: #111;
        }

        .subtitle {
          color: #666;
          font-size: 16px;
          margin-bottom: 16px;
        }

        .features-list {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 24px;
        }

        .feature-tag {
          padding: 4px 12px;
          background: #f5f5f5;
          border-radius: 16px;
          font-size: 13px;
          color: #555;
        }

        .calendar-wrapper {
          margin: 24px 0;
          padding: 24px;
          background: #fafafa;
          border-radius: 8px;
        }

        .mobile-container {
          max-width: 420px;
          margin: 24px auto;
          padding: 20px;
          background: #fafafa;
          border-radius: 8px;
        }

        .trigger-btn {
          padding: 14px 28px;
          font-size: 16px;
          font-weight: 500;
          border-radius: 8px;
          border: 2px solid #4a7ba7;
          background: #4a7ba7;
          color: #fff;
          cursor: pointer;
          transition: all 0.2s;
          margin-bottom: 16px;
          display: block;
        }

        .trigger-btn:hover {
          background: #3d6a94;
          border-color: #3d6a94;
        }

        .trigger-btn.secondary {
          background: #0066cc;
          border-color: #0066cc;
        }

        .trigger-btn.secondary:hover {
          background: #0052a3;
          border-color: #0052a3;
        }

        .trigger-btn.tertiary {
          background: #666;
          border-color: #666;
        }

        .trigger-btn.tertiary:hover {
          background: #555;
          border-color: #555;
        }

        .result-box {
          padding: 20px;
          background: #e6f2ff;
          border-radius: 8px;
          margin-top: 16px;
        }

        .result-box h3 {
          margin: 0 0 12px 0;
          color: #0066cc;
        }

        .result-box p {
          margin: 8px 0;
          color: #333;
        }

        .info-box {
          padding: 20px;
          background: #fffbf0;
          border-left: 4px solid #f59e0b;
          border-radius: 4px;
          margin-top: 20px;
        }

        .info-box h4 {
          margin: 0 0 12px 0;
          color: #92400e;
        }

        .info-box ul {
          margin: 0;
          padding-left: 20px;
        }

        .info-box li {
          margin: 6px 0;
          color: #78350f;
        }

        .code-block {
          background: #1e1e1e;
          padding: 20px;
          border-radius: 8px;
          overflow-x: auto;
        }

        .code-block code,
        .code-block pre {
          color: #d4d4d4;
          font-family: 'Monaco', 'Menlo', 'Courier New', monospace;
          font-size: 14px;
          line-height: 1.6;
          margin: 0;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 20px;
          margin-top: 24px;
        }

        .feature-card {
          padding: 24px;
          background: #f8f9fa;
          border-radius: 8px;
          border: 1px solid #e9ecef;
        }

        .feature-card h3 {
          margin: 0 0 8px 0;
          font-size: 20px;
          color: #111;
        }

        .feature-card p {
          margin: 0;
          color: #666;
          font-size: 14px;
        }

        .footer {
          text-align: center;
          margin-top: 80px;
          padding-top: 40px;
          border-top: 1px solid #e5e5e5;
        }

        .footer a {
          color: #0066cc;
          text-decoration: none;
          font-weight: 500;
        }

        .footer a:hover {
          text-decoration: underline;
        }

        .copyright {
          margin-top: 12px;
          color: #999;
          font-size: 14px;
        }

        @media (max-width: 768px) {
          .container {
            padding: 20px 12px;
          }

          .header h1 {
            font-size: 32px;
          }

          .header p {
            font-size: 16px;
          }

          .demo-section {
            padding: 20px;
          }

          .demo-section h2 {
            font-size: 24px;
          }

          .calendar-wrapper {
            padding: 16px;
          }

          .mobile-container {
            max-width: 100%;
            padding: 12px;
            margin: 16px 0;
          }

          .trigger-btn {
            width: 100%;
            padding: 12px 20px;
            font-size: 14px;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </main>
  )
}
