#!/bin/bash

# Prepare for publishing to npm

echo "🔍 Pre-publish checks..."

# Check if on clean branch
if [[ -n $(git status -s) ]]; then
  echo "⚠️  Warning: You have uncommitted changes"
  read -p "Continue anyway? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    exit 1
  fi
fi

# Run lint
echo "🔍 Running lint..."
npm run lint

if [ $? -ne 0 ]; then
  echo "❌ Lint failed!"
  exit 1
fi

# Run build
echo "📦 Building package..."
npm run build

if [ $? -ne 0 ]; then
  echo "❌ Build failed!"
  exit 1
fi

# Check build output
echo "✅ Checking build output..."
if [ ! -f "dist/index.cjs.js" ]; then
  echo "❌ Missing dist/index.cjs.js"
  exit 1
fi

if [ ! -f "dist/index.esm.js" ]; then
  echo "❌ Missing dist/index.esm.js"
  exit 1
fi

if [ ! -f "dist/styles.css" ]; then
  echo "❌ Missing dist/styles.css"
  exit 1
fi

echo "✅ Build output verified"
echo ""
echo "📦 Package contents:"
npm pack --dry-run

echo ""
echo "✅ Ready to publish!"
echo ""
echo "To publish:"
echo "  npm publish"
echo ""
echo "To publish as beta:"
echo "  npm publish --tag beta"

