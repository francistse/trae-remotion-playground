# Thank-You Video Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Create a thank-you video for team members expressing gratitude for their efforts and optimism for the coming year.

**Architecture:** A Remotion-based video composition using React components with spring animations, Sequence timing, and TailwindCSS styling. The video features Chinese Lunar New Year aesthetics with red and gold color scheme, animated text reveals, and celebratory visual elements.

**Tech Stack:** Remotion, React, TypeScript, TailwindCSS, @remotion/transitions

---

## Video Specifications

| Property | Value |
|----------|-------|
| Resolution | 1920x1080 pixels |
| Frame Rate | 30 fps |
| Duration | ~15 seconds (450 frames) |
| Color Scheme | Red (#DC143C, #FF0000) and Gold (#FFD700, #FFA500) |
| Tone | Happy, warm, celebratory |
| Theme | Chinese Lunar New Year |

---

## Storyboard Structure

### Scene 1: Opening (0-3 seconds / Frames 0-90)
- **Visual:** Red gradient background with subtle gold particle effects
- **Animation:** Background fades in, gold particles float upward
- **Text:** Current year appears with spring animation

### Scene 2: Team Appreciation (3-8 seconds / Frames 90-240)
- **Visual:** Team member names scroll or fade in sequence
- **Animation:** Each name appears with slide-in and fade effect
- **Text:** "Thank You!" with warm glow

### Scene 3: Achievement Highlights (8-12 seconds / Frames 240-360)
- **Visual:** Key achievements or milestones displayed
- **Animation:** Starburst or firework effects
- **Text:** Celebratory messages

### Scene 4: New Year Wishes (12-15 seconds / Frames 360-450)
- **Visual:** Transition to new year greeting
- **Animation:** Gold confetti, lantern effects
- **Text:** "Happy New Year!" with optimistic message

---

## Task 1: Project Setup

**Files:**
- Create: `package.json`
- Create: `remotion.config.ts`
- Create: `tsconfig.json`

**Step 1: Initialize Remotion project**

Run:
```bash
npx create-video@latest . --template blank
```

Expected: Project initialized with Remotion structure

**Step 2: Install additional dependencies**

Run:
```bash
npm install @remotion/transitions @remotion/transitions/slide tailwindcss
```

Expected: Dependencies installed successfully

**Step 3: Configure TailwindCSS**

Create `remotion.config.ts`:
```typescript
import { Config } from "@remotion/cli/config";
import { enableTailwind } from "@remotion/tailwind-v4";

Config.overrideWebpackConfig(enableTailwind);
```

**Step 4: Verify project structure**

Run:
```bash
ls -la src/
```

Expected: See `Root.tsx`, `Composition.tsx`, and `index.ts` files

---

## Task 2: Create Color Theme Configuration

**Files:**
- Create: `src/theme/colors.ts`

**Step 1: Define color palette**

Create `src/theme/colors.ts`:
```typescript
export const colors = {
  primary: {
    red: '#DC143C',
    redLight: '#FF6B6B',
    redDark: '#8B0000',
  },
  accent: {
    gold: '#FFD700',
    goldLight: '#FFEC8B',
    goldDark: '#DAA520',
    orange: '#FFA500',
  },
  background: {
    gradientStart: '#8B0000',
    gradientEnd: '#DC143C',
    overlay: 'rgba(139, 0, 0, 0.3)',
  },
  text: {
    white: '#FFFFFF',
    gold: '#FFD700',
    cream: '#FFF8DC',
  },
} as const;

export const gradients = {
  background: 'linear-gradient(135deg, #8B0000 0%, #DC143C 50%, #FF6B6B 100%)',
  goldShimmer: 'linear-gradient(90deg, #FFD700 0%, #FFEC8B 50%, #FFD700 100%)',
  festive: 'linear-gradient(180deg, #DC143C 0%, #8B0000 100%)',
} as const;
```

---

## Task 3: Create Background Component

**Files:**
- Create: `src/components/Background.tsx`

**Step 1: Write Background component**

Create `src/components/Background.tsx`:
```typescript
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
```

---

## Task 4: Create Gold Particles Effect

**Files:**
- Create: `src/components/GoldParticles.tsx`

**Step 1: Write GoldParticles component**

Create `src/components/GoldParticles.tsx`:
```typescript
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
          }}
        />
      ))}
    </AbsoluteFill>
  );
};
```

---

## Task 5: Create Animated Text Component

**Files:**
- Create: `src/components/AnimatedText.tsx`

**Step 1: Write AnimatedText component**

Create `src/components/AnimatedText.tsx`:
```typescript
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
```

---

## Task 6: Create Team Member Display Component

**Files:**
- Create: `src/components/TeamMembers.tsx`

**Step 1: Write TeamMembers component**

Create `src/components/TeamMembers.tsx`:
```typescript
import React from 'react';
import { AbsoluteFill, Sequence, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { colors } from '../theme/colors';

// UPDATE THIS ARRAY WITH ACTUAL TEAM MEMBER NAMES
const TEAM_MEMBERS = [
  'Team Member 1',
  'Team Member 2',
  'Team Member 3',
  'Team Member 4',
  'Team Member 5',
  'Team Member 6',
  'Team Member 7',
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
```

---

## Task 7: Create Starburst Effect Component

**Files:**
- Create: `src/components/StarburstEffect.tsx`

**Step 1: Write StarburstEffect component**

Create `src/components/StarburstEffect.tsx`:
```typescript
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
```

---

## Task 8: Create Scene Components

**Files:**
- Create: `src/scenes/OpeningScene.tsx`
- Create: `src/scenes/ThankYouScene.tsx`
- Create: `src/scenes/NewYearScene.tsx`

**Step 1: Write OpeningScene component**

Create `src/scenes/OpeningScene.tsx`:
```typescript
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
```

**Step 2: Write ThankYouScene component**

Create `src/scenes/ThankYouScene.tsx`:
```typescript
import React from 'react';
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';
import { Background } from '../components/Background';
import { GoldParticles } from '../components/GoldParticles';
import { AnimatedText } from '../components/AnimatedText';
import { TeamMembers } from '../components/TeamMembers';
import { colors } from '../theme/colors';

// UPDATE THIS WITH YOUR TEXT
const TEAM_MEMBERS = 'SAMPLE TEXT';

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
          {TEAM_MEMBERS}
        </div>
      </AbsoluteFill>
      <AbsoluteFill style={{ top: 200 }}>
        <TeamMembers />
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
```

**Step 3: Write NewYearScene component**

Create `src/scenes/NewYearScene.tsx`:
```typescript
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
```

---

## Task 9: Create Main Composition

**Files:**
- Modify: `src/Composition.tsx`

**Step 1: Write main composition**

Replace `src/Composition.tsx`:
```typescript
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
```

---

## Task 10: Configure Root Component

**Files:**
- Modify: `src/Root.tsx`

**Step 1: Write Root configuration**

Replace `src/Root.tsx`:
```typescript
import React from 'react';
import { Composition } from 'remotion';
import { MyComposition } from './Composition';

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ThankYouVideo"
        component={MyComposition}
        durationInFrames={450}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
```

---

## Task 11: Start Development Server

**Step 1: Install dependencies**

Run:
```bash
npm install
```

Expected: Dependencies installed

**Step 2: Start Remotion Studio**

Run:
```bash
npm run dev
```

Expected: Remotion Studio opens in browser at localhost

---

## Task 12: Preview and Quality Assurance

**Step 1: Verify video in Remotion Studio**

- Open browser to Remotion Studio URL
- Verify composition appears
- Play video and check:
  - [ ] Resolution is 1920x1080
  - [ ] Frame rate is 30fps
  - [ ] Duration is 15 seconds (450 frames)
  - [ ] Red and gold color scheme is prominent
  - [ ] Text animations are smooth
  - [ ] Transitions between scenes work correctly

---

## Task 13: Render Final Video

**Step 1: Render video**

Run:
```bash
npx remotion render ThankYouVideo out/thank-you-video.mp4
```

Expected: Video rendered to `out/thank-you-video.mp4`

---

## Quality Assurance Checklist

### Visual Quality
- [ ] Color scheme matches Chinese Lunar New Year theme (red/gold)
- [ ] Background gradient is smooth and visually appealing
- [ ] Gold particles animate smoothly without flickering
- [ ] Text is readable with appropriate contrast

### Animation Quality
- [ ] Spring animations feel natural and bouncy
- [ ] Scene transitions are smooth
- [ ] Timing between elements is appropriate

### Technical Quality
- [ ] Resolution: 1920x1080 pixels
- [ ] Frame rate: 30fps
- [ ] Duration: ~15 seconds
- [ ] No rendering errors or warnings

---

## Customization Notes

1. **Team Members**: Update the `TEAM_MEMBERS` array in `src/components/TeamMembers.tsx` with actual team member names.

2. **Team Name**: Update the `TEAM_NAME` constant in `src/scenes/ThankYouScene.tsx`.

3. **Year Values**: Update year values in OpeningScene and NewYearScene components.

4. **Custom Messages**: Modify text content in scene components to match specific messaging needs.

5. **Duration**: Adjust `durationInFrames` in Root.tsx and Sequence components to change video length.

6. **Colors**: Modify `src/theme/colors.ts` to adjust the color palette.

7. **Animation Timing**: Adjust `delay` values and spring `config` parameters to fine-tune animation timing.
