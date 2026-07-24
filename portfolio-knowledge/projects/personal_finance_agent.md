# Personal Finance Agent Knowledge Base

## Executive Summary

Personal Finance Agent is a hand-built multi-agent system that reads bank and
credit-card statements in whatever format they show up in, categorizes every
transaction, catches and rechecks its own low-confidence guesses, and hands
the result to a second agent that reviews the numbers and gives budget advice.

It was built from scratch, with no agent framework such as LangChain or
CrewAI, specifically to learn how agent loops and multi-agent systems work
under the hood rather than just how to call one.

---

## The Problem

Categorizing spending from a real statement is tedious and the input is never
clean: one person's statement is a CSV export, another's is a PDF from their
bank, someone else has a photo of a receipt or a Word doc. Rule-based
categorizers break the moment a merchant name doesn't match a known pattern,
and naive "ask an LLM once" approaches have no mechanism to notice when they
are guessing. The project explores a more deliberate design: a cheap
deterministic lookup for the easy majority of transactions, model judgment for
the rest, a second pass that specifically targets the cases the model itself
flagged as uncertain, and a downstream agent that turns the result into
something a person can act on.

---

## What It Does

- Accepts one or more statements per upload in CSV, PDF, PNG/JPG, or DOCX
  format and merges them into a single transaction table.
- Categorizes every transaction with a tool-calling agent that checks a local
  known-merchant lookup first (instant, free, deterministic) and only falls
  back to model judgment when the lookup has no answer.
- Self-corrects: anything the agent itself marks low confidence gets a
  second, stricter pass, with category definitions and a requirement to
  reason before answering, instead of being shown to the user as-is.
- Hands the categorized summary to a second agent, a Budget Advisor, which
  checks each category's spend against typical budgeting benchmarks via its
  own tool and writes a plain-English recommendation.
- Includes a hand-labeled evaluation set and a script that measures
  categorization accuracy against it end-to-end.

---

## How It Works

1. **Extraction agent** reads the file directly, using Claude's native
   PDF/image input or extracted text for DOCX, and returns structured
   `{date, description, amount}` rows.
2. **Categorizer agent** runs a tool-calling loop: known-merchant lookup
   first, model judgment as fallback, flagging its own low-confidence
   guesses.
3. **Self-correction pass** re-runs only the low-confidence rows through a
   stricter prompt before finalizing.
4. **Budget Advisor agent** reviews the categorized totals against spending
   benchmarks, using its own tool, and writes advice.

Every agent in the system is the same underlying mechanism: call the model,
check if it asked to use a tool, run the tool, feed the result back, repeat
until it gives a final answer, specialized by system prompt and tool access.
Writing that loop by hand once and reusing the pattern across four different
agents was the actual point of the project.

---

## Technical Profile

### Languages and Runtime

- Python
- Streamlit

### AI and Data Capabilities

- Hand-rolled tool-calling agent loop (no agent framework)
- Multi-agent handoff between categorization and budget advice
- Self-correction / re-verification of low-confidence model outputs
- Multi-format document extraction (CSV, PDF, image, DOCX)
- Evaluation harness for categorization accuracy

### Libraries and Services

- Anthropic Claude API (`claude-haiku-4-5`) for categorization,
  self-correction, document/image extraction, and budget advice
- pandas for tabular handling
- python-docx for Word document text extraction
- GitHub + Streamlit Community Cloud for free hosting

---

## Status

- Hand-rolled agent loop with real tool-calling (categorization)
- Self-correction pass on low-confidence results
- Second agent (Budget Advisor) as the first multi-agent handoff
- Multi-format, multi-file ingestion (CSV / PDF / image / DOCX via native
  vision/document input)
- Hand-labeled eval set and accuracy script
- Deployed live demo on Streamlit Community Cloud
- Not yet done: per-run cost/latency logging, a written design decisions doc

---

## Known Limitations

- PDF/image extraction is best-effort; quality depends on how clean the
  source scan or photo is, and it isn't OCR-perfect.
- No persistence yet: each upload is processed in-session, and nothing is
  stored between visits.

---

## Recruiter-Relevant Value

This project demonstrates the ability to build agentic AI systems from first
principles rather than by wiring together a framework. Strong signals
include:

- hand-rolled agent loop design (call model, use tool, feed result back,
  repeat)
- multi-agent handoff and orchestration
- self-correction / confidence-aware re-verification instead of blind
  single-pass LLM output
- multi-format document ingestion, including native vision/document model
  input
- a hand-labeled evaluation set and accuracy measurement, showing a testing
  mindset applied to AI behavior, not just traditional code

## Reuse Rules

When using this knowledge base in a chatbot, portfolio, or public README:

- Keep authentication descriptions high level.
- Keep deployment descriptions high level.
- Keep infrastructure descriptions generic.
- Do not add private project configuration.
- Do not add private operational notes.
