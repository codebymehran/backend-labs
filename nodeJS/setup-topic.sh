#!/bin/bash
set -euo pipefail

# Usage: ./setup-topic.sh streams

TOPIC_PATH=${1:-}

if [ -z "$TOPIC_PATH" ]; then
  echo "❌ Please provide a topic name"
  echo "Usage: ./setup-topic.sh streams"
  exit 1
fi

if [[ "$TOPIC_PATH" =~ [^a-zA-Z0-9/_-] ]]; then
  echo "❌ Topic name contains invalid characters"
  exit 1
fi

TOPIC_NAME=$(basename "$TOPIC_PATH")
CURRENT_DATE=$(date +"%B %d, %Y")

# Cross-platform sed
sed_in_place() {
  if sed --version >/dev/null 2>&1; then
    sed -i "$@"
  else
    sed -i '' "$@"
  fi
}

mkdir -p "$TOPIC_PATH"

# -----------------------------
# README (minimal & intentional)
# -----------------------------
cat > "$TOPIC_PATH/README.md" << 'TEMPLATE'
# __TOPIC_NAME__
**Started:** __DATE__

---

## Layer Philosophy
- 🟢 Layer 1 — Make it work (happy path)
- 🟡 Layer 2 — Improve clarity & structure
- 🔵 Layer 3 — Break it, debug it, optimize it
- 🟣 Layer 4 — Think like production

---

## How to Use This Topic
- Run files using `./switch.sh`
- Complete **all layers** before moving on
- Write reflections inside each exercise file
- Use AI according to the rules defined in each file

---

## Notes
<!-- Any topic-level insights or patterns you notice -->
TEMPLATE

sed_in_place "s|__TOPIC_NAME__|$TOPIC_NAME|g" "$TOPIC_PATH/README.md"
sed_in_place "s|__DATE__|$CURRENT_DATE|g" "$TOPIC_PATH/README.md"

# -----------------------------
# Exercise files
# -----------------------------
for i in {1..5}; do
  FILE_NUM=$(printf "%02d" "$i")

  cat > "$TOPIC_PATH/exercise-$FILE_NUM.js" << 'TEMPLATE'
import chalk from 'chalk';

// Date: __DATE__
// Exercise __NUM__

// 🤖 AI USAGE RULES
// 🟢 Layer 1: syntax help, error explanations only
// 🟡 Layer 2: refactor suggestions (no full rewrites)
// 🔵 Layer 3: debugging challenges, edge cases
// 🟣 Layer 4: production review, security, testing ideas

console.log(chalk.bold('\n📂 Running: __TOPIC_PATH__/exercise-__FILE_NUM__.js'));
console.log(chalk.gray('─'.repeat(60)));

// =============================
// 🟢 Layer 1: Basic Implementation
// 🎯 Question: What is the simplest thing that works?
// =============================




// =============================
// 🟡 Layer 2: Improved Version
// 🎯 Question: How do I make this clearer and cleaner?
// =============================




// =============================
// 🔵 Layer 3: Optimized & Debugged
// 🎯 Question: What breaks, slows down, or behaves incorrectly?
//
// 🧪 Mandatory:
// Ask AI: "Give me 3 realistic bugs or edge cases.
// Do NOT include fixes."
// =============================




// =============================
// 🟣 Layer 4: Production-Ready
// 🎯 Question: Would I be comfortable shipping this?
// =============================




console.log(chalk.green.bold('\n✅ Exercise complete!'));

// ============================================
// 📝 REFLECTION
// ============================================
// - Key differences between layers:
// - Trade-offs I made:
// - What I would revisit later:
TEMPLATE

  sed_in_place "s|__DATE__|$CURRENT_DATE|g" "$TOPIC_PATH/exercise-$FILE_NUM.js"
  sed_in_place "s|__NUM__|$i|g" "$TOPIC_PATH/exercise-$FILE_NUM.js"
  sed_in_place "s|__FILE_NUM__|$FILE_NUM|g" "$TOPIC_PATH/exercise-$FILE_NUM.js"
  sed_in_place "s|__TOPIC_PATH__|$TOPIC_PATH|g" "$TOPIC_PATH/exercise-$FILE_NUM.js"
done

# -----------------------------
# Mini project
# -----------------------------
cat > "$TOPIC_PATH/mini-project.js" << 'TEMPLATE'
import chalk from 'chalk';

// Date: __DATE__
// Mini Project

console.log(chalk.bold('\n📂 Running: __TOPIC_PATH__/mini-project.js'));
console.log(chalk.gray('─'.repeat(60)));

// 🎯 PROJECT GOAL
// Describe what you are building and why

// =============================
// 🟢 Layer 1: MVP
// =============================


// =============================
// 🟡 Layer 2: Enhanced
// =============================


// =============================
// 🔵 Layer 3: Advanced / Optimized
// =============================


// =============================
// 🟣 Layer 4: Professional Grade
// =============================


console.log(chalk.cyan.bold('\n🎉 Mini project complete!'));

// 📝 REFLECTION
// - Biggest challenge:
// - Key design decisions:
// - What I would change in real production:
TEMPLATE

sed_in_place "s|__DATE__|$CURRENT_DATE|g" "$TOPIC_PATH/mini-project.js"
sed_in_place "s|__TOPIC_PATH__|$TOPIC_PATH|g" "$TOPIC_PATH/mini-project.js"

echo ""
echo "✅ Topic '$TOPIC_PATH' created"
echo "📁 Files:"
echo "   - README.md"
echo "   - exercise-01.js → exercise-05.js"
echo "   - mini-project.js"
echo ""
