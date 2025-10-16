# 🚀 Quick Start Guide

## Test Locally

\`\`\`bash
# 1. Build
npm run build

# 2. Setup example
npm run setup:example

# 3. Run example
cd example
npm run dev
\`\`\`

## Publish to NPM

\`\`\`bash
# 1. Update package.json (author, repository)
# 2. Run checks
npm run prepare:publish

# 3. Login and publish
npm login
npm publish
\`\`\`

## File Structure

\`\`\`
calendrax/
├── src/              # Source code
├── dist/             # Built package (generated)
├── example/          # Next.js example
├── scripts/          # Helper scripts
├── .github/          # GitHub Actions
└── docs/             # Documentation
\`\`\`

## Available Scripts

- \`npm run build\` - Build the package
- \`npm run dev\` - Dev server
- \`npm run lint\` - Lint code
- \`npm run setup:example\` - Setup example
- \`npm run prepare:publish\` - Pre-publish checks

## Next Steps

1. Update \`author\` in package.json
2. Add GitHub repository URL
3. Test with \`npm run setup:example\`
4. Publish with \`npm publish\`

See SETUP_COMPLETE.md for detailed information.
