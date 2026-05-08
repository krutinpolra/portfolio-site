# Krutin.dev Portfolio

## Project Identity

Slug: portfolio-krutin-dev

Type: Frontend-heavy full-stack portfolio application

Live site: https://www.krutinpolra.com

Repository: https://github.com/krutinpolra/portfolio-site

Primary purpose: Present Krutin Polra's projects, experience, skills, GitHub activity, resume, contact workflow, and portfolio chatbot in a polished recruiter-facing experience.

## One-Line Summary

Krutin.dev is a modern Next.js portfolio that combines animated UI sections, data-driven project pages, live GitHub activity, a security-aware contact workflow, and an AI-powered portfolio chatbot.

## What The Project Does

The portfolio helps recruiters and visitors quickly understand:

- Who Krutin is.
- What experience he has.
- What projects he has built.
- What technologies he can work with.
- How to view his resume.
- How to contact him.
- How to ask an AI assistant about his portfolio.

The site is built as a real application, not only a static page. It has frontend UI, dynamic routes, API routes, email handling, GitHub data fetching, AI chatbot integration, cost tracking, and a local knowledge base.

## Current Homepage Structure

The main homepage currently renders these major sections:

1. About
2. GitHub Contributions
3. Work Experience
4. Tech Stack
5. Projects

The project also contains a Hero component, but the current root page is focused around the updated About-first portfolio layout.

## Main Features

### About Section

The About section introduces Krutin in a professional but friendly tone.

Implemented features:

- Animated heading.
- Automatic image carousel.
- Carousel titles such as "I Code", "I explore virtual worlds", and "I Travel".
- Social links for GitHub, LinkedIn, and Instagram.
- Professional summary focused on full-stack development and applied AI engineering.
- Values section using animated Lottie icons.

Why it matters:

This section makes the portfolio feel personal while still staying recruiter-focused.

### GitHub Contributions Section

The GitHub section shows live public GitHub activity.

Implemented features:

- Live GitHub contribution graph.
- Public GitHub follower count.
- Total stars across source repositories.
- Total forks across source repositories.
- Public repository count.
- Responsive stats cards under the graph.
- Horizontal scrolling for the contribution graph on mobile.

How it works:

- The component fetches public GitHub profile data from the GitHub REST API.
- It fetches public repositories and calculates stars and forks from source repositories.
- The contribution heatmap uses a public GitHub chart image URL.

Why it matters:

Recruiters can see that Krutin is active on GitHub and has public engineering work.

### Work Experience Section

The Work Experience section presents production experience in a recruiter-friendly format.

Implemented features:

- Data-driven experience cards.
- Timeline-style visual layout.
- Clickable experience detail pages.
- Metrics, highlights, tech stack, and detailed narrative sections.

Current experience:

- Software Developer Co-op at Ontario Ministry (MPBSDP).
- Worked on My Benefits, a public-sector Angular application.
- Focus areas include secure UI components, REST API integration, accessibility, SonarQube remediation, OWASP ZAP support, and Azure DevOps workflows.

Why it matters:

This gives recruiters evidence of production software development experience, not only academic projects.

### Tech Stack Section

The Tech Stack section groups skills into clear categories.

Current categories:

- Frontend
- Backend
- Deployment
- Database
- Cloud
- AI / Computer Vision

Example technologies:

- React
- Next.js
- TypeScript
- Tailwind CSS
- Angular
- Node.js
- Express.js
- MongoDB
- Supabase
- AWS
- OpenAI
- LangChain
- TensorFlow
- PyTorch
- OpenCV
- scikit-learn

Why it matters:

The section lets recruiters scan Krutin's technical range quickly.

### Projects Section

The Projects section shows selected projects with animated cards.

Implemented features:

- Filter tabs by category.
- Animated project cards.
- Project card splash backgrounds.
- Project thumbnails.
- Tech stack chips.
- Dynamic project detail routes.
- "Explain Project" button on each card.

Current projects include:

- Portfolio Website
- Fragments Microservice
- Hotel Reservation System
- Culinary Parcel
- Met Museum Explorer

Why it matters:

The section gives recruiters a quick project overview while also allowing deeper exploration through project detail pages.

### Project Detail Pages

Each project can have a detailed page under:

`/projects/[slug]`

Implemented features:

- Dynamic route based on project slug.
- Image carousel.
- GitHub icon link when available.
- Project description.
- Key features.
- Tech stack chips.
- Live demo, documentation, and video walkthrough links when available.
- Navbar-aware top spacing so content does not start under the fixed navbar.

Why it matters:

Project detail pages help Krutin explain project depth beyond a simple card.

### AI Portfolio Chatbot

The portfolio includes a chatbot UI and a server-side AI backend route.

Implemented features:

- Floating chatbot button.
- Animated chat panel.
- Starter prompt chips.
- User and assistant message bubbles.
- Markdown-style answer rendering.
- Project explainer handoff from project cards.
- Security-aware backend API route at `/api/ai/chat`.
- Server-side OpenAI API key usage.
- Local markdown knowledge base loading.
- Cost tracking based on token usage.
- Basic request validation.
- Basic in-memory rate limiting for the first version.

How it works:

1. User asks a question in the chatbot.
2. The frontend sends the message to `/api/ai/chat`.
3. The API route reads the local portfolio knowledge files on the server.
4. The route sends the system prompt, portfolio knowledge, and user question to OpenAI.
5. OpenAI returns an answer.
6. The API route returns the answer, token usage, model name, and estimated cost.
7. The chatbot displays the answer and estimated cost.

Current AI model:

- `gpt-4o-mini`

Current limitation:

- The chatbot currently sends the full local markdown knowledge base as context.
- This is acceptable for the first version, but future versions should use embeddings and retrieval to reduce cost, improve speed, and limit unnecessary context exposure.
- It is not full vector RAG yet.

Why it matters:

This feature turns the portfolio into an interactive recruiter experience. It also demonstrates practical AI integration, security-aware backend design, prompt design, and cost awareness.

### Contact Workflow

The contact feature lets visitors send messages from the portfolio.

Implemented features:

- Contact modal.
- Form validation.
- Email validation.
- HTML escaping for submitted content.
- API route at `src/pages/api/send-email.ts`.
- Resend email integration.
- Email sent to Krutin.
- Optional future improvement: confirmation email to the sender.

Security details:

- The Resend API key is read only from server-side environment variables.
- User input is validated.
- User input is escaped before being inserted into email HTML.

Why it matters:

The contact workflow makes the portfolio actionable for recruiters.

### Navbar And Routing

The navbar supports section navigation and URL synchronization.

Implemented features:

- Fixed desktop pill navbar.
- Mobile slide-in menu.
- Section links for About, Experience, Skills, Projects, Contact, and Resume.
- Hash URL updates when clicking section links.
- URL hash updates while scrolling through homepage sections.
- Contact button opens contact modal.
- Resume link opens `/resume.pdf`.

Why it matters:

This makes the portfolio easier to navigate and gives each section a shareable URL state.

## Technology Stack

### Framework

- Next.js 16
- React 19
- TypeScript

### Styling

- Tailwind CSS
- Custom global CSS for project card animation
- Responsive utility classes
- Dark theme with indigo, purple, and fuchsia accents

### Animation

- Framer Motion
- Lottie React
- tsParticles
- Anime.js

### Backend And APIs

- Next.js App Router API route for AI chat
- Next.js Pages API route for contact email
- OpenAI Responses API
- Resend email API
- GitHub public REST API

### Data And Knowledge

- TypeScript model files for projects and experience.
- Markdown knowledge base files under `portfolio-knowledge`.
- Server-side knowledge loader at `src/lib/portfolioKnowledge.ts`.

### Deployment

- Vercel-ready Next.js deployment.
- Environment variables for API keys.
- `.gitignore` protects local secrets, generated AI files, and private knowledge drafts.

## How The Project Is Structured

Important files and folders:

- `src/app/page.tsx`: Defines the homepage section order.
- `src/app/layout.tsx`: Global layout, navbar wrapper, and chatbot mounting.
- `src/app/api/ai/chat/route.ts`: Security-aware AI chatbot backend route.
- `src/app/projects/[slug]/page.tsx`: Dynamic project detail page.
- `src/app/experience/[slug]/page.tsx`: Dynamic experience detail page.
- `src/components/About.tsx`: About section and image carousel.
- `src/components/GitHubContributions.tsx`: Live GitHub contribution section.
- `src/components/Experience.tsx`: Experience cards.
- `src/components/TechStack.tsx`: Skill categories and tech cards.
- `src/components/ProjectSection.tsx`: Project filtering and card grid.
- `src/components/ProjectCard.tsx`: Animated project cards and AI explainer button.
- `src/components/PortfolioChatbot.tsx`: Chatbot UI.
- `src/components/contact.tsx`: Contact modal UI.
- `src/pages/api/send-email.ts`: Contact email API route.
- `src/model/Project.data.ts`: Project card data.
- `src/model/projectDetail.model.ts`: Project detail page data.
- `src/model/Experience.data.ts`: Experience detail data.
- `src/lib/portfolioKnowledge.ts`: Server-side portfolio knowledge loader.
- `portfolio-knowledge/`: Markdown files used by the chatbot.

## Important Implementation Decisions

### Server-Side API Key Handling

The OpenAI API key and Resend API key are never exposed to the browser.

They are read from environment variables inside server-side API routes.

Why this matters:

- Protects API keys.
- Prevents browser users from stealing credentials.
- Keeps AI and email requests controlled by the server.

### Local Knowledge Base Before Vector RAG

The first AI implementation uses curated markdown files as a local knowledge base.

Why this was chosen:

- Easier to understand.
- Faster to implement.
- Good enough while the knowledge base is small.
- Allows cost tracking before adding larger RAG context.

Future improvement:

- Add vector embeddings.
- Store chunks in OpenAI vector stores or Supabase pgvector.
- Retrieve only relevant content per user question.

Current limitation:

- The chatbot sends the full local markdown knowledge base as context.
- This is acceptable for the first version, but it increases input tokens as the knowledge base grows.
- Future versions should use embeddings and retrieval to reduce cost, improve speed, and limit unnecessary context exposure.

### Cost Tracking

The AI route reads token usage from OpenAI responses.

It estimates cost using the configured model pricing table.

Why this matters:

- Helps monitor cost while testing.
- Makes it easier to understand how knowledge context affects token usage.
- Gives a foundation for future analytics.

### Data-Driven Portfolio Sections

Projects and experience are stored as structured data.

Why this matters:

- Easier to update content.
- Less duplication in components.
- Project cards and detail pages stay consistent.
- Chatbot knowledge can be generated from structured content later.

## Challenges Solved

### Project Data Model Mismatch

Earlier project data did not match the TypeScript `Project` model.

Fix:

- Updated project data to use the correct model fields.
- Ensured build-time type checking passes.

### Next.js Workspace Root Warning

The project previously had multiple lockfiles in parent folders, causing root inference warnings.

Fix:

- Set Turbopack root in the Next.js config.
- Ensured app and pages directories live under the same project folder.

### Vercel Dependency Failure

A broken `tsparticles-preset-snow` package version caused install failures.

Fix:

- Removed or corrected the broken dependency path.
- Updated particles packages to working versions.

### Navbar Hash Sync

The navbar previously did not update the URL when navigating to sections.

Fix:

- Added section-aware hash navigation.
- Added scroll spy behavior so the URL changes based on the visible section.

### Project Detail Spacing

Project detail pages started too close to the fixed navbar.

Fix:

- Added navbar-aware top padding to project detail routes.

### Chatbot Safety

The first chatbot implementation needed to avoid exposing secrets and reduce runaway usage risk.

Fix:

- Added server-side API route.
- Added input length validation.
- Added basic per-IP in-memory rate limiting for the first version.
- Added cost tracking.
- Kept API keys in environment variables only.

Production improvement:

- Replace in-memory rate limiting with persistent rate limiting using Upstash Redis or another persistent store because serverless memory can reset anytime on Vercel.
- Keep maximum message length limits.
- Keep maximum output token limits.
- Add file and image size limits before adding uploads.
- Strengthen prompt-injection rules as the assistant gets more tools.
- Continue returning safe generic errors to the frontend instead of raw backend errors.

## Why This Project Matters

This project demonstrates more than a simple portfolio page.

It shows Krutin can:

- Build polished frontend interfaces.
- Work with Next.js App Router and dynamic routes.
- Model project and experience data.
- Build responsive UI systems.
- Integrate APIs securely.
- Handle contact form input safely.
- Add AI features through a security-aware backend route.
- Track AI usage cost.
- Maintain a local knowledge base for chatbot answers.
- Think about production concerns such as environment variables, build errors, deployment, and security.

## Interview Explanation

Krutin can explain this project like this:

"My portfolio is a Next.js application that started as a project showcase, but I turned it into a more interactive recruiter experience. It includes animated sections, data-driven project and experience pages, live GitHub stats, a security-aware contact workflow, and an AI chatbot. The chatbot calls a server-side API route so the OpenAI key is never exposed, reads from a curated markdown knowledge base, and shows estimated token cost for each answer. I built it this way to practice production-minded frontend work, security-aware API design, and practical AI integration."

## Security Notes

Security verdict: this is a security-aware MVP foundation, not a fully production-secure AI system yet.

Current protections:

- API keys stay server-side.
- Input validation exists.
- Contact form escapes user input.
- Basic rate limiting exists.
- Maximum message length is enforced.
- Maximum output tokens are enforced.
- Raw backend errors are not returned to the frontend.

Production-ready improvements:

- Persistent rate limiting with Upstash Redis or another persistent store.
- File and image size limits before adding uploads.
- Stronger prompt-injection rules before adding more AI tools.
- Retrieval-based knowledge loading instead of sending the full markdown knowledge base every request.

The following should not be added to this project knowledge file:

- Real API keys.
- `.env.local` values.
- Private email credentials.
- Internal logs.
- Raw OpenAI responses containing sensitive errors.
- Vercel project secrets.
- Resend API key.
- Private contact details.
- Any employer-confidential information.

This file should only contain public, recruiter-safe facts.

## Reuse Rules

When using this knowledge base in a chatbot, portfolio, or public README:

- Keep authentication descriptions high level.
- Keep deployment descriptions high level.
- Keep infrastructure descriptions generic.
- Do not add private project configuration.
- Do not add private operational notes.
