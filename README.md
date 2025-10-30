# Snaptrip Frontend Take-Home Task

This repository contains a React-based search form component built as part of the Snaptrip senior frontend engineer take-home task. The goal was to implement a functional search form with multiple interactive inputs and integration with an external API.

## Features

- **Region Selector**
  - Autocomplete input querying the [Photon API](https://photon.komoot.io/) for location suggestions.
  - Dropdown displays region results; selecting a region updates latitude and longitude.

- **Date Selector**
  - Check-in and check-out date picker using [`react-date-range`](https://www.npmjs.com/package/react-date-range).
  - Displays formatted date range preview.
  - Click-outside handling closes the calendar.

- **Room Selector**
  - Dynamic summary of total rooms and guests.
  - Click-outside handling closes the dropdown.
  - Side note: didn't get time to add functionality to add additional rooms

- **Form Submission**
  - Constructs a Laterooms search URL with region, coordinates, dates, and rooms.
  - Rooms are JSON-encoded and URL-encoded.

## Design Decisions

- Components are modular (`RegionInput`, `DateSelector`, `RoomSelector`) for reusability and maintainability.
- Used React hooks (`useState`, `useEffect`, `useRef`) for state management and DOM interaction.
- Click-outside events implemented to improve UX without extra libraries.
- Added i18n translations (not finished) to show future-proofing to display website in various languages
- Used Tailwind to accelerate dev time.

## Getting Started

1. Visit [SnapSearch] (https://snap-search-cj1m.vercel.app/) to view the form, repo was deployed via Vercel.
