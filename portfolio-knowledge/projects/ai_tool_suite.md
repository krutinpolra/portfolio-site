# AI Tool Suite Recruiter Knowledge Base

## Executive Summary

The AI Tool Suite demonstrates hands-on AI application engineering across command-line tools, APIs, structured-output systems, agentic workflows, multimodal debugging, semantic search, source credibility research, media encoding utilities, code review automation, and job-search intelligence.

The strongest signal for recruiters is that these tools wrap LLMs in real software architecture:

- validated inputs and outputs
- typed schemas
- prompt guardrails
- tool calling
- web search integration
- vector embeddings
- multimodal image handling
- cost tracking
- diagnostics and tracing
- report generation
- reusable CLI and API workflows
- evaluation and testing

---

## High-Level Technical Profile

### Primary Languages

- JavaScript
- TypeScript

### AI and LLM Capabilities

- OpenRouter-compatible OpenAI SDK usage
- Structured model outputs
- Zod-validated schemas
- Vision-capable model workflows
- Embedding-based semantic search
- Tool-using agent workflows
- Web-search-augmented reasoning

### Supporting Libraries and Services

- Hono
- Zod
- Tavily
- Jina Reader
- Sharp
- pdf-parse
- markdown-it
- Vitest

---

## Tool Inventory

| Tool                        | Purpose                                           | Key Skills                       |
| --------------------------- | ------------------------------------------------- | -------------------------------- |
| Git Scribe                  | Generates commit messages from staged Git changes | Git automation, CLI design       |
| Flashcard Generator CLI     | Converts notes into structured flashcards         | structured output, cost tracking |
| GitHub PR Explainer         | Explains pull requests using diff + comments      | API integration, summarization   |
| Flashcard Generator API     | Typed flashcard generation API                    | TypeScript, Hono, validation     |
| Semantic Product Search     | Embedding-based search                            | embeddings, ranking              |
| vis-fix Vision Debugger     | Screenshot-based debugging assistant              | multimodal AI, search            |
| Source Credibility Analyzer | Evaluates trustworthiness of sources              | agents, research                 |
| Data URI Media Utils        | Encode/decode media as Data URIs                  | library design                   |
| AI Code Review CLI          | Reviews code with AI reviewers                    | tool calling, structured output  |
| AI Job Search Assistant     | Job + resume analysis system                      | pipelines, reporting             |

---

## Git Scribe

### Summary

Git Scribe is a CLI tool that reads staged Git changes and generates a Conventional Commit message.

### What It Does

- Reads staged Git diff
- Sends diff to LLM
- Generates commit message
- Supports creative mode
- Requires user confirmation
- Executes commit

### Technical Design

- `getStagedDiff()` wraps `git diff --staged`
- `generateCommitMessage()` calls model
- `promptUser()` handles CLI interaction
- `executeCommit()` runs Git commit

### Recruiter-Relevant Value

Shows safe automation of developer workflows using AI.

---

## Flashcard Generator CLI

### Summary

Converts notes into structured flashcards.

### What It Does

- Reads notes file
- Generates structured flashcards
- Outputs JSON
- Tracks cost

### Engineering Choices

- strict JSON output
- no hallucinated facts
- source-grounded references

### Recruiter Value

Demonstrates structured output design and reliability.

---

## GitHub PR Explainer

### Summary

Explains GitHub pull requests using diff + comments.

### What It Does

- Fetches PR diff
- Fetches comments
- Sends to LLM
- Generates structured explanation

### Output

- summary
- discussion
- assessment
- questions

### Recruiter Value

Shows API integration and context packaging.

---

## Flashcard Generator API

### Summary

Typed HTTP API for flashcard generation.

### What It Does

- POST endpoint
- validates input with Zod
- returns structured flashcards

### Technical Design

- Hono framework
- Zod validation
- middleware logging

### Recruiter Value

Shows API design and structured AI integration.

---

## Semantic Product Search

### Summary

Embedding-based search system.

### What It Does

- generates embeddings
- ranks by similarity
- returns relevant results

### Technical Design

- vector similarity scoring
- query embedding
- threshold filtering

### Recruiter Value

Demonstrates core RAG concept.

---

## vis-fix Vision Debugger

### Summary

Multimodal debugging assistant.

### What It Does

- accepts screenshot
- optimizes image
- sends to vision model
- uses web search
- returns fix

### Technical Design

- image resizing (Sharp)
- tool calling
- Tavily integration

### Recruiter Value

Shows multimodal + tool-based AI.

---

## Source Credibility Analyzer

### Summary

Agent that evaluates source trustworthiness.

### What It Does

- reads URL
- searches web
- evaluates credibility
- generates report

### Key Areas

- authorship
- reputation
- evidence quality
- bias
- recency

### Recruiter Value

Shows agent design and structured reasoning.

---

## Data URI Media Utils

### Summary

Utility library for media encoding/decoding.

### What It Does

- encode files
- decode data URIs
- validate formats
- support multiple media types

### Recruiter Value

Shows reusable library design and testing.

---

## AI Code Review CLI

### Summary

Code review system using multiple AI reviewers.

### What It Does

- analyzes code
- runs parallel reviewers
- generates structured findings
- synthesizes final report

### Architecture

```text
Input
→ Reviewer 1 (Security)
→ Reviewer 2 (Maintainability)
→ Structured findings
→ Final synthesis
```
