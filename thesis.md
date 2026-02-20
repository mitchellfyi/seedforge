**PRODUCT BLUEPRINT**

**AI-Powered Constructionist**

**Learning Platform**

*Make something real. Learn along the way.*

System Architecture, User Experience & Technical Specification

February 2026 \| Confidential

1\. The Thesis

This document defines the product architecture for a platform that does
something no product currently does: use AI to generate personalised,
project-based learning experiences across any domain where the learner
builds a real artifact and acquires genuine skills in the process.

The platform sits at the intersection of two well-established
pedagogical frameworks: Seymour Papert\'s Constructionism (learning is
most powerful when you build a shareable artifact) and Project-Based
Learning (the project drives the learning, not the other way around). AI
takes the role traditionally played by a skilled instructor: designing
the project, calibrating difficulty, providing just-in-time teaching,
and adapting scaffolding in real time.

+---+----------------------------------------------------------------------+
|   | **THE CORE LOOP**                                                    |
|   |                                                                      |
|   | User declares intent → AI generates a personalised project with a    |
|   | tangible artifact outcome →                                          |
|   |                                                                      |
|   | User builds the artifact through scaffolded steps → AI teaches       |
|   | concepts just-in-time as they become                                 |
|   |                                                                      |
|   | relevant → User completes a real thing they can use, share, or be    |
|   | proud of → User reflects on                                          |
|   |                                                                      |
|   | what they learned → AI maps newly acquired skills and suggests the   |
|   | next project.                                                        |
+---+----------------------------------------------------------------------+

The competitive landscape confirms this is wide open. In coding, only
Codecademy AI Builder (launched January 2025) attempts anything similar,
and it is limited to coding, gated behind a subscription, and very
early-stage. In non-coding domains (crafts, hobbies, professional
skills, general knowledge) there is nothing. Zero products combine AI
project generation, scaffolded learning, and real artifact output for
general-purpose learning.

2\. System Architecture

The platform consists of six core systems that map directly to the five
phases of research-backed PBL, plus a foundational layer that powers
everything. Each system is a distinct service with clear
responsibilities.

  ---------------- --------------------------- ---------------------------
  **System**       **PBL Phase**               **Responsibility**

  Learner Model    (Foundation)                Persistent profile: skills,
                                               knowledge gaps,
                                               preferences, history, ZPD
                                               calibration

  Project Engine   Phase 1: Planning           Generates personalised
                                               projects with DQs, artifact
                                               specs, skill maps, and step
                                               sequences

  Scaffolding      Phase 2-3: Launch & Build   Delivers just-in-time
  Engine                                       teaching, adapts
                                               difficulty, manages the ZPD
                                               in real time

  Artifact         Phase 3-4: Build & Complete Domain-specific tools for
  Workspace                                    actually making the thing
                                               (editor, canvas, document
                                               builder)

  Assessment       Throughout                  Formative checks, iteration
  System                                       feedback, progress
                                               tracking, skill
                                               verification

  Portfolio &      Phase 5: Reflect            Gallery of completed
  Showcase                                     artifacts, learning
                                               reflection, sharing,
                                               progression mapping
  ---------------- --------------------------- ---------------------------

2.1 The Learner Model

This is the foundation everything else depends on. The Learner Model is
a persistent, evolving representation of who the user is as a learner.
It is not a static profile; it updates with every interaction.

  --------------------- -------------------------------------------------
  **Component**         **Description**

  **Skill Graph**       A directed graph of skills and knowledge the user
                        has demonstrated, is developing, or has not yet
                        encountered. Skills are domain-agnostic at the
                        top level (e.g. colour theory, spatial reasoning,
                        research methodology) with domain-specific
                        sub-skills beneath.

  **ZPD Calibration**   A dynamic assessment of the user\'s current zone
                        of proximal development for each active skill.
                        Determines how much scaffolding to provide.
                        Recalibrated after every interaction.

  **Interest Profile**  What the user cares about, wants to make,
                        contexts they find motivating. Used by the
                        Project Engine to generate projects that are
                        personally relevant, not generic.

  **Learning Style      Observed preferences: does the user prefer visual
  Signals**             examples, written explanation, trial-and-error,
                        or guided walkthroughs? Inferred from behaviour,
                        not self-reported.

  **Project History**   Everything the user has built, including drafts,
                        iterations, feedback received, and skills
                        practiced. The raw material for progression
                        mapping.
  --------------------- -------------------------------------------------

+---+----------------------------------------------------------------------+
|   | **PEDAGOGICAL BASIS**                                                |
|   |                                                                      |
|   | The Learner Model implements Vygotsky\'s ZPD at a system level.      |
|   | Every decision the platform makes                                    |
|   |                                                                      |
|   | --- which project to suggest, how much to explain, when to let the   |
|   | user struggle, when to intervene ---                                 |
|   |                                                                      |
|   | is driven by keeping the user in their learning zone: challenged     |
|   | enough to grow, supported                                            |
|   |                                                                      |
|   | enough to succeed. The model\'s ZPD calibration is the single most   |
|   | important technical component.                                       |
+---+----------------------------------------------------------------------+

2.2 The Project Engine

The Project Engine is the AI system that takes a learning intent and
produces a complete, buildable project. This is where the Driving
Question is born.

Input

- **Learning intent:** What the user wants to learn or get better at
  (free text, or selected from suggestions)

- **Learner Model:** Current skill state, ZPD calibration, interests,
  history

- **Constraints:** Time available, tools the user has access to,
  preferred artifact format

Output: The Project Spec

The Project Engine generates a structured specification with these
components:

1.  **Driving Question (DQ).** An open-ended question framed as \"How
    might you\...\" or \"Can you design\...\" that is personally
    relevant, cannot be answered with a Google search, and requires
    building something to answer. Example: \"How might you design a set
    of botanical illustrations for a herb garden guide that teaches you
    botanical drawing, plant anatomy, and page layout?\"

2.  **Artifact Definition.** Exactly what the user will produce. Format,
    scope, quality bar. Example: \"A 12-page PDF herb garden guide with
    6 original botanical illustrations, species descriptions, and
    growing notes. Print-ready A5 format.\"

3.  **Need to Know Map.** A structured breakdown of every skill and
    knowledge area the user will need to engage with to complete the
    project. Each item is tagged with: the user\'s current level (from
    the Learner Model), the level required for this project, and whether
    it\'s a core skill (must learn) or stretch skill (opportunity to go
    deeper).

4.  **Step Sequence.** The project broken into 5--12 buildable stages,
    ordered so that each step teaches something new while producing a
    visible portion of the artifact. Each step has a teaching objective,
    a making objective, and a checkpoint.

5.  **Estimated Duration.** Based on ZPD calibration and project
    complexity. Could be 30 minutes for a simple project, 5+ hours for
    complex multi-session work.

+---+----------------------------------------------------------------------+
|   | **BLOOM\'S FLIP IN ACTION**                                          |
|   |                                                                      |
|   | The Project Engine implements the critical PBL insight: Bloom\'s     |
|   | Taxonomy is inverted. The project starts                             |
|   |                                                                      |
|   | at the CREATE level (\"make this artifact\") which pulls the user    |
|   | through Remember, Understand, Apply,                                 |
|   |                                                                      |
|   | Analyze, and Evaluate as they work. The user doesn\'t memorise       |
|   | colour theory then apply it. They start                              |
|   |                                                                      |
|   | designing something, hit a moment where colour choices matter, and   |
|   | the system teaches colour theory                                     |
|   |                                                                      |
|   | at that exact moment of relevance.                                   |
+---+----------------------------------------------------------------------+

2.3 The Scaffolding Engine

This is the AI instructor. Its job is to deliver the right teaching at
the right moment in the right amount, then fade as the user gains
competence. It must support both cognition and motivation simultaneously
(a gap the research identifies in most scaffolding implementations).

Scaffolding Modes

The engine operates in four modes, selected dynamically based on the
user\'s ZPD state:

  ---------------- --------------------------- ---------------------------
  **Mode**         **When Used**               **What It Does**

  Full Guidance    Skill is new, user is at    Step-by-step walkthrough
                   the edge of their ZPD       with explanations,
                                               examples, and \"do this
                                               next\" instructions. High
                                               hand-holding.

  Coached Practice User has seen the concept,  Prompt-based guidance:
                   attempting application      \"What do you think the
                                               next step is?\" Hints
                                               available on request.
                                               Feedback on attempts.

  Light Touch      User is developing fluency, Occasional tips,
                   making fewer errors         alternative suggestions,
                                               stretch challenges.
                                               Intervenes only on
                                               significant errors.

  Autonomous       User has demonstrated       No scaffolding. User works
                   mastery of this skill area  independently. System
                                               monitors for unexpected
                                               struggles and re-engages if
                                               needed.
  ---------------- --------------------------- ---------------------------

Just-in-Time Teaching

The Scaffolding Engine delivers teaching content in three formats,
chosen based on the concept and the user\'s observed learning style:

- **Micro-lessons:** 2--5 minute focused explanations of a single
  concept, delivered as interactive content within the workspace. Not
  lectures; they include examples, visual demonstrations, and an
  immediate \"try this\" exercise.

- **Contextual annotations:** Inline explanations attached directly to
  the artifact. Example: the user places two colours together and an
  annotation appears explaining why those specific colours create visual
  tension, with a suggestion to try an analogous palette.

- **Worked examples:** \"Here\'s how a professional would approach this
  step\" --- a brief demonstration the user can study, then attempt
  themselves. Critical for skills with a strong tacit/visual component.

+---+----------------------------------------------------------------------+
|   | **MOTIVATION SCAFFOLDING**                                           |
|   |                                                                      |
|   | Research shows that authentic project experiences don\'t             |
|   | automatically produce engagement.                                    |
|   |                                                                      |
|   | The Scaffolding Engine explicitly manages motivation through:        |
|   | celebrating visible progress on the                                  |
|   |                                                                      |
|   | artifact (not abstract \"XP\"), connecting each step to the final    |
|   | thing (\"this is the part where your                                 |
|   |                                                                      |
|   | guide starts to look professional\"), and calibrating difficulty so  |
|   | the user experiences flow state                                      |
|   |                                                                      |
|   | --- challenged but not overwhelmed.                                  |
+---+----------------------------------------------------------------------+

2.4 The Artifact Workspace

This is where the user actually makes the thing. The workspace must be
domain-flexible but not generic. It adapts its tools based on what\'s
being built.

Workspace Configurations

The workspace presents different tool configurations depending on the
artifact type. These are not separate products; they are modes of a
single adaptive workspace.

  ---------------- --------------------------- ---------------------------
  **Artifact       **Workspace Mode**          **Core Tools**
  Type**                                       

  Documents        Writer                      Rich text editor, layout
  (guides,                                     tools, image placement,
  reports, zines)                              export to PDF/DOCX

  Visual designs   Canvas                      Vector editor, colour
  (posters, cards,                             picker, typography tools,
  SVGs)                                        export to SVG/PNG/PDF

  Code projects    Code                        Code editor, live preview,
  (sites, apps,                                terminal, file system,
  scripts)                                     deployment

  Presentations    Slides                      Slide editor, layout
  (decks, pitches)                             templates, speaker notes,
                                               export to PPTX/PDF

  Data artifacts   Data                        Spreadsheet, chart builder,
  (dashboards,                                 data import, export to
  analyses)                                    XLSX/PDF

  Mixed media      Composite                   Combines Writer + Canvas;
  (field guides,                               section-based layout with
  portfolios)                                  embedded visuals
  ---------------- --------------------------- ---------------------------

The Split-Pane Interface

The workspace uses a split-pane layout with three zones that the user
can resize and rearrange:

1.  **Build Pane (centre, dominant).** The actual artifact under
    construction. The user works here. This is always the largest and
    most prominent area. The artifact is always visible and growing.

2.  **Learn Pane (right side panel, collapsible).** Where just-in-time
    teaching appears. Micro-lessons, contextual explanations, worked
    examples. Collapses when the user is in autonomous mode. The user
    can summon it with a question or it appears when the Scaffolding
    Engine determines teaching is needed.

3.  **Progress Rail (left side, narrow).** Shows the step sequence as a
    vertical rail. Current step highlighted. Completed steps show the
    portion of the artifact they produced. Upcoming steps show what\'s
    next. The Need to Know map is accessible here, showing skills being
    learned.

+---+----------------------------------------------------------------------+
|   | **THE ARTIFACT IS THE PROGRESS BAR**                                 |
|   |                                                                      |
|   | The most important UX principle: the artifact growing in front of    |
|   | the user IS the progress indicator.                                  |
|   |                                                                      |
|   | There are no abstract progress bars, XP counters, or gamification    |
|   | layers. The herb garden guide                                        |
|   |                                                                      |
|   | going from blank page to beautiful finished document IS the reward.  |
|   | The research is unambiguous                                          |
|   |                                                                      |
|   | on this: tangible, shareable artifacts are the strongest motivator   |
|   | in constructionist learning.                                         |
+---+----------------------------------------------------------------------+

2.5 The Assessment System

Assessment is continuous and formative, never summative. There are no
tests, quizzes, or grades. The system assesses through observation and
artifact quality.

Assessment Methods

- **Artifact Analysis:** AI evaluates the artifact itself. Does the
  colour palette demonstrate understanding of colour theory? Is the code
  well-structured? Is the layout balanced? Assessment is embedded in the
  work, not separate from it.

- **Process Observation:** How the user worked. Did they need hints? How
  many iterations? Where did they struggle? Where did they self-correct?
  This feeds directly back into the Learner Model\'s ZPD calibration.

- **Checkpoint Conversations:** At key milestones, the AI asks
  reflective questions: \"Why did you choose this approach?\" or \"What
  would you change if you were starting over?\" These verify
  understanding beyond surface-level execution.

- **Draft-Feedback-Revise Cycles:** Following the AGL
  (Artifact-Generated Learning) research model: users create drafts,
  receive structured feedback, and improve through iteration. The
  quality improvement between drafts is itself an assessment signal.

2.6 Portfolio and Showcase

Every completed artifact goes into the user\'s portfolio. This serves
three functions:

1.  **Personal gallery.** A beautiful, browsable collection of
    everything the user has made. Ordered chronologically and by domain.
    Each artifact shows what skills were practiced and what was learned.

2.  **Public showcase.** Users can choose to share artifacts publicly.
    The research is emphatic: knowing your work will be seen by others
    dramatically increases quality and motivation. A public gallery with
    community features.

3.  **Skill progression map.** A visual representation of all skills the
    user has developed across all projects. Shows growth over time.
    Connects skills across domains (colour theory learned in a Cricut
    project transfers to web design).

+---+----------------------------------------------------------------------+
|   | **CROSS-DOMAIN SKILL TRANSFER**                                      |
|   |                                                                      |
|   | One of the platform\'s most powerful properties is making visible    |
|   | how skills transfer across domains.                                  |
|   |                                                                      |
|   | Typography learned in a poster project applies to a website project. |
|   | Research methodology learned                                         |
|   |                                                                      |
|   | in a dinosaur field guide applies to a market analysis. The Skill    |
|   | Graph makes these connections                                        |
|   |                                                                      |
|   | explicit, and the Project Engine can generate projects that          |
|   | deliberately bridge domains.                                         |
+---+----------------------------------------------------------------------+

3\. User Experience Flow

The UX maps directly to the five PBL phases, translated for a digital
product with AI as the instructor.

3.1 Onboarding: Who Are You?

No skill assessments. No quizzes. The onboarding is a conversation.

The AI asks three questions: What are you interested in? What have you
made before (if anything)? What would you love to be able to make? From
these answers, the Learner Model is initialised with an interest profile
and a rough ZPD estimate. The first project is then generated to be
achievable and exciting --- a quick win that produces something real
within 30--60 minutes, calibrates the Learner Model, and hooks the user.

+---+----------------------------------------------------------------------+
|   | **FIRST PROJECT PRINCIPLE**                                          |
|   |                                                                      |
|   | The first project must: (1) be completable in one session, (2)       |
|   | produce a genuinely attractive artifact,                             |
|   |                                                                      |
|   | \(3\) teach at least one real concept, and (4) leave the user        |
|   | thinking \"I made that?\" This is the                                |
|   |                                                                      |
|   | moment that determines retention. The research on constructionism is |
|   | clear: the pride of having                                           |
|   |                                                                      |
|   | made something real is the strongest intrinsic motivator.            |
+---+----------------------------------------------------------------------+

3.2 Project Selection: What Will You Build?

After onboarding, users enter project selection. There are three paths:

6.  **\"I want to learn\...\"** User states a learning goal (graphic
    design, woodworking theory, paleontology). The Project Engine
    generates 2--3 project options tailored to their level and
    interests. Each shows the artifact they\'ll produce, what they\'ll
    learn, and estimated time.

7.  **\"I want to make\...\"** User describes a specific thing they want
    to create (birthday cards for Cricut, a field guide to local birds,
    a personal website). The Project Engine wraps a learning journey
    around that artifact.

8.  **\"Surprise me\"** The Project Engine uses the Learner Model to
    generate a project that bridges existing skills to new territory.
    This is where cross-domain skill transfer gets surfaced.

In all cases, the user sees the Driving Question, the artifact preview
(what the finished thing might look like), and the Need to Know map
before committing. They can adjust scope, swap the artifact format, or
ask for a different project entirely.

3.3 The Build: Making and Learning

This is where users spend 80% of their time. The workspace is open, the
step sequence is loaded, and the user begins building.

Each step follows a consistent micro-rhythm:

  --------------------- -------------------------------------------------
  **Phase**             **What Happens**

  **Context**           \"Here\'s what we\'re doing in this step and why
                        it matters for the final artifact.\" Connects the
                        step to the Driving Question.

  **Teach**             Just-in-time micro-lesson on the concept or skill
                        needed. Only appears if the Scaffolding Engine
                        determines the user needs it (based on ZPD).
                        Users who already know the concept skip straight
                        to Make.

  **Make**              The user does the work. Builds the next piece of
                        the artifact. The AI observes, provides hints if
                        asked, intervenes if the user is stuck or heading
                        significantly off track.

  **Check**             Formative checkpoint. The AI reviews what was
                        built, provides specific feedback, asks a
                        reflective question. User iterates if needed.
                        Once the checkpoint passes, the step is complete
                        and the artifact has visibly grown.
  --------------------- -------------------------------------------------

The critical principle: the user is always building. Teaching is woven
into the building process, not separated from it. The Learn Pane
supports the Build Pane; it never replaces it.

3.4 Iteration: Draft, Feedback, Improve

Following the AGL research model, the platform builds in explicit
revision cycles. After completing all steps, the user has a first draft
of their artifact. The AI then provides structured feedback across
multiple dimensions (relevant to the artifact type): technical quality,
conceptual accuracy, craft/aesthetics, and alignment with the original
Driving Question.

The user revises. The feedback-revision cycle can repeat as many times
as the user wants. Each iteration is tracked, and improvement between
drafts is one of the strongest signals of genuine learning.

3.5 Completion: Reflect and Share

When the user is satisfied with their artifact, they enter the
completion flow:

- **Artifact export:** Download the finished artifact in its final
  format (PDF, SVG, DOCX, deployed website, etc.). This is theirs to
  keep and use.

- **Learning reflection:** A brief, structured reflection: what did you
  learn? What was hardest? What surprised you? The AI summarises skills
  acquired and shows them added to the Skill Graph.

- **Portfolio addition:** The artifact is added to the user\'s portfolio
  with metadata about the project, skills practiced, and time invested.

- **Share (optional):** Publish to the public showcase. Other users can
  see the artifact and the learning journey behind it.

- **Next project suggestion:** Based on what was just learned, the
  Project Engine suggests what to build next. This creates natural
  learning pathways that emerge from the user\'s own journey rather than
  a predefined curriculum.

4\. Technical Infrastructure

4.1 AI Layer

The platform requires multiple AI capabilities orchestrated together.
This is not a single-prompt chatbot; it is a multi-agent system with
distinct roles.

  ---------------- --------------------------- ---------------------------
  **AI Agent**     **Role**                    **Model Requirements**

  Project Designer Generates project specs     Large model (Claude Opus /
                   from learning intents.      GPT-4 class). High
                   Needs deep domain knowledge reasoning. Slow is fine;
                   and pedagogical             runs once per project.
                   understanding.              

  Scaffolding      Real-time teaching during   Fast model (Claude Sonnet /
  Coach            the build. Adapts           GPT-4o class). Low latency
                   explanations, generates     critical. Runs continuously
                   examples, provides          during build.
                   feedback.                   

  Artifact         Assesses artifact quality,  Large model with multimodal
  Evaluator        provides structured         capability. Needs to
                   feedback, identifies        evaluate
                   learning signals.           visual/textual/code
                                               artifacts.

  Learner Model    Processes session data and  Can be lighter model or
  Updater          updates the skill graph and rule-based system with ML
                   ZPD calibration.            signals. Runs after
                                               sessions.
  ---------------- --------------------------- ---------------------------

4.2 Data Architecture

  --------------------- -------------------------------------------------
  **Store**             **Purpose**

  **User Database**     Authentication, preferences, subscription state.
                        Postgres.

  **Learner Model       Skill graphs, ZPD state, interest profiles. Graph
  Store**               database (Neo4j) or Postgres with JSONB for
                        flexibility.

  **Project Store**     Generated project specs, step sequences, DQs.
                        Postgres with JSONB.

  **Artifact Store**    User-created artifacts (files, documents, images,
                        code). Object storage (S3/R2) with metadata in
                        Postgres.

  **Session Store**     Real-time build session state, interaction logs,
                        scaffolding decisions. Redis for active sessions,
                        archived to Postgres.

  **Skill Taxonomy**    The master graph of all skills and their
                        relationships across domains. Graph database or
                        curated JSONB. Evolves over time.
  --------------------- -------------------------------------------------

4.3 Workspace Runtime

The Artifact Workspace needs to run real tools in the browser. The
approach depends on the workspace mode:

- **Writer mode:** Rich text editor (TipTap/ProseMirror based) with
  custom extensions for layout, image placement, and export. Runs
  entirely client-side.

- **Canvas mode:** Browser-based vector editor. Options include building
  on Fabric.js or a lightweight SVG editor. Client-side with server-side
  export for complex formats.

- **Code mode:** Monaco editor (VS Code core) in the browser with a
  containerised runtime backend (similar to Replit/CodeSandbox
  architecture). WebContainers for lightweight projects, Docker
  containers for complex ones.

- **Slides/Data modes:** Purpose-built editors using the same component
  library. Slides use a layout engine; Data uses a spreadsheet component
  with chart rendering.

All workspace modes share a common real-time collaboration layer
(CRDT-based, like Yjs) so the AI coach can observe and annotate the
artifact as the user works.

5\. What to Build First

The full system described above is the destination. Here is the
pragmatic path to get there, ordered by what proves the thesis fastest
with the least engineering.

5.1 Phase 1: Proof of Concept (4--6 weeks)

**Goal:** Validate the core loop with a single workspace mode.

- **Build:** Writer workspace only (document/guide artifacts). Rich text
  editor + Learn Pane + Progress Rail.

- **Build:** Project Engine V1 --- a structured prompt chain that
  generates project specs from learning intents. Uses a single large
  model (Claude Opus or equivalent).

- **Build:** Scaffolding Engine V1 --- a conversational AI coach in the
  Learn Pane. Context-aware (knows the project spec, the current step,
  and what the user has written so far).

- **Skip:** Learner Model persistence (use session-only context), public
  showcase, complex assessment, multi-mode workspace.

+---+----------------------------------------------------------------------+
|   | **POC TEST**                                                         |
|   |                                                                      |
|   | Can a user say \"I want to learn about Victorian architecture\" and, |
|   | within 45 minutes, produce a                                         |
|   |                                                                      |
|   | beautiful 4-page illustrated guide that they\'re proud of --- while  |
|   | having genuinely learned something                                   |
|   |                                                                      |
|   | about architectural history, structural principles, and document     |
|   | design? If yes, the thesis is validated.                             |
+---+----------------------------------------------------------------------+

5.2 Phase 2: Core Platform (2--3 months)

**Goal:** Multi-domain support and persistent learning.

- **Add:** Canvas workspace mode (visual artifacts --- posters, SVGs for
  Cricut, illustrations).

- **Add:** Persistent Learner Model with skill graph. Cross-project
  skill tracking.

- **Add:** Portfolio system. Users can see everything they\'ve made and
  how their skills have grown.

- **Add:** Draft-feedback-revision cycles in the Assessment System.

- **Add:** Project suggestions based on learner history (\"You learned
  colour theory in your poster project. Try this web design project to
  apply it in a new context\").

5.3 Phase 3: Full Platform (3--6 months)

**Goal:** Complete workspace coverage and community.

- **Add:** Code workspace mode.

- **Add:** Slides and Data workspace modes.

- **Add:** Public showcase and community features.

- **Add:** Advanced Assessment System with multimodal artifact
  evaluation.

- **Add:** Cross-domain skill transfer visualisation and deliberate
  bridging projects.

- **Add:** Collaborative projects (pair/group learning with shared
  artifacts).

6\. Where the Moat Forms

The defensibility of this product increases over time and compounds
across three dimensions:

  --------------------- -------------------------------------------------
  **Moat Layer**        **How It Compounds**

  **Learner Models**    Every user interaction makes their Learner Model
                        more accurate. ZPD calibration improves. Project
                        suggestions get better. This is personal and
                        non-transferable to competitors.

  **Skill Taxonomy**    As more users build more projects across more
                        domains, the platform\'s understanding of how
                        skills connect and transfer across domains
                        becomes increasingly rich. This is a proprietary
                        knowledge graph that no competitor can replicate
                        without the same volume of diverse learning data.

  **Project Library**   Every AI-generated project that works well (high
                        completion, high learning signal, high user
                        satisfaction) becomes a proven template that can
                        be personalised for future users. The library of
                        validated projects grows with usage.

  **Community           The public showcase becomes a library of real
  Artifacts**           things made by real learners. New users see
                        what\'s possible. This is both a marketing asset
                        and a pedagogical tool (worked examples from
                        peers).
  --------------------- -------------------------------------------------

7\. Key Risks and Mitigations

  ---------------- --------------------------- ---------------------------
  **Risk**         **Impact**                  **Mitigation**

  AI-generated     Users don\'t engage,        Heavy investment in Project
  projects are too retention drops             Engine prompt engineering.
  generic or                                   Human review of generated
  boring                                       projects in early phases.
                                               User ratings feed back to
                                               improve generation.

  Scaffolding is   Users feel patronised or    ZPD calibration is the core
  too heavy or too lost                        technical challenge. Build
  light                                        rapid feedback loops: if
                                               user skips scaffolding,
                                               reduce it. If user stalls,
                                               increase it. Explicit \"I
                                               need help\" / \"I\'ve got
                                               this\" user signals.

  Workspace tools  Users hit tool limitations  Start with Writer mode
  aren\'t good     before they hit learning    where browser editors are
  enough           limitations                 mature. Canvas and Code
                                               modes can leverage existing
                                               open-source tools. Don\'t
                                               build Figma; build enough
                                               to learn with.

  Domain breadth   Platform is shallow across  Focus Phase 1 on
  is too ambitious many domains rather than    document-based artifacts
                   deep in any                 (guides, reports, zines)
                                               which span many knowledge
                                               domains with one workspace.
                                               Add visual and code domains
                                               only after document mode is
                                               proven.

  Users want to    Market is smaller than      The research suggests this
  learn but don\'t expected                    audience is smaller than
  want to make                                 expected. Most people want
  things                                       tangible outcomes. But
                                               offer a \"guided
                                               exploration\" mode as a
                                               lighter alternative for
                                               pure curiosity.
  ---------------- --------------------------- ---------------------------

8\. Naming and Positioning

The product name should evoke making, craftsmanship, and personal
growth. It should not sound like a school, a course platform, or a
coding bootcamp. It should feel like a workshop.

Positioning Statement

+---+----------------------------------------------------------------------+
|   | **POSITIONING**                                                      |
|   |                                                                      |
|   | For curious adults who want to learn new skills and explore new      |
|   | subjects,                                                            |
|   |                                                                      |
|   | \[Product\] is an AI-powered workshop where you learn by building    |
|   | real things.                                                         |
|   |                                                                      |
|   | Unlike courses that make you watch and memorise, or AI tools that    |
|   | just do the work for you,                                            |
|   |                                                                      |
|   | \[Product\] gives you a project, teaches you as you build, and       |
|   | leaves you with                                                      |
|   |                                                                      |
|   | something you made --- and the skills to make more.                  |
+---+----------------------------------------------------------------------+

Key Differentiators

- **Not a course:** No curriculum. No syllabus. No lectures. You learn
  by building. The project IS the learning.

- **Not a tool:** Canva/Replit/ChatGPT do the work for you. This teaches
  you to do it yourself. You gain skills, not just outputs.

- **Not a tutor:** Khanmigo/Duolingo test you on content. This has you
  make things. The artifact is the evidence of learning, not a quiz
  score.

- **Not coding-only:** Learn anything by making anything. Graphic
  design, history, biology, business strategy, creative writing, data
  analysis --- the platform is domain-agnostic.

*End of Document*
