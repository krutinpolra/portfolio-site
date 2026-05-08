# Hotel Reservation Project Knowledge Base

## Purpose

This project is a desktop hotel reservation system designed for both guests and hotel administrators. Guests can move through a guided booking flow, select stay details, view suitable rooms, enter guest information, confirm a reservation, and submit feedback. Administrators can log in, view rooms and bookings, update reservations, cancel reservations, check guests out, and record billing details.

This knowledge base is sanitized. It does not include source file names, local paths, real credential values, database file names, packaged media names, logs, or any secret-like information.

## Technology Stack

- Java is used as the main programming language for application logic, object-oriented models, event handling, validation, and database operations.
- JavaFX is used to build the desktop user interface, including windows, buttons, forms, tables, date pickers, image views, alerts, and scene transitions.
- FXML is used to define the visual screen layouts separately from controller logic.
- CSS is used to style the JavaFX screens, including dashboards, forms, cards, backgrounds, buttons, and confirmation screens.
- SQLite is used as the local relational database for storing application data.
- JDBC is used to connect Java code to SQLite, run queries, insert records, update statuses, and retrieve booking information.
- Maven is used for dependency management and project build configuration.
- JUnit is configured as the test framework dependency, although no test coverage was found during review.
- Java logging is used for admin and system activity logs.

## Application Roles

The system supports two main user modes:

- Guest mode lets a customer create a booking through a guided self-service process.
- Admin mode lets hotel staff manage operational tasks such as room overview, booking updates, cancellation, checkout, billing, and guest search.

The application keeps a temporary in-memory state while the user moves between screens. This state stores selected room information, selected guest information, booking dates, guest counts, selected booking identifiers, update mode, and whether the current user is operating as an administrator.

## Main Workflows

### Guest Booking Flow

The guest journey starts from the login screen by choosing guest booking. The guest selects the number of adults and children, chooses check-in and check-out dates, receives room suggestions based on group size and room availability, enters personal details, reviews the booking summary, and confirms the reservation.

When a booking is confirmed, the system stores the reservation in the database and changes the selected room status so it is no longer offered as available.

### Admin Login Flow

The administrator enters credentials on the login screen. The system checks those credentials against the local database and, on success, opens the admin dashboard. The dashboard acts as the central navigation point for room viewing, booking, cancellation, checkout, search, and update actions.

Security note: the current implementation uses seeded default administrator accounts and plain-text password comparison. For a production-quality system, credentials should be removed from source code, migrated to secure configuration, and stored using strong password hashing.

### Room Suggestion Flow

Room recommendations are calculated from guest count and room capacity. For guests, the app shows available rooms that can fit the selected group. For administrators, the room view can show both booked and available rooms to support operations.

Rooms include type, bed count, capacity, price, availability status, and display imagery. The UI presents rooms as selectable cards.

### Guest Details Flow

Guest information is collected through a form with validation for required fields, email format, and phone format. New guest records are inserted into the database. During booking updates, existing guest records can be modified instead.

### Booking Summary Flow

The summary screen displays guest details, room details, selected dates, stay duration, nightly price, and total price. Total price is calculated from room price multiplied by the number of nights, with a minimum stay calculation of one night.

The same summary logic supports both new bookings and booking updates.

### Booking Update Flow

Administrators can search existing bookings, select one, load its guest, room, and date information into application state, modify the reservation, and save the changes. The system updates the related guest and reservation data.

### Cancellation Flow

Administrators can select an active reservation and record a cancellation reason. The cancellation process updates the reservation status, stores a cancellation record, and returns the room to available status.

This is one of the stronger database areas because it uses a transaction to keep the cancellation record, reservation status, and room status aligned.

### Checkout and Billing Flow

Administrators can select a guest reservation for checkout. The checkout screen calculates subtotal, discount, tax, and final amount. When confirmed, the system stores billing information, marks the reservation as checked out, and returns the room to available status.

### Feedback Flow

After checkout or feedback navigation, guests can submit comments. Feedback is stored in the database. The current implementation uses placeholder identifiers for linking feedback, so this should be connected to the actual guest and booking state in a future improvement.

## Data Model

The system uses a relational data model with these major concepts:

- Administrator accounts for staff access.
- Guests for customer identity and contact information.
- Rooms for inventory, room type, bed count, capacity, price, availability, and image reference.
- Reservations for booking date ranges, guest-room association, total price, and booking status.
- Billing records for checkout totals, discounts, tax, and final amount.
- Feedback records for guest comments and ratings.
- Cancellation records for cancellation reasons and cancellation dates.

Relationships are built around guests, rooms, and reservations. Reservations connect a guest to a room for a stay period. Billing, feedback, and cancellation records connect back to reservations.

## Architecture and Design

The project follows a JavaFX controller-driven desktop architecture:

- Screen layouts are defined separately from Java logic.
- Controllers handle button clicks, form validation, database operations, table loading, and navigation.
- Model classes represent core domain objects such as guests, rooms, reservations, billing, feedback, kiosk behavior, and administrators.
- Interfaces define expected behavior for domain areas such as guest handling, room handling, reservation handling, billing, feedback, admin actions, and kiosk flow.
- An enum represents supported room categories.
- A shared state utility coordinates data across screens during multi-step workflows.
- A scene navigation helper centralizes screen switching behavior.
- A database initializer creates the required database structure and seeds initial room inventory.

This design demonstrates separation between UI layout, controller behavior, domain models, and persistence. Some database logic is centralized, but several controllers also open direct database connections, so a future refactor could make database access more consistent.

## Skills Demonstrated

- Object-oriented programming with classes, interfaces, encapsulation, and enums.
- JavaFX desktop application development.
- Event-driven programming with UI actions and controller methods.
- Form validation for required fields, email format, phone format, dates, guest counts, and payment selections.
- Relational database design using multiple linked business entities.
- JDBC database programming with prepared statements.
- CRUD operations for guests, rooms, reservations, billing, feedback, and cancellation records.
- Transaction handling for multi-step cancellation updates.
- State management across multiple screens.
- Table-based admin views with filtering and selected-row actions.
- Calculation logic for stay duration, room totals, discounts, tax, and final billing.
- Logging for operational and authentication-related activity.
- Maven project setup with dependency management.

## Strengths

- The application covers a complete hotel reservation lifecycle, from booking to checkout.
- The interface is divided into focused screens, which makes the workflow understandable.
- The admin dashboard provides practical hotel operations such as searching, updating, cancellation, checkout, and room viewing.
- Prepared statements are used in most user-driven database operations.
- Room availability is updated when bookings are confirmed, cancelled, or checked out.
- Cancellation uses a transaction, which helps keep related database updates consistent.
- The project demonstrates strong use of JavaFX controls and event-driven UI programming.
