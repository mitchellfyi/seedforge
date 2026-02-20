import Image from "next/image";
import Link from "next/link";
import { LandingNav, LandingFooter } from "@/components/landing/landing-nav";

export const metadata = {
  title: "How It Works | Seedforge",
  description:
    "Seedforge uses AI to generate personalised projects where you learn by building real things. See how the core loop, scaffolding, and workspace come together.",
};

export default function HowItWorksPage() {
  return (
    <div className="min-h-dvh bg-[#1A1A2E] text-white">
      <LandingNav />

      {/* Hero */}
      <section className="px-6 pt-16 pb-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Learning that starts with making
          </h1>
          <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed">
            Most education goes bottom-up: memorise, understand, apply, and
            eventually create something. Seedforge flips it. You start by
            building — and learn what you need along the way.
          </p>
        </div>
      </section>

      {/* The Core Loop */}
      <section className="px-6 py-24 bg-gradient-to-b from-[#1A1A2E] to-[#1E3A2F]/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-2xl md:text-3xl font-bold text-foreground mb-4">
            The core loop
          </h2>
          <p className="text-center text-foreground/50 mb-16 max-w-lg mx-auto">
            Every project follows the same cycle — one that&apos;s grounded in
            decades of learning research.
          </p>

          <div className="space-y-10">
            <StepRow
              number="1"
              title="Tell the AI what you want to learn or make"
              description="Say it however you want — 'I want to learn graphic design for my Cricut' or 'teach me about Victorian architecture' or just 'surprise me.'"
            />
            <StepRow
              number="2"
              title="Get a personalised project"
              description="The AI generates a real project with a tangible artifact outcome — something you'll actually make, not just read about."
            />
            <StepRow
              number="3"
              title="Build through scaffolded steps"
              description="Work through 5–12 guided steps. Each one teaches you something new while producing a visible portion of your artifact."
            />
            <StepRow
              number="4"
              title="Learn just-in-time"
              description="Concepts are taught at the exact moment they become relevant. You don't memorise colour theory then apply it — you learn it when your design needs it."
            />
            <StepRow
              number="5"
              title="Complete a real thing"
              description="Walk away with a finished artifact — a PDF guide, SVG files, a website, a presentation — something you can use, share, or be proud of."
            />
            <StepRow
              number="6"
              title="Reflect on what you learned"
              description="Review what you built, what challenged you, and what surprised you. The AI maps your newly acquired skills."
            />
            <StepRow
              number="7"
              title="See what's next"
              description="Based on what you just learned, the AI suggests your next project — building natural learning pathways from your own journey."
            />
          </div>
        </div>
      </section>

      {/* A Real Example */}
      <section className="px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-2xl md:text-3xl font-bold text-foreground mb-4">
            A real example
          </h2>
          <p className="text-center text-foreground/50 mb-16 max-w-lg mx-auto">
            Here&apos;s what a typical Seedforge session looks like.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-xl bg-white/5 border border-white/5 p-6">
              <div className="text-sm font-medium text-[#E8A83E] mb-2">
                You say
              </div>
              <p className="text-foreground/80 text-lg font-medium">
                &ldquo;I want to learn graphic design for my Cricut.&rdquo;
              </p>
            </div>
            <div className="rounded-xl bg-white/5 border border-white/5 p-6">
              <div className="text-sm font-medium text-[#4CAF50] mb-2">
                You get
              </div>
              <p className="text-foreground/80">
                A step-by-step project to design custom seasonal greeting cards
                — choosing palettes, learning type hierarchy, building layouts.
              </p>
            </div>
            <div className="rounded-xl bg-white/5 border border-white/5 p-6">
              <div className="text-sm font-medium text-[#81C784] mb-2">
                You leave with
              </div>
              <p className="text-foreground/80">
                Ready-to-cut SVG files, print-ready cards, and real skills in
                colour theory, typography, and vector editing you didn&apos;t
                have before.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Your AI Coach Adapts */}
      <section className="px-6 py-24 bg-gradient-to-b from-[#1A1A2E] to-[#1E3A2F]/20">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center text-2xl md:text-3xl font-bold text-foreground mb-4">
            Your AI coach adapts to you
          </h2>
          <p className="text-center text-foreground/50 mb-16 max-w-lg mx-auto">
            Scaffolding fades as your skills grow. The AI keeps you in the
            learning zone — challenged enough to grow, supported enough to
            succeed.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ScaffoldCard
              mode="Full Guidance"
              emoji="🗺️"
              when="Skill is brand new"
              description="Step-by-step walkthroughs with explanations, examples, and clear instructions."
            />
            <ScaffoldCard
              mode="Coached Practice"
              emoji="💬"
              when="You've seen the concept"
              description="Prompts and hints as you attempt application. Feedback on your attempts."
            />
            <ScaffoldCard
              mode="Light Touch"
              emoji="👀"
              when="You're building fluency"
              description="Occasional tips and stretch challenges. Intervenes only on significant errors."
            />
            <ScaffoldCard
              mode="Autonomous"
              emoji="🚀"
              when="You've got this"
              description="No scaffolding. You work independently. The AI monitors quietly and re-engages if needed."
            />
          </div>
        </div>
      </section>

      {/* The Workspace */}
      <section className="px-6 py-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center text-2xl md:text-3xl font-bold text-foreground mb-4">
            One workspace, many modes
          </h2>
          <p className="text-center text-foreground/50 mb-16 max-w-lg mx-auto">
            The workspace adapts its tools to what you&apos;re building. Three
            panes work together: your artifact in the centre, teaching on the
            right, progress on the left.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <WorkspaceCard
              mode="Writer"
              emoji="📝"
              description="Rich text editor for documents, guides, reports, and zines."
            />
            <WorkspaceCard
              mode="Canvas"
              emoji="🎨"
              description="Vector editor for posters, cards, SVGs, and illustrations."
            />
            <WorkspaceCard
              mode="Code"
              emoji="💻"
              description="Code editor with live preview for sites, apps, and scripts."
            />
            <WorkspaceCard
              mode="Slides"
              emoji="📊"
              description="Slide editor for decks and presentations."
            />
            <WorkspaceCard
              mode="Data"
              emoji="📈"
              description="Spreadsheet and chart builder for dashboards and analyses."
            />
            <WorkspaceCard
              mode="Composite"
              emoji="📖"
              description="Writer + Canvas combined for mixed-media artifacts like field guides."
            />
          </div>

          <div className="mt-12 rounded-xl bg-white/5 border border-white/5 p-8 text-center">
            <p className="text-foreground/70 text-lg italic">
              The artifact growing in front of you is the progress bar. No
              abstract XP counters — the thing you&apos;re making IS the reward.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-24">
        <div className="max-w-2xl mx-auto text-center">
          <Image
            src="/brand/seed_anvil.png"
            alt="Seedforge anvil"
            width={120}
            height={120}
            className="mx-auto mb-8 drop-shadow-[0_0_30px_rgba(212,146,42,0.3)]"
          />
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Ready to build something?
          </h2>
          <p className="text-foreground/50 mb-8">
            Pick something you want to learn. Seedforge gives you a real project
            to build.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/register"
              className="px-8 py-3 text-base font-semibold rounded-lg bg-primary hover:bg-[#E8A83E] text-primary-foreground transition-colors shadow-lg shadow-primary/25"
            >
              Start building — free
            </Link>
            <Link
              href="/api/auth/guest?redirectUrl=/dashboard"
              className="px-8 py-3 text-base font-medium rounded-lg border border-[#FFF8F0]/20 text-foreground/70 hover:text-foreground hover:border-[#FFF8F0]/40 transition-colors"
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

function StepRow({
  number,
  title,
  description,
}: { number: string; title: string; description: string }) {
  return (
    <div className="flex items-start gap-6">
      <div className="flex-none w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-[#E8A83E] font-bold text-sm">
        {number}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
        <p className="text-sm text-foreground/50 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

function ScaffoldCard({
  mode,
  emoji,
  when,
  description,
}: { mode: string; emoji: string; when: string; description: string }) {
  return (
    <div className="rounded-xl bg-white/5 border border-white/5 p-6">
      <div className="text-3xl mb-3">{emoji}</div>
      <h3 className="text-base font-semibold text-foreground mb-1">{mode}</h3>
      <p className="text-xs text-[#E8A83E] mb-2">{when}</p>
      <p className="text-sm text-foreground/50 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function WorkspaceCard({
  mode,
  emoji,
  description,
}: { mode: string; emoji: string; description: string }) {
  return (
    <div className="rounded-xl bg-white/5 border border-white/5 p-6 hover:bg-white/[0.07] transition-colors">
      <div className="text-2xl mb-3">{emoji}</div>
      <h3 className="text-base font-semibold text-foreground mb-1">{mode}</h3>
      <p className="text-sm text-foreground/50 leading-relaxed">
        {description}
      </p>
    </div>
  );
}
