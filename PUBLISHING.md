# Publishing Guide

This guide explains how to publish the Calendrax package to npm and run the example.

## Prerequisites

- Node.js >= 18
- npm account (https://www.npmjs.com/)
- Git repository

## Step 1: Build the Package

```bash
# Install dependencies
npm install

# Build the library
npm run build
```

This will create the `dist/` folder with:
- `index.cjs.js` - CommonJS bundle
- `index.esm.js` - ES Module bundle
- `types/` - TypeScript definitions
- `styles.css` - Compiled styles

## Step 2: Test Locally

Before publishing, test the package locally with the example:

```bash
# Build the package
npm run build

# Link the package
npm link

# Navigate to example
cd example

# Install dependencies and link
npm install
npm link calendrax

# Run the example
npm run dev
```

Open http://localhost:3000 to see the example.

## Step 3: Update Package Information

Before publishing, update these fields in `package.json`:

```json
{
  "name": "calendrax",
  "version": "0.1.0",
  "author": "Your Name",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/calendrax"
  }
}
```

## Step 4: Login to npm

```bash
npm login
```

Follow the prompts to log in to your npm account.

## Step 5: Publish

```bash
# Dry run to see what will be published
npm publish --dry-run

# Publish to npm
npm publish
```

For scoped packages (e.g., `@yourname/calendrax`):

```bash
npm publish --access public
```

## Step 6: Verify Publication

```bash
# Check if package is available
npm view calendrax

# Install in a test project
npm install calendrax
```

## Versioning

Follow semantic versioning (semver):

- **Patch** (0.1.0 → 0.1.1): Bug fixes
- **Minor** (0.1.0 → 0.2.0): New features (backward compatible)
- **Major** (0.1.0 → 1.0.0): Breaking changes

Update version:

```bash
# Patch
npm version patch

# Minor
npm version minor

# Major
npm version major
```

Then publish again:

```bash
npm publish
```

## Running the Example

### After Publishing

```bash
cd example
npm install calendrax  # Installs from npm
npm run dev
```

### During Development

```bash
# Terminal 1: Watch mode for library
npm run dev

# Terminal 2: Run example with link
cd example
npm link calendrax
npm run dev
```

## Troubleshooting

### Build Errors

```bash
# Clean and rebuild
rm -rf dist
npm run build
```

### Example Not Finding Package

```bash
cd example
rm -rf node_modules package-lock.json
npm install
npm link calendrax
```

### TypeScript Errors

Make sure `tsconfig.json` is properly configured and run:

```bash
npm run build
```

## Files Included in Package

The published package includes:

- ✅ `dist/` - Compiled code
- ✅ `README.md` - Documentation
- ✅ `LICENSE` - MIT License
- ❌ `src/` - Source files (not included)
- ❌ `example/` - Example folder (not included)
- ❌ Config files - vite.config.ts, etc. (not included)

See `.npmignore` for the full exclusion list.

## Next Steps

1. Set up GitHub repository
2. Add CI/CD with GitHub Actions
3. Set up automated releases
4. Create documentation site
5. Add more examples

## Resources

- [npm Publishing Guide](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
- [Semantic Versioning](https://semver.org/)
- [Creating a TypeScript Library](https://www.tsmean.com/articles/how-to-write-a-typescript-library/)

