# Seedwork — Gamification Design

> Seedwork's gamification is themed around **growth, cultivation, and nature**. Where Habitica turns tasks into RPG combat, Seedwork turns learning into tending a garden. You plant seeds of curiosity, nurture them through projects, and watch your garden — and your character — flourish. The metaphor is baked into every mechanic.

---

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Core Currencies](#core-currencies)
3. [The Character — Your Grower](#the-character--your-grower)
4. [The Garden — Your Living Portfolio](#the-garden--your-living-portfolio)
5. [Levelling System](#levelling-system)
6. [Class System — Grower Archetypes](#class-system--grower-archetypes)
7. [Streaks & Seasons](#streaks--seasons)
8. [Companions — Seedlings & Creatures](#companions--seedlings--creatures)
9. [Equipment & Tools](#equipment--tools)
10. [Achievements & Milestones](#achievements--milestones)
11. [Quests — Learning Expeditions](#quests--learning-expeditions)
12. [Social & Community](#social--community)
13. [The Shop — The Potting Shed](#the-potting-shed)
14. [Consequence Mechanics](#consequence-mechanics)
15. [Seasonal Events](#seasonal-events)
16. [XP & Reward Formulas](#xp--reward-formulas)
17. [Anti-Gaming Safeguards](#anti-gaming-safeguards)
18. [Implementation Priority](#implementation-priority)

---

## Design Philosophy

### What we borrow from Habitica
- **Avatar as emotional anchor** — your character represents your learning self, creating personal investment
- **Multiple currencies** — different reward types serve different motivational drives
- **Collection mechanics** — pets/mounts/gear create "one more thing" compulsion loops
- **Class system** — different play styles for different personalities
- **Progressive unlocking** — features reveal over time to avoid overwhelming new users
- **No public leaderboards** — focus on personal growth, not competition (Habitica deliberately avoids these)
- **Consequences for inactivity** — gentle stakes that make progress feel real

### What we do differently
- **Learning IS the game mechanic** — in Habitica you self-report task completion (and can cheat). In Seedwork, the AI verifies learning through artifact assessment. You can't fake it.
- **Artifacts ARE the rewards** — the real thing you made is the primary reward. Gamification amplifies it, never replaces it.
- **Growth metaphor, not combat** — nurturing a garden, not killing monsters. This broadens appeal beyond gamers.
- **Skill-weighted rewards** — harder skills and deeper learning earn more. Quality matters, not just quantity.
- **Cross-domain connections are celebrated** — linking skills across projects is a first-class achievement.

### Core Principle
> The gamification should make learning feel more rewarding, never more stressful. If a mechanic creates anxiety, guilt, or rush-to-complete behaviour, it's wrong and should be removed.

---

## Core Currencies

Seedwork uses four currencies, each serving a distinct psychological purpose.

### 🌱 Growth Points (GP) — *Primary XP*

**What they are:** Experience points earned by learning. The main progression currency.

**How you earn them:**
| Action | GP Earned |
|--------|-----------|
| Complete a project step | 30–80 (scaled by difficulty) |
| Pass a checkpoint on first attempt | +20 bonus |
| Complete a full project | 100–300 (scaled by project scope) |
| Quality bonus (artifact exceeds expectations) | +25% of step GP |
| Reflective checkpoint answered well | 15–30 |
| Revision that shows genuine improvement | 20–40 |
| Cross-domain skill connection unlocked | 50 |
| Daily learning activity (any progress) | 10 |
| Streak bonus (multiplier applied to all GP) | See Streaks section |

**What they do:** Accumulate toward level-ups. Your total GP represents your overall learning journey.

**Display:** Progress bar at the top of the screen, always visible. Shows current GP / GP needed for next level.

---

### 🪙 Seeds — *Spendable Currency*

**What they are:** Currency earned through learning, spent in the Potting Shed on cosmetic items, tools, and companions.

**How you earn them:**
| Action | Seeds Earned |
|--------|-------------|
| Complete a project step | 5–15 |
| Complete a full project | 30–60 |
| Achieve a streak milestone (7, 14, 30 days) | 25, 50, 100 |
| Earn an achievement | 10–50 (varies) |
| Level up | 20 |
| Complete a quest (learning expedition) | 40–80 |
| Random drops from step completion | 1–5 (chance-based) |

**What they're spent on:** Character cosmetics, garden decorations, companion eggs/food, tool skins, custom garden themes.

**Design note:** Seeds are intentionally abundant. The shop should feel generous, not grindy. The goal is delight, not monetisation pressure.

---

### 💧 Vitality — *Health/Energy*

**What it is:** Represents your learning momentum. Starts full (100). Decreases when you neglect your garden (miss daily learning). Increases when you're active.

**How it works:**
- Starts at 100 for new users
- Each day you make learning progress: +5 Vitality (capped at 100)
- Each day you skip (after committing to a project): -10 Vitality
- Completing a project: full restore to 100
- Vitality below 50: your garden starts showing visual wilting
- Vitality below 20: your companion looks sad, garden is noticeably overgrown
- Vitality hits 0: your garden goes dormant (not dead — dormant). All progress is preserved but the visual state communicates neglect.

**Recovery:**
- Any learning activity immediately starts recovery (+15 on first action after absence)
- A full project step completion restores +25
- Vitality is NEVER permanently lost — there is no "death" mechanic

**Design note:** Unlike Habitica's HP loss which can result in character death and gold/XP loss, Seedwork's Vitality is purely visual and emotional. You never lose progress. The wilting garden is a gentle guilt nudge, not a punishment. The moment you come back, recovery begins.

---

### ✨ Pollen — *Premium/Rare Currency*

**What it is:** Rare currency for special items. Earned only through significant accomplishments, never through grinding.

**How you earn it:**
| Action | Pollen Earned |
|--------|-------------|
| Complete your first project | 10 |
| Reach level milestones (10, 25, 50, 100) | 5, 10, 15, 25 |
| Earn a rare achievement | 5–15 |
| 30-day streak | 10 |
| 100-day streak | 25 |
| Complete a learning expedition (quest) | 5–10 |
| Seasonal event completion | 10 |

**What it's spent on:** Rare companion variants, exclusive garden decorations, special tool skins, seasonal items. Nothing gameplay-affecting — purely cosmetic and collectible.

**Design note:** This is the equivalent of Habitica's Gems. In a free product, Pollen is earned-only. If we add a subscription tier, subscribers could receive a monthly Pollen allowance, but it should NEVER be required.

---

## The Character — Your Grower

### Avatar Creation

On first launch, users create their **Grower** — a character avatar that represents them in Seedwork.

**Customisation options:**
- **Body type & skin tone** — inclusive range (following Habitica's approach)
- **Hair style & colour** — broad selection including natural and fantasy colours
- **Face features** — eyes, expressions, glasses, freckles, scars
- **Clothing** — starts with basic gardening outfit, unlockable wardrobe expands
- **Accessories** — hats, gloves, aprons, bags, scarves
- **Mobility aids** — wheelchairs, canes, prosthetics (following Habitica's inclusivity)

**Art style:** Warm, illustrated, slightly stylised — NOT pixel art (distinguishes from Habitica). Think Stardew Valley meets a modern illustration style. Detailed enough to feel personal, simple enough to render everywhere.

### Avatar Display

The Grower appears:
- In the top-left of the main interface (small, always visible)
- In the Garden view (full-body, interacting with their garden)
- In the Portfolio/Showcase (representing the learner)
- In achievement/level-up celebrations (animated)
- On completed artifacts as a maker's mark (optional)

### Avatar Growth

The Grower visually evolves as you level:
- **Levels 1–10:** Simple clothing, small watering can, a few plants around them
- **Levels 11–25:** Better tools, richer clothing, companion at their side
- **Levels 26–50:** Professional-looking gear, flourishing garden backdrop, multiple companions
- **Levels 51–100:** Master craftsperson aesthetic, legendary tools, lush environment
- **Level 100+:** Prestige appearance, golden accents, ancient tree in background

---

## The Garden — Your Living Portfolio

This is the centrepiece visual that replaces Habitica's battle/quest screen. Your Garden is a living, growing visual representation of everything you've learned.

### How it works

Every completed project plants something in your garden:
- **Short projects (< 1 hour):** Plant a flower
- **Medium projects (1–3 hours):** Plant a bush or herb
- **Long projects (3+ hours):** Plant a tree

Each plant is **themed to the domain** of the project:
- Graphic design project → a vivid, colourful flower (e.g., a painted dahlia)
- Coding project → a geometric, crystalline plant
- Writing project → a bookish tree with page-like leaves
- Science/knowledge project → a bioluminescent mushroom or fern
- Craft project → a textile-flower with fabric petals
- Music project → a flower that appears to hum or vibrate

### Garden growth over time

Plants don't appear fully grown. They grow in stages:
1. **Planted** — a small sprout appears when you start the project
2. **Growing** — the sprout develops as you complete steps
3. **Blooming** — the plant reaches full size when the project is complete
4. **Flourishing** — if you revisited or iterated on the project, extra detail/flowers appear
5. **Legacy** — projects completed 6+ months ago develop a mature, ancient quality

### Garden layout

- Users can **arrange** their garden however they like (drag and drop)
- **Paths** form between related plants (projects that share skills)
- **Regions** emerge naturally: a cluster of design flowers, a grove of coding trees
- **Seasonal appearance** changes with real-world seasons (snow in winter, blossoms in spring)
- **Weather** reflects your recent activity: sunny if active, overcast if slowing, rain if returning from absence (rain = recovery, positive framing)

### The Garden as portfolio

When you share your profile, people see your Garden. Each plant is clickable, revealing the artifact you made and the skills you learned. The Garden IS the portfolio — it's just beautiful.

---

## Levelling System

### Level Curve

Growth Points (GP) needed per level. The curve is gentle early (quick wins), steepens in the middle, then softens again at higher levels to avoid plateau frustration.

| Level Range | GP Per Level | Approximate Projects to Level Up |
|-------------|-------------|----------------------------------|
| 1–5 | 100 | ~1 short project per level |
| 6–10 | 200 | ~1 medium project per level |
| 11–20 | 350 | ~1–2 projects per level |
| 21–35 | 500 | ~2 projects per level |
| 36–50 | 650 | ~2–3 projects per level |
| 51–75 | 800 | ~3 projects per level |
| 76–100 | 1000 | ~3–4 projects per level |
| 100+ | 1000 (flat) | Prestige levels, no cap |

### Level Titles

Each level range earns a title that reflects growth:

| Level | Title |
|-------|-------|
| 1–5 | Seedling |
| 6–10 | Sprout |
| 11–20 | Sapling |
| 21–35 | Grower |
| 36–50 | Cultivator |
| 51–75 | Gardener |
| 76–100 | Steward |
| 100+ | Keeper |

### What unlocks at each milestone

| Level | Unlock |
|-------|--------|
| 1 | Basic avatar, first project, garden plot |
| 3 | Companion egg slot (first companion) |
| 5 | Garden customisation (rearrange plants) |
| 8 | Custom rewards (define your own real-life rewards to buy with Seeds) |
| 10 | **Class selection** (choose your Grower archetype) |
| 15 | Garden paths and regions visible |
| 20 | Learning Expeditions (quests) unlocked |
| 25 | Second companion slot |
| 30 | Garden weather effects |
| 40 | Profile sharing / public showcase |
| 50 | Mentoring ability (help newer growers) |
| 75 | Legacy garden features (aged plant aesthetics) |
| 100 | Prestige mode + Keeper title + golden garden accents |

---

## Class System — Grower Archetypes

Unlocked at **Level 10**, just like Habitica. Each archetype reflects a different learning style and grants different bonuses. Users can change archetype once per month.

### 🌿 The Naturalist

> *"I learn by exploring and wondering."*

**Learning style:** Curiosity-driven, broad, loves variety
**Bonuses:**
- +15% GP from first-time skills (learning something entirely new)
- +10% chance of rare companion drops
- "Surprise Me" projects generate especially creative options
- Cross-domain skill connections give double GP

**Visual flavour:** Wild, lush garden. Overgrown but beautiful. Companion tends to be an unusual creature.

**Best for:** Users who love jumping between topics and exploring broadly.

---

### 🔬 The Analyst

> *"I learn by understanding deeply."*

**Learning style:** Methodical, thorough, loves mastery
**Bonuses:**
- +15% GP from checkpoint assessments (rewarded for deep understanding)
- +10% GP from revision cycles (rewarded for iterating)
- Detailed skill breakdowns visible in the Learner Model
- "Need to Know" maps show extra depth layers

**Visual flavour:** Orderly, precise garden. Geometric layouts, labelled plants, a greenhouse visible. Companion tends to be studious (owl, fox).

**Best for:** Users who prefer to go deep in one domain before branching out.

---

### 🎨 The Maker

> *"I learn by building things."*

**Learning style:** Hands-on, artifact-focused, loves creating
**Bonuses:**
- +15% GP from artifact quality bonuses (rewarded for craft)
- +10% Seeds from project completion (rewarded for finishing)
- Artifacts in portfolio get bonus visual flair
- Garden plants from completed projects grow slightly larger

**Visual flavour:** Workshop-garden hybrid. Potting bench, tools visible, a kiln or forge in the background. Companion tends to be industrious (beaver, ant, bee).

**Best for:** Users who are motivated by the finished product above all else.

---

### 🌱 The Nurturer

> *"I learn by helping things grow."*

**Learning style:** Patient, steady, loves consistency
**Bonuses:**
- +15% GP from streak bonuses (rewarded for consistency)
- Vitality drains 50% slower during inactive periods
- Companions grow and evolve faster
- Garden plants are more resilient (slower wilting)

**Visual flavour:** Cosy, gentle garden. Water features, bird feeders, soft lighting. Companion tends to be warm (rabbit, deer, hedgehog).

**Best for:** Users who value routine and steady daily progress over intense bursts.

---

## Streaks & Seasons

### Learning Streaks

A streak counts consecutive days where the user makes **any meaningful learning progress**. "Meaningful" is defined as:
- Completing at least one project step
- Passing a checkpoint
- Completing a reflection
- Spending at least 10 minutes actively working on a project (not idle)

**Streak rewards:**

| Streak Length | Reward |
|--------------|--------|
| 3 days | +10% GP multiplier |
| 7 days | +15% GP multiplier + 25 Seeds |
| 14 days | +20% GP multiplier + 50 Seeds + streak badge |
| 30 days | +25% GP multiplier + 100 Seeds + 10 Pollen + rare companion egg |
| 60 days | +30% GP multiplier + 200 Seeds + 15 Pollen + garden decoration |
| 100 days | +35% GP multiplier + 500 Seeds + 25 Pollen + legendary companion egg + title "Century Grower" |
| 365 days | +40% GP multiplier + 1000 Seeds + 50 Pollen + unique garden biome + title "Perennial" |

**Streak multiplier:** Applied to ALL GP earned that day. This is the primary incentive for consistency.

**Streak freezes:** Users get 2 free "frost" tokens per month. Using a frost token preserves your streak for one day of inactivity. Additional frost tokens can be purchased with Seeds (not Pollen). This prevents streak anxiety from ruining holidays, sick days, etc.

**Streak recovery:** If a streak breaks, it doesn't reset to zero. Instead, it enters a "regrowth" period:
- Days 1–3 after break: streak shows as "regrowing" with a smaller plant icon
- After 3 consecutive active days: streak resumes at 50% of its previous length (rounded down)
- This prevents the devastating "I lost my 45-day streak, why bother" effect

### Seasons (Long-term Arcs)

A **Season** is a 90-day period (roughly matching real-world seasons). Each season has:
- A theme (e.g., "Season of Colour" with design-focused bonus projects)
- A seasonal quest line (see Quests section)
- Limited-edition garden decorations and companion variants
- A seasonal goal (e.g., "Complete 5 projects this season" or "Learn 3 new skills")
- A seasonal reward for completion (unique garden biome, avatar cosmetic, rare companion)

Seasons create a rhythm. Even long-term users always have something to work toward.

---

## Companions — Seedlings & Creatures

The equivalent of Habitica's pet system. Companions are small creatures that accompany your Grower.

### How you get them

**Eggs** drop randomly from completing project steps and checkpoints. Drop rate: ~10% per step, increased for Naturalist class.

**Egg types** are themed by learning domain:
| Domain | Egg Type | Creature Examples |
|--------|----------|-------------------|
| Design & Art | Prism Egg | Chameleon, butterfly, peacock |
| Code & Tech | Circuit Egg | Fox (clever), octopus, spider |
| Writing & Language | Ink Egg | Owl, raven, cat |
| Science & Knowledge | Fossil Egg | Tortoise, frog, beetle |
| Craft & Making | Clay Egg | Beaver, bee, hedgehog |
| Music & Performance | Chime Egg | Songbird, cricket, whale |
| Business & Strategy | Den Egg | Wolf, ant colony, hawk |
| General / Cross-domain | Wild Egg | Any creature (random) |

### Hatching

Eggs require a **Growth Potion** to hatch. Growth Potions also drop randomly or can be bought with Seeds.

**Potion types** determine the variant:
| Potion | Variant Style |
|--------|--------------|
| Spring Water | Base / natural colours |
| Sunlight | Golden / warm tones |
| Moonlight | Silver / cool tones |
| Compost | Earthy / rich tones |
| Wildflower | Multicoloured / vibrant |
| Frost | Icy / crystalline |
| Ember | Warm glow / fiery |
| Shadow | Dark / mysterious |
| Blossom | Pink / floral |
| Starlight | Cosmic / glowing (rare) |

**Combinations matter:** Each egg + potion combination creates a unique visual variant. With 8 egg types × 10 potions = **80 base companions** to collect. Rare potions (Starlight) create especially desirable variants.

### Feeding & Evolution

Companions can be **fed** with food items (also random drops or purchasable with Seeds).

**Food types:**
- Berries, Nectar, Roots, Grains, Dewdrops, Mushrooms, Petals, Honey

**Feeding stages:**
1. **Hatchling** — small, cute, sits on your shoulder in the avatar
2. **Juvenile** — larger, more detailed, walks beside you
3. **Adult** — full-sized, distinctive appearance, has its own animations
4. **Elder** — after 30+ days as an adult: aged, wise appearance, unique visual effects

**Evolution to Mount:** Once a companion reaches Adult stage, you can choose to evolve it into a **Mount** — a larger version your Grower rides in the garden view. The companion stays in your collection as both a companion and a mount version.

### Companion display
- **Active companion:** Shown next to your Grower at all times
- **Second slot:** Unlocked at level 25
- **Collection:** Full bestiary showing all discovered, hatched, and evolved companions
- **Completion tracking:** "42/80 companions discovered" creates collector motivation

---

## Equipment & Tools

Instead of swords and armour, Seedwork has **gardening tools and accessories** that your Grower equips.

### Tool Types

| Slot | Examples | Visual Effect |
|------|----------|---------------|
| Hand tool | Trowel → Pruning shears → Grafting knife → Golden secateurs | What your Grower holds |
| Watering | Watering can → Hose nozzle → Drip system → Crystal fountain | Visible in garden |
| Headwear | Sun hat → Bandana → Wide brim → Flower crown | On your Grower's head |
| Apron | Basic apron → Leather apron → Embroidered apron → Master's apron | On your Grower |
| Gloves | Cloth gloves → Leather gloves → Botanical gloves → Enchanted gloves | On your Grower's hands |
| Bag | Seed pouch → Satchel → Fieldwork backpack → Naturalist's chest | On your Grower's back |
| Footwear | Wellies → Hiking boots → Earthwalkers → Root-woven shoes | On your Grower |

### Tiers

Equipment comes in tiers, purchased with Seeds:

| Tier | Name | Seed Cost (avg) | Level Required |
|------|------|-----------------|----------------|
| 1 | Common | 20 | 1 |
| 2 | Sturdy | 50 | 10 |
| 3 | Quality | 100 | 25 |
| 4 | Fine | 200 | 40 |
| 5 | Master | 400 | 60 |
| 6 | Legendary | Pollen only | 80 |

### Stat bonuses

Equipment provides **minor** stat bonuses (emphasis on minor — this is cosmetic-primary):
- **Growth:** +% GP earned
- **Resilience:** Slower Vitality drain
- **Fortune:** +% chance of random drops (eggs, potions, food)
- **Craft:** +% Seeds earned

Each tool piece gives +1–5% in one stat. A full legendary set might give +15–20% total, which is nice but not game-breaking.

### Special / Seasonal equipment

Limited-edition tools available during seasonal events (e.g., "Harvest Festival Pruning Shears") or earned through quests. These have unique visual effects but identical stat ranges to prevent FOMO-based power imbalance.

---

## Achievements & Milestones

### Achievement Categories

**Journey Milestones:**
- 🌱 First Seed — Complete your first project
- 🌿 Growing Season — Complete 5 projects
- 🌳 Deep Roots — Complete 25 projects
- 🏡 Established Garden — Complete 50 projects
- 🌍 Botanical Garden — Complete 100 projects

**Skill Achievements:**
- 🔗 Cross-Pollination — Unlock your first cross-domain skill connection
- 🧬 Polymath — Have skills in 5+ different domains
- 📐 Master of [Domain] — Reach "advanced" level in any single domain
- 🔬 Renaissance Grower — Reach "developing" level in 10+ domains
- 🎓 True Mastery — Reach "mastered" level in any single skill

**Craft Achievements:**
- ✨ First Draft — Submit your first artifact draft
- 📝 Editor's Eye — Complete 10 revision cycles
- 💎 Polished — Receive a "exceeds expectations" quality assessment
- 🏆 Masterwork — Complete a project where every step passes on first attempt
- 📚 Library — Have 25+ artifacts in your portfolio

**Consistency Achievements:**
- 🔥 Kindling — Maintain a 7-day streak
- 🕯️ Steady Flame — Maintain a 30-day streak
- 🏔️ Eternal Flame — Maintain a 100-day streak
- 🌿 Perennial — Maintain a 365-day streak
- 🌅 Early Bird — Complete a project step before 8am (local time) 5 times
- 🌙 Night Owl — Complete a project step after 10pm (local time) 5 times

**Collection Achievements:**
- 🥚 First Hatch — Hatch your first companion
- 🐾 Menagerie — Collect 10 companions
- 🦋 Metamorphosis — Evolve a companion to mount stage
- 🌈 Full Spectrum — Collect one companion of every potion variant
- 🏛️ Curator — Have every plant type in your garden

**Hidden Achievements (discovered by doing, never listed):**
- 🌸 Night Bloom — Complete a project entirely between midnight and 6am
- 🎯 Bullseye — Get a perfect score on every checkpoint in a project
- 🔄 Phoenix — Return from a 30+ day absence and complete a project
- 🤝 Helping Hand — (future: help another user through a mentoring feature)
- 📖 Storyteller — Complete 3 projects that all share a connected theme

### Achievement display
- Shown on profile
- Notification + animation when earned
- Rarest achievements have special visual effects (glow, particle effects)

---

## Quests — Learning Expeditions

Unlocked at **Level 20**. Expeditions are multi-project quest lines that tell a story and guide learning across connected projects.

### Structure

An Expedition consists of:
- A narrative theme (e.g., "The Cartographer's Journey" — map-making, geography, design)
- 3–5 connected projects that build on each other
- A reward at the end (rare companion, unique garden feature, special title)
- A time limit (optional, typically 30–60 days)

### Example Expedition: "The Naturalist's Field Guide"

| Chapter | Project | Artifact | Skills |
|---------|---------|----------|--------|
| 1 | Observing Your World | Photo essay of local nature | Observation, photography basics, writing |
| 2 | Sketching From Life | Illustrated page of a local plant | Botanical drawing, anatomy, composition |
| 3 | Research & Classification | Species identification page | Research methodology, taxonomy, layout |
| 4 | Assembling the Guide | Complete field guide PDF | Document design, editing, synthesis |

**Completion reward:** "Field Naturalist" title + unique Fern companion (only available through this expedition) + Naturalist's Satchel (equipment)

### Expedition types
- **AI-generated:** Custom expeditions created based on the user's interests and skill gaps
- **Curated:** Hand-designed expedition narratives (higher quality, limited selection at launch)
- **Seasonal:** Special expeditions available only during certain seasons
- **Community:** (future) Expeditions created by advanced users for others

---

## Social & Community

### Greenhouses (equivalent to Habitica's Parties)

A **Greenhouse** is a small group (2–8 people) who learn together.

**Features:**
- Shared garden view that combines all members' plants
- Group expeditions (everyone works on connected projects)
- Accountability: members can see each other's streaks and recent activity
- Chat/messaging within the greenhouse
- **Greenhouse health:** the shared garden's visual health reflects the group's collective Vitality

### Allotments (equivalent to Habitica's Guilds)

An **Allotment** is a larger community (unlimited members) organised around a shared interest.

**Features:**
- Topic-focused (e.g., "Design Growers", "Code Garden", "Science Plots")
- Community challenges (e.g., "Everyone create a poster this week")
- Artifact gallery (members share completed work)
- Discussion space

### No leaderboards

Following Habitica's deliberate design choice: **no public leaderboards**. Progress is personal. The only comparative element is shared garden health in Greenhouses, which encourages collective accountability without individual ranking.

---

## The Potting Shed

The in-app shop where users spend Seeds and Pollen.

### Shop categories

**Avatar Cosmetics (Seeds):**
- Clothing items, hairstyles, accessories
- Seasonal outfits
- Custom colours

**Garden Decorations (Seeds):**
- Fences, benches, birdbaths, lanterns, pathways
- Water features, archways, statues
- Themed garden biomes (Japanese garden, wildflower meadow, tropical)

**Companions (Seeds + Pollen for rare):**
- Growth Potions for hatching
- Food for feeding
- Rare egg purchases (Pollen)

**Tools & Equipment (Seeds):**
- Tiered tools and gear
- Seasonal special editions

**Streak & Utility (Seeds):**
- Frost tokens (streak freeze)
- Garden restoration tonic (instant Vitality to 100)
- Companion name change token

**Custom Rewards (Seeds):**
- Users can define their own real-life rewards with a Seed price
- E.g., "Watch an episode of TV: 30 Seeds" or "Buy myself a coffee: 50 Seeds"
- This maps directly to Habitica's custom rewards system

---

## Consequence Mechanics

### What happens when you stop

Seedwork uses **visual consequences**, not mechanical punishment.

| Inactivity Period | Visual Effect | Mechanical Effect |
|-------------------|---------------|-------------------|
| 1 day missed | Garden slightly dimmer | -10 Vitality |
| 3 days missed | Some plants droop | -30 Vitality total |
| 7 days missed | Garden noticeably unkempt, companion looks concerned | -70 Vitality total |
| 14 days missed | Garden is overgrown, muted colours, companion is sleeping | Vitality at 0 (dormant) |
| 30+ days missed | Garden in "winter dormancy" — beautiful but frozen | Dormant (no further change) |

### What NEVER happens
- ❌ You never lose GP
- ❌ You never lose levels
- ❌ You never lose companions or equipment
- ❌ Your garden never dies — it goes dormant, never dead
- ❌ Artifacts are never deleted or degraded
- ❌ Streaks never fully reset (see streak recovery in Streaks section)

### What happens when you return

| Recovery Action | Effect |
|-----------------|--------|
| Open the app after absence | Companion wakes up, "welcome back" moment |
| Complete any project step | +15 Vitality, garden starts brightening |
| Complete a full project | Vitality restored to 100, garden fully recovers |
| 3 consecutive active days | Streak enters "regrowth" at 50% of previous |

The metaphor: your garden doesn't die. It's waiting for you. Everything you planted is still there. You just need to tend it again.

---

## Seasonal Events

Four major events per year, aligned with real seasons. Each runs for ~3 weeks.

### Spring: The Awakening
- Theme: New beginnings, fresh starts
- Special: Bonus GP for starting projects in new domains
- Limited items: Spring companion variants (Blossom potion), flower-themed equipment
- Event quest: "The First Garden" expedition

### Summer: The Festival of Making
- Theme: Productivity, creation, abundance
- Special: Double Seeds from project completion
- Limited items: Summer companion variants (Sunlight potion), festival outfits
- Event quest: Craft-focused expedition

### Autumn: The Harvest
- Theme: Reflection, gathering, wisdom
- Special: Bonus GP from revision cycles and reflective checkpoints
- Limited items: Autumn companion variants (Ember potion), harvest equipment
- Event quest: Knowledge-focused expedition

### Winter: The Deep Roots
- Theme: Depth, patience, inner growth
- Special: Bonus GP for going deep in a single domain (advanced skill work)
- Limited items: Winter companion variants (Frost potion), cosy outfits
- Event quest: Mastery-focused expedition

---

## XP & Reward Formulas

### GP Calculation per Step

```
base_gp = step.difficulty * 10    // difficulty: 3-8 scale
quality_bonus = base_gp * 0.25    // if assessment exceeds expectations
first_attempt_bonus = 20          // if checkpoint passed without revision
streak_multiplier = 1.0 + (streak_days * 0.005)  // +0.5% per streak day, capped at +40%
class_bonus = base_gp * 0.15     // if class bonus applies to this step type

total_gp = (base_gp + quality_bonus + first_attempt_bonus) * streak_multiplier + class_bonus
```

### Seeds Calculation per Step

```
base_seeds = floor(total_gp / 5)  // roughly 1 seed per 5 GP
random_drop = random(0, 5)        // chance-based bonus
class_bonus = base_seeds * 0.10   // if Maker class

total_seeds = base_seeds + random_drop + class_bonus
```

### Level-Up Threshold

```
gp_for_next_level = level_curve[current_level]

// Where level_curve follows the table in the Levelling section
// Simplified: gp_for_next_level = 100 + (current_level * 15) capped at 1000
```

---

## Anti-Gaming Safeguards

Habitica has a known weakness: users can self-report task completion and cheat. Seedwork addresses this structurally.

### Why cheating is hard in Seedwork

1. **AI verifies learning.** Step completion requires passing a checkpoint assessed by the AI. You can't just click "done." The AI evaluates the artifact and asks reflective questions.

2. **Artifacts are visible.** Your garden plants link to real artifacts. An empty or low-quality artifact is visible to you and (if shared) to others.

3. **Quality-weighted rewards.** Higher quality work earns more GP. Rushing through with minimal effort earns minimal rewards. The incentive is to do good work.

4. **Progressive skill expectations.** As the Learner Model records skill development, checkpoints get harder. You can't stay at beginner level forever.

5. **Time tracking.** Steps record time spent. A step that normally takes 20 minutes completed in 30 seconds won't earn full rewards.

### What we DON'T police

- We don't prevent users from moving quickly if they genuinely know the material
- We don't require minimum time per step (some people are fast)
- We don't punish mistakes or revisions (these earn GP too)
- We don't compare users against each other

---

## Implementation Priority

### Phase 1 — POC (Must Have)
- [ ] GP earning from step completion (simple: flat rate per step)
- [ ] Basic level system (levels 1–20, simple progress bar)
- [ ] Level titles (Seedling → Sprout → Sapling)
- [ ] Basic streak tracking (consecutive days counter, multiplier)
- [ ] Simple garden view (plant appears per completed project, static images)
- [ ] Basic avatar (minimal customisation, 1 outfit)

### Phase 2 — Core Gamification
- [ ] Full GP formula with quality bonuses and streak multipliers
- [ ] Complete level curve (1–100+)
- [ ] Class system (4 archetypes with bonuses)
- [ ] Seeds currency + The Potting Shed (basic shop)
- [ ] Companion system (eggs, hatching, feeding, evolution)
- [ ] Garden interaction (drag-and-drop arrangement, domain-themed plants)
- [ ] Vitality system with visual consequences
- [ ] Streak freezes and streak recovery
- [ ] Achievement system (first 20 achievements)

### Phase 3 — Full System
- [ ] Pollen currency + rare items
- [ ] Equipment/tool system with tiers and stats
- [ ] Learning Expeditions (quests)
- [ ] Seasonal events (4 per year)
- [ ] Greenhouses (group learning)
- [ ] Allotments (community)
- [ ] Full achievement set (50+ achievements including hidden)
- [ ] Garden weather and legacy plant states
- [ ] Companion elder evolution

---

*Document version: 1.0 — February 2026*
*Design principle: Every mechanic must make learning feel more rewarding. If it creates anxiety, remove it.*