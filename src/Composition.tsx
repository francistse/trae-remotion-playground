import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { OpeningScene } from './scenes/OpeningScene';
import { ThankYouScene } from './scenes/ThankYouScene';
import { NewYearScene } from './scenes/NewYearScene';

export const MyComposition: React.FC = () => {
  return (
    <AbsoluteFill>
      <Sequence from={0} durationInFrames={90}>
        <OpeningScene />
      </Sequence>
      <Sequence from={90} durationInFrames={150}>
        <ThankYouScene />
      </Sequence>
      <Sequence from={240} durationInFrames={210}>
        <NewYearScene />
      </Sequence>
    </AbsoluteFill>
  );
};
