import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { GardenDemoEmbed } from "@/components/garden-preview/garden-preview";
import { LandingFooter, LandingNav } from "@/components/landing/landing-nav";

export const metadata = {
  title: "The Garden | Seedforge",
  description:
    "Your Seedforge garden grows with every skill you gain. Collect companions, choose your class, maintain streaks, and watch your living portfolio flourish.",
};

export default function TheGardenPage() {
  return (
    <div className="min-h-dvh bg-[#1A1A2E] text-white">
      <LandingNav />

      {/* Hero */}
      <section className="px-6 pt-16 pb-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Your garden grows with every skill you gain
          </h1>
          <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed">
            Seedforge turns learning into tending a garden. You plant seeds of
            curiosity, nurture them through projects, and watch your garden
            flourish. No combat. No grinding. Just growth.
          </p>
        </div>
      </section>

      {/* Interactive Demo */}
      <section className="px-6 py-16 bg-gradient-to-b from-[#1A1A2E] to-[#1E3A2F]/30">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-block px-3 py-1 mb-4 text-xs font-medium rounded-full bg-[#E8A83E]/15 text-[#E8A83E] border border-[#E8A83E]/20">
              Interactive demo
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              See how your garden grows
            </h2>
          </div>
          <Suspense
            fallback={
              <div className="h-[500px] flex items-center justify-center text-foreground/40 text-sm">
                Loading garden demo...
              </div>
            }
          >
            <GardenDemoEmbed />
          </Suspense>
        </div>
      </section>

      {/* How Your Garden Grows */}
      <section className="px-6 py-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center text-2xl md:text-3xl font-bold text-foreground mb-4">
            Every project plants something
          </h2>
          <p className="text-center text-foreground/50 mb-16 max-w-lg mx-auto">
            Each completed project grows a plant in your garden — themed to the
            domain you explored.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <PlantCard
              description="Vivid, colourful flowers — painted dahlias and blooming palettes."
              domain="Design & Art"
              emoji="🌺"
            />
            <PlantCard
              description="Geometric, crystalline plants that shimmer with precision."
              domain="Code & Tech"
              emoji="💎"
            />
            <PlantCard
              description="Bookish trees with page-like leaves rustling with stories."
              domain="Writing & Language"
              emoji="📖"
            />
            <PlantCard
              description="Bioluminescent mushrooms and ferns glowing with discovery."
              domain="Science & Knowledge"
              emoji="🍄"
            />
            <PlantCard
              description="Textile-flowers with fabric petals — handmade and warm."
              domain="Craft & Making"
              emoji="🧵"
            />
            <PlantCard
              description="Flowers that hum and vibrate with rhythm and melody."
              domain="Music & Performance"
              emoji="🎵"
            />
          </div>

          <h3 className="text-center text-xl font-semibold text-foreground mb-8">
            Plants grow with you
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { stage: "Planted", desc: "A small sprout when you start" },
              { stage: "Growing", desc: "Develops as you complete steps" },
              { stage: "Blooming", desc: "Full size when you finish" },
              {
                stage: "Flourishing",
                desc: "Extra detail if you iterate",
              },
              {
                stage: "Legacy",
                desc: "Mature, ancient quality over time",
              },
            ].map((item) => (
              <div
                className="rounded-lg bg-white/5 border border-white/5 px-4 py-3 text-center"
                key={item.stage}
              >
                <div className="text-sm font-semibold text-[#4CAF50]">
                  {item.stage}
                </div>
                <div className="text-xs text-foreground/40 mt-1">
                  {item.desc}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 rounded-xl bg-white/5 border border-white/5 p-8 text-center">
            <p className="text-foreground/70 text-lg italic">
              Your garden IS your portfolio. Each plant is clickable, revealing
              the artifact you made and the skills you learned.
            </p>
          </div>
        </div>
      </section>

      {/* Four Ways to Grow */}
      <section className="px-6 py-24 bg-gradient-to-b from-[#1A1A2E] to-[#1E3A2F]/20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center text-2xl md:text-3xl font-bold text-foreground mb-4">
            Four ways to grow
          </h2>
          <p className="text-center text-foreground/50 mb-16 max-w-lg mx-auto">
            At level 10, choose a Grower archetype that matches how you learn.
            Each comes with unique bonuses and a distinct garden style.
          </p>

          <div className="grid sm:grid-cols-2 gap-6">
            <ClassCard
              bonus="Bonus XP from learning new skills and cross-domain connections"
              emoji="🌿"
              garden="Wild, lush, beautifully overgrown"
              name="The Naturalist"
              quote="I learn by exploring and wondering."
              style="Curiosity-driven, broad, loves variety"
            />
            <ClassCard
              bonus="Bonus XP from deep assessments and revision cycles"
              emoji="🔬"
              garden="Orderly, precise, with a greenhouse"
              name="The Analyst"
              quote="I learn by understanding deeply."
              style="Methodical, thorough, loves mastery"
            />
            <ClassCard
              bonus="Bonus XP from artifact quality and project completion"
              emoji="🎨"
              garden="Workshop-garden hybrid with a forge"
              name="The Maker"
              quote="I learn by building things."
              style="Hands-on, artifact-focused, loves creating"
            />
            <ClassCard
              bonus="Bonus XP from streaks. Companions grow faster."
              emoji="🌱"
              garden="Cosy, gentle, with water features"
              name="The Nurturer"
              quote="I learn by helping things grow."
              style="Patient, steady, loves consistency"
            />
          </div>
        </div>
      </section>

      {/* Companions */}
      <section className="px-6 py-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center text-2xl md:text-3xl font-bold text-foreground mb-4">
            Collect companions along the way
          </h2>
          <p className="text-center text-foreground/50 mb-16 max-w-lg mx-auto">
            Companion eggs drop as you learn. Hatch them with potions, feed them
            to grow, and watch them evolve. 80 unique creatures to discover.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <EggCard
              creatures="Chameleon, butterfly, peacock"
              domain="Design & Art"
              emoji="🌈"
              name="Prism Egg"
            />
            <EggCard
              creatures="Fox, octopus, spider"
              domain="Code & Tech"
              emoji="⚡"
              name="Circuit Egg"
            />
            <EggCard
              creatures="Owl, raven, cat"
              domain="Writing"
              emoji="🖋️"
              name="Ink Egg"
            />
            <EggCard
              creatures="Tortoise, frog, beetle"
              domain="Science"
              emoji="🦴"
              name="Fossil Egg"
            />
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {[
              {
                stage: "Hatchling",
                desc: "Small and cute, sits on your shoulder",
              },
              { stage: "Juvenile", desc: "Larger, walks beside you" },
              {
                stage: "Adult",
                desc: "Full-sized with unique animations",
              },
              {
                stage: "Elder",
                desc: "Aged and wise, with visual effects",
              },
            ].map((item) => (
              <div
                className="rounded-lg bg-white/5 border border-white/5 px-4 py-3 text-center"
                key={item.stage}
              >
                <div className="text-sm font-semibold text-[#E8A83E]">
                  {item.stage}
                </div>
                <div className="text-xs text-foreground/40 mt-1">
                  {item.desc}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Streaks That Never Punish */}
      <section className="px-6 py-24 bg-gradient-to-b from-[#1A1A2E] to-[#1E3A2F]/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-2xl md:text-3xl font-bold text-foreground mb-4">
            Streaks that never punish
          </h2>
          <p className="text-center text-foreground/50 mb-16 max-w-lg mx-auto">
            Consistency is rewarded, but life happens. Seedforge is designed to
            welcome you back, not guilt you for leaving.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground">
                What happens when you&apos;re away
              </h3>
              <div className="space-y-4">
                <NeverCard text="Your garden goes dormant — not dead. Visual only." />
                <NeverCard text="You never lose Growth Points or levels." />
                <NeverCard text="You never lose companions or equipment." />
                <NeverCard text="Artifacts are never deleted or degraded." />
                <NeverCard text="Streaks never fully reset." />
              </div>
            </div>
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-foreground">
                What happens when you return
              </h3>
              <div className="space-y-4">
                <ReturnCard text="Your companion wakes up with a welcome-back moment." />
                <ReturnCard text="Any project step starts restoring your garden." />
                <ReturnCard text="3 active days brings your streak to 50% of its previous length." />
                <ReturnCard text="Frost tokens let you freeze streaks for holidays or sick days." />
              </div>
            </div>
          </div>

          <div className="mt-12 rounded-xl bg-white/5 border border-white/5 p-8 text-center">
            <p className="text-foreground/70 text-lg italic">
              Your garden doesn&apos;t die. It&apos;s waiting for you.
              Everything you planted is still there. You just need to tend it
              again.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24">
        <div className="max-w-2xl mx-auto text-center">
          <Image
            alt="Seedforge anvil"
            className="mx-auto mb-8 drop-shadow-[0_0_30px_rgba(212,146,42,0.3)]"
            height={120}
            src="/brand/seed_anvil.png"
            width={120}
          />
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Start growing your garden
          </h2>
          <p className="text-foreground/50 mb-8">
            Every skill starts as a seed. Plant your first one today.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              className="px-8 py-3 text-base font-semibold rounded-lg bg-primary hover:bg-[#E8A83E] text-primary-foreground transition-colors shadow-lg shadow-primary/25"
              href="/register"
            >
              Start building — free
            </Link>
            <Link
              className="px-8 py-3 text-base font-medium rounded-lg border border-[#FFF8F0]/20 text-foreground/70 hover:text-foreground hover:border-[#FFF8F0]/40 transition-colors"
              href="/api/auth/guest?redirectUrl=/dashboard"
            >
              Try as guest
            </Link>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}

function PlantCard({
  emoji,
  domain,
  description,
}: {
  emoji: string;
  domain: string;
  description: string;
}) {
  return (
    <div className="rounded-xl bg-white/5 border border-white/5 p-6 hover:bg-white/[0.07] transition-colors">
      <div className="text-3xl mb-3">{emoji}</div>
      <h3 className="text-base font-semibold text-foreground mb-1">{domain}</h3>
      <p className="text-sm text-foreground/50 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function ClassCard({
  emoji,
  name,
  quote,
  style,
  bonus,
  garden,
}: {
  emoji: string;
  name: string;
  quote: string;
  style: string;
  bonus: string;
  garden: string;
}) {
  return (
    <div className="rounded-xl bg-white/5 border border-white/5 p-6">
      <div className="text-3xl mb-3">{emoji}</div>
      <h3 className="text-lg font-semibold text-foreground mb-1">{name}</h3>
      <p className="text-sm text-foreground/60 italic mb-3">
        &ldquo;{quote}&rdquo;
      </p>
      <div className="space-y-2 text-sm text-foreground/50">
        <p>
          <span className="text-foreground/70 font-medium">Style:</span> {style}
        </p>
        <p>
          <span className="text-foreground/70 font-medium">Bonus:</span> {bonus}
        </p>
        <p>
          <span className="text-foreground/70 font-medium">Garden:</span>{" "}
          {garden}
        </p>
      </div>
    </div>
  );
}

function EggCard({
  emoji,
  name,
  domain,
  creatures,
}: {
  emoji: string;
  name: string;
  domain: string;
  creatures: string;
}) {
  return (
    <div className="rounded-xl bg-white/5 border border-white/5 p-5 text-center">
      <div className="text-2xl mb-2">{emoji}</div>
      <h3 className="text-sm font-semibold text-foreground">{name}</h3>
      <p className="text-xs text-foreground/40 mt-1">{domain}</p>
      <p className="text-xs text-foreground/50 mt-2">{creatures}</p>
    </div>
  );
}

function NeverCard({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-[#4CAF50] mt-0.5 flex-none">&#10003;</span>
      <p className="text-sm text-foreground/60">{text}</p>
    </div>
  );
}

function ReturnCard({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-[#E8A83E] mt-0.5 flex-none">&rarr;</span>
      <p className="text-sm text-foreground/60">{text}</p>
    </div>
  );
}
