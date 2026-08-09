# Responsible AI: Cats vs Cards

A prospective Build In Public University course on testing, containing, and correcting conversational AI systems.

Status: prospective course / open for forks and requests

## Course premise

AI systems are cats: capable, adaptive, useful, and difficult to fully specify.

Responsible products use cards around the cat:

- capability boundaries
- failure-oriented evaluations
- escalation and stop conditions
- human approval at consequential action boundaries
- receipts that record what happened

The course does not assume that a model can be made perfectly predictable. It asks a more practical question: how do we make its failures harder to cause, easier to detect, safer to contain, and impossible to quietly rewrite?

## Current artifact

Open the slide deck:

[View the Cats vs Cards slide deck](slides/index.html)

The deck is a first-pass talk structure for a 30–45 minute session. It is intentionally basic and forkable.

## Draft learning outcomes

By the end of the course, a participant should be able to:

1. Identify the action boundary of a chatbot, voice agent, or other conversational system.
2. Translate likely failure modes into concrete conversational test cases.
3. Define when the system should stop, ask for confirmation, or escalate to a person.
4. Design a minimal receipt for reconstructing a bad interaction.
5. State a falsifier for a responsible-AI claim before shipping it.

## Proposed modules

### 1. The metaphor: cats vs cards

Why model fluency is not the same thing as reliability, and why product boundaries matter more than confident system prompts.

### 2. Failure-oriented evals

Build test cases for confident error, privacy leakage, emotional overreach, instruction conflict, and unsafe action requests.

### 3. Human control at the action boundary

Separate conversation, recommendation, approval, and external action. Make the handoff explicit.

### 4. Receipts and outcome logs

Record what the user asked, what the system inferred, what it did or refused to do, who intervened, and what happened next.

### 5. The miss publication

Treat failed evaluations as product evidence. Publish the boundary rather than hiding it behind a successful demo.

## Fork or request an extension

Fork this directory to adapt the course for:

- companion and support bots
- voice agents
- digital humans
- education and tutoring systems
- healthcare-adjacent conversational tools
- customer support and operations agents

If you want a longer version, a workshop, a reading list, a lab, or a case-study module, open an issue in the repository describing the audience and the concrete system you want to examine.

## Evidence boundary

This is a prospective course artifact, not a claim that every module has been delivered or that the examples represent measured production outcomes. The current deck contains no private user data, external claims, or fabricated product metrics.

## Local preview

```bash
cd "Build In Public University/Courses/Responsible AI - Cats vs Cards/slides"
python3 -m http.server 8000
```

Then open http://localhost:8000/.
