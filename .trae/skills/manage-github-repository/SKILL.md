---
name: "manage-github-repository"
description: "Manage GitHub repository setup, configuration, and maintenance. Invoke when setting up new repositories, creating documentation, or managing repository settings."
---

# Manage GitHub Repository

This skill provides comprehensive guidance for setting up, configuring, and maintaining GitHub repositories. It covers documentation, licensing, and repository management best practices.

## When to Use This Skill

**Invoke this skill when:**
- Setting up a new GitHub repository
- Creating README documentation
- Adding license files
- Configuring .gitignore
- Setting up GitHub About section
- Managing repository structure

## Repository Setup Checklist

### 1. Essential Files

| File | Purpose | Priority |
|------|---------|----------|
| `README.md` | Project documentation | High |
| `LICENSE` | Legal protection | High |
| `.gitignore` | Exclude files from git | High |
| `README_CN.md` | Chinese documentation (optional) | Medium |

### 2. README Structure

A good README should include:

```markdown
# Project Name

[简体中文](./README_CN.md) | English

Brief description of the project.

## 📖 Project Overview
## ✨ Key Features
## 🚀 Installation
## 📚 Usage Guide
## ⚙️ Configuration Options
## 🤝 Contribution Guidelines
## 📞 Contact Information
## 📄 License
## 🙏 Acknowledgments
```

### 3. License Options

| License | Use Case |
|---------|----------|
| MIT | Most permissive, free to use/share/distribute |
| Apache 2.0 | Patent protection |
| GPL | Copyleft, derivatives must be open source |
| BSD | Similar to MIT |

**For freeware projects, MIT License is recommended.**

### 4. .gitignore Template

```gitignore
# Dependencies
node_modules/

# Build outputs
dist/
build/
out/

# Cache
.remotion
*.tsbuildinfo

# OS files
.DS_Store
Thumbs.db

# Environment
.env
.env.local

# IDE
.idea/
.vscode/

# Logs
*.log
npm-debug.log*
```

## GitHub About Section Configuration

### Description Template

```
A [brief description] for [purpose] with [key technologies]
```

### Recommended Topics (Tags)

Common topics for different project types:

**Remotion Projects:**
- remotion
- video-generation
- react
- typescript
- animation
- motion-graphics

**General Web Projects:**
- javascript
- typescript
- react
- nodejs
- web-development

**Template Projects:**
- template
- boilerplate
- starter-kit

### How to Update About Section

1. Go to your repository on GitHub
2. Click the ⚙️ (gear) icon next to "About"
3. Add description
4. Add topics/tags
5. Add website URL (optional)
6. Click "Save changes"

## Repository Structure Best Practices

### Standard Structure

```
project-name/
├── .trae/
│   ├── commands/           # Development commands
│   └── skills/             # Claude Code skills
├── src/                    # Source code
├── docs/                   # Documentation
├── tests/                  # Test files
├── .gitignore
├── LICENSE
├── README.md
├── README_CN.md            # Chinese README (optional)
├── package.json
└── tsconfig.json
```

### File Naming Conventions

| Type | Convention |
|------|------------|
| Components | PascalCase: `MyComponent.tsx` |
| Utilities | camelCase: `myUtility.ts` |
| Constants | UPPER_SNAKE_CASE: `MY_CONSTANT.ts` |
| Tests | `*.test.ts` or `*.spec.ts` |

## Documentation Guidelines

### README Sections

1. **Project Overview** - What the project does
2. **Key Features** - Main capabilities
3. **Installation** - How to install
4. **Usage Guide** - How to use
5. **Configuration** - Available options
6. **Contributing** - How to contribute
7. **Contact** - Maintainer information
8. **License** - Legal information

### Multi-language Support

For international projects, provide:
- English README (`README.md`)
- Chinese README (`README_CN.md`)
- Language switcher at top of each file

**Language Switcher Format:**
```markdown
# Project Name

[简体中文](./README_CN.md) | English
```

## Contribution Guidelines

### CONTRIBUTING.md Template

```markdown
# Contributing Guidelines

## Ways to Contribute
- Report bugs
- Suggest features
- Improve documentation
- Submit pull requests

## Development Setup
1. Fork the repository
2. Clone your fork
3. Install dependencies
4. Create a feature branch
5. Make your changes
6. Submit a pull request

## Code Style
- Follow existing patterns
- Write clear commit messages
- Add tests for new features
```

### Commit Message Format

```
type(scope): description

Types:
- feat: New feature
- fix: Bug fix
- docs: Documentation
- style: Formatting
- refactor: Code restructuring
- test: Adding tests
- chore: Maintenance
```

## Repository Maintenance

### Regular Tasks

| Task | Frequency |
|------|-----------|
| Update dependencies | Monthly |
| Review issues | Weekly |
| Merge pull requests | As needed |
| Update documentation | As needed |
| Security audit | Monthly |

### GitHub Actions (Optional)

Create `.github/workflows/ci.yml` for automated testing:

```yaml
name: CI
on: [push, pull_request]
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm install
      - run: npm test
```

## Troubleshooting

### Common Issues

| Issue | Solution |
|-------|----------|
| Missing LICENSE | Create LICENSE file with MIT or appropriate license |
| No .gitignore | Create .gitignore with standard entries |
| README too short | Add more sections (features, usage, etc.) |
| No topics/tags | Add relevant topics in About section |

## Resources

- [GitHub Documentation](https://docs.github.com/)
- [Choose a License](https://choosealicense.com/)
- [Make a README](https://www.makeareadme.com/)
- [Conventional Commits](https://www.conventionalcommits.org/)

## Related Skills

- `remotion-video-creation` - Creating videos with Remotion
- `writing-docs` - Writing documentation
- `pr` - Creating pull requests
