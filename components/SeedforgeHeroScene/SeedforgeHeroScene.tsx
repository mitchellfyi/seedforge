'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import styles from './SeedforgeHeroScene.module.css';
import { ParticleField } from './ParticleField';

const ASSETS = {
  bg: '/hero/bg-forest.png',
  anvil: '/hero/anvil.png',
  seed: '/hero/seed.png',
  seedGlow: '/hero/seed-glow.png',
  character: '/hero/character.png',
  wordmark: '/hero/wordmark.png',
} as const;

type AssetKey = keyof typeof ASSETS;
type LoadState = Record<string, 'loading' | 'loaded' | 'error'>;

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
      const img = new Image();
      img.onload = () =>
        setLoadState((prev) => ({ ...prev, [key]: 'loaded' }));
      img.onerror = () =>
        setLoadState((prev) => ({ ...prev, [key]: 'error' }));
      img.src = src;
    }
  }, []);

  // Reduced motion detection
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  // Particle activation delay (1.2s after mount)
  useEffect(() => {
    if (reducedMotion) return;
    const timer = setTimeout(() => setParticlesActive(true), 1200);
    return () => clearTimeout(timer);
  }, [reducedMotion]);

  // Responsive particle count
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 768) setParticleCount(10);
      else if (w < 1024) setParticleCount(15);
      else setParticleCount(25);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Parallax (desktop only)
  const applyParallax = useCallback(
    (ref: React.RefObject<HTMLDivElement | null>, x: number, y: number, strength: number) => {
      if (ref.current) {
        ref.current.style.transform = `translate(${-x * strength}px, ${-y * strength}px)`;
      }
    },
    []
  );

  useEffect(() => {
    if (reducedMotion) return;

    const checkDesktop = () => window.innerWidth >= 1024;
    if (!checkDesktop()) return;

    const scene = sceneRef.current;
    if (!scene) return;

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

    scene.addEventListener('mousemove', handleMouseMove);
    parallaxRaf.current = requestAnimationFrame(tick);

    return () => {
      scene.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(parallaxRaf.current);
    };
  }, [reducedMotion, applyParallax]);

  const isError = (key: AssetKey) => loadState[key] === 'error';

  return (
    <div
      ref={sceneRef}
      className={`${styles.sceneContainer}${className ? ` ${className}` : ''}`}
      role="img"
      aria-label="Animated pixel art scene: a glowing seed rests on a stone anvil in a magical forest clearing, with a small adventurer character looking up at it in wonder"
    >
      {/* Layer 1: Background */}
      {isError('bg') ? (
        <div className={styles.placeholderBg}>BACKGROUND</div>
      ) : (
        <img src={ASSETS.bg} alt="" className={styles.bg} />
      )}

      {/* Positioned content */}
      <div className={styles.sceneContent}>
        {/* Parallax group: forge (anvil + seed glow + seed) */}
        <div ref={forgeRef} className={styles.parallaxForge}>
          {/* Layer 2: Anvil */}
          {isError('anvil') ? (
            <div className={styles.placeholderAnvil}>ANVIL</div>
          ) : (
            <img src={ASSETS.anvil} alt="" className={styles.anvil} />
          )}

          {/* Layer 3: Seed Glow */}
          {isError('seedGlow') ? (
            <div className={styles.placeholderSeedGlow} />
          ) : (
            <img src={ASSETS.seedGlow} alt="" className={styles.seedGlow} />
          )}

          {/* Layer 4: Seed */}
          {isError('seed') ? (
            <div className={styles.placeholderSeed}>SEED</div>
          ) : (
            <img src={ASSETS.seed} alt="" className={styles.seed} />
          )}
        </div>

        {/* Parallax group: particles */}
        <div ref={particlesRef} className={styles.parallaxParticles}>
          <ParticleField
            count={particleCount}
            active={particlesActive}
            reducedMotion={reducedMotion}
          />
        </div>

        {/* Parallax group: character */}
        <div ref={characterRef} className={styles.parallaxCharacter}>
          {/* Layer 6: Character */}
          {isError('character') ? (
            <div className={styles.placeholderCharacter}>CHARACTER</div>
          ) : (
            <img
              src={ASSETS.character}
              alt=""
              className={styles.character}
            />
          )}
        </div>

        {/* Parallax group: wordmark */}
        <div ref={wordmarkRef} className={styles.parallaxWordmark}>
          {/* Layer 7: Wordmark */}
          {isError('wordmark') ? (
            <div className={styles.placeholderWordmark}>SEEDFORGE</div>
          ) : (
            <>
              <img
                src={ASSETS.wordmark}
                alt=""
                className={styles.wordmarkImg}
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
