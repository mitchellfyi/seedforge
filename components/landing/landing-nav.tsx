import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { auth } from "@/app/(auth)/auth";

export function LandingNav({
  position = "static",
}: { position?: "absolute" | "static" }) {
  const positionClass =
    position === "absolute"
      ? "absolute top-0 left-0 right-0 z-50"
      : "";

  return (
    <nav
      className={`${positionClass} flex items-center justify-between px-6 py-4 max-w-6xl mx-auto`}
    >
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

export function LandingFooter() {
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
