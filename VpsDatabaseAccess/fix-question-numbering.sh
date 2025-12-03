#!/bin/bash

# Fix question numbering in all chapter components
# Replace Q{q.id} with Q{index + 1}

echo "🔧 Fixing question numbering in all chapter components..."

# Find all files with Q{q.id} pattern and replace with indexed numbering
find client/src/components -name "*.tsx" -type f -exec sed -i '' 's/Q{q\.id}\./Q{index + 1}./g' {} \;
find client/src/pages -name "*.tsx" -type f -exec sed -i '' 's/Q{q\.id}\./Q{index + 1}./g' {} \;

# Also need to ensure the map function includes index parameter
# This requires manual review of each file

echo "✅ Pattern replacement complete!"
echo "⚠️  Note: You may need to manually add 'index' parameter to .map() functions"
echo "   Example: questions.map((q, index) => ...)"
