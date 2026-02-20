# Seedforge — The Idea

> An AI-powered workshop where you learn by building real things.

---

## The Problem

Most learning products get the model backwards. Courses front-load lectures and leave projects for the end — if they include them at all. AI tools like ChatGPT and Canva do the work *for* you, producing outputs without building skills. Tutoring apps like Duolingo and Khanmigo test you on content with quizzes and drills. None of them leave you holding something you made, with skills you didn't have before.

There is no product that combines AI project generation, scaffolded learning, and real artifact output for general-purpose learning. In coding, only Codecademy AI Builder (launched January 2025) attempts anything similar, and it's limited to a single domain. Outside of coding — crafts, hobbies, professional skills, general knowledge — the space is completely empty.

---

## The Insight

Two well-established pedagogical frameworks point to a better model, and Seedforge sits at their intersection.

### Constructionism

Seymour Papert's theory from MIT. The core premise: learning happens most powerfully when you design and build personally meaningful, shareable artifacts and reflect on those creations. The artifact functions as an "object to think with" — expressing ideas makes them tangible and shareable, which sharpens those ideas in the process.

### Project-Based Learning (PBL)

The instructional framework where students pursue solutions to nontrivial problems by asking questions, debating ideas, making predictions, designing plans, and creating artifacts. The critical distinction from ordinary "projects" is that the project is introduced at the *beginning* of the learning, not the end. The project drives you to learn and practice skills in order to complete it.

### The Bloom's Flip

This is the crucial mechanism. PBL inverts Bloom's Taxonomy. Traditional education goes bottom-up: memorise facts, then understand them, then apply them, and eventually create something. PBL goes top-down: here's what you're making (Create level), now figure out what you need to know (Remember, Understand, Apply, Analyse, Evaluate) in order to finish it.

You don't memorise colour theory and then apply it. You start designing something, hit a moment where colour choices matter, and learn colour theory at that exact moment of relevance.

---

## What Seedforge Is

Seedforge is **AI-powered Constructionist PBL** — where AI takes the role of a skilled instructor who designs the project, calibrates difficulty, provides just-in-time teaching, and adapts scaffolding in real time.

### The Core Loop

1. You tell the AI what you want to learn or make
2. The AI generates a personalised project with a tangible artifact outcome
3. You build the artifact through scaffolded steps
4. The AI teaches concepts just-in-time as they become relevant
5. You complete a real thing you can use, share, or be proud of
6. You reflect on what you learned
7. The AI maps your newly acquired skills and suggests the next project

### A Concrete Example

A user says "I want to learn graphic design for my Cricut." Seedforge generates a Driving Question: *"How might you design a set of custom seasonal greeting cards that teach you colour theory, typography, and vector editing?"* The artifact outcome: ready-to-cut SVG files and print-ready cards. The user works through scaffolded steps — choosing palettes, learning about type hierarchy, building layouts — and walks away 90 minutes later with files they can actually cut on their Cricut, plus skills in colour theory, typography, and vector editing they didn't have before.

---

## How the Learning Works

### The Driving Question

The engine of every project. Framed as "How might you..." or "Can you design...", the Driving Question can't be answered by a Google search — it requires building something. It gives the learner clarity on three things: what they're creating, why they're creating it, and for whom. It creates interest and a feeling of challenge, guides the project work, and answers "why are we doing this?"

### The Need to Know Map

Once the Driving Question is set, the AI unpacks what needs to be learned to answer it. This is where learning content emerges organically from the project rather than being imposed top-down. The user can see what they'll learn and why each piece matters for the project. This creates pull motivation — you want to learn because you need the knowledge to finish your thing.

### Scaffolding and the Zone of Proximal Development

Vygotsky's Zone of Proximal Development (ZPD) defines the sweet spot between what a learner can do alone and what's too hard even with help. Seedforge keeps you in that zone. When content is too simple, you get bored. When it's too difficult, you get anxious. The learning zone is where you can succeed with support.

The AI provides scaffolding — temporary, adjustable support in the form of broken-down steps, prompts, guiding questions, and simplifying tools. The key: scaffolding is not permanent. It fades as you gain skills and confidence. The AI operates across four modes:

- **Full Guidance** — step-by-step walkthroughs when a skill is brand new
- **Coached Practice** — prompts and hints as you attempt application
- **Light Touch** — occasional tips, intervening only on significant errors
- **Autonomous** — no scaffolding, you work independently

An important research finding underpins the design: authentic, problem-based experiences don't automatically produce engagement. Scaffolding must support both motivation and cognition — not just explain concepts, but keep you feeling capable and connected to the artifact you're building.

### Draft, Feedback, Improve

Following the Artifact-Generated Learning (AGL) research model, the platform builds in revision cycles. You create a first draft, receive structured feedback, and improve your work through iteration. The quality improvement between drafts is itself evidence of learning. This isn't one-shot creation — it's the same draft-feedback-revise loop that develops real craft.

---

## The Product Experience

### Five Phases

The experience maps to five research-backed PBL phases, translated for a digital product with AI as the instructor.

**1. Discovery & Project Generation.** You tell the AI what you want to learn or make. The AI generates a compelling Driving Question and a personalised project with a tangible artifact outcome. You see what you'll make, what you'll learn, and how long it'll take before committing.

**2. Need to Know Unpacking.** The AI breaks the project into a visible map of skills and knowledge needed. You can see why each piece matters for the project. This is where learning goals emerge from the project, not from a syllabus.

**3. Scaffolded Building.** You work through the project in stages. The AI provides just-in-time teaching — micro-lessons, examples, explanations — at each stage, not upfront lectures. Scaffolding fades as competence grows. The AI is the "More Knowledgeable Other" from Vygotsky's framework.

**4. Artifact Completion.** You finish a real, shareable thing. A PDF field guide, a set of SVG files, a portfolio piece, a presentation, a recipe collection, a zine — whatever the project demanded.

**5. Reflection & Showcase.** You review what you learned, the AI surfaces your progression, and the artifact can be shared publicly. The research shows that public audience dramatically increases both motivation and quality.

### The Workspace

A split-pane interface with three zones:

- **Build Pane** (centre, dominant) — where you make the thing. Always the largest area. The artifact is always visible and growing.
- **Learn Pane** (right side, collapsible) — where just-in-time teaching appears. Micro-lessons, contextual explanations, worked examples. Collapses when you're in autonomous mode.
- **Progress Rail** (left side, narrow) — the step sequence showing your artifact growing. Current step highlighted. The Need to Know map is accessible here.

The artifact itself is the progress bar. There are no abstract XP counters as the primary indicator — the herb garden guide going from blank page to beautiful finished document IS the reward.

### Workspace Modes

The workspace adapts its tools based on what's being built. These aren't separate products — they're modes of a single adaptive workspace:

- **Writer** — rich text editor for documents, guides, reports, zines
- **Canvas** — vector editor for posters, cards, SVGs, illustrations
- **Code** — code editor with live preview for sites, apps, scripts
- **Slides** — slide editor for decks and presentations
- **Data** — spreadsheet and chart builder for dashboards and analyses
- **Composite** — combines Writer and Canvas for mixed-media artifacts like field guides

---

## Six Core Systems

The platform is built on six systems that map directly to the PBL research:

1. **Learner Model** — a persistent, evolving profile: skill graph, ZPD calibration, interests, learning style signals, and project history. Every decision the platform makes is driven by keeping you in your learning zone.

2. **Project Engine** — takes a learning intent plus the Learner Model and generates a complete project: Driving Question, artifact definition, Need to Know map, step sequence, and estimated duration.

3. **Scaffolding Engine** — the AI instructor. Delivers the right teaching at the right moment in the right amount, then fades. Supports cognition and motivation simultaneously.

4. **Artifact Workspace** — domain-flexible tools for actually making the thing. Adapts based on artifact type.

5. **Assessment System** — continuous and formative. Evaluates through artifact analysis, process observation, reflective conversations, and draft-feedback-revise cycles. No quizzes, no grades.

6. **Portfolio & Showcase** — gallery of completed artifacts, public sharing, and a visual skill progression map that makes cross-domain skill transfer visible.

---

## Gamification

Seedforge's gamification is themed around growth, cultivation, and nature. Where Habitica turns tasks into RPG combat, Seedforge turns learning into tending a garden. You plant seeds of curiosity, nurture them through projects, and watch your garden flourish.

The key difference from Habitica: in Seedforge, the AI verifies learning through artifact assessment. You can't self-report completion and cheat. Quality-weighted rewards mean deeper learning earns more — the incentive is to do good work, not just check boxes.

Core elements include Growth Points (XP), a spendable currency (Seeds), a garden that grows as a living portfolio of your projects, companion creatures, a class system with four learner archetypes, streaks with recovery mechanics (your streak never fully resets), seasonal events, and learning expeditions (multi-project quest lines). Full details are in the [gamification design document](gamification.md).

The core principle: every mechanic must make learning feel more rewarding, never more stressful. If a mechanic creates anxiety, guilt, or rush-to-complete behaviour, it's wrong and should be removed.

---

## Competitive Position

Seedforge occupies a space no existing product fills:

- **Not a course.** No curriculum, no syllabus, no lectures. You learn by building. The project IS the learning.
- **Not a tool.** Canva, Replit, and ChatGPT do the work for you. Seedforge teaches you to do it yourself. You gain skills, not just outputs.
- **Not a tutor.** Khanmigo and Duolingo test you on content. Seedforge has you make things. The artifact is the evidence of learning, not a quiz score.
- **Not coding-only.** Learn anything by making anything — graphic design, history, biology, business strategy, creative writing, data analysis. The platform is domain-agnostic.

---

## Technical Approach

### Foundation: Chat SDK

[Chat SDK](https://chat-sdk.dev) provides the hardest 40% of the product in one package: streaming AI chat, artifact creation and rendering, tool use, auth, database persistence, file uploads, and theming. It's a full-featured, hackable Next.js AI chatbot built with the AI SDK that supports multiple models through a unified interface. This becomes the Build Pane, Learn Pane, and AI coaching layer.

### Three Custom Layers

**Layer 1: Project & Step Engine.** A custom data model in Postgres for projects, steps, step status, skill tags, and learner profiles. The AI generates these as structured data via tool calls within the chat. Each step is a task with pedagogical metadata — teaching objective, assessment criteria, scaffolding level. Fundamentally a CRUD layer with a step-sequence UI.

**Layer 2: Gamification.** Growth Points, levels, streaks, and progress visualisation built natively in React. The patterns come from studying Habitica's open-source codebase, but implemented fresh in the existing Next.js stack. Key mechanics: XP awarded on step completion with quality bonuses from AI assessment, level thresholds, streak tracking, and the garden visualisation.

**Layer 3: Notifications & Re-engagement.** [Novu](https://novu.co), an open-source notification infrastructure, handles email, push, SMS, and in-app notifications with templates, scheduling, and user preferences. Workflows handle the Duolingo-style nudging: progress reminders, streak warnings, project suggestions, and weekly summaries.

### The AI Layer

The platform uses multiple AI agents with distinct roles: a Project Designer (large model, runs once per project), a Scaffolding Coach (fast model, runs continuously during builds), an Artifact Evaluator (large multimodal model), and a Learner Model Updater (lighter model or rule-based, runs after sessions). Full prompt architecture is in the [prompt engineering document](prompt-engineering.md).

---

## What to Build First

### Phase 1: Proof of Concept (4-6 weeks)

Writer workspace only. A user says "I want to learn about Victorian architecture" and walks out 45 minutes later with a beautiful 4-page illustrated guide they're proud of — while having genuinely learned about architectural history, structural principles, and document design. If that works, the thesis is validated.

### Phase 2: Core Platform (2-3 months)

Add Canvas mode for visual artifacts (posters, SVGs for Cricut, illustrations). Persistent Learner Model with skill graph and cross-project tracking. Portfolio system. Draft-feedback-revision cycles. Project suggestions based on learner history.

### Phase 3: Full Platform (3-6 months)

Code, Slides, and Data workspace modes. Public showcase and community features. Advanced multimodal assessment. Cross-domain skill transfer visualisation. Collaborative projects.

---

## Where the Moat Forms

The defensibility compounds across four dimensions:

- **Learner Models** — every interaction makes each user's model more accurate. ZPD calibration improves. Project suggestions get better. Personal and non-transferable.
- **Skill Taxonomy** — as more users build across more domains, the platform's understanding of how skills connect and transfer becomes a proprietary knowledge graph no competitor can replicate without the same volume of diverse learning data.
- **Project Library** — every AI-generated project that works well becomes a proven template that can be personalised for future users.
- **Community Artifacts** — the public showcase becomes a library of real things made by real learners. New users see what's possible. Both a marketing asset and a pedagogical tool.

---

*Make something real. Learn along the way.*
