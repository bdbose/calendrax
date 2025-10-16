#!/bin/bash

# Setup script for Calendrax example

echo "🚀 Setting up Calendrax example..."

# Build the main package
echo "📦 Building main package..."
npm run build

if [ $? -ne 0 ]; then
  echo "❌ Build failed!"
  exit 1
fi

# Link the package
echo "🔗 Linking package..."
npm link

# Navigate to example
cd example

# Install dependencies
echo "📥 Installing example dependencies..."
npm install

# Link calendrax
echo "🔗 Linking calendrax to example..."
npm link calendrax

echo "✅ Setup complete!"
echo ""
echo "To run the example:"
echo "  cd example"
echo "  npm run dev"
echo ""
echo "To run in dev mode with hot reload:"
echo "  Terminal 1: npm run dev (in root)"
echo "  Terminal 2: cd example && npm run dev"

