# Met Museum Explorer Knowledge Base

## Executive Summary

Met Museum Explorer is an API-driven full-stack web application for browsing
artwork from the Metropolitan Museum of Art Collection API. Users can search and
explore museum objects, view artwork details, save favorites, track recently
viewed items, and use authenticated personalization backed by MongoDB.

The project demonstrates external API integration, React/Next.js application
architecture, global state management with Jotai, dynamic routing, JWT-secured
user sessions, MongoDB-backed favorites/history APIs, and responsive UI design.

---

## Short Description

Met Museum Explorer lets users discover artwork from the Met Collection through
search, filtering, detail pages, favorites, and history. It combines a Next.js
frontend with external API data and personalized backend features.

---

## What It Does

- Connects to the Metropolitan Museum of Art Collection API.
- Searches and displays artwork records.
- Supports filtering by query parameters such as department, artist, object
  type, or search term.
- Shows artwork detail pages.
- Lets users save favorite artworks.
- Tracks recently viewed artwork.
- Persists favorites and history with authenticated backend routes.
- Uses JWT-based authentication for user-specific data.
- Stores personalized data in MongoDB.
- Uses responsive UI styling with Bootstrap and custom CSS.

---

## Main User Experience

### Search And Browse

Users can search the Met Collection and browse artwork results. The search
experience demonstrates how external API responses are turned into usable UI
state.

### Artwork Detail Pages

Users can open individual artwork pages to inspect a piece in more detail. The
app uses dynamic routing so object-specific pages can be generated from URL
parameters.

### Favorites

Signed-in users can save artworks as favorites. Favorites are managed with Jotai
state on the frontend and persisted through backend API routes connected to
MongoDB.

### Recently Viewed History

The app tracks recently viewed artwork so users can return to objects they
opened earlier. This improves navigation and demonstrates user-centered state
management.

### Authentication

JWT-based authentication protects user-specific favorites and history. The app
distinguishes public API browsing from personalized user data.

---

## Technology Stack

- Next.js for app routing and full-stack React development.
- React for component-driven UI.
- Jotai for global state management.
- MongoDB for user favorites and history persistence.
- JWT for authenticated user sessions.
- Bootstrap for responsive layout and UI components.
- Met Museum Collection API for external artwork data.

---

## External API Integration

The project integrates with the Met Museum Collection API, which contains a very
large public art dataset.

The app demonstrates:

- Fetching remote API data.
- Handling search and object lookups.
- Mapping raw API data into UI-friendly structures.
- Managing loading and empty states.
- Combining public API data with private user-specific data.

---

## State Management

Jotai is used to manage shared application state such as favorites, history, or
search-related state.

This demonstrates:

- Global state without excessive prop drilling.
- User-specific data coordination across components.
- Persisted and in-memory state working together.

---

## Backend And Persistence

The backend portion handles authenticated personalization:

- Favorites endpoints.
- History endpoints.
- MongoDB storage.
- JWT validation.
- User-specific data access.

The backend separates public artwork browsing from private user state.

---

## Key Features

- Fetches and displays artwork from the Met Museum Collection API.
- Search and filter support through query parameters.
- Favorite artwork management with Jotai atoms.
- Recently viewed history tracking.
- Dynamic routing with Next.js.
- JWT-based authentication.
- MongoDB-backed API routes for favorites and history.
- Responsive UI with Bootstrap and custom CSS.

---

## Skills Demonstrated

- API integration.
- Next.js routing.
- React component design.
- Global state management with Jotai.
- JWT authentication.
- MongoDB persistence.
- Full-stack API routes.
- Search and filtering UX.
- User personalization.
- Responsive UI design.

---

## Recruiter-Relevant Value

Met Museum Explorer demonstrates that Krutin can build an application around a
real external API, structure frontend state cleanly, add personalized
authenticated features, and persist user data. It is a strong example of API
integration plus full-stack user experience.

---

## Interview Explanation

Met Museum Explorer is an artwork browsing app powered by the Metropolitan
Museum of Art Collection API. I used Next.js and React to build the browsing and
detail-page experience, Jotai for shared state, JWT for authentication, and
MongoDB-backed API routes for favorites and history. The project helped me
practice combining public API data with private user-specific features.

