#!/bin/bash
# Usage: ./switch.sh                              (interactive menu)
# Usage: ./switch.sh streams                      (filter by topic)
# Usage: ./switch.sh streams/exercise-02.js       (direct file)

FILTER=$1

# If argument looks like a file path (contains .js), use it directly
if [[ "$FILTER" == *.js ]]; then
  FILE=$FILTER

  if [ ! -f "$FILE" ]; then
    echo "❌ File not found: $FILE"
    exit 1
  fi
else
  # Interactive mode or filtered mode

  # Get all exercise files
  ALL_FILES=$(find . -name "*.js" -type f \( -name "exercise-*.js" -o -name "mini-project.js" \) ! -path "*/node_modules/*" ! -path "*/.*" | sed 's|^\./||' | sort)

  # If filter provided, filter by topic
  if [ -n "$FILTER" ]; then
    FILES=$(echo "$ALL_FILES" | grep "^$FILTER/")
    if [ -z "$FILES" ]; then
      echo "❌ No files found for topic: $FILTER"
      echo ""
      echo "💡 Available topics:"
      echo "$ALL_FILES" | sed 's|/.*||' | sort -u | sed 's/^/   - /'
      exit 1
    fi
    echo "📂 Files in '$FILTER':"
  else
    FILES=$ALL_FILES

    # Show topics summary first
    echo "📚 Available topics:"
    echo ""
    TOPICS=$(echo "$FILES" | sed 's|/.*||' | sort -u)
    echo "$TOPICS" | nl | sed 's/^/   /'
    echo ""
    echo "💡 Tip: Run './switch.sh <topic>' to filter by topic"
    echo "   Example: ./switch.sh streams"
    echo ""
    echo "─────────────────────────────────────"
    echo "📂 All files:"
  fi

  echo ""
  echo "$FILES" | nl
  echo ""

  read -p "Enter number to test: " num

  if [ -z "$num" ]; then
    echo "❌ No selection made"
    exit 1
  fi

  FILE=$(echo "$FILES" | sed -n "${num}p")

  if [ -z "$FILE" ]; then
    echo "❌ Invalid selection"
    exit 1
  fi
fi

# Check if file exists
if [ ! -f "$FILE" ]; then
  echo "❌ File not found: $FILE"
  exit 1
fi

# Create backup of index.js if it doesn't exist
if [ ! -f "index.js.backup" ]; then
  cp index.js index.js.backup
fi

# Read the header from index.js (everything before imports)
HEADER=$(sed -n '1,/IMPORT MODULES HERE/p' index.js)

# Write new index.js with only the selected file uncommented
cat > index.js << EOF
$HEADER

// ──────────────────────────────────────
// Currently testing: $FILE
// ──────────────────────────────────────

import './$FILE';

EOF

# Add all other files as commented imports for reference
echo "// ──────────────────────────────────────" >> index.js
echo "// Other available modules (commented):" >> index.js
echo "// ──────────────────────────────────────" >> index.js
find . -name "*.js" -type f \( -name "exercise-*.js" -o -name "mini-project.js" \) ! -path "*/node_modules/*" ! -path "*/.*" | sed 's|^\./||' | sort | while read -r module; do
  if [ "$module" != "$FILE" ]; then
    echo "// import './$module';" >> index.js
  fi
done

echo ""
echo "✅ Now testing: $FILE"
echo ""

# Check if nodemon is running
if pgrep -f "nodemon" > /dev/null; then
  echo "🔄 Nodemon detected - file will reload automatically"
  echo "   Check your terminal running 'npm start' to see output"
else
  echo "🚀 Running once (tip: use 'npm start' for auto-reload)..."
  echo ""
  node index.js
fi

echo ""
