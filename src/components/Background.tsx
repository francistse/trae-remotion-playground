import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { gradients } from '../theme/colors';

export const Background: React.FC = () => {
  const frame = useCurrentFrame();
  
  const opacity = interpolate(frame, [0, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: gradients.background,
        opacity,
      }}
    />
  );
};
