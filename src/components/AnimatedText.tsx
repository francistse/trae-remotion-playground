import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { colors } from '../theme/colors';

type AnimatedTextProps = {
  children: React.ReactNode;
  delay?: number;
  fontSize?: number;
  color?: string;
  fontWeight?: number | string;
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  children,
  delay = 0,
  fontSize = 72,
  color = colors.text.gold,
  fontWeight = 'bold',
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    fps,
    frame: frame - delay,
    config: {
      damping: 12,
      stiffness: 100,
      mass: 0.5,
    },
  });

  const opacity = interpolate(frame - delay, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const translateY = interpolate(frame - delay, [0, 20], [50, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        fontSize,
        color,
        fontWeight,
        opacity,
        transform: `scale(${scale}) translateY(${translateY}px)`,
        textShadow: `0 0 20px ${colors.accent.gold}, 0 0 40px ${colors.accent.orange}`,
        textAlign: 'center',
        fontFamily: 'system-ui, sans-serif',
      }}
    >
      {children}
    </div>
  );
};
