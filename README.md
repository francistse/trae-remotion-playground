# trae-remotion-playground

[简体中文](./README_CN.md) | English

A comprehensive template and tool for generating Remotion videos using TRAE IDE. This project provides a reusable foundation for creating programmatic videos with React components, spring animations, and customizable themes.

## 📖 Project Overview

This template enables developers to quickly create professional videos using the Remotion framework within TRAE IDE. It includes pre-built components, theme configurations, and a complete workflow for video generation—from planning to rendering.

**Purpose:** Serve as a reusable template and educational resource for developers who want to create videos programmatically using Remotion in TRAE IDE.

### What is Remotion?

Remotion is a React-based framework for creating videos programmatically. It leverages web technologies (CSS, Canvas, SVG, WebGL) and React's component model to build videos with code.

**Key Benefits:**
- 🎬 Use variables, functions, APIs, and algorithms for dynamic effects
- ⚛️ Reusable components with powerful composition
- 🎯 Frame-perfect animations with spring physics
- 🖥️ Server-side rendering capabilities

## ✨ Key Features

| Feature | Description |
|---------|-------------|
| **Pre-built Components** | AnimatedText, Background, GoldParticles, StarburstEffect, TeamMembers |
| **Theme System** | Configurable color palettes and gradients (Chinese Lunar New Year theme included) |
| **Scene Architecture** | Modular scene components for Opening, ThankYou, and NewYear scenes |
| **Animation Patterns** | Spring animations, fade effects, slide transitions, glow pulses, particle systems |
| **Skills Integration** | Claude Code skills for video creation, documentation, and testing |
| **Commands** | Pre-configured commands for common development tasks |

### Included Skills

| Skill | Purpose |
|-------|---------|
| `remotion-video-creation` | Comprehensive guide for creating videos with Remotion |
| `manage-github-repository` | Setup and maintain GitHub repositories |
| `docs-demo` | Create interactive documentation demos |
| `video-report` | Generate video reports |
| `web-renderer-test` | Test web renderer functionality |
| `writing-docs` | Write documentation for Remotion projects |

## 🚀 Installation

### Prerequisites

- Node.js 18+ 
- npm or yarn
- TRAE IDE (or Claude Code)

### Quick Start

```bash
# Clone the repository
git clone https://github.com/francistse/trae-remotion-playground.git
cd trae-remotion-playground

# Install dependencies
npm install

# Start Remotion Studio
npm run dev
```

The Remotion Studio will open at `http://localhost:3000` where you can preview and edit your video.

## 📚 Usage Guide

### Step 1: Project Setup

1. Clone or fork this repository
2. Open the project in TRAE IDE
3. Run `npm install` to install dependencies
4. Start the development server with `npm run dev`

### Step 2: Customize Your Video

#### Update Team Members

Edit `src/components/TeamMembers.tsx`:

```typescript
const TEAM_MEMBERS = [
  'Member 1',
  'Member 2',
  'Member 3',
  // Add more members...
];
```

#### Customize Colors

Edit `src/theme/colors.ts`:

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
  // Add more colors...
};
```

#### Modify Scenes

Each scene is a separate component in `src/scenes/`:
- `OpeningScene.tsx` - Opening animation
- `ThankYouScene.tsx` - Team appreciation section
- `NewYearScene.tsx` - New Year greeting

### Step 3: Configure Video Settings

Edit `src/Root.tsx` to change video properties:

```typescript
<Composition
  id="MyVideo"
  component={MyComposition}
  durationInFrames={450}  // 15 seconds at 30fps
  fps={30}               // Frame rate
  width={1920}           // Video width
  height={1080}          // Video height
/>
```

### Step 4: Preview and Render

```bash
# Preview in Remotion Studio
npm run dev

# Render final video
npx remotion render MyVideo out/video.mp4
```

### Example Use Cases

#### Thank You Video
Create appreciation videos for team members with animated names and celebratory effects.

#### Holiday Greeting
Customize the Chinese Lunar New Year theme for other holidays by changing colors and messages.

#### Company Announcement
Use the template structure to create professional announcement videos with branding.

## ⚙️ Configuration Options

### Video Configuration

| Property | Default | Description |
|----------|---------|-------------|
| `width` | 1920 | Video width in pixels |
| `height` | 1080 | Video height in pixels |
| `fps` | 30 | Frames per second |
| `durationInFrames` | 450 | Total frames (15 seconds) |

### Animation Configuration

#### Spring Animation
```typescript
const scale = spring({
  fps,
  frame,
  config: {
    damping: 12,      // Lower = more bouncy
    stiffness: 100,   // Higher = faster
    mass: 0.5,        // Higher = heavier
  },
});
```

#### Interpolation
```typescript
const opacity = interpolate(
  frame,
  [0, 30],           // Input range
  [0, 1],            // Output range
  { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
);
```

### Project Structure

```
trae-remotion-playground/
├── .trae/
│   ├── commands/           # Development commands
│   │   ├── add-bug.md
│   │   ├── checkout.md
│   │   ├── formatting.md
│   │   ├── release.md
│   │   ├── upgrade-caniuse.md
│   │   └── upgrade-mediabunny.md
│   └── skills/             # Claude Code skills
│       ├── add-cli-option/
│       ├── add-expert/
│       ├── docs-demo/
│       ├── manage-github-repository/
│       ├── pr/
│       ├── remotion-video-creation/
│       ├── video-report/
│       ├── web-renderer-test/
│       └── writing-docs/
├── src/
│   ├── components/
│   │   ├── AnimatedText.tsx
│   │   ├── Background.tsx
│   │   ├── GoldParticles.tsx
│   │   ├── StarburstEffect.tsx
│   │   └── TeamMembers.tsx
│   ├── scenes/
│   │   ├── OpeningScene.tsx
│   │   ├── ThankYouScene.tsx
│   │   └── NewYearScene.tsx
│   ├── theme/
│   │   └── colors.ts
│   ├── Composition.tsx
│   ├── Root.tsx
│   └── index.ts
├── LICENSE
├── README.md
├── README_CN.md
├── package.json
├── package-lock.json
├── tsconfig.json
└── remotion.config.ts
```

## 🤝 Contribution Guidelines

We welcome contributions from the community! Here's how you can help:

### Ways to Contribute

- 🐛 Report bugs and issues
- 💡 Suggest new features or improvements
- 📝 Improve documentation
- 🎨 Add new components or themes
- 🧪 Add tests and examples

### Contribution Process

1. **Fork the Repository**
   ```bash
   git fork https://github.com/francistse/trae-remotion-playground.git
   ```

2. **Create a Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Your Changes**
   - Follow the existing code style
   - Add comments for complex logic
   - Update documentation if needed

4. **Test Your Changes**
   ```bash
   npm run dev
   # Verify your changes in Remotion Studio
   ```

5. **Submit a Pull Request**
   - Provide a clear description of your changes
   - Reference any related issues
   - Include screenshots for UI changes

### Code Style Guidelines

- Use TypeScript for all new files
- Follow React best practices
- Keep components small and focused
- Use meaningful variable and function names
- Add JSDoc comments for public functions

### Commit Message Format

```
type(scope): description

# Examples:
feat(components): add ConfettiEffect component
fix(animations): correct spring damping values
docs(readme): update installation instructions
```

## 📞 Contact Information

**Project Maintainer:** Francis Tse

**Email:** francis.tse.mc@gmail.com

For questions, suggestions, or collaboration opportunities, feel free to reach out.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- [Remotion](https://remotion.dev/) - The amazing framework that makes programmatic video creation possible
- [React](https://react.dev/) - The foundation for component-based UI development
- [TRAE IDE](https://trae.ai/) - The AI-powered development environment

---

**Made with ❤️ using Remotion and TRAE IDE**
