#!/bin/bash
set -euo pipefail

# -----------------------------
# Step 1: Select a topic
# -----------------------------
TOPICS=$(find . -maxdepth 1 -type d ! -name ".*" ! -name "." | sed 's|^\./||' | sort)

if [ -z "$TOPICS" ]; then
  echo "❌ No topics found. Create one with ./setup-topic.sh"
  exit 1
fi

echo "📂 Available topics:"
echo "$TOPICS" | nl
echo ""
read -p "Select topic number: " topic_num

TOPIC=$(echo "$TOPICS" | sed -n "${topic_num}p")
[ -n "$TOPIC" ] || { echo "❌ Invalid selection"; exit 1; }

# -----------------------------
# Step 2: Select a file in topic
# -----------------------------
FILES=$(find "$TOPIC" -type f -name "*.js" | sort)
if [ -z "$FILES" ]; then
  echo "❌ No JS files found in $TOPIC"
  exit 1
fi

echo ""
echo "📂 Files in $TOPIC:"
echo "$FILES" | nl
echo ""
read -p "Select file number to run: " file_num

FILE=$(echo "$FILES" | sed -n "${file_num}p")
[ -n "$FILE" ] || { echo "❌ Invalid selection"; exit 1; }

# -----------------------------
# Step 3: Rewrite index.js
# -----------------------------
if [ ! -f index.js ]; then
  echo "// ──────────────────────────────" > index.js
  echo "// AUTO-GENERATED index.js" >> index.js
  echo "// Use switch.sh to select a file to run" >> index.js
  echo "// ──────────────────────────────" >> index.js
fi

HEADER=$(sed -n '1,/AUTO-GENERATED/p' index.js)

cat > index.js << EOF
$HEADER

// ⚠️ AUTO-GENERATED
// Currently testing: $FILE
import './$FILE';

// Other files (commented):
EOF

find . -type f -name "*.js" ! -path "*/node_modules/*" ! -path "./index.js" | sort | while read -r f; do
  [ "$f" != "$FILE" ] && echo "// import './$f';" >> index.js
done

# -----------------------------
# Step 4: Run the file
# -----------------------------
echo ""
echo "✅ Now testing: $FILE"
node index.js
