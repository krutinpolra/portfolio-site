# Culinary Parcel Knowledge Base

## Executive Summary

Culinary Parcel is a full-stack meal kit subscription web application. It lets
users browse curated meal kits, register and log in, view meal details, place
orders, and interact with a database-backed web experience.

The project demonstrates traditional full-stack development with server-rendered
pages, Express routes, session-based authentication, MongoDB-backed data, EJS
views, reusable route/controller structure, and responsive UI styling.

---

## Short Description

Culinary Parcel is a full-stack culinary subscription platform for browsing and
ordering meal kits. It combines a Node.js and Express backend with EJS views,
MongoDB persistence, session-based login, and styled responsive pages.

---

## What It Does

- Displays meal kit listings to users.
- Lets visitors browse available meal kits.
- Shows meal kit information through database-driven pages.
- Supports user registration and login.
- Uses session-based authentication to protect user areas.
- Provides a personalized user dashboard after login.
- Supports ordering or interacting with meal kits through server routes.
- Stores user and meal kit data in MongoDB.
- Renders pages dynamically using EJS templates.
- Separates application responsibilities across routes, controllers, views, and
  public assets.

---

## Main User Experience

### Public Browsing

Visitors can land on the site and browse meal kit content without needing to
understand the backend. The UI focuses on presenting food-related content in a
clear, visual way.

### Account Creation

Users can register for an account. Registration data is validated and saved
through the backend so the user can access authenticated features later.

### Login And Session Flow

The app uses session-based Express middleware. After successful login, the
session remembers the user and allows access to personalized pages.

### User Dashboard

Authenticated users can access a dashboard or account area where they can browse
meal kits, view details, and interact with ordering-related features.

### Meal Kit Listing

Meal kit data is loaded from MongoDB, then displayed through EJS templates. This
demonstrates database-driven rendering instead of hard-coded static content.

---

## Technology Stack

- Node.js for server runtime.
- Express.js for routing and backend logic.
- MongoDB for persistent data.
- EJS for server-rendered templates.
- JavaScript for frontend and backend behavior.
- Bootstrap for layout and responsive components.
- Tailwind CSS and custom CSS for styling.
- Express sessions for authentication state.

---

## Backend Architecture

The backend follows a typical Express MVC-style structure:

- Routes define HTTP endpoints.
- Controllers handle request logic.
- Views render server-side pages.
- Public assets provide styling, images, and client-side resources.
- Database models or data helpers interact with MongoDB.
- Session middleware tracks authenticated users.

This structure makes the app easier to reason about than placing all logic in a
single server file.

---

## Authentication

Culinary Parcel uses session-based authentication rather than token-based
authentication.

The authentication flow includes:

- User registration.
- User login.
- Session creation after successful login.
- Protected routes for user-specific pages.
- Session-based tracking for user interactions.

Recruiter-friendly explanation:

The project shows that Krutin understands how traditional web apps maintain
login state across requests using server-side sessions.

---

## Database Design

MongoDB stores dynamic application data such as users, meal kits, and
order-related information.

Important data areas:

- User account data.
- Meal kit data.
- Order or interaction history.
- Session-related user state.

The app demonstrates how a full-stack web application reads data from a
database, renders that data into templates, and processes user input through
server routes.

---

## Frontend And UI

The frontend is rendered with EJS templates and styled with Bootstrap, Tailwind
CSS, and custom layout styles.

UI work includes:

- Meal kit cards and listings.
- Responsive page layout.
- Navigation between public and authenticated pages.
- Forms for authentication and user input.
- Visual presentation for food-related content.

---

## Key Features

- Secure user login with session middleware.
- Dynamic meal kit listings from MongoDB.
- Personalized dashboard for signed-in users.
- Server-rendered pages using EJS.
- Modular route, controller, view, and asset structure.
- REST-style routes for listing and ordering workflows.
- Order history or user interaction tracking through session/user data.
- Responsive UI styled with Bootstrap, Tailwind CSS, and custom CSS.

---

## Skills Demonstrated

- Full-stack JavaScript development.
- Express server architecture.
- Server-rendered page development with EJS.
- MongoDB integration.
- Session-based authentication.
- Form handling and validation.
- Route organization.
- MVC-style separation of concerns.
- Responsive frontend styling.
- Database-driven UI rendering.

---

## Recruiter-Relevant Value

Culinary Parcel demonstrates that Krutin can build a complete traditional
full-stack web application, not only frontend screens. It shows comfort with
backend routing, authentication state, database integration, server-rendered UI,
and organizing a web project around real user workflows.

---

## Interview Explanation

Culinary Parcel is a meal kit subscription platform where users can browse
dynamic meal kit listings, create an account, log in, and interact with a
personalized dashboard. I built it with Node.js, Express, EJS, MongoDB, sessions,
Bootstrap, and Tailwind CSS. The project helped me practice traditional
full-stack architecture, especially routing, server-side rendering,
authentication, and database-backed pages.

