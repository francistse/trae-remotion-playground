# trae-remotion-playground

简体中文 | [English](./README.md)

一个用于在 TRAE IDE 中生成 Remotion 视频的综合模板和工具。本项目提供了创建程序化视频的可复用基础，包含 React 组件、弹簧动画和可自定义主题。

## 📖 项目概述

本模板使开发者能够快速在 TRAE IDE 中使用 Remotion 框架创建专业视频。它包含预构建组件、主题配置和完整的视频生成工作流程——从规划到渲染。

**目的：** 作为可复用模板和教育资源，帮助开发者使用 Remotion 在 TRAE IDE 中以编程方式创建视频。

### 什么是 Remotion？

Remotion 是一个基于 React 的框架，用于以编程方式创建视频。它利用 Web 技术（CSS、Canvas、SVG、WebGL）和 React 的组件模型来构建视频。

**主要优势：**
- 🎬 使用变量、函数、API 和算法创建动态效果
- ⚛️ 可复用组件，强大的组合能力
- 🎯 基于帧的精确动画，支持弹簧物理
- 🖥️ 服务端渲染能力

## ✨ 主要特性

| 特性 | 描述 |
|---------|-------------|
| **预构建组件** | AnimatedText、Background、GoldParticles、StarburstEffect、TeamMembers |
| **主题系统** | 可配置的调色板和渐变（包含中国农历新年主题） |
| **场景架构** | 模块化场景组件：Opening、ThankYou 和 NewYear 场景 |
| **动画模式** | 弹簧动画、淡入淡出、滑动过渡、发光脉冲、粒子系统 |
| **技能集成** | Claude Code 技能，用于视频创建、文档编写和测试 |
| **命令** | 预配置的常用开发任务命令 |

### 包含的技能

| 技能 | 用途 |
|-------|-------------|
| `remotion-video-creation` | 使用 Remotion 创建视频的综合指南 |
| `manage-github-repository` | 设置和维护 GitHub 仓库 |
| `docs-demo` | 创建交互式文档演示 |
| `video-report` | 生成视频报告 |
| `web-renderer-test` | 测试 Web 渲染器功能 |
| `writing-docs` | 为 Remotion 项目编写文档 |

## 🚀 安装

### 环境要求

- Node.js 18+ 
- npm 或 yarn
- TRAE IDE（或 Claude Code）

### 快速开始

```bash
# 克隆仓库
git clone https://github.com/francistse/trae-remotion-playground.git
cd trae-remotion-playground

# 安装依赖
npm install

# 启动 Remotion Studio
npm run dev
```

Remotion Studio 将在 `http://localhost:3000` 打开，您可以在那里预览和编辑视频。

## 📚 使用指南

### 步骤 1：项目设置

1. 克隆或复刻本仓库
2. 在 TRAE IDE 中打开项目
3. 运行 `npm install` 安装依赖
4. 使用 `npm run dev` 启动开发服务器

### 步骤 2：自定义视频

#### 更新团队成员

编辑 `src/components/TeamMembers.tsx`：

```typescript
const TEAM_MEMBERS = [
  '成员 1',
  '成员 2',
  '成员 3',
  // 添加更多成员...
];
```

#### 自定义颜色

编辑 `src/theme/colors.ts`：

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
  // 添加更多颜色...
};
```

#### 修改场景

每个场景都是 `src/scenes/` 中的独立组件：
- `OpeningScene.tsx` - 开场动画
- `ThankYouScene.tsx` - 团队致谢部分
- `NewYearScene.tsx` - 新年祝福

### 步骤 3：配置视频设置

编辑 `src/Root.tsx` 更改视频属性：

```typescript
<Composition
  id="MyVideo"
  component={MyComposition}
  durationInFrames={450}  // 30fps 下 15 秒
  fps={30}               // 帧率
  width={1920}           // 视频宽度
  height={1080}          // 视频高度
/>
```

### 步骤 4：预览和渲染

```bash
# 在 Remotion Studio 中预览
npm run dev

# 渲染最终视频
npx remotion render MyVideo out/video.mp4
```

### 示例用例

#### 感谢视频
为团队成员创建带有动画名称和庆祝效果的感谢视频。

#### 节日祝福
通过更改颜色和消息，将中国农历新年主题自定义用于其他节日。

#### 公司公告
使用模板结构创建带有品牌的专业公告视频。

## ⚙️ 配置选项

### 视频配置

| 属性 | 默认值 | 描述 |
|----------|---------|-------------|
| `width` | 1920 | 视频宽度（像素） |
| `height` | 1080 | 视频高度（像素） |
| `fps` | 30 | 每秒帧数 |
| `durationInFrames` | 450 | 总帧数（15 秒） |

### 动画配置

#### 弹簧动画
```typescript
const scale = spring({
  fps,
  frame,
  config: {
    damping: 12,      // 越低 = 越有弹性
    stiffness: 100,   // 越高 = 越快
    mass: 0.5,        // 越高 = 越重
  },
});
```

#### 插值
```typescript
const opacity = interpolate(
  frame,
  [0, 30],           // 输入范围
  [0, 1],            // 输出范围
  { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
);
```

### 项目结构

```
trae-remotion-playground/
├── .trae/
│   ├── commands/           # 开发命令
│   │   ├── add-bug.md
│   │   ├── checkout.md
│   │   ├── formatting.md
│   │   ├── release.md
│   │   ├── upgrade-caniuse.md
│   │   └── upgrade-mediabunny.md
│   └── skills/             # Claude Code 技能
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

## 🤝 贡献指南

我们欢迎社区贡献！以下是您可以提供帮助的方式：

### 贡献方式

- 🐛 报告错误和问题
- 💡 建议新功能或改进
- 📝 改进文档
- 🎨 添加新组件或主题
- 🧪 添加测试和示例

### 贡献流程

1. **复刻仓库**
   ```bash
   git fork https://github.com/francistse/trae-remotion-playground.git
   ```

2. **创建功能分支**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **进行更改**
   - 遵循现有代码风格
   - 为复杂逻辑添加注释
   - 如需要，更新文档

4. **测试更改**
   ```bash
   npm run dev
   # 在 Remotion Studio 中验证更改
   ```

5. **提交拉取请求**
   - 提供清晰的更改描述
   - 引用相关问题
   - 对于 UI 更改，包含截图

### 代码风格指南

- 所有新文件使用 TypeScript
- 遵循 React 最佳实践
- 保持组件小而专注
- 使用有意义的变量和函数名
- 为公共函数添加 JSDoc 注释

### 提交消息格式

```
type(scope): description

# 示例：
feat(components): 添加 ConfettiEffect 组件
fix(animations): 修正弹簧阻尼值
docs(readme): 更新安装说明
```

## 📞 联系方式

**项目维护者：** Francis Tse

**邮箱：** francis.tse.mc@gmail.com

如有问题、建议或合作机会，欢迎联系。

## 📄 许可证

本项目开源，采用 MIT 许可证。

## 🙏 致谢

- [Remotion](https://remotion.dev/) - 让程序化视频创建成为可能的优秀框架
- [React](https://react.dev/) - 基于组件的 UI 开发基础
- [TRAE IDE](https://trae.ai/) - AI 驱动的开发环境

---

**使用 Remotion 和 TRAE IDE 用 ❤️ 制作**
