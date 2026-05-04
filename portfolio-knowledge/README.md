# Portfolio Knowledge Base

These files are the source material for the portfolio chatbot.

Keep this content factual, concise, and recruiter-friendly. The chatbot should answer from this knowledge instead of inventing details.

Recommended update flow:

1. Update the relevant markdown file when resume, project, skill, or experience content changes.
2. Restart the local dev server if needed.
3. Test the chatbot with recruiter-style questions.

The API route automatically loads these Markdown files from `src/lib/portfolioKnowledge.ts`, so there is no external retrieval store to sync right now.

Loaded order:

1. `chatbot-guidelines.md`
2. `about.md`
3. `experience.md`
4. `projects.md`
5. `skills.md`
6. `contact.md`

Current files:

- `about.md`: Profile summary and positioning.
- `experience.md`: Work experience and case-study facts.
- `projects.md`: Project explanations, tech stacks, and links.
- `skills.md`: Technical skills grouped by category.
- `contact.md`: Public contact and profile links.
- `chatbot-guidelines.md`: Behavior rules for the assistant.

## Writing Style

Use short sections, factual bullets, and recruiter-friendly wording.

Good project entries should include:

- Slug and project type.
- One clear description.
- Tech stack.
- Public links.
- Key points.
- Simple recruiter explanation.

Avoid:

- Private contact details.
- Claims that are not supported by the portfolio or resume.
- Overly casual wording.
- Dates, metrics, tools, or companies that are not verified.
