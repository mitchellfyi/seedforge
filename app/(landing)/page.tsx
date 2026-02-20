import Image from "next/image";
import Link from "next/link";
import { SeedforgeHeroScene } from "@/components/SeedforgeHeroScene";
import { LandingNav, LandingFooter } from "@/components/landing/landing-nav";

export default function LandingPage() {
  return (
    <div className="min-h-dvh bg-[#1A1A2E] text-white overflow-hidden">
      <LandingNav position="absolute" />

      {/* Animated Hero Scene */}
      <SeedforgeHeroScene>
        <div className="absolute bottom-0 left-0 right-0 z-30 flex flex-col items-center text-center px-6">
          <p className="text-xl md:text-2xl text-foreground/90 max-w-xl mt-12 mb-2 font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            Learn by building real things.
          </p>
          <p className="text-foreground/60 max-w-lg mb-6 text-sm md:text-base leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
            An AI-powered workshop where curiosity meets craft. Pick a project,
            learn as you build, and watch your skills grow — one seed at a time.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Link
              href="/register"
              className="px-8 py-3 text-base font-semibold rounded-lg bg-primary hover:bg-[#E8A83E] text-primary-foreground transition-colors shadow-lg shadow-primary/25"
            >
              Start building — free
            </Link>
            <Link
              href="/api/auth/guest?redirectUrl=/dashboard"
              className="px-8 py-3 text-base font-medium rounded-lg border border-foreground/20 text-foreground/70 hover:text-foreground hover:border-foreground/40 transition-colors backdrop-blur-sm"
            >
              Try as guest
            </Link>
          </div>
        </div>
      </SeedforgeHeroScene>

      {/* Features */}
      <section className="relative px-6 pt-40 pb-24 bg-gradient-to-b from-[#1A1A2E] to-[#1E3A2F]/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center text-2xl md:text-3xl font-bold text-foreground mb-4">
            Every skill starts as a seed
          </h2>
          <p className="text-center text-foreground/50 mb-16 max-w-lg mx-auto">
            Seedforge guides you through real projects — not tutorials. You
            learn by making things that matter to you.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon="🌱"
              title="Project-based learning"
              description="Choose what you want to build. Seedforge creates a step-by-step path with real milestones, teaching moments, and checkpoints."
              href="/how-it-works"
            />
            <FeatureCard
              icon="🤖"
              title="AI-powered coaching"
              description="A personal coach helps you when you're stuck, explains concepts in context, and adapts to how you learn best."
              href="/why-seedforge"
            />
            <FeatureCard
              icon="🌿"
              title="Watch your garden grow"
              description="Every completed project plants a seed in your garden. Level up, earn GP, and build a visual record of everything you've learned."
              href="/the-garden"
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="relative px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-2xl md:text-3xl font-bold text-foreground mb-16">
            How it works
          </h2>

          <div className="space-y-12">
            <StepRow
              number="1"
              title="Tell us what you want to learn"
              description="Share your interests and what you'd like to build. Seedforge designs a project scoped to your experience level."
            />
            <StepRow
              number="2"
              title="Build, step by step"
              description="Work through guided steps that mix learning with making. Each step teaches you something new and produces something real."
            />
            <StepRow
              number="3"
              title="Level up and keep growing"
              description="Complete projects, earn GP, grow your garden, and unlock new challenges. Your learning journey is yours to shape."
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-6 py-24">
        <div className="max-w-2xl mx-auto text-center">
          <Image
            src="/brand/seed_anvil.png"
            alt="Seedforge anvil"
            width={120}
            height={120}
            className="mx-auto mb-8 drop-shadow-[0_0_30px_rgba(212,146,42,0.3)]"
          />
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
            Ready to forge something?
          </h2>
          <p className="text-foreground/50 mb-8">
            Join Seedforge and start building your way to mastery.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/register"
              className="px-8 py-3 text-base font-semibold rounded-lg bg-primary hover:bg-[#E8A83E] text-primary-foreground transition-colors shadow-lg shadow-primary/25"
            >
              Create your account
            </Link>
            <Link
              href="/login"
              className="px-8 py-3 text-base font-medium rounded-lg border border-foreground/20 text-foreground/70 hover:text-foreground hover:border-foreground/40 transition-colors"
            >
              Log in
            </Link>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  href,
}: { icon: string; title: string; description: string; href?: string }) {
  return (
    <div className="rounded-xl bg-white/5 border border-white/5 p-6 hover:bg-white/[0.07] transition-colors">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-sm text-foreground/50 leading-relaxed">
        {description}
      </p>
      {href && (
        <Link
          href={href}
          className="inline-block mt-4 text-sm text-[#E8A83E] hover:text-[#F5D77A] transition-colors"
        >
          Learn more &rarr;
        </Link>
      )}
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
