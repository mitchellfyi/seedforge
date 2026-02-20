'use client';

import { useEffect, useRef } from 'react';
import styles from './SeedforgeHeroScene.module.css';

type ParticleType = 'spark' | 'spore' | 'firefly';

interface Particle {
  type: ParticleType;
  x: number;
  y: number;
  opacity: number;
  scale: number;
  vx: number;
  vy: number;
  life: number;
  lifetime: number;
  phase: number;
}

interface ParticleFieldProps {
  count: number;
  active: boolean;
  reducedMotion: boolean;
}

const PARTICLE_IMAGES: Record<ParticleType, string> = {
  spark: '/hero/particle-spark.png',
  spore: '/hero/particle-spore.png',
  firefly: '/hero/particle-firefly.png',
};

const PARTICLE_SIZES: Record<ParticleType, number> = {
  spark: 16,
  spore: 12,
  firefly: 8,
};

function getParticleType(index: number, total: number): ParticleType {
  const sparkCount = Math.round(total * 0.4);
  const sporeCount = Math.round(total * 0.3);
  if (index < sparkCount) return 'spark';
  if (index < sparkCount + sporeCount) return 'spore';
  return 'firefly';
}

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function createParticle(type: ParticleType): Particle {
  const base: Particle = {
    type,
    x: 0,
    y: 0,
    opacity: 0,
    scale: randomBetween(0.8, 1.2),
    vx: 0,
    vy: 0,
    life: 0,
    lifetime: 0,
    phase: Math.random() * Math.PI * 2,
  };
  resetParticle(base);
  return base;
}

function resetParticle(p: Particle) {
  p.life = 0;
  p.scale = randomBetween(0.8, 1.2);
  p.phase = Math.random() * Math.PI * 2;

  switch (p.type) {
    case 'spark':
      p.x = randomBetween(42, 58);
      p.y = randomBetween(42, 48);
      p.vx = randomBetween(-0.3, 0.3);
      p.vy = randomBetween(-2, -4);
      p.lifetime = randomBetween(3000, 5000);
      break;
    case 'spore':
      p.x = randomBetween(15, 85);
      p.y = randomBetween(25, 70);
      p.vx = randomBetween(-0.3, 0.3);
      p.vy = randomBetween(-0.5, -1);
      p.lifetime = randomBetween(6000, 10000);
      break;
    case 'firefly':
      p.x = randomBetween(10, 90);
      p.y = randomBetween(10, 75);
      p.vx = 0;
      p.vy = 0;
      p.lifetime = randomBetween(2000, 4000);
      break;
  }
}

function updateParticle(p: Particle, dt: number) {
  const progress = dt / p.lifetime;
  p.life += progress;

  if (p.life >= 1) {
    resetParticle(p);
    return;
  }

  switch (p.type) {
    case 'spark': {
      p.x += p.vx * progress * 100;
      p.y += p.vy * progress * 100;
      p.x += Math.sin(p.life * Math.PI * 4 + p.phase) * 0.1;
      // Fade in first 20%, fade out last 30%
      if (p.life < 0.2) {
        p.opacity = p.life / 0.2;
      } else if (p.life > 0.7) {
        p.opacity = (1 - p.life) / 0.3;
      } else {
        p.opacity = 1;
      }
      break;
    }
    case 'spore': {
      p.x += Math.sin(p.life * Math.PI * 2 + p.phase) * 0.15;
      p.y += p.vy * progress * 100;
      // Low opacity with fade in/out
      const sporeBase = randomBetween(0.4, 0.7);
      if (p.life < 0.15) {
        p.opacity = (p.life / 0.15) * sporeBase;
      } else if (p.life > 0.8) {
        p.opacity = ((1 - p.life) / 0.2) * sporeBase;
      } else {
        p.opacity = sporeBase;
      }
      break;
    }
    case 'firefly': {
      // Blink: sine-based opacity
      p.opacity = Math.max(0, Math.sin(p.life * Math.PI)) * 0.8;
      // Slight drift
      p.x += Math.sin(p.life * Math.PI * 3 + p.phase) * 0.05;
      p.y += Math.cos(p.life * Math.PI * 2 + p.phase) * 0.03;
      break;
    }
  }
}

export function ParticleField({
  count,
  active,
  reducedMotion,
}: ParticleFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number>(0);
  const initializedRef = useRef(false);

  // Initialize particle pool
  useEffect(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;

    const particles: Particle[] = [];
    for (let i = 0; i < count; i++) {
      const type = getParticleType(i, count);
      const p = createParticle(type);
      // Stagger initial life so particles don't all start at the same time
      p.life = Math.random();
      particles.push(p);
    }
    particlesRef.current = particles;
  }, [count]);

  // Animation loop
  useEffect(() => {
    if (!active || reducedMotion) return;

    let lastTime = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(now - lastTime, 50); // cap at 50ms to avoid jumps
      lastTime = now;

      const container = containerRef.current;
      if (!container) {
        rafRef.current = requestAnimationFrame(tick);
        return;
      }

      const children = container.children;
      const particles = particlesRef.current;

      for (let i = 0; i < particles.length && i < children.length; i++) {
        const p = particles[i];
        updateParticle(p, dt);

        const el = children[i] as HTMLElement;
        el.style.transform = `translate(${p.x}vw, ${p.y}vh) scale(${p.scale})`;
        el.style.opacity = String(p.opacity);
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [active, reducedMotion]);

  if (reducedMotion) return null;

  return (
    <div ref={containerRef} className={styles.particleField}>
      {Array.from({ length: count }, (_, i) => {
        const type = getParticleType(i, count);
        const size = PARTICLE_SIZES[type];
        return (
          <div
            key={i}
            className={styles.particle}
            style={{
              backgroundImage: `url(${PARTICLE_IMAGES[type]})`,
              width: size,
              height: size,
              opacity: 0,
            }}
          />
        );
      })}
    </div>
  );
}
