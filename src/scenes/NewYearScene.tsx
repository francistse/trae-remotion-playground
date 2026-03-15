import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { Background } from '../components/Background';
import { GoldParticles } from '../components/GoldParticles';
import { StarburstEffect } from '../components/StarburstEffect';
import { AnimatedText } from '../components/AnimatedText';
import { colors } from '../theme/colors';

export const NewYearScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const yearScale = spring({
    fps,
    frame,
    config: { damping: 8, stiffness: 50, mass: 1 },
  });

  const messageOpacity = interpolate(frame, [30, 50], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const glowPulse = interpolate(
    Math.sin(frame / 8),
    [-1, 1],
    [25, 50]
  );

  return (
    <AbsoluteFill>
      <Background />
      <StarburstEffect />
      <GoldParticles />
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
          gap: 24,
        }}
      >
        <div
          style={{
            fontSize: 140,
            fontWeight: 'bold',
            color: colors.text.gold,
            transform: `scale(${yearScale})`,
            textShadow: `0 0 ${glowPulse}px ${colors.accent.gold}, 0 0 ${glowPulse * 2}px ${colors.accent.orange}`,
          }}
        >
          2026
        </div>
        <AnimatedText delay={20} fontSize={56} color={colors.text.cream}>
          Happy New Year!
        </AnimatedText>
        <div
          style={{
            fontSize: 32,
            color: colors.text.white,
            fontWeight: 400,
            opacity: messageOpacity,
            marginTop: 20,
            textAlign: 'center',
            lineHeight: 1.5,
          }}
        >
          Wishing you prosperity, joy, and success!
        </div>
        <div
          style={{
            fontSize: 64,
            opacity: messageOpacity,
            marginTop: 30,
          }}
        >
          🧧 🎊 🏮
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
