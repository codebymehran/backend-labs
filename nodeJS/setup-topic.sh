#!/bin/bash
set -euo pipefail

TOPIC=${1:-}
NUM_EXERCISES=${2:-3}  # Default to 3 exercises if not specified

if [ -z "$TOPIC" ]; then
  echo "❌ Please provide a topic name"
  echo "Usage: ./setup-topic.sh topic-name [num-exercises]"
  exit 1
fi

mkdir -p "$TOPIC"

# -----------------------------
# Create exercises
# -----------------------------
for i in $(seq 1 $NUM_EXERCISES); do
  FILE="$TOPIC/exercise-$i.js"
  if [ ! -f "$FILE" ]; then
    cat > "$FILE" << EOF
import chalk from 'chalk';

console.log(chalk.bold.green('✅ Running $FILE'));
EOF
  fi
done

# -----------------------------
# Create mini-project
# -----------------------------
MINI="$TOPIC/mini-project.js"
if [ ! -f "$MINI" ]; then
  cat > "$MINI" << EOF
import chalk from 'chalk';

console.log(chalk.bold.cyan('🎉 Running $MINI'));
EOF
fi

echo "✅ Topic '$TOPIC' created with files:"
ls -1 "$TOPIC"
