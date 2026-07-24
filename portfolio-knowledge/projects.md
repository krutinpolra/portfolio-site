# Projects Overview

This file contains a high-level index of Krutin Polra’s projects.

The purpose of this file is to:

- Provide quick summaries of all projects
- Help the chatbot identify relevant projects
- Route deeper questions to detailed project files

For detailed explanations, refer to individual project files in the `/projects` directory.

---

## Personal Finance Agent

**Slug:** personal-finance-agent  
**Type:** AI-powered personal finance categorization and budgeting agent  
**Detail File:** /projects/personal_finance_agent.md

### Summary

A hand-built multi-agent system that reads bank/credit-card statements in any
format (CSV, PDF, image, or DOCX), categorizes every transaction, self-corrects
its own low-confidence guesses, and hands the result to a Budget Advisor agent
that reviews spending against benchmarks and gives plain-English advice. Built
without an agent framework to learn how agent loops and multi-agent systems
work from first principles.

### Key Focus Areas

- Hand-rolled tool-calling agent loop (no LangChain/CrewAI)
- Multi-agent handoff between categorization and budget advice
- Self-correction on low-confidence model outputs
- Multi-format statement ingestion (CSV, PDF, image, DOCX)
- Hand-labeled evaluation set and accuracy measurement

### Recruiter Insight

Demonstrates applied agentic AI engineering built from first principles,
multi-agent orchestration, and a testing mindset applied to AI behavior.

---

## Portfolio Website

**Slug:** portfolio-krutin-dev  
**Type:** Personal portfolio website  
**Detail File:** /projects/portfolio.md

### Summary

A modern, animated portfolio showcasing projects, skills, experience, and contact workflows.

### Key Focus Areas

- UI/UX design and animations
- Responsive layout
- Project presentation and filtering
- Chatbot integration

### Recruiter Insight

Demonstrates frontend engineering, UI polish, and personal branding.

---

## AI Job Search Assistant

**Slug:** ai-tool-suite  
**Type:** AI-powered career intelligence and job application assistant  
**Detail File:** /projects/ai_tool_suite.md

### Summary

An AI job search assistant that analyzes job postings, compares them against a
resume, identifies skill gaps, researches companies, and generates targeted
application advice, cover letter direction, interview prep topics, and reports.

### Key Focus Areas

- Job posting PDF extraction
- Resume and market gap analysis
- Targeted application fit scoring
- Company research with Tavily
- Structured LLM outputs with validation
- Markdown and HTML report generation
- Evaluation, diagnostics, and cost tracking

### Recruiter Insight

Demonstrates practical AI engineering, CLI pipeline design, structured output
validation, research-augmented reasoning, and the ability to turn messy career
inputs into actionable job-search intelligence.

---

## Hamdel Care Platform

**Slug:** hamdel-care-platform  
**Type:** Full-stack care-service and admin management platform  
**Detail File:** /projects/hamdel.md

### Summary

A full-stack care-service platform based on a detailed SRS for care receivers,
caregivers, and admins. It supports care requests, booking history, caregiver
matching, profiles, loved-one management, payments, chat, help centre workflows,
and a role-based admin panel.

### Key Focus Areas

- Care receiver and caregiver application flows
- Booking, matching, reviews, invoices, and support tickets
- Address book, medical profile, preferences, and safety plans
- Wallet, payment, refund, payout, and finance management
- Role-based admin access and operational dashboards
- Compliance, audit logs, technical tools, and AI-enabled FAQ support

### Recruiter Insight

Demonstrates full-stack product planning, healthcare workflow modeling,
role-based admin design, data classification, and the ability to translate a
large SRS into structured application features.

---

## Fragments Microservice

**Slug:** fragments-Microservice  
**Type:** Cloud-native backend API  
**Detail File:** /projects/fragments.md

### Summary

A secure microservice for storing and converting text and image fragments using AWS.

### Key Focus Areas

- API design
- Cloud architecture
- Authentication and storage
- Format conversion

### Recruiter Insight

Demonstrates backend, cloud, and DevOps capabilities.

---

## Hotel Reservation System

**Slug:** hotel-reservation-system  
**Type:** Desktop application  
**Detail File:** /projects/hotel_reservation.md

### Summary

A JavaFX application for managing hotel bookings and guest workflows.

### Key Focus Areas

- Object-oriented design
- MVC architecture
- Database interaction

### Recruiter Insight

Demonstrates strong OOP and system design fundamentals.

---

## Culinary Parcel

**Slug:** culinary-parcel  
**Type:** Full-stack web application  
**Detail File:** /projects/culinary.md

### Summary

A meal kit subscription platform with authentication and user interaction workflows.

### Key Focus Areas

- Full-stack architecture
- Session-based authentication
- Database-driven UI

### Recruiter Insight

Demonstrates traditional full-stack development skills.

---

## Met Museum Explorer

**Slug:** met-museum-explorer  
**Type:** API-driven web application  
**Detail File:** /projects/met.md

### Summary

An interactive platform for exploring artwork using the Met Museum API.

### Key Focus Areas

- External API integration
- State management
- Authentication and personalization

### Recruiter Insight

Demonstrates API usage, frontend architecture, and user experience design.

---

## Project Selection Guidance (for Chatbot)

When answering user queries:

- Identify the most relevant project based on:

  - Technology
  - Problem domain
  - User intent

- If user asks:
  - "Explain this project" → Use detailed project file
  - "What projects has Krutin built?" → Use this overview
  - "Best project?" → Prioritize:
    1. Personal Finance Agent
    2. AI Job Search Assistant
    3. Hamdel Care Platform
    4. Fragments Microservice

---

## Important Rules

- Do not mix details from multiple projects unless explicitly asked
- Do not invent features not listed
- Always prefer detailed project files when available
