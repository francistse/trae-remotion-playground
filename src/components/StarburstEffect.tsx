import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { colors } from '../theme/colors';

const RAY_COUNT = 16;

export const StarburstEffect: React.FC = () => {
  const frame = useCurrentFrame();

  const rotation = interpolate(frame, [0, 60], [0, 30]);
  const scale = interpolate(frame, [0, 30], [0.5, 1.2], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        pointerEvents: 'none',
      }}
    >
      <div
        style={{
          width: 600,
          height: 600,
          transform: `rotate(${rotation}deg) scale(${scale})`,
          opacity: 0.6,
        }}
      >
        {Array.from({ length: RAY_COUNT }, (_, i) => {
          const angle = (i * 360) / RAY_COUNT;
          const colorIndex = i % 3;
          const rayColors = [colors.accent.gold, colors.accent.orange, colors.accent.goldLight];

          return (
            <div
              key={i}
              style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                width: 4,
                height: 200,
                backgroundColor: rayColors[colorIndex],
                transformOrigin: 'center top',
                transform: `translateX(-50%) rotate(${angle}deg)`,
                boxShadow: `0 0 10px ${rayColors[colorIndex]}`,
              }}
            />
          );
        })}
      </div>
    </AbsoluteFill>
  );
};
