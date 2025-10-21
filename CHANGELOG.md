# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

[Unreleased]: https://github.com/bdbose/calendrax/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/bdbose/calendrax/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/bdbose/calendrax/releases/tag/v0.1.0

