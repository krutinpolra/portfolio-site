# Fragments Project Knowledge Base

This is a public-safe knowledge base for describing the Fragments project in a portfolio, resume, recruiter conversation, or chatbot. It only includes high-level product, architecture, and skills information.

## Short Description

Fragments is a full-stack cloud-style application that lets authenticated users create, store, view, update, delete, and convert small pieces of content called fragments. A fragment can be text, structured data, or an image.

The project demonstrates backend API development, frontend integration, authentication-aware design, content-type handling, automated testing, Docker-based development, and cloud-ready architecture.

## Safe Elevator Pitch

I built Fragments as a full-stack microservice project for managing user-owned content. The backend exposes a REST-style API for fragment lifecycle operations and content conversion, while the frontend provides a simple authenticated interface for uploading, previewing, editing, converting, and deleting fragments. The project is tested with unit and integration tests and is designed to run locally or in a cloud-style deployment.

## What the App Does

- Lets a signed-in user create content fragments.
- Supports text, structured data, and image fragments.
- Stores fragment metadata separately from raw content.
- Lets users list their fragments.
- Lets users view fragment details.
- Lets users retrieve original fragment content.
- Lets users update an existing fragment.
- Lets users delete a fragment.
- Converts supported fragments into compatible output formats.
- Includes a browser UI for testing the user workflow.

## Supported Content Categories

The project handles these broad content categories:

- Plain text
- Markdown
- HTML
- CSV-style tabular text
- JSON-style structured data
- YAML-style structured data
- Common web image formats

## Conversion Capabilities

Safe examples of supported conversion categories:

- Markdown can be rendered as HTML or plain text.
- HTML can be simplified to plain text.
- Tabular text can be converted into structured data.
- Structured data can be represented in another structured format.
- Images can be converted between common web image formats.

## Architecture Summary

The project has two main parts:

- Backend API: handles authentication-aware fragment operations, validation, storage, and conversion.
- Frontend client: lets users sign in and interact with the fragment API through a web page.

At a high level, the backend separates:

- Metadata: information such as fragment type, size, creation time, and update time.
- Content: the actual text, data, or image bytes.

This separation follows a common cloud design pattern where searchable metadata and larger binary content are managed differently.

## Backend Summary

The backend is a Node.js service built with Express. It uses a layered structure:

- Web request handlers receive user actions.
- Authentication middleware identifies the current user.
- A fragment model validates data and controls fragment behavior.
- A storage layer persists metadata and content.
- Conversion utilities transform supported content types when requested.
- Response helpers keep API responses consistent.
- Logging helps observe behavior during development and deployment.

## Frontend Summary

The frontend is a lightweight browser app. It supports:

- Signing in and signing out.
- Creating a fragment from typed text or uploaded files.
- Listing the user's fragments.
- Expanding a fragment to see details.
- Previewing text or image content.
- Editing compatible fragments.
- Converting fragments to supported formats.
- Deleting fragments.

## Authentication and Privacy

The project is designed around authenticated, user-owned data. Each user can only work with their own fragments. The backend avoids using raw user identity values as public storage identifiers.

For public discussion, describe the authentication design only at a high level:

- The app supports authenticated users.
- API requests are protected.
- User ownership is enforced on fragment operations.
- Sensitive identity details are not exposed in this knowledge base.

## Storage Design

The storage design is intentionally abstracted:

- A local development mode can store data in memory.
- A cloud-ready mode can store metadata and content using managed storage services.
- The rest of the app talks to a storage interface, so the route and model layers do not need to know the exact storage implementation.

This shows separation of concerns and makes the project easier to test.

## Testing Summary

The backend includes automated tests for:

- API response shapes.
- Authentication-required behavior.
- Fragment creation.
- Fragment listing.
- Fragment retrieval.
- Fragment metadata retrieval.
- Fragment updates.
- Fragment deletion.
- Fragment model validation.
- Storage behavior.
- Content conversion.
- Error handling.

The project also includes integration-style tests that exercise realistic user workflows.

## Deployment Summary

The project is container-ready and includes automation for validating, building, and preparing the service for cloud-style deployment. For public discussion, keep deployment details general:

- Backend can run in a container.
- Frontend can be built as static assets and served by a web server.
- Automated workflows validate code quality and tests.
- The architecture is compatible with managed cloud services.

Keep public deployment descriptions high level.

## Recruiter-Friendly Highlights

This project demonstrates:

- Full-stack application development.
- REST-style backend API design.
- Authenticated user workflows.
- User-scoped resource ownership.
- File upload and content-type validation.
- Media and data format conversion.
- Clean separation between routes, models, storage, and UI.
- Automated unit and integration testing.
- Docker-based development and deployment readiness.
- Cloud architecture awareness.
- Practical debugging and logging experience.

## Safe Chatbot Q&A

### What is Fragments?

Fragments is a full-stack project for managing user-owned content fragments. It lets users create, retrieve, update, delete, and convert small pieces of text, structured data, or image content.

### What was the main backend work?

The backend work involved building an authenticated API, modeling fragment metadata, validating supported content types, separating metadata from raw content, implementing storage adapters, and supporting on-demand conversion.

### What was the main frontend work?

The frontend work involved building a simple authenticated interface where users can create, preview, edit, convert, and delete fragments.

### What does the project show about backend skills?

It shows API design, middleware usage, validation, model design, storage abstraction, testing, logging, error handling, and container-ready service development.

### What does the project show about cloud skills?

It shows experience designing an app that can run locally but is structured for cloud-style managed services, container deployment, authentication, and automated validation workflows.

### What does the project show about testing?

It includes both unit tests and integration-style workflow tests, covering successful behavior and error cases across core fragment operations.

### What kinds of files can it work with?

It works with common text, structured data, and web image formats.

### Is this document public-safe?

Yes. It only describes the project at a high level and avoids private operational details.

## Public Description for Resume

Built a full-stack Fragments microservice application with a Node.js backend and browser frontend. Implemented authenticated user-scoped CRUD operations, content-type validation, metadata/content separation, format conversion for text/data/image fragments, automated unit and integration testing, Docker support, and cloud-ready architecture.

## Public Description for Interview

Fragments is a project where I designed a backend API and frontend client for managing small user-owned content objects. I focused on clean API behavior, authenticated ownership, validation, conversion logic, storage abstraction, and test coverage. The project helped me practice building a service that works locally while still following patterns that transfer well to cloud environments.

## Reuse Rules

When using this knowledge base in a chatbot, portfolio, or public README:

- Keep authentication descriptions high level.
- Keep deployment descriptions high level.
- Keep infrastructure descriptions generic.
- Do not add private project configuration.
- Do not add private operational notes.
