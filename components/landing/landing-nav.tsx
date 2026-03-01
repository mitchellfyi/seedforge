import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { auth } from "@/app/(auth)/auth";

export function LandingNav({
  position = "static",
}: {
  position?: "absolute" | "static";
}) {
  const positionClass =
    position === "absolute" ? "absolute top-0 left-0 right-0 z-50" : "";

  return (
    <nav
      className={`${positionClass} flex items-center justify-between px-6 py-4 max-w-6xl mx-auto`}
    >
      <Link href="/">
        <Image
          alt="Seedforge"
          className="h-12 w-auto drop-shadow-[0_0_12px_rgba(212,146,42,0.3)]"
          height={46}
          priority
          src="/brand/seedforge.png"
          width={140}
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
          className="px-4 py-2 text-sm font-medium rounded-lg bg-primary hover:bg-primary/80 text-primary-foreground transition-colors"
          href="/dashboard"
        >
          Go to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Link
        className="px-3 py-2 text-sm text-foreground/60 hover:text-foreground transition-colors hidden md:block"
        href="/how-it-works"
      >
        How it works
      </Link>
      <Link
        className="px-3 py-2 text-sm text-foreground/60 hover:text-foreground transition-colors hidden md:block"
        href="/the-garden"
      >
        The Garden
      </Link>
      <Link
        className="px-3 py-2 text-sm text-foreground/60 hover:text-foreground transition-colors hidden md:block"
        href="/why-seedforge"
      >
        Why Seedforge
      </Link>
      <Link
        className="px-4 py-2 text-sm font-medium text-foreground/80 hover:text-foreground transition-colors"
        href="/login"
      >
        Log in
      </Link>
      <Link
        className="px-4 py-2 text-sm font-medium rounded-lg bg-primary hover:bg-primary/80 text-primary-foreground transition-colors"
        href="/register"
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
                className="text-sm text-foreground/40 hover:text-foreground/70 transition-colors"
                href="/how-it-works"
              >
                How it works
              </Link>
              <Link
                className="text-sm text-foreground/40 hover:text-foreground/70 transition-colors"
                href="/the-garden"
              >
                The Garden
              </Link>
              <Link
                className="text-sm text-foreground/40 hover:text-foreground/70 transition-colors"
                href="/why-seedforge"
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
                className="text-sm text-foreground/40 hover:text-foreground/70 transition-colors"
                href="/register"
              >
                Sign up free
              </Link>
              <Link
                className="text-sm text-foreground/40 hover:text-foreground/70 transition-colors"
                href="/login"
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
