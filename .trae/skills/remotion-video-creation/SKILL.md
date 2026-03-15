---
name: "remotion-video-creation"
description: "Create videos programmatically using Remotion framework with React components. Invoke when building video compositions, animations, or rendering video content."
---

# Remotion Video Creation

This skill provides comprehensive guidance for creating videos programmatically using the Remotion framework. It covers the entire workflow from project setup to final rendering.

## Overview

Remotion is a React-based framework for creating videos programmatically. It leverages web technologies (CSS, Canvas, SVG, WebGL) and React's component model to build videos with code.

**Key Benefits:**
- Use variables, functions, APIs, and algorithms for dynamic effects
- Reusable components with powerful composition
- Frame-perfect animations with spring physics
- Server-side rendering capabilities

## When to Use This Skill

**Invoke this skill when:**
- Creating video compositions and animations
- Building motion graphics programmatically
- Rendering video content with React
- Setting up Remotion projects
- Implementing video scenes and transitions

## Quick Start

### Project Initialization

```bash
npx create-video@latest my-video --template blank
cd my-video
npm install
npm run dev
```

### Basic Composition Structure

```typescript
import { Composition } from 'remotion';
import { MyVideo } from './Composition';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="MyVideo"
      component={MyVideo}
      durationInFrames={150}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
```

## Core Concepts

### 1. Video Configuration

| Property | Description | Example |
|----------|-------------|---------|
| `width` | Video width in pixels | `1920` |
| `height` | Video height in pixels | `1080` |
| `fps` | Frames per second | `30` |
| `durationInFrames` | Total frames | `450` (15 sec at 30fps) |

### 2. Animation Functions

#### useCurrentFrame()
Returns the current frame number for frame-based animations.

```typescript
import { useCurrentFrame } from 'remotion';

const MyComponent = () => {
  const frame = useCurrentFrame();
  // Use frame for animations
};
```

#### useVideoConfig()
Access video configuration (width, height, fps).

```typescript
import { useVideoConfig } from 'remotion';

const MyComponent = () => {
  const { fps, width, height } = useVideoConfig();
};
```

#### interpolate()
Map values between ranges for smooth transitions.

```typescript
import { interpolate } from 'remotion';

const opacity = interpolate(
  frame,
  [0, 30],      // Input range (frames)
  [0, 1],        // Output range
  { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
);
```

#### spring()
Create physics-based animations.

```typescript
import { spring } from 'remotion';

const scale = spring({
  fps,
  frame,
  config: {
    damping: 12,
    stiffness: 100,
    mass: 0.5,
  },
});
```

### 3. Layout Components

#### AbsoluteFill
Full-screen container for video content.

```typescript
import { AbsoluteFill } from 'remotion';

<AbsoluteFill
  style={{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8B0000',
  }}
>
  {/* Content */}
</AbsoluteFill>
```

#### Sequence
Time-based component rendering.

```typescript
import { Sequence } from 'remotion';

<Sequence from={0} durationInFrames={90}>
  <Scene1 />
</Sequence>
<Sequence from={90} durationInFrames={150}>
  <Scene2 />
</Sequence>
```

## Project Structure

```
src/
├── components/
│   ├── AnimatedText.tsx
│   ├── Background.tsx
│   ├── GoldParticles.tsx
│   └── StarburstEffect.tsx
├── scenes/
│   ├── OpeningScene.tsx
│   ├── ThankYouScene.tsx
│   └── NewYearScene.tsx
├── theme/
│   └── colors.ts
├── Composition.tsx
├── Root.tsx
└── index.ts
```

## Implementation Guide

### Step 1: Project Setup

1. Initialize Remotion project:
```bash
npx create-video@latest . --template blank
```

2. Install dependencies:
```bash
npm install @remotion/transitions tailwindcss
```

3. Configure TailwindCSS (remotion.config.ts):
```typescript
import { Config } from "@remotion/cli/config";
import { enableTailwind } from "@remotion/tailwind-v4";

Config.overrideWebpackConfig(enableTailwind);
```

### Step 2: Create Theme Configuration

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
    orange: '#FFA500',
  },
  text: {
    white: '#FFFFFF',
    gold: '#FFD700',
    cream: '#FFF8DC',
  },
} as const;

export const gradients = {
  background: 'linear-gradient(135deg, #8B0000 0%, #DC143C 50%, #FF6B6B 100%)',
  festive: 'linear-gradient(180deg, #DC143C 0%, #8B0000 100%)',
} as const;
```

### Step 3: Create Reusable Components

#### Background Component
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

  return <AbsoluteFill style={{ background: gradients.background, opacity }} />;
};
```

#### Animated Text Component
```typescript
import React from 'react';
import { interpolate, spring, useCurrentFrame, useVideoConfig } from 'remotion';
import { colors } from '../theme/colors';

type AnimatedTextProps = {
  children: React.ReactNode;
  delay?: number;
  fontSize?: number;
  color?: string;
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  children,
  delay = 0,
  fontSize = 72,
  color = colors.text.gold,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    fps,
    frame: frame - delay,
    config: { damping: 12, stiffness: 100, mass: 0.5 },
  });

  const opacity = interpolate(frame - delay, [0, 15], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        fontSize,
        color,
        opacity,
        transform: `scale(${scale})`,
        textShadow: `0 0 20px ${colors.accent.gold}`,
      }}
    >
      {children}
    </div>
  );
};
```

### Step 4: Create Scene Components

```typescript
import React from 'react';
import { AbsoluteFill, Sequence } from 'remotion';
import { Background } from '../components/Background';
import { AnimatedText } from '../components/AnimatedText';

export const OpeningScene: React.FC = () => {
  return (
    <AbsoluteFill>
      <Background />
      <AbsoluteFill style={{ justifyContent: 'center', alignItems: 'center' }}>
        <AnimatedText fontSize={120}>2025</AnimatedText>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
```

### Step 5: Compose Main Video

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

### Step 6: Configure Root

```typescript
import React from 'react';
import { Composition } from 'remotion';
import { MyComposition } from './Composition';

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="MyVideo"
      component={MyComposition}
      durationInFrames={450}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
```

## Animation Patterns

### Fade In Effect
```typescript
const opacity = interpolate(frame, [0, 30], [0, 1], {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
});
```

### Slide In Effect
```typescript
const translateY = interpolate(frame, [0, 30], [100, 0], {
  extrapolateLeft: 'clamp',
  extrapolateRight: 'clamp',
});
```

### Scale Animation
```typescript
const scale = spring({
  fps,
  frame,
  config: { damping: 12, stiffness: 100, mass: 0.5 },
});
```

### Glow Pulse Effect
```typescript
const glowIntensity = interpolate(
  Math.sin(frame / 15),
  [-1, 1],
  [20, 40]
);
```

### Particle System
```typescript
const particles = Array.from({ length: COUNT }, (_, i) => {
  const x = (i * 67) % width;
  const y = interpolate(frame - i * 3, [0, 300], [Height, -50]);
  return { x, y, id: i };
});
```

## Rendering

### Development Server
```bash
npm run dev
```
Opens Remotion Studio at `http://localhost:3000`

### Render Video
```bash
npx remotion render MyVideo out/video.mp4
```

### Render with Options
```bash
npx remotion render MyVideo out/video.mp4 --codec h264 --quality 100
```

## Best Practices

### 1. Component Organization
- Keep components small and focused
- Separate visual effects from content
- Use theme files for consistent styling

### 2. Animation Guidelines
- Use `spring()` for natural-feeling animations
- Always clamp extrapolation to prevent unexpected behavior
- Consider frame rate independence with `fps` from `useVideoConfig()`

### 3. Performance Tips
- Minimize re-renders by memoizing expensive calculations
- Use `Sequence` for time-based composition
- Avoid inline style objects in loops

### 4. Code Style
- Use TypeScript for type safety
- Follow React best practices
- Keep animation logic separate from component logic

## Common Patterns

### Staggered List Animation
```typescript
{items.map((item, index) => (
  <Sequence key={item.id} from={index * 10} durationInFrames={100}>
    <ItemComponent item={item} />
  </Sequence>
))}
```

### Color Interpolation
```typescript
import { interpolateColors } from 'remotion';

const color = interpolateColors(
  frame,
  [0, 100],
  ['#FF0000', '#FFFF00']
);
```

### Responsive Sizing
```typescript
const { width, height } = useVideoConfig();
const fontSize = width / 20; // Responsive to video dimensions
```

## Troubleshooting

### Animation Not Smooth
- Check spring configuration parameters
- Verify frame timing calculations
- Ensure proper clamping

### Component Not Rendering
- Verify Sequence timing
- Check AbsoluteFill positioning
- Confirm component imports

### Performance Issues
- Reduce particle count
- Simplify complex calculations
- Use memoization for expensive operations

## Resources

- **Official Documentation:** https://remotion.dev/docs
- **API Reference:** https://remotion.dev/api
- **GitHub Repository:** https://github.com/remotion-dev/remotion

## Related Skills

- `writing-plans` - Create implementation plans for video projects
- `executing-plans` - Execute video creation plans step-by-step
- `test-driven-development` - Test video components
