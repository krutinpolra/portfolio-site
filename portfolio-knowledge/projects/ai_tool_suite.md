# AI Job Search Assistant Knowledge Base

## Executive Summary

AI Job Search Assistant is an end-to-end career intelligence system built as a
TypeScript and Node.js CLI pipeline. It helps a candidate understand the job
market, compare a resume against real postings, identify skill gaps, and produce
targeted application advice.

The project is not the portfolio chatbot. It is a separate AI job-search
assistant that works with job posting PDFs, resume artifacts, company research,
LLM-based structured extraction, validation, report generation, and evaluation.

---

## What It Does

- Extracts structured information from job posting PDFs.
- Analyzes required skills, preferred skills, seniority, salary signals, remote
  work patterns, and recurring hiring themes.
- Compares resume content against market demand.
- Identifies strengths, missing skills, ATS keyword gaps, and resume improvement
  priorities.
- Researches companies with Tavily to add business context and application
  strategy.
- Scores candidate-job fit for a specific posting.
- Generates targeted resume suggestions, cover letter guidance, and interview
  preparation topics.
- Produces self-contained Markdown and HTML reports.
- Evaluates extraction consistency, skill recall, and fit-scoring behavior.

---

## Main Workflows

### Market Analysis

The market analysis workflow processes multiple software job posting PDFs and
summarizes what employers repeatedly ask for. It highlights common technical
skills, experience expectations, role themes, compensation signals, and remote
or hybrid patterns.

### Resume Gap Analysis

The gap analysis workflow compares a resume against the market analysis. It
identifies where the resume is strong, where it is weak, which keywords are
missing, and which improvements are highest priority.

### Application Advisor

The advisor workflow focuses on one target job. It produces a fit score, matched
requirements, missing requirements, resume adaptation suggestions, cover letter
angles, and likely interview preparation topics.

### Evaluation

The evaluation workflow checks whether the assistant extracts and scores
information consistently. It measures extraction behavior, required-skill recall,
preferred-skill recall, and fit-scoring quality across saved postings.

---

## Technical Profile

### Languages and Runtime

- TypeScript
- JavaScript
- Node.js

### AI and Data Capabilities

- LLM-based structured extraction
- Prompt engineering
- Zod-validated schemas
- PDF parsing
- Company research with Tavily
- Resume analysis
- Job market analysis
- Fit scoring
- Report generation
- Cost tracking
- Diagnostics and reusable saved artifacts

### Libraries and Services

- OpenRouter-compatible OpenAI SDK usage
- Tavily
- Zod
- pdf-parse
- markdown-it
- Vitest

---

## Report Outputs

### Market Analysis Report

Analyzes several job postings and explains market-wide patterns such as common
skills, seniority expectations, salary signals, remote-work trends, and hiring
themes.

### Resume Gap Analysis Report

Compares the resume against market demand and highlights strengths, missing
skills, ATS keyword gaps, and practical resume improvements.

### Application Advisor Report

Analyzes one target job and produces fit scoring, matched and missing
requirements, resume edits, cover letter direction, and interview prep guidance.

### Evaluation Report

Shows that the project includes quality checks instead of only generated text.
It reports extraction consistency, skill recall, and fit-scoring behavior.

---

## Recruiter-Relevant Value

This project demonstrates applied AI engineering beyond simple prompting. It
packages messy real-world inputs into a repeatable CLI workflow, validates model
outputs, generates useful artifacts, tracks costs, and evaluates quality.

Strong signals include:

- TypeScript CLI architecture
- structured LLM outputs
- schema validation with Zod
- PDF data extraction
- research-augmented AI workflows
- resume and job-market analysis
- HTML and Markdown report generation
- evaluation and testing mindset
- practical automation for a real career workflow

## Reuse Rules

When using this knowledge base in a chatbot, portfolio, or public README:

- Keep authentication descriptions high level.
- Keep deployment descriptions high level.
- Keep infrastructure descriptions generic.
- Do not add private project configuration.
- Do not add private operational notes.
