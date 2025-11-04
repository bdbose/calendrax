# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.9.0] - 2025-01-XX

### Added
- **Minimum Nights Tooltips**: Interactive tooltips that appear when hovering over dates with minimum night requirements
  - Shows "{n}-night minimum" message
  - Tooltips stay visible until checkout is selected
  - Smart positioning to prevent screen overflow
  - Handles edge cases (Monday/Sunday) with automatic position adjustment
  - Works on both desktop and mobile views
- **Event Popups**: Hover/click tooltips for single-day events with compressed text
  - Automatically detects when event text is truncated
  - Shows formatted date (e.g., "25 Dec") and full event name
  - White background with black text styling
  - Smart positioning to prevent screen overflow
  - Works on both desktop and mobile views
- New `EventLabel` component for enhanced event rendering with popup support
- Enhanced event system to track single-day events separately

### Changed
- Updated minimum nights feature to show tooltips on hover
- Event labels now support pointer events for single-day events
- Improved event rendering to detect text compression
- Enhanced CSS for tooltip and popup positioning

### Documentation
- Updated README with minimum nights tooltip feature
- Updated README with event popup feature
- Added examples and use cases for new features

## [0.2.0] - 2025-10-21

### Added
- **Blocked Dates Feature**: New `blockedDates` prop to prevent selection of specific dates
  - Accepts array of dates in 'YYYY-MM-DD' format
  - Prevents clicking on blocked dates
  - Validates date ranges to ensure no blocked dates in between check-in and check-out
  - Visual feedback with grayed-out appearance (same as past dates)
- New utility functions: `formatDate`, `isDateBlocked`, `hasBlockedDateInRange`
- Comprehensive blocked dates documentation in README
- Examples demonstrating blocked dates usage in both src/App.tsx and example/

### Changed
- Updated `getDateState` to check for blocked dates
- Updated `nextSelectionOnClick` to validate ranges against blocked dates
- Enhanced README with blocked dates section and use cases
- Updated all component props to pass `blockedDates` through the component tree

### Documentation
- Added "Blocked Dates" section in README with:
  - Use cases (maintenance periods, fully booked dates, holidays)
  - How it works explanation
  - Code examples
  - Behavior scenarios
- Updated Props table to include `blockedDates`
- Updated Quick Start example to show blockedDates usage

## [0.1.0] - 2025-10-17

### Added
- Initial package setup
- Core calendar components
- Event system
- TypeScript definitions
- CSS styles
- Build configuration
- GitHub Actions for CI/CD
- Next.js example
- Documentation

[Unreleased]: https://github.com/bdbose/calendrax/compare/v0.9.0...HEAD
[0.9.0]: https://github.com/bdbose/calendrax/compare/v0.8.0...v0.9.0
[0.8.0]: https://github.com/bdbose/calendrax/compare/v0.2.0...v0.8.0
[0.2.0]: https://github.com/bdbose/calendrax/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/bdbose/calendrax/releases/tag/v0.1.0

