# Seedwork — Complete Prompt Architecture

> Every AI interaction in Seedwork is powered by a prompt. This document catalogues every prompt needed, organised by phase. Each prompt is broken down to its smallest useful unit so they can be developed, tested, and iterated independently.

---

## Table of Contents

1. [Phase 0: Onboarding](#phase-0-onboarding)
2. [Phase 1: Project Generation](#phase-1-project-generation)
3. [Phase 2: Project Launch](#phase-2-project-launch)
4. [Phase 3: The Build — Scaffolding & Teaching](#phase-3-the-build--scaffolding--teaching)
5. [Phase 4: Assessment & Checkpoints](#phase-4-assessment--checkpoints)
6. [Phase 5: Iteration & Feedback](#phase-5-iteration--feedback)
7. [Phase 6: Completion & Reflection](#phase-6-completion--reflection)
8. [Phase 7: Progression & Next Steps](#phase-7-progression--next-steps)
9. [Phase 8: Gamification](#phase-8-gamification)
10. [Phase 9: Notifications & Re-engagement](#phase-9-notifications--re-engagement)
11. [Phase 10: Portfolio & Showcase](#phase-10-portfolio--showcase)
12. [System-Level Prompts](#system-level-prompts)

---

## Phase 0: Onboarding

These prompts run once when a new user arrives. Goal: build an initial Learner Model without quizzes or assessments.

### P0.1 — Welcome & Interest Discovery

**Purpose:** Open the conversation and learn what the user is interested in.

**Input:**
- None (first message)

**Output:**
- Warm welcome
- 1-2 open questions about interests

**Key constraints:**
- Must not feel like a form or intake questionnaire
- Must feel like a conversation with a curious, encouraging person
- No more than 2 questions in the first message
- Tone: warm, excited, peer-level (not teacher-to-student)

---

### P0.2 — Experience Calibration

**Purpose:** Understand what the user has done before (if anything) in their area of interest. Calibrate initial ZPD.

**Input:**
- User's stated interests (from P0.1 response)

**Output:**
- Follow-up question(s) about prior experience
- Acknowledgement of their interest

**Key constraints:**
- Frame as curiosity, not testing ("Have you ever tried...?" not "Rate your skill level")
- Must handle both total beginners ("I've never done anything like this") and experienced users ("I've been doing X for years") gracefully
- Extract enough signal to set initial scaffolding level (beginner / some experience / experienced)

---

### P0.3 — Aspiration Capture

**Purpose:** Understand what the user would love to be able to make or do.

**Input:**
- User's interests and experience level (from P0.1 + P0.2)

**Output:**
- Question about what they'd love to create or achieve
- Optional: a couple of inspiring examples tailored to their stated interests

**Key constraints:**
- The examples must be concrete artifacts, not abstract goals ("a beautiful illustrated recipe book" not "get better at cooking")
- Must spark imagination, not overwhelm
- This answer feeds directly into the Project Engine

---

### P0.4 — Learner Model Initialisation

**Purpose:** Synthesise all onboarding conversation into a structured Learner Model.

**Input:**
- Full onboarding conversation transcript

**Output (structured JSON):**
```json
{
  "interests": ["primary interest", "secondary interest"],
  "experience_level": "beginner | intermediate | experienced",
  "experience_details": "free text summary of what they've done",
  "aspirations": ["what they want to make/achieve"],
  "initial_scaffolding_level": "full_guidance | coached | light_touch",
  "tone_preference": "inferred communication style preference",
  "constraints": ["any mentioned constraints: time, tools, etc."]
}
```

**Key constraints:**
- This is a behind-the-scenes extraction prompt, not user-facing
- Must be conservative with experience_level (err toward more scaffolding)
- Must capture nuance, not just categories

---

## Phase 1: Project Generation

These prompts create the full project specification. This is the Project Engine.

### P1.1 — Learning Intent Interpretation

**Purpose:** Take the user's stated desire (free text) and interpret it into a structured learning intent.

**Input:**
- User's message (e.g., "I want to learn graphic design for my Cricut" or "teach me about dinosaurs" or "I want to make a personal website")
- Current Learner Model

**Output (structured JSON):**
```json
{
  "learning_domains": ["graphic design", "vector editing"],
  "artifact_direction": "visual designs for cutting machine",
  "knowledge_goals": ["colour theory", "typography basics", "SVG structure"],
  "skill_goals": ["vector path creation", "layout composition"],
  "user_motivation": "practical — wants to make things for a specific tool",
  "suggested_artifact_types": ["SVG files", "PDF templates", "design collection"]
}
```

**Key constraints:**
- Must distinguish between "I want to learn X" (learning-first) and "I want to make Y" (artifact-first) intents
- Must map vague intents to concrete domains and skills
- Must not over-scope — identify the realistic subset for one project

---

### P1.2 — Driving Question Generation

**Purpose:** Generate 2-3 compelling Driving Questions for the user to choose from.

**Input:**
- Structured learning intent (from P1.1)
- Learner Model
- Any stated constraints (time, tools, etc.)

**Output:**
- 2-3 Driving Questions, each with:
  - The DQ itself (open-ended, "How might you..." format)
  - A one-line artifact description
  - Estimated time to complete
  - 3-5 key things they'll learn

**Key constraints:**
- DQs must follow PBL best practice: open-ended, can't be Googled, requires making something to answer
- DQs must be personally relevant based on the Learner Model
- Must cover different scope levels (e.g., one quick project, one medium, one ambitious)
- Artifact descriptions must be concrete and exciting
- Time estimates must be honest

---

### P1.3 — Artifact Specification

**Purpose:** Define exactly what the finished artifact will be.

**Input:**
- Selected Driving Question
- Learner Model
- Learning intent

**Output (structured JSON):**
```json
{
  "artifact_title": "Seasonal Botanical Greeting Cards",
  "artifact_description": "A set of 4 greeting cards featuring hand-drawn botanical illustrations, one for each season. Each card uses a cohesive colour palette and typography. Exported as print-ready PDF and SVG cut files for Cricut.",
  "artifact_format": "PDF + SVG",
  "artifact_components": [
    "4 botanical illustrations",
    "4 card layouts with typography",
    "Colour palette documentation",
    "Print-ready export files"
  ],
  "quality_bar": "Suitable for personal use and gifting. Clean lines, consistent style, readable text.",
  "workspace_mode": "canvas"
}
```

**Key constraints:**
- Must be specific enough that the user can visualise the finished thing
- Must be achievable at the user's current level (with scaffolding)
- Must include concrete components that map to project steps
- Must specify the workspace mode needed

---

### P1.4 — Need to Know Map

**Purpose:** Generate the complete map of skills and knowledge required for this project.

**Input:**
- Artifact specification (from P1.3)
- Learner Model (especially current skills and ZPD)

**Output (structured JSON):**
```json
{
  "skills": [
    {
      "id": "colour-theory-basics",
      "name": "Colour Theory Basics",
      "domain": "graphic design",
      "relevance": "Choosing palettes for each seasonal card",
      "user_current_level": "none",
      "level_required": "foundational",
      "classification": "core",
      "teaching_priority": "high"
    }
  ],
  "knowledge": [
    {
      "id": "botanical-anatomy",
      "name": "Basic Botanical Anatomy",
      "domain": "natural science",
      "relevance": "Drawing accurate plant structures",
      "user_current_level": "none",
      "level_required": "awareness",
      "classification": "supporting",
      "teaching_priority": "medium"
    }
  ]
}
```

**Key constraints:**
- Each item must explain WHY it's needed (relevance to the artifact)
- Must flag what the user already knows vs. what's new
- Must distinguish core (must learn) from supporting (nice to learn) and stretch (opportunity to go deeper)
- Must not be overwhelming — 8-15 items maximum

---

### P1.5 — Step Sequence Generation

**Purpose:** Break the project into a buildable sequence of steps.

**Input:**
- Artifact specification (from P1.3)
- Need to Know map (from P1.4)
- Learner Model

**Output (structured JSON):**
```json
{
  "steps": [
    {
      "step_number": 1,
      "title": "Choose Your Seasonal Palette",
      "description": "Select a cohesive colour palette for each of your four seasonal cards using colour theory principles.",
      "teaching_objective": "Understand complementary and analogous colour relationships",
      "making_objective": "Produce 4 documented colour palettes (one per season)",
      "artifact_contribution": "Colour foundation for all subsequent design work",
      "skills_practiced": ["colour-theory-basics"],
      "estimated_minutes": 20,
      "scaffolding_level": "full_guidance",
      "checkpoint": {
        "type": "artifact_review",
        "criteria": "4 palettes created, each with 3-5 colours, seasonal appropriateness, basic colour harmony"
      },
      "xp_value": 50
    }
  ],
  "total_steps": 8,
  "estimated_total_minutes": 150
}
```

**Key constraints:**
- 5-12 steps per project (fewer for short projects, more for long)
- Each step must produce a visible portion of the artifact
- Steps must be ordered so learning builds progressively
- Each step has both a teaching objective AND a making objective
- Scaffolding level per step is set from the Learner Model
- Every step must have a checkpoint with clear assessment criteria
- XP values should scale with difficulty and learning depth

---

### P1.6 — Project Presentation

**Purpose:** Present the generated project to the user in an exciting, clear way.

**Input:**
- Complete project spec (DQ, artifact spec, NTK map, step sequence)

**Output:**
- Conversational presentation of the project
- The Driving Question, prominently
- What they'll make (with an evocative description)
- What they'll learn (the highlights, not the full NTK map)
- How long it'll take
- Step overview (titles only, not full detail)
- Call to action: "Ready to start?" / option to adjust

**Key constraints:**
- Must be exciting, not clinical
- Must make the artifact feel desirable
- Must make the learning feel achievable
- Must give the user agency to adjust or pick a different project
- Keep it concise — this is a conversation, not a document

---

## Phase 2: Project Launch

### P2.1 — Step Introduction

**Purpose:** Introduce each step when the user reaches it. Set context for what they're about to do and why.

**Input:**
- Current step spec
- Overall project context (DQ, artifact)
- User's progress so far
- Learner Model

**Output:**
- Brief context: where this step fits in the project
- What they'll make in this step
- What they'll learn in this step
- Connection to the Driving Question
- Transition into the teaching/making flow

**Key constraints:**
- Must connect backward ("In the last step you created X") and forward ("This will feed into step N where you'll...")
- Must make the step feel purposeful, not arbitrary
- Must maintain momentum — no long preambles
- Adapt enthusiasm to the user's demonstrated engagement level

---

## Phase 3: The Build — Scaffolding & Teaching

These are the most frequently called prompts. They run continuously during the build phase.

### P3.1 — Micro-Lesson Generation

**Purpose:** Generate a focused, 2-5 minute teaching segment on a specific concept.

**Input:**
- Concept to teach (from the step's teaching objective)
- Current step context (what the user is building)
- Learner Model (experience level, learning style signals)
- Scaffolding level for this step

**Output:**
- Explanation of the concept (adapted to level)
- 1-2 concrete examples relevant to the current artifact
- A "try this" prompt that connects to the making objective

**Key constraints:**
- Maximum 300 words for the explanation
- Must include at least one visual/concrete example
- Must end with an actionable "now you try" moment
- Must not feel like a lecture — conversational, encouraging
- Language complexity must match the user's level
- Must connect the concept directly to the artifact ("This matters for your cards because...")

---

### P3.2 — Contextual Annotation

**Purpose:** Provide inline teaching attached to something the user just did or made.

**Input:**
- The specific artifact element the user created/modified
- The relevant concept or principle
- Current step context
- Scaffolding level

**Output:**
- Brief observation about what the user did
- The relevant principle or concept
- A suggestion or alternative approach (if applicable)

**Key constraints:**
- Must be brief (2-3 sentences maximum)
- Must feel like a knowledgeable friend commenting, not a teacher grading
- Must be specific to what the user actually did, not generic
- Only trigger when there's something genuinely useful to say
- At "autonomous" scaffolding level, only trigger for significant issues

---

### P3.3 — Worked Example Generation

**Purpose:** Show the user how a professional would approach the current task.

**Input:**
- Current making objective
- The specific technique or approach to demonstrate
- Artifact context
- Learner Model

**Output:**
- Brief introduction ("Here's how you might approach this...")
- Step-by-step walkthrough of the technique
- The result of the technique applied
- Invitation for the user to try it themselves

**Key constraints:**
- Must show process, not just result
- Must explain the WHY behind each decision
- Must be achievable at the user's level (don't show expert techniques to beginners)
- Must be directly applicable to the current artifact

---

### P3.4 — Hint Generation

**Purpose:** Provide a nudge when the user is stuck, without giving away the answer.

**Input:**
- What the user appears to be stuck on
- The expected approach/answer
- Current scaffolding level
- Number of previous hints given for this task

**Output:**
- Progressive hint (more specific with each request):
  - Hint 1: Direction ("Think about what makes autumn colours feel warm...")
  - Hint 2: Narrowing ("Look at the relationship between orange and its complement...")
  - Hint 3: Near-answer ("Try pairing your burnt orange with a deep teal — they're complementary colours")

**Key constraints:**
- Must follow Socratic method — guide to the answer, don't give it
- Must escalate specificity with each request
- After 3 hints, offer the worked example (P3.3) as a fallback
- Must never make the user feel stupid for needing hints
- Tone: curious and encouraging, not corrective

---

### P3.5 — Stuck Detection & Intervention

**Purpose:** Proactively identify when a user is struggling and offer help without being asked.

**Input:**
- User's recent activity patterns (time on step, interaction frequency, artifact changes)
- Current step and expected progress
- Learner Model

**Output:**
- Gentle check-in ("How's it going with the layout? I noticed you might be working through the spacing...")
- Offer of help (not forced)
- Optionally: a specific observation about what might be causing difficulty

**Key constraints:**
- Must not trigger too frequently (minimum 3-5 minutes of apparent struggle)
- Must not be patronising
- Must give the user the option to say "I'm fine, just thinking"
- Must not assume the user is stuck just because they're slow — some people think before acting
- At "autonomous" scaffolding level, much higher threshold before triggering

---

### P3.6 — Encouragement & Momentum

**Purpose:** Celebrate progress and maintain motivation during the build.

**Input:**
- What the user just completed or achieved
- Progress context (how far through the step/project)
- Learner Model

**Output:**
- Specific, genuine encouragement tied to what they did
- Connection to the growing artifact
- Forward momentum ("Next up..." or "You're ready for...")

**Key constraints:**
- Must be specific, not generic ("Your colour palette has great contrast" not "Great job!")
- Must reference the actual artifact growing
- Must not be excessive — one encouragement per meaningful milestone, not every action
- Must feel earned, not patronising
- Vary the tone and phrasing to avoid repetition

---

### P3.7 — Question Answering (Free-form)

**Purpose:** Answer any question the user asks during the build, in context.

**Input:**
- User's question
- Current project, step, and artifact context
- Learner Model
- Conversation history

**Output:**
- Direct answer to the question
- Connection to the current project where relevant
- Optionally: pointer to a related concept they'll encounter later

**Key constraints:**
- Must answer the actual question, not redirect to the curriculum
- Must provide enough depth for understanding but not overwhelm
- If the question is about something covered in a future step, briefly answer now and note they'll go deeper later
- If the question is outside the project scope entirely, answer it but gently guide back
- Must maintain the conversational tone, not switch to "lecture mode"

---

## Phase 4: Assessment & Checkpoints

### P4.1 — Step Artifact Assessment

**Purpose:** Evaluate what the user produced for a specific step checkpoint.

**Input:**
- The artifact element(s) produced in this step
- The step's checkpoint criteria
- The step's teaching and making objectives
- Learner Model
- Scaffolding level

**Output (structured JSON + conversational):**
```json
{
  "passed": true,
  "score": 0.85,
  "strengths": ["Strong seasonal colour differentiation", "Good use of complementary pairs"],
  "areas_for_improvement": ["Spring palette could use more variation in lightness"],
  "skills_demonstrated": ["colour-theory-basics: foundational"],
  "recommendation": "proceed",
  "xp_awarded": 50,
  "feedback_message": "conversational feedback for the user"
}
```

**Key constraints:**
- Assessment must be against the checkpoint criteria, not absolute perfection
- Must identify specific strengths (not just "good job")
- Must frame improvements as opportunities, not failures
- "Pass" threshold should be calibrated to ZPD — beginners pass with basic competence, experienced users are held to a higher bar
- If not passed, must clearly explain what's needed to pass
- Never block entirely — if a user is really struggling, lower the bar and flag the skill for more practice in future projects
- Feedback message must be warm and specific

---

### P4.2 — Reflective Checkpoint Question

**Purpose:** Ask a reflective question that verifies understanding beyond surface execution.

**Input:**
- What the user just completed
- The teaching objective for this step
- The concept taught

**Output:**
- One open-ended reflective question
- Brief acknowledgement of what they made

**Key constraints:**
- Question must test understanding, not recall ("Why did you choose those colours together?" not "What are complementary colours?")
- Must be answerable in 1-3 sentences
- Must feel like genuine curiosity, not a quiz
- User's response feeds into the Learner Model as a skill verification signal

---

### P4.3 — Reflective Answer Evaluation

**Purpose:** Evaluate the user's response to a reflective checkpoint question.

**Input:**
- The reflective question asked
- The user's response
- The expected understanding being tested
- Current skill state in Learner Model

**Output (structured JSON):**
```json
{
  "understanding_level": "solid | partial | surface | misunderstanding",
  "evidence": "User correctly identified the complementary relationship but didn't connect it to emotional response",
  "skill_update": {
    "skill_id": "colour-theory-basics",
    "new_level": "developing",
    "confidence": 0.7
  },
  "follow_up": "none | gentle_correction | deeper_explanation"
}
```

**Key constraints:**
- Must be generous in interpretation — look for understanding, not perfect articulation
- Must distinguish between "knows it but said it awkwardly" and "doesn't actually understand"
- Follow-up should only trigger for misunderstandings, not partial understanding
- Gentle correction must not feel punitive

---

## Phase 5: Iteration & Feedback

### P5.1 — Draft Review (Full Artifact)

**Purpose:** Provide comprehensive feedback on the complete first draft of the artifact.

**Input:**
- Complete artifact (all components)
- Artifact specification (the target)
- Driving Question
- All skills practiced across the project
- Learner Model

**Output:**
- Overall assessment (how close to the artifact spec)
- Dimension-by-dimension feedback:
  - Technical quality (execution, accuracy)
  - Conceptual depth (understanding demonstrated)
  - Craft/Aesthetics (visual/written quality)
  - Alignment with Driving Question
- Top 3 specific improvements that would make the biggest difference
- What's already strong (specific praise)

**Key constraints:**
- Must be balanced — strengths AND improvements
- Improvements must be actionable ("Try adjusting the spacing between your heading and illustration" not "improve the layout")
- Must prioritise — don't list 15 things to fix, pick the 3 that matter most
- Must frame as "revision opportunity" not "what's wrong"
- Tone: like a supportive mentor reviewing a draft, not a teacher grading

---

### P5.2 — Revision Guidance

**Purpose:** Guide the user through specific revisions after draft feedback.

**Input:**
- The specific improvement being addressed
- The current state of that artifact element
- The target improvement
- Learner Model

**Output:**
- Explanation of what to change and why
- Specific instructions or approach
- What "better" looks like for this element

**Key constraints:**
- One improvement at a time
- Must explain the WHY, not just the WHAT
- Must connect the revision to a skill/concept (this is still a teaching moment)
- Must acknowledge the effort already put in

---

### P5.3 — Revision Evaluation

**Purpose:** Assess whether a revision improved the artifact.

**Input:**
- Before state
- After state (the revision)
- The improvement that was requested
- Assessment criteria

**Output (structured JSON):**
```json
{
  "improved": true,
  "improvement_quality": "significant | moderate | minor | no_change | regression",
  "specific_observation": "The spacing now creates a clear visual hierarchy between the title and illustration",
  "remaining_suggestions": [],
  "skill_signal": "User applied feedback independently, suggests growing understanding"
}
```

**Key constraints:**
- Must compare against the specific improvement requested, not general quality
- Must acknowledge effort even if improvement is minor
- If no improvement, must diagnose why (misunderstood the feedback? technical difficulty? disagreed with the suggestion?)

---

## Phase 6: Completion & Reflection

### P6.1 — Completion Celebration

**Purpose:** Mark the completion of the project and celebrate the artifact.

**Input:**
- Completed artifact
- Project journey (steps completed, time taken, iterations)
- Learner Model (skills gained)

**Output:**
- Genuine celebration of what they made
- Specific call-outs of what's impressive about the artifact
- Summary of the journey (how they got here)
- The artifact, ready for export

**Key constraints:**
- Must feel like a real milestone, not a checkbox
- Must reference specific elements of THEIR artifact, not generic praise
- Must create the "I made that?" moment
- Must not be over-the-top — genuine warmth, not confetti cannons

---

### P6.2 — Learning Reflection Facilitation

**Purpose:** Guide the user through a structured reflection on what they learned.

**Input:**
- Project spec (what was planned)
- Actual journey (what happened)
- Skills practiced and assessed
- Learner Model

**Output:**
- 3 reflective prompts:
  1. "What did you learn that surprised you?"
  2. "What was the hardest part, and how did you work through it?"
  3. "What would you do differently next time?"

**Key constraints:**
- Questions must be genuinely open, not leading
- Must adapt to the project (don't ask about colour theory if the project was about writing)
- Must be brief — this is a reflection, not a debrief
- User's responses update the Learner Model

---

### P6.3 — Learning Summary Generation

**Purpose:** Generate a structured summary of everything the user learned in this project.

**Input:**
- Full project data (steps, assessments, reflections)
- Learner Model before and after

**Output (structured JSON + conversational):**
```json
{
  "skills_acquired": [
    {
      "skill": "Colour Theory Basics",
      "level_before": "none",
      "level_after": "developing",
      "evidence": "Created 4 harmonious palettes, correctly applied complementary relationships"
    }
  ],
  "knowledge_gained": ["Seasonal botanical characteristics", "Print layout fundamentals"],
  "cross_domain_connections": ["Colour theory applies to web design, interior design, photography"],
  "total_xp_earned": 450,
  "time_invested": "2h 15m",
  "artifact_produced": "Seasonal Botanical Greeting Cards (PDF + SVG)"
}
```

**Key constraints:**
- Must be evidence-based (point to specific things the user did)
- Must highlight cross-domain connections (this is a key platform value)
- Must feel rewarding to read
- Conversational version should be concise — 4-6 sentences max

---

## Phase 7: Progression & Next Steps

### P7.1 — Next Project Suggestion

**Purpose:** Suggest 2-3 follow-up projects based on what was just learned.

**Input:**
- Completed project data
- Updated Learner Model (new skills, interests, aspirations)
- Skills at the edge of the user's ZPD

**Output:**
- 2-3 project suggestions, each with:
  - Driving Question
  - Artifact description
  - What they'd learn that's new
  - How it builds on what they just did
  - Estimated time

**Key constraints:**
- At least one project should deepen skills in the same domain
- At least one project should bridge to a new domain (cross-domain transfer)
- Must explicitly connect to what they just learned ("You nailed colour theory — this project would let you apply it to...")
- Must feel like natural next steps, not a curriculum
- Include a "surprise me" option that's genuinely creative

---

### P7.2 — Skill Graph Update Narration

**Purpose:** Explain to the user how their skill graph has changed.

**Input:**
- Skill graph diff (before vs. after project)
- New connections between skills

**Output:**
- Brief, visual-friendly description of skill growth
- Highlight of any cross-domain connections unlocked
- Celebration of milestone skills (first skill in a new domain, etc.)

**Key constraints:**
- Must be brief (this supports a visual UI, it's not the main content)
- Must emphasise connections between skills, not just individual growth
- Must make the user feel like they're building something larger than one project

---

## Phase 8: Gamification

### P8.1 — XP Award Narration

**Purpose:** Generate the message shown when XP is awarded.

**Input:**
- XP amount
- What triggered it (step completion, revision quality, streak bonus, etc.)
- User's current level and progress to next level

**Output:**
- Brief, punchy XP notification
- Context for why this amount (bonus for first attempt, streak multiplier, etc.)
- Progress toward next level

**Key constraints:**
- Must be brief (1-2 sentences)
- Must vary phrasing to avoid repetition
- Must connect XP to the actual work, not abstract points
- Never negative (no XP deductions for failure)

---

### P8.2 — Level Up Message

**Purpose:** Celebrate when the user reaches a new level.

**Input:**
- New level number and name
- What they did to earn it
- Summary of their journey so far
- Any new features/capabilities unlocked

**Output:**
- Celebration message
- Summary of what this level represents
- What's ahead

**Key constraints:**
- Must feel earned and meaningful
- Must reference their actual projects and artifacts
- Must tease what's possible at the new level
- Tone should escalate with level — early levels are encouraging, later levels are genuinely impressed

---

### P8.3 — Streak Message

**Purpose:** Acknowledge and encourage learning streaks.

**Input:**
- Current streak length (days)
- What they did today
- Streak milestones (7, 14, 30, 60, 100 days)

**Output:**
- Streak acknowledgement
- At milestones: special celebration

**Key constraints:**
- Daily streaks should be brief and not annoying
- Milestones should feel genuinely special
- Must not create anxiety about breaking streaks (no "don't lose your streak!" pressure)
- Frame as consistency celebration, not obligation

---

### P8.4 — Achievement/Badge Generation

**Purpose:** Generate contextual achievements for notable accomplishments.

**Input:**
- The accomplishment (first project completed, first cross-domain skill, 10th artifact, etc.)
- User's history

**Output:**
- Achievement name and description
- Why it matters

**Key constraints:**
- Achievements must be meaningful, not participation trophies
- Must be specific to what the user actually did
- Limited set — too many achievements devalues them all
- Some achievements should be surprising/unexpected

---

## Phase 9: Notifications & Re-engagement

### P9.1 — Gentle Nudge (24h inactive)

**Purpose:** Remind the user to come back after a day of inactivity.

**Input:**
- User's current project and step
- What they were last working on
- Their streak status

**Output:**
- Brief, warm reminder
- Reference to their specific project/artifact
- Low-pressure invitation to continue

**Key constraints:**
- Must not be guilt-inducing
- Must reference THEIR project specifically ("Your greeting cards are waiting" not "Don't forget to learn!")
- Must be short enough for a push notification
- Maximum 1 per 24-hour period

---

### P9.2 — Streak Risk Warning (streak about to break)

**Purpose:** Alert the user that their streak is at risk.

**Input:**
- Current streak length
- Time remaining before streak breaks
- What minimal action would save it

**Output:**
- Friendly heads-up about the streak
- Suggestion for a quick action that counts (even 5 minutes)

**Key constraints:**
- Must not create anxiety or guilt
- Must offer a genuinely quick path to maintaining the streak
- Must feel helpful, not pushy
- Only send if streak is > 3 days (don't nag about a 1-day streak)

---

### P9.3 — Progress Highlight (weekly)

**Purpose:** Weekly summary of what the user accomplished.

**Input:**
- Week's activity (projects worked on, steps completed, skills gained, XP earned)
- Comparison to previous week (optional)

**Output:**
- Brief weekly summary
- Highlight of their best moment
- Teaser for what's coming next

**Key constraints:**
- Only send if the user was active that week
- Must be celebratory, not evaluative
- Must be brief enough to scan in 10 seconds
- Include one forward-looking element to create pull

---

### P9.4 — Re-engagement (7+ days inactive)

**Purpose:** Win back a user who has been away for a week or more.

**Input:**
- Last activity
- Their unfinished project (if any)
- Their skill graph and interests
- How long they've been away

**Output:**
- Warm "welcome back" message
- Reminder of what they were building
- Option to: continue where they left off, start something new, or get a fresh project suggestion

**Key constraints:**
- Must not guilt-trip
- Must acknowledge the gap without judgement ("Life happens!")
- Must make it easy to re-enter (no friction)
- If they've been away 30+ days, offer a fresh start option — their old project context may feel stale

---

### P9.5 — Inspiration Push (periodic)

**Purpose:** Send an inspiring project idea that matches the user's interests, even when they haven't asked.

**Input:**
- User's Learner Model (interests, skills, aspirations)
- Projects they haven't tried yet
- Seasonal/timely relevance (optional)

**Output:**
- Brief, exciting project idea
- What they'd make
- Why it connects to them specifically

**Key constraints:**
- Maximum 1 per week
- Must be genuinely relevant to their interests
- Must feel like a gift, not an advertisement
- Must be easy to act on ("Tap to start this project")

---

## Phase 10: Portfolio & Showcase

### P10.1 — Artifact Description Generation

**Purpose:** Generate a polished description for a completed artifact in the portfolio.

**Input:**
- Completed artifact
- Project data (DQ, skills, time invested)
- User's reflection

**Output:**
- Title
- 2-3 sentence description suitable for public display
- Skills tags
- Time invested

**Key constraints:**
- Must be written as if the user wrote it (first person optional, or neutral)
- Must highlight what's interesting about the artifact
- Must not mention scaffolding level, mistakes, or struggles (public-facing)
- Must be concise and readable

---

### P10.2 — Learning Journey Summary (for showcase)

**Purpose:** Generate a shareable summary of the learning journey behind an artifact.

**Input:**
- Full project data
- Key moments (challenges overcome, breakthroughs)
- Before/after skill state

**Output:**
- Brief narrative of the learning journey
- "What I learned" section
- "What I'm proud of" section

**Key constraints:**
- Must be inspiring to other learners who see it
- Must be honest without being self-deprecating
- Must make the viewer think "I could do that too"
- Must respect privacy — nothing the user wouldn't want public

---

## System-Level Prompts

These are foundational prompts that wrap or influence all other prompts.

### S1 — Seedwork Coach Persona

**Purpose:** The base system prompt that defines how the AI behaves across ALL interactions.

**Core traits:**
- Warm, encouraging, genuinely curious about what the user is making
- Knowledgeable but not showy — explains things simply, uses analogies
- Patient — never frustrated by repeated questions or slow progress
- Honest — gives real feedback, doesn't just praise everything
- Adaptive — matches the user's energy and communication style
- Makes the user the hero — the AI is the guide, not the star

**Tone rules:**
- Never condescending ("As you probably know..." / "This is easy...")
- Never dismissive ("That's not important" / "Don't worry about that")
- Never overwhelming (max 2 new concepts at once)
- Always connect teaching to the artifact being built
- Use "you" and "your" frequently — it's THEIR project

---

### S2 — Scaffolding Level Calibration

**Purpose:** Determine and adjust the scaffolding level dynamically.

**Input (continuous):**
- User's recent interactions
- Success rate on recent checkpoints
- Hint usage frequency
- Time-to-completion for recent steps
- Self-correction behaviour
- Learner Model

**Output:**
- Updated scaffolding level: `full_guidance | coached | light_touch | autonomous`
- Specific adjustments: "Reduce explanation length by 30%", "Stop offering hints proactively", etc.

**Key constraints:**
- Must trend toward less scaffolding over time (the whole point is growing independence)
- Must snap back to more scaffolding if user suddenly struggles in a new area
- Must be per-skill, not global (user might be autonomous in colour theory but need full guidance in typography)
- Changes should be gradual, not jarring

---

### S3 — Domain Knowledge Router

**Purpose:** Determine which domain knowledge the AI needs to bring to bear for a given interaction.

**Input:**
- Current project domain(s)
- Current step's teaching objective
- User's question or current activity

**Output:**
- Domain context to inject into the current prompt
- Accuracy requirements (how precise does the domain knowledge need to be?)
- Sources or references to cite if needed

**Key constraints:**
- Must know when to be precise (scientific facts, technical procedures) vs. when to be suggestive (creative approaches, design decisions)
- Must flag when a topic requires genuine expertise the AI might not have (e.g., medical, legal, safety-critical)
- Must maintain accuracy appropriate to the user's level

---

### S4 — Conversation Memory Manager

**Purpose:** Maintain relevant context across a build session without overwhelming the context window.

**Input:**
- Full conversation history
- Current project spec
- Current step
- Learner Model

**Output:**
- Compressed context summary for the current interaction
- Key facts to retain (user preferences, decisions made, concepts taught)
- What can be safely dropped from active context

**Key constraints:**
- Must preserve all user decisions and preferences
- Must preserve what has been taught (don't re-teach the same concept)
- Must preserve the emotional arc (if user expressed frustration earlier, acknowledge it)
- Must be aggressive about compression — build sessions can be long

---

### S5 — Safety & Scope Boundaries

**Purpose:** Handle edge cases where the user goes outside the platform's scope.

**Scenarios to handle:**
- User asks for help with something dangerous or harmful
- User asks questions that require professional advice (medical, legal, financial)
- User appears to be a child (adjust tone and content)
- User expresses frustration, distress, or self-criticism
- User tries to use the AI as a general chatbot outside the learning context
- User asks the AI to just "do it for me" (make the artifact without learning)

**Key constraints:**
- "Do it for me" requests must be redirected to guided assistance, never compliance
- Frustration must be met with empathy and practical help, not more teaching
- Professional advice requests must include appropriate disclaimers
- Must maintain learning focus without being rigid — brief tangents are fine, extended off-topic should be gently redirected

---

## Prompt Dependency Map

```
Onboarding Flow:
P0.1 → P0.2 → P0.3 → P0.4 (sequential, conversational)

Project Generation Flow:
P1.1 → P1.2 → [user selects] → P1.3 → P1.4 → P1.5 → P1.6

Per-Step Build Loop:
P2.1 → (P3.1 | P3.2 | P3.3 | P3.4 | P3.5 | P3.6 | P3.7)* → P4.1 → P4.2 → P4.3

Iteration Loop (after all steps):
P5.1 → P5.2 → P5.3 → [repeat if needed]

Completion Flow:
P6.1 → P6.2 → P6.3 → P7.1 → P7.2

Background/Async:
P8.* — triggered by events (XP award, level up, streak)
P9.* — triggered by time/inactivity
P10.* — triggered by portfolio/share actions

Always Active:
S1 (persona) — wraps every prompt
S2 (scaffolding) — updates continuously
S3 (domain) — invoked per interaction
S4 (memory) — manages context per session
S5 (safety) — guard rails on every interaction
```

---

## Total Prompt Count: 36

| Phase | Prompts | Type |
|-------|---------|------|
| Onboarding | 4 | Conversational + Extraction |
| Project Generation | 6 | Generative + Structured |
| Project Launch | 1 | Conversational |
| Build / Scaffolding | 7 | Real-time Conversational |
| Assessment | 3 | Evaluative + Structured |
| Iteration | 3 | Evaluative + Guidance |
| Completion | 3 | Celebratory + Structured |
| Progression | 2 | Generative + Narrative |
| Gamification | 4 | Micro-copy + Narrative |
| Notifications | 5 | Push/Email Copy |
| Portfolio | 2 | Generative Copy |
| System-Level | 5 | Foundation / Guard Rails |

---

*Document version: 1.0 — February 2026*
*Next step: Draft each prompt individually, test against example projects, iterate.*
