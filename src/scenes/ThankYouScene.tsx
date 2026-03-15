import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { Background } from '../components/Background';
import { GoldParticles } from '../components/GoldParticles';
import { AnimatedText } from '../components/AnimatedText';
import { TeamMembers } from '../components/TeamMembers';
import { colors } from '../theme/colors';

export const ThankYouScene: React.FC = () => {
  const frame = useCurrentFrame();

  const titleGlow = interpolate(
    Math.sin(frame / 10),
    [-1, 1],
    [15, 35]
  );

  return (
    <AbsoluteFill>
      <Background />
      <GoldParticles />
      <AbsoluteFill
        style={{
          justifyContent: 'flex-start',
          alignItems: 'center',
          paddingTop: 80,
        }}
      >
        <AnimatedText fontSize={64} color={colors.text.gold}>
          Thank You!
        </AnimatedText>
        <div
          style={{
            fontSize: 36,
            color: colors.text.cream,
            fontWeight: 500,
            marginTop: 16,
            textShadow: `0 0 ${titleGlow}px ${colors.accent.gold}`,
          }}
        >
          SAMPLE TEXT
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ top: 200 }}>
        <TeamMembers />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
