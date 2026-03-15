import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from 'remotion';
import { colors } from '../theme/colors';

const PARTICLE_COUNT = 80;

const randomSeed = (seed: number) => {
  const x = Math.sin(seed * 12.9898 + seed * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

export const GoldParticles: React.FC = () => {
  const frame = useCurrentFrame();
  const { height, width } = useVideoConfig();

  const particles = Array.from({ length: PARTICLE_COUNT }, (_, i) => {
    const seedX = randomSeed(i * 1.1);
    const seedY = randomSeed(i * 2.2);
    const seedSpeed = randomSeed(i * 3.3);
    const seedSize = randomSeed(i * 4.4);
    const seedDelay = randomSeed(i * 5.5);
    
    const startX = seedX * width;
    const startY = height + 100 + seedY * 200;
    const speed = 1.5 + seedSpeed * 2.5;
    const size = 3 + seedSize * 8;
    const delay = Math.floor(seedDelay * 60);
    
    const progress = interpolate(
      frame - delay,
      [0, 200 / speed],
      [0, 1],
      { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
    );
    
    const y = interpolate(progress, [0, 1], [startY, -100]);
    const wobbleX = Math.sin((frame + i * 20) / 15) * (20 + seedSize * 30);
    const x = startX + wobbleX;
    
    const opacity = interpolate(progress, [0, 0.1, 0.8, 1], [0, 1, 1, 0], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    
    const sparkle = 0.5 + Math.sin((frame * 3 + i * 50) / 10) * 0.5;
    const finalOpacity = opacity * (0.6 + sparkle * 0.4);

    return { x, y, size, opacity: finalOpacity, id: i };
  });

  return (
    <AbsoluteFill style={{ pointerEvents: 'none' }}>
      {particles.map((particle) => (
        <div
          key={particle.id}
          style={{
            position: 'absolute',
            left: particle.x,
            top: particle.y,
            width: particle.size,
            height: particle.size,
            borderRadius: '50%',
            backgroundColor: colors.accent.gold,
            opacity: particle.opacity,
            boxShadow: `0 0 ${particle.size * 3}px ${colors.accent.gold}, 0 0 ${particle.size * 6}px ${colors.accent.goldLight}`,
            filter: `blur(${particle.size > 6 ? 0.5 : 0}px)`,
          }}
        />
      ))}
    </AbsoluteFill>
  );
};
