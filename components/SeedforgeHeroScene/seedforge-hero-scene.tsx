"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ParticleField } from "./particle-field";
import styles from "./SeedforgeHeroScene.module.css";

const ASSETS = {
  bg: "/hero/bg-forest.png",
  anvil: "/hero/anvil.png",
  seed: "/hero/seed.png",
  seedGlow: "/hero/seed-glow.png",
  character: "/hero/character.png",
  wordmark: "/hero/wordmark.png",
} as const;

const ASSET_DIMENSIONS = {
  anvil: { width: 200, height: 130 },
  character: { width: 90, height: 140 },
  seed: { width: 80, height: 80 },
  seedGlow: { width: 150, height: 150 },
  wordmark: { width: 500, height: 160 },
} as const;

type AssetKey = keyof typeof ASSETS;
type LoadState = Record<string, "loading" | "loaded" | "error">;

interface SeedforgeHeroSceneProps {
  className?: string;
  children?: React.ReactNode;
}

export function SeedforgeHeroScene({
  className,
  children,
}: SeedforgeHeroSceneProps) {
  const [loadState, setLoadState] = useState<LoadState>({});
  const [reducedMotion, setReducedMotion] = useState(false);
  const [particlesActive, setParticlesActive] = useState(false);
  const [particleCount, setParticleCount] = useState(25);

  // Parallax refs
  const sceneRef = useRef<HTMLDivElement>(null);
  const forgeRef = useRef<HTMLDivElement>(null);
  const characterRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const mousePos = useRef({ x: 0, y: 0 });
  const parallaxRaf = useRef<number>(0);

  // Preload images
  useEffect(() => {
    const entries = Object.entries(ASSETS) as [AssetKey, string][];
    for (const [key, src] of entries) {
      const img = new window.Image();
      img.onload = () => setLoadState((prev) => ({ ...prev, [key]: "loaded" }));
      img.onerror = () => setLoadState((prev) => ({ ...prev, [key]: "error" }));
      img.src = src;
    }
  }, []);

  // Reduced motion detection
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  // Particle activation delay (1.2s after mount)
  useEffect(() => {
    if (reducedMotion) {
      return;
    }
    const timer = setTimeout(() => setParticlesActive(true), 1200);
    return () => clearTimeout(timer);
  }, [reducedMotion]);

  // Responsive particle count
  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setParticleCount(10);
      } else if (width < 1024) {
        setParticleCount(15);
      } else {
        setParticleCount(25);
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Parallax (desktop only)
  const applyParallax = useCallback(
    (
      ref: React.RefObject<HTMLDivElement | null>,
      x: number,
      y: number,
      strength: number
    ) => {
      if (ref.current) {
        ref.current.style.transform = `translate(${-x * strength}px, ${-y * strength}px)`;
      }
    },
    []
  );

  useEffect(() => {
    if (reducedMotion) {
      return;
    }

    const checkDesktop = () => window.innerWidth >= 1024;
    if (!checkDesktop()) {
      return;
    }

    const scene = sceneRef.current;
    if (!scene) {
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = scene.getBoundingClientRect();
      mousePos.current = {
        x: ((e.clientX - rect.left) / rect.width - 0.5) * 2,
        y: ((e.clientY - rect.top) / rect.height - 0.5) * 2,
      };
    };

    const tick = () => {
      if (!checkDesktop()) {
        parallaxRaf.current = requestAnimationFrame(tick);
        return;
      }
      const { x, y } = mousePos.current;
      applyParallax(forgeRef, x, y, 5);
      applyParallax(characterRef, x, y, 8);
      applyParallax(particlesRef, x, y, 12);
      applyParallax(wordmarkRef, x, y, 3);
      parallaxRaf.current = requestAnimationFrame(tick);
    };

    scene.addEventListener("mousemove", handleMouseMove);
    parallaxRaf.current = requestAnimationFrame(tick);

    return () => {
      scene.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(parallaxRaf.current);
    };
  }, [reducedMotion, applyParallax]);

  const isError = (key: AssetKey) => loadState[key] === "error";

  return (
    <div
      aria-label="Animated pixel art scene: a glowing seed rests on a stone anvil in a magical forest clearing, with a small adventurer character looking up at it in wonder"
      className={`${styles.sceneContainer}${className ? ` ${className}` : ""}`}
      ref={sceneRef}
      role="img"
    >
      {/* Layer 1: Background */}
      {isError("bg") ? (
        <div className={styles.placeholderBg}>BACKGROUND</div>
      ) : (
        <Image
          alt=""
          aria-hidden
          className={styles.bg}
          fill
          priority
          sizes="100vw"
          src={ASSETS.bg}
        />
      )}

      {/* Positioned content */}
      <div className={styles.sceneContent}>
        {/* Parallax group: forge (anvil + seed glow + seed) */}
        <div className={styles.parallaxForge} ref={forgeRef}>
          {/* Layer 2: Anvil */}
          {isError("anvil") ? (
            <div className={styles.placeholderAnvil}>ANVIL</div>
          ) : (
            <Image
              alt=""
              aria-hidden
              className={styles.anvil}
              height={ASSET_DIMENSIONS.anvil.height}
              src={ASSETS.anvil}
              width={ASSET_DIMENSIONS.anvil.width}
            />
          )}

          {/* Layer 3: Seed Glow */}
          {isError("seedGlow") ? (
            <div className={styles.placeholderSeedGlow} />
          ) : (
            <Image
              alt=""
              aria-hidden
              className={styles.seedGlow}
              height={ASSET_DIMENSIONS.seedGlow.height}
              src={ASSETS.seedGlow}
              width={ASSET_DIMENSIONS.seedGlow.width}
            />
          )}

          {/* Layer 4: Seed */}
          {isError("seed") ? (
            <div className={styles.placeholderSeed}>SEED</div>
          ) : (
            <Image
              alt=""
              aria-hidden
              className={styles.seed}
              height={ASSET_DIMENSIONS.seed.height}
              src={ASSETS.seed}
              width={ASSET_DIMENSIONS.seed.width}
            />
          )}
        </div>

        {/* Parallax group: particles */}
        <div className={styles.parallaxParticles} ref={particlesRef}>
          <ParticleField
            active={particlesActive}
            count={particleCount}
            reducedMotion={reducedMotion}
          />
        </div>

        {/* Parallax group: character */}
        <div className={styles.parallaxCharacter} ref={characterRef}>
          {/* Layer 6: Character */}
          {isError("character") ? (
            <div className={styles.placeholderCharacter}>CHARACTER</div>
          ) : (
            <Image
              alt=""
              aria-hidden
              className={styles.character}
              height={ASSET_DIMENSIONS.character.height}
              src={ASSETS.character}
              width={ASSET_DIMENSIONS.character.width}
            />
          )}
        </div>

        {/* Parallax group: wordmark */}
        <div className={styles.parallaxWordmark} ref={wordmarkRef}>
          {/* Layer 7: Wordmark */}
          {isError("wordmark") ? (
            <div className={styles.placeholderWordmark}>SEEDFORGE</div>
          ) : (
            <>
              <Image
                alt=""
                aria-hidden
                className={styles.wordmarkImg}
                height={ASSET_DIMENSIONS.wordmark.height}
                src={ASSETS.wordmark}
                width={ASSET_DIMENSIONS.wordmark.width}
              />
              <div className={styles.shimmer} />
            </>
          )}
        </div>
      </div>

      {/* Bottom gradient for CTA readability */}
      <div className={styles.bottomGradient} />

      {/* CTA overlay slot */}
      {children}
    </div>
  );
}
