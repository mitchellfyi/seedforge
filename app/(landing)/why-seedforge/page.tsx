import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { auth } from "@/app/(auth)/auth";

export const metadata = {
  title: "Why Seedforge | Seedforge",
  description:
    "Seedforge isn't a course, a tool, or a tutor. It's an AI-powered workshop where you learn by building real things — grounded in constructionism and project-based learning.",
};

export default function WhySeedforgePage() {
  return (
    <div className="min-h-dvh bg-[#1A1A2E] text-white">
      {/* Nav */}
      <nav className="flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <Link href="/">
          <Image
            src="/brand/seedforge.png"
            alt="Seedforge"
            width={140}
            height={46}
            className="h-12 w-auto drop-shadow-[0_0_12px_rgba(212,146,42,0.3)]"
            priority
          />
        </Link>
        <Suspense fallback={<NavLinks isLoggedIn={false} />}>
          <AuthAwareNav />
        </Suspense>
      </nav>

      {/* Hero */}
      <section className="px-6 pt-16 pb-24">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
            Not a course. Not a tool. Not a tutor.
          </h1>
          <p className="text-lg md:text-xl text-foreground/60 max-w-2xl mx-auto leading-relaxed">
            Seedforge occupies a space no existing product fills — where AI
            project generation, scaffolded learning, and real artifact output
            come together.
          </p>
        </div>
      </section>

      {/* The Problem */}
      <section className="px-6 py-24 bg-gradient-to-b from-[#1A1A2E] to-[#1E3A2F]/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-2xl md:text-3xl font-bold text-foreground mb-4">
            Most learning products get it backwards
          </h2>
          <p className="text-center text-foreground/50 mb-16 max-w-xl mx-auto">
            Courses front-load lectures and leave projects for the end. AI tools
            do the work for you. Tutors test you with quizzes. None of them
            leave you holding something you made, with skills you didn&apos;t
            have before.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <ComparisonCard
              label="Not a course"
              versus="Coursera, Udemy, Skillshare"
              problem="Front-load lectures and leave projects for the end — if they include them at all. You watch, you memorise, you might eventually apply what you learned."
              seedforge="No curriculum. No syllabus. No lectures. You learn by building. The project IS the learning — introduced at the start, not the end."
            />
            <ComparisonCard
              label="Not a tool"
              versus="Canva, Replit, ChatGPT"
              problem="Do the work for you. They produce outputs without building skills. You get a result, but you don't grow."
              seedforge="Seedforge teaches you to do it yourself. You gain skills, not just outputs. The AI coaches — it doesn't create for you."
            />
            <ComparisonCard
              label="Not a tutor"
              versus="Khanmigo, Duolingo"
              problem="Test you on content with quizzes and drills. Learning is measured by scores, not by what you can make."
              seedforge="The artifact is the evidence of learning, not a quiz score. You prove understanding by building something real."
            />
            <ComparisonCard
              label="Not coding-only"
              versus="Codecademy AI Builder"
              problem="The only similar product is limited to a single domain and gated behind a subscription."
              seedforge="Learn anything by making anything — graphic design, history, biology, business strategy, creative writing, data analysis. The platform is domain-agnostic."
            />
          </div>
        </div>
      </section>

      {/* Built on Research */}
      <section className="px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-2xl md:text-3xl font-bold text-foreground mb-4">
            Built on decades of research
          </h2>
          <p className="text-center text-foreground/50 mb-16 max-w-lg mx-auto">
            Seedforge sits at the intersection of two well-established
            pedagogical frameworks, enhanced by AI.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <ResearchCard
              title="Constructionism"
              origin="Seymour Papert, MIT"
              description="Learning is most powerful when you design and build personally meaningful, shareable artifacts. The artifact is an 'object to think with' — making ideas tangible sharpens them."
            />
            <ResearchCard
              title="Project-Based Learning"
              origin="Research-backed framework"
              description="The project drives the learning, not the other way around. Introduced at the beginning — not as an afterthought. You learn and practice skills in order to complete it."
            />
            <ResearchCard
              title="The Bloom&apos;s Flip"
              origin="The critical mechanism"
              description="Traditional education goes bottom-up: memorise, then apply, then create. PBL inverts it — you start creating, and pull in knowledge as you need it."
            />
          </div>

          <div className="mt-12 rounded-xl bg-white/5 border border-white/5 p-8 text-center">
            <p className="text-foreground/70 text-lg italic">
              You don&apos;t memorise colour theory then apply it. You start
              designing something, hit a moment where colour choices matter, and
              learn colour theory at that exact moment of relevance.
            </p>
          </div>
        </div>
      </section>

      {/* What You Get */}
      <section className="px-6 py-24 bg-gradient-to-b from-[#1A1A2E] to-[#1E3A2F]/20">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-2xl md:text-3xl font-bold text-foreground mb-16">
            What Seedforge actually gives you
          </h2>

          <div className="space-y-10">
            <BenefitRow
              number="1"
              title="A real project, not a lecture"
              description="Tell the AI what you want to learn. It generates a personalised project with a tangible artifact outcome — scoped to your level and interests."
            />
            <BenefitRow
              number="2"
              title="Teaching woven into making"
              description="Concepts are delivered just-in-time, at the exact moment they become relevant to what you're building. No front-loaded theory."
            />
            <BenefitRow
              number="3"
              title="An artifact you're proud of"
              description="A PDF guide, SVG files, a website, a presentation — something real you can use, share, or put in your portfolio."
            />
            <BenefitRow
              number="4"
              title="Skills that transfer"
              description="The platform tracks skills across domains. Colour theory learned in a poster project applies to web design. Research skills from a field guide transfer to market analysis."
            />
            <BenefitRow
              number="5"
              title="A garden that grows with you"
              description="Every completed project plants something in your garden — a living, visual record of everything you've learned and made."
            />
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
            See the difference for yourself
          </h2>
          <p className="text-foreground/50 mb-8">
            Pick something you want to learn. Build something real. Keep the
            skills.
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

      {/* Footer */}
      <Footer />
    </div>
  );
}

async function AuthAwareNav() {
  const session = await auth();
  return <NavLinks isLoggedIn={!!session?.user} />;
}

function NavLinks({ isLoggedIn }: { isLoggedIn: boolean }) {
  if (isLoggedIn) {
    return (
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard"
          className="px-4 py-2 text-sm font-medium rounded-lg bg-primary hover:bg-primary/80 text-primary-foreground transition-colors"
        >
          Go to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Link
        href="/how-it-works"
        className="px-3 py-2 text-sm text-foreground/60 hover:text-foreground transition-colors hidden md:block"
      >
        How it works
      </Link>
      <Link
        href="/the-garden"
        className="px-3 py-2 text-sm text-foreground/60 hover:text-foreground transition-colors hidden md:block"
      >
        The Garden
      </Link>
      <Link
        href="/why-seedforge"
        className="px-3 py-2 text-sm text-foreground/60 hover:text-foreground transition-colors hidden md:block"
      >
        Why Seedforge
      </Link>
      <Link
        href="/login"
        className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
      >
        Log in
      </Link>
      <Link
        href="/register"
        className="px-4 py-2 text-sm font-medium rounded-lg bg-primary hover:bg-primary/80 text-primary-foreground transition-colors"
      >
        Sign up
      </Link>
    </div>
  );
}

function Footer() {
  return (
    <footer className="px-6 py-12 border-t border-white/5">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="text-sm font-semibold text-foreground/60 mb-3">
              Product
            </h4>
            <div className="flex flex-col gap-2">
              <Link
                href="/how-it-works"
                className="text-sm text-foreground/40 hover:text-foreground/70 transition-colors"
              >
                How it works
              </Link>
              <Link
                href="/the-garden"
                className="text-sm text-foreground/40 hover:text-foreground/70 transition-colors"
              >
                The Garden
              </Link>
              <Link
                href="/why-seedforge"
                className="text-sm text-foreground/40 hover:text-foreground/70 transition-colors"
              >
                Why Seedforge
              </Link>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground/60 mb-3">
              Get started
            </h4>
            <div className="flex flex-col gap-2">
              <Link
                href="/register"
                className="text-sm text-foreground/40 hover:text-foreground/70 transition-colors"
              >
                Sign up free
              </Link>
              <Link
                href="/login"
                className="text-sm text-foreground/40 hover:text-foreground/70 transition-colors"
              >
                Log in
              </Link>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between text-foreground/30 text-sm pt-8 border-t border-white/5">
          <span>Seedforge</span>
          <span>Forge what you learn.</span>
        </div>
      </div>
    </footer>
  );
}

function ComparisonCard({
  label,
  versus,
  problem,
  seedforge,
}: {
  label: string;
  versus: string;
  problem: string;
  seedforge: string;
}) {
  return (
    <div className="rounded-xl bg-white/5 border border-white/5 p-6">
      <h3 className="text-lg font-bold text-foreground mb-1">{label}</h3>
      <p className="text-xs text-foreground/30 mb-4">vs {versus}</p>
      <div className="space-y-3">
        <div>
          <p className="text-xs font-medium text-foreground/40 mb-1">
            The problem
          </p>
          <p className="text-sm text-foreground/50 leading-relaxed">
            {problem}
          </p>
        </div>
        <div className="pt-3 border-t border-white/5">
          <p className="text-xs font-medium text-[#4CAF50] mb-1">
            Seedforge instead
          </p>
          <p className="text-sm text-foreground/70 leading-relaxed">
            {seedforge}
          </p>
        </div>
      </div>
    </div>
  );
}

function ResearchCard({
  title,
  origin,
  description,
}: { title: string; origin: string; description: string }) {
  return (
    <div className="rounded-xl bg-white/5 border border-white/5 p-6">
      <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
      <p className="text-xs text-[#E8A83E] mb-3">{origin}</p>
      <p className="text-sm text-foreground/50 leading-relaxed">
        {description}
      </p>
    </div>
  );
}

function BenefitRow({
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
