import React from 'react';
import { AbsoluteFill, Sequence, spring, useCurrentFrame, useVideoConfig, interpolate } from 'remotion';
import { colors } from '../theme/colors';

const TEAM_MEMBERS = [
  'Member 1',
  'Member 2',
  'Member 3',
  // Add more members...
];

type MemberProps = {
  name: string;
  index: number;
  total: number;
};

const Member: React.FC<MemberProps> = ({ name, index, total }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    fps,
    frame,
    config: { damping: 12, stiffness: 80 },
  });

  const opacity = spring({
    fps,
    frame,
    config: { damping: 20, stiffness: 100 },
  });

  const itemHeight = 60;
  const totalHeight = total * itemHeight;
  const yOffset = (index - (total - 1) / 2) * itemHeight;

  return (
    <div
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: `translate(-50%, -50%) translateY(${yOffset}px) scale(${scale})`,
        fontSize: 42,
        color: colors.text.cream,
        fontWeight: 600,
        opacity,
        textShadow: `2px 2px 4px rgba(0,0,0,0.3)`,
        padding: '8px 24px',
        whiteSpace: 'nowrap',
      }}
    >
      {name}
    </div>
  );
};

export const TeamMembers: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {TEAM_MEMBERS.map((name, index) => (
        <Sequence
          key={name}
          from={index * 12}
          durationInFrames={200}
        >
          <Member name={name} index={index} total={TEAM_MEMBERS.length} />
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
