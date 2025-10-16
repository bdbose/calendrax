# Contributing to Calendrax

Thank you for your interest in contributing to Calendrax! This document provides guidelines for contributing to the project.

## Getting Started

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/bdbose/calendrax.git
   cd calendrax
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Create a branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Running the Development Server

```bash
npm run dev
```

This starts Vite in development mode on http://localhost:5173

### Running the Example

```bash
# Build the package first
npm run build

# Link the package
npm link

# Navigate to example
cd example
npm install
npm link calendrax
npm run dev
```

### Building

```bash
npm run build
```

This creates the production build in the `dist/` folder.

### Linting

```bash
npm run lint
```

## Code Style

- Use TypeScript for all new code
- Follow the existing code style
- Use meaningful variable and function names
- Add comments for complex logic
- Keep functions small and focused

## Component Guidelines

- Components should be reusable and composable
- Use TypeScript interfaces for props
- Export types alongside components
- Add JSDoc comments for public APIs

## CSS Guidelines

- Use CSS modules or scoped styles
- Follow BEM naming convention for classes
- Ensure mobile responsiveness
- Test on different screen sizes

## Commit Messages

Follow conventional commits format:

- `feat: add new feature`
- `fix: bug fix`
- `docs: documentation changes`
- `style: formatting, missing semicolons, etc`
- `refactor: code refactoring`
- `test: adding tests`
- `chore: updating build tasks, packages, etc`

## Pull Request Process

1. Update the README.md with details of changes if needed
2. Update the example if you add new features
3. Ensure all tests pass and there are no linting errors
4. Build the project to ensure it compiles
5. Create a pull request with a clear description

### PR Checklist

- [ ] Code follows the project's code style
- [ ] Tests added/updated (if applicable)
- [ ] Documentation updated (if applicable)
- [ ] Example updated (if applicable)
- [ ] Build passes (`npm run build`)
- [ ] Lint passes (`npm run lint`)

## Reporting Bugs

Use the GitHub issue tracker to report bugs. Include:

- Clear description of the bug
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Environment details (browser, OS, etc.)

## Feature Requests

Feature requests are welcome! Please:

- Check existing issues first
- Provide a clear use case
- Explain why the feature would be useful
- Consider if it fits the project scope

## Questions?

Feel free to open an issue for questions or join discussions.

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

