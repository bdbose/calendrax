# Blocked Dates Feature - v0.2.0

## 🎉 New Feature: Blocked Dates

Your Calendrax package now supports blocking specific dates from selection! This is a powerful feature for managing availability in booking systems.

---

## 📋 What Was Added

### 1. New Prop: `blockedDates`

```tsx
<DatePicker
  dates={dates}
  setDates={setDates}
  open={open}
  setOpen={setOpen}
  blockedDates={["2025-10-28", "2025-10-29", "2025-11-10"]}
  // ... other props
/>
```

### 2. Date Format

- Blocked dates must be in **`YYYY-MM-DD`** format
- Example: `"2025-10-28"`

### 3. How It Works

#### Behavior 1: Click Prevention
- Users **cannot click** on blocked dates
- Blocked dates appear grayed out (same styling as past dates)

#### Behavior 2: Range Validation
- If a user selects a check-in date and tries to select a check-out date
- The selection will **fail** if any blocked dates exist between them
- The selection resets to the clicked date as the new check-in

#### Example Scenarios

**Scenario 1: Clicking a blocked date**
```
User clicks Oct 28 (blocked) → Nothing happens
```

**Scenario 2: Range with blocked dates**
```
User selects Oct 25 as check-in
User clicks Oct 31 as check-out
But Oct 28-30 are blocked
→ Selection resets to Oct 31 as new check-in
```

**Scenario 3: Valid range**
```
User selects Oct 25 as check-in
User clicks Oct 27 as check-out
No blocked dates between them
→ Selection succeeds ✓
```

---

## 🔧 Technical Implementation

### New Type Definition
```typescript
export type BlockedDates = string[]; // Array of dates in 'YYYY-MM-DD' format
```

### New Utility Functions
```typescript
// Convert Date to 'YYYY-MM-DD' format
formatDate(date: Date): string

// Check if a date is blocked
isDateBlocked(date: Date, blockedDates?: BlockedDates): boolean

// Check if any blocked dates exist in a range
hasBlockedDateInRange(start: Date, end: Date, blockedDates?: BlockedDates): boolean
```

### Updated Functions
```typescript
// Now checks for blocked dates
getDateState(date: Date, selection: SelectDateType, blockedDates?: BlockedDates): DayState

// Now validates ranges against blocked dates
nextSelectionOnClick(
  selection: SelectDateType, 
  clicked: Date, 
  blockedDates?: BlockedDates
): SelectDateType
```

---

## 📦 Files Modified

1. **src/types/type.d.ts** - Added `BlockedDates` type
2. **src/utils/selection.ts** - Added utility functions and updated logic
3. **src/components/DatePicker.tsx** - Added prop and passed to children
4. **src/components/Months/DesktopMonths.tsx** - Passed prop through
5. **src/components/Months/MobileMonths.tsx** - Passed prop through
6. **src/components/Months/index.tsx** - Used in date state and click logic
7. **src/App.tsx** - Added example blocked dates
8. **example/src/app/page.tsx** - Added example with documentation
9. **README.md** - Added comprehensive documentation section
10. **CHANGELOG.md** - Documented all changes
11. **package.json** - Bumped version to 0.2.0

---

## 📚 Use Cases

### 1. Maintenance Periods
```typescript
const blockedDates = [
  "2025-11-15", // Server maintenance
  "2025-11-16"
]
```

### 2. Fully Booked Dates
```typescript
const blockedDates = [
  "2025-12-25", // Christmas - sold out
  "2025-12-26",
  "2025-12-31", // New Year's Eve - sold out
  "2026-01-01"
]
```

### 3. Holidays / Non-working Days
```typescript
const blockedDates = [
  "2025-11-28", // Thanksgiving
  "2025-12-25", // Christmas
  "2026-01-01"  // New Year
]
```

### 4. Dynamic Blocking from API
```typescript
const [blockedDates, setBlockedDates] = useState<string[]>([])

useEffect(() => {
  fetch('/api/blocked-dates')
    .then(res => res.json())
    .then(data => setBlockedDates(data.dates))
}, [])

<DatePicker
  blockedDates={blockedDates}
  // ... other props
/>
```

---

## ✅ Testing Checklist

- [x] Build succeeds without errors
- [x] TypeScript types are correct
- [x] No linter errors
- [x] Clicking blocked dates does nothing
- [x] Range validation works correctly
- [x] Visual feedback (grayed out) displays
- [x] Documentation is comprehensive
- [x] Examples demonstrate the feature
- [x] Changelog is updated
- [x] Version bumped to 0.2.0

---

## 🚀 Ready to Publish

Your package is ready for publishing! 

### To Publish v0.2.0:

```bash
# Login to npm (if not already)
npm login

# Publish the new version
npm publish

# Create git tag
git tag v0.2.0
git push origin v0.2.0

# Create GitHub Release
# Go to: https://github.com/bdbose/calendrax/releases/new
# Tag: v0.2.0
# Title: v0.2.0 - Blocked Dates Feature
```

### Release Notes Template:

```markdown
# v0.2.0 - Blocked Dates Feature

## 🚫 New Feature: Blocked Dates

Calendrax now supports blocking specific dates from selection!

### What's New

- **blockedDates prop**: Pass an array of dates in 'YYYY-MM-DD' format to prevent selection
- **Click prevention**: Users cannot click on blocked dates
- **Range validation**: Prevents ranges that include blocked dates
- **Visual feedback**: Blocked dates appear grayed out

### Usage

\`\`\`tsx
const blockedDates = ["2025-10-28", "2025-10-29", "2025-11-10"]

<DatePicker
  dates={dates}
  setDates={setDates}
  open={open}
  setOpen={setOpen}
  blockedDates={blockedDates}
/>
\`\`\`

### Use Cases

- Maintenance periods
- Fully booked dates
- Holidays / non-working days
- Custom business rules

See the [README](https://github.com/bdbose/calendrax#blocked-dates) for full documentation.

## What's Changed

- feat: add blockedDates feature for preventing date selection by @bdbose

**Full Changelog**: https://github.com/bdbose/calendrax/compare/v0.1.0...v0.2.0
```

---

## 📊 Summary

- **Version**: 0.1.0 → 0.2.0
- **New Feature**: Blocked Dates
- **Files Changed**: 11
- **Lines Added**: ~177
- **Lines Removed**: ~36
- **Documentation**: Comprehensive
- **Examples**: Updated
- **Tests**: Build passes ✓

---

**Great work, Bidipto! This is a significant feature addition to your package!** 🎉

Users can now easily prevent date selection for maintenance, bookings, holidays, and custom business rules.

---

*Generated on: October 21, 2025*  
*Author: Bidipto Bose (@bdbose)*  
*Package: calendrax v0.2.0*

