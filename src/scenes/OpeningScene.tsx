import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import { Background } from '../components/Background';
import { GoldParticles } from '../components/GoldParticles';
import { AnimatedText } from '../components/AnimatedText';
import { colors } from '../theme/colors';

export const OpeningScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const yearScale = spring({
    fps,
    frame: frame - 30,
    config: { damping: 10, stiffness: 60, mass: 0.8 },
  });

  const glowIntensity = interpolate(
    Math.sin(frame / 15),
    [-1, 1],
    [20, 40]
  );

  return (
    <AbsoluteFill>
      <Background />
      <GoldParticles />
      <AbsoluteFill
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <AnimatedText delay={15} fontSize={120} color={colors.text.gold}>
          2025
        </AnimatedText>
        <div
          style={{
            fontSize: 48,
            color: colors.text.cream,
            fontWeight: 600,
            marginTop: 20,
            opacity: interpolate(frame, [45, 60], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
            transform: `scale(${yearScale})`,
            textShadow: `0 0 ${glowIntensity}px ${colors.accent.gold}`,
          }}
        >
          A Year of Excellence
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
