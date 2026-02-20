import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { auth } from "@/app/(auth)/auth";
import { SeedforgeHeroScene } from "@/components/SeedforgeHeroScene";

export default function LandingPage() {
  return (
    <div className="min-h-dvh bg-[#1A1A2E] text-white overflow-hidden">
      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 py-4 max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          <Image
            src="/brand/seed.png"
            alt="Seedforge"
            width={32}
            height={32}
            className="rounded"
          />
          <span className="font-bold text-lg tracking-wide text-[#FFF8F0]">
            Seedforge
          </span>
        </div>
        <Suspense fallback={<NavLinks isLoggedIn={false} />}>
          <AuthAwareNav />
        </Suspense>
      </nav>

      {/* Animated Hero Scene */}
      <SeedforgeHeroScene>
        <div className="absolute bottom-[5%] left-0 right-0 z-30 flex flex-col items-center text-center px-6">
          <p className="text-xl md:text-2xl text-[#FFF8F0]/90 max-w-xl mb-2 font-light drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
            Learn by building real things.
          </p>
          <p className="text-[#FFF8F0]/60 max-w-lg mb-6 text-sm md:text-base leading-relaxed drop-shadow-[0_2px_6px_rgba(0,0,0,0.5)]">
            An AI-powered workshop where curiosity meets craft. Pick a project,
            learn as you build, and watch your skills grow — one seed at a time.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <Link
              href="/register"
              className="px-8 py-3 text-base font-semibold rounded-lg bg-[#D4922A] hover:bg-[#E8A83E] text-[#1A1A2E] transition-colors shadow-lg shadow-[#D4922A]/25"
            >
              Start building — free
            </Link>
            <Link
              href="/api/auth/guest?redirectUrl=/dashboard"
              className="px-8 py-3 text-base font-medium rounded-lg border border-[#FFF8F0]/20 text-[#FFF8F0]/70 hover:text-[#FFF8F0] hover:border-[#FFF8F0]/40 transition-colors backdrop-blur-sm"
            >
              Try as guest
            </Link>
          </div>
        </div>
      </SeedforgeHeroScene>

      {/* Features */}
      <section className="relative px-6 py-24 bg-gradient-to-b from-[#1A1A2E] to-[#1E3A2F]/30">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-center text-2xl md:text-3xl font-bold text-[#FFF8F0] mb-4">
            Every skill starts as a seed
          </h2>
          <p className="text-center text-[#FFF8F0]/50 mb-16 max-w-lg mx-auto">
            Seedforge guides you through real projects — not tutorials. You
            learn by making things that matter to you.
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon="🌱"
              title="Project-based learning"
              description="Choose what you want to build. Seedforge creates a step-by-step path with real milestones, teaching moments, and checkpoints."
            />
            <FeatureCard
              icon="🤖"
              title="AI-powered coaching"
              description="A personal coach helps you when you're stuck, explains concepts in context, and adapts to how you learn best."
            />
            <FeatureCard
              icon="🌿"
              title="Watch your garden grow"
              description="Every completed project plants a seed in your garden. Level up, earn GP, and build a visual record of everything you've learned."
            />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="relative px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-2xl md:text-3xl font-bold text-[#FFF8F0] mb-16">
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
          <h2 className="text-2xl md:text-3xl font-bold text-[#FFF8F0] mb-4">
            Ready to forge something?
          </h2>
          <p className="text-[#FFF8F0]/50 mb-8">
            Join Seedforge and start building your way to mastery.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/register"
              className="px-8 py-3 text-base font-semibold rounded-lg bg-[#D4922A] hover:bg-[#E8A83E] text-[#1A1A2E] transition-colors shadow-lg shadow-[#D4922A]/25"
            >
              Create your account
            </Link>
            <Link
              href="/login"
              className="px-8 py-3 text-base font-medium rounded-lg border border-[#FFF8F0]/20 text-[#FFF8F0]/70 hover:text-[#FFF8F0] hover:border-[#FFF8F0]/40 transition-colors"
            >
              Log in
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-white/5">
        <div className="max-w-5xl mx-auto flex items-center justify-between text-[#FFF8F0]/30 text-sm">
          <span>Seedforge</span>
          <span>Forge what you learn.</span>
        </div>
      </footer>
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
          className="px-4 py-2 text-sm font-medium rounded-lg bg-[#D4922A] hover:bg-[#B8721A] text-[#1A1A2E] transition-colors"
        >
          Go to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Link
        href="/login"
        className="px-4 py-2 text-sm font-medium text-[#FFF8F0]/80 hover:text-[#FFF8F0] transition-colors"
      >
        Log in
      </Link>
      <Link
        href="/register"
        className="px-4 py-2 text-sm font-medium rounded-lg bg-[#D4922A] hover:bg-[#B8721A] text-[#1A1A2E] transition-colors"
      >
        Sign up
      </Link>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: { icon: string; title: string; description: string }) {
  return (
    <div className="rounded-xl bg-white/5 border border-white/5 p-6 hover:bg-white/[0.07] transition-colors">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-[#FFF8F0] mb-2">{title}</h3>
      <p className="text-sm text-[#FFF8F0]/50 leading-relaxed">
        {description}
      </p>
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
      <div className="flex-none w-10 h-10 rounded-full bg-[#D4922A]/20 border border-[#D4922A]/30 flex items-center justify-center text-[#E8A83E] font-bold text-sm">
        {number}
      </div>
      <div>
        <h3 className="text-lg font-semibold text-[#FFF8F0] mb-1">{title}</h3>
        <p className="text-sm text-[#FFF8F0]/50 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}
