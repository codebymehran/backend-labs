#!/bin/bash
set -euo pipefail

FILTER=${1:-}

# -----------------------------
# Resolve file
# -----------------------------
if [[ "$FILTER" == *.js ]]; then
  FILE="$FILTER"
  [ -f "$FILE" ] || { echo "❌ File not found: $FILE"; exit 1; }
else
  ALL_FILES=$(find . -type f \
    \( -name "exercise-*.js" -o -name "mini-project.js" \) \
    ! -path "*/node_modules/*" ! -path "*/.*" |
    sed 's|^\./||' | sort)

  if [ -n "$FILTER" ]; then
    FILES=$(echo "$ALL_FILES" | grep "^$FILTER/") || true
    [ -n "$FILES" ] || { echo "❌ No files found for topic: $FILTER"; exit 1; }
  else
    FILES="$ALL_FILES"
    echo "📚 Available topics:"
    echo "$FILES" | sed 's|/.*||' | sort -u | nl
    echo ""
  fi

  echo "$FILES" | nl
  echo ""
  read -p "Select file number: " num

  FILE=$(echo "$FILES" | sed -n "${num}p")
  [ -n "$FILE" ] || { echo "❌ Invalid selection"; exit 1; }
fi

# -----------------------------
# index.js rewrite (intentional)
# -----------------------------
[ -f index.js ] || { echo "❌ index.js not found"; exit 1; }

HEADER=$(sed -n '1,/IMPORT MODULES HERE/p' index.js)

cat > index.js << EOF
$HEADER

// ⚠️ AUTO-GENERATED FILE
// Managed by switch.sh
// Currently testing: $FILE

import './$FILE';

EOF

echo "// ──────────────────────────────────────" >> index.js
echo "// Other available modules (commented):" >> index.js
echo "// ──────────────────────────────────────" >> index.js

find . -type f \
  \( -name "exercise-*.js" -o -name "mini-project.js" \) \
  ! -path "*/node_modules/*" ! -path "*/.*" |
  sed 's|^\./||' | sort |
while read -r f; do
  [ "$f" != "$FILE" ] && echo "// import './$f';" >> index.js
done

echo ""
echo "✅ Now testing: $FILE"
echo ""

if pgrep -f nodemon >/dev/null; then
  echo "🔄 Nodemon detected — auto-reload active"
else
  node index.js
fi

echo ""
