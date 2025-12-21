#!/bin/bash
# Usage: ./setup-topic.sh streams

TOPIC_PATH=$1

if [ -z "$TOPIC_PATH" ]; then
  echo "❌ Please provide a topic name"
  echo "Usage: ./setup-topic.sh streams"
  exit 1
fi

TOPIC_NAME=$(basename "$TOPIC_PATH")
CURRENT_DATE=$(date +"%B %d, %Y")

mkdir -p "$TOPIC_PATH"

# Create README
cat > "$TOPIC_PATH/README.md" << 'TEMPLATE'
# __TOPIC_NAME__
**Date:** __DATE__

---

## Exercises
<!-- Paste your 5 exercises here from AI -->

---

## Mini Project
<!-- Paste your mini project idea here after completing exercises -->

---

## Quick Reference
```javascript
// Common methods/patterns you used
```

---

## Key Learnings
<!-- What clicked for you? What was confusing? -->

---

## Progress
- [ ] Exercise 1
- [ ] Exercise 2
- [ ] Exercise 3
- [ ] Exercise 4
- [ ] Exercise 5
- [ ] Mini Project
TEMPLATE

sed -i '' "s|__TOPIC_NAME__|$TOPIC_NAME|g" "$TOPIC_PATH/README.md"
sed -i '' "s|__DATE__|$CURRENT_DATE|g" "$TOPIC_PATH/README.md"

# Prepare imports to add to index.js
IMPORTS_TO_ADD=""

# Create 5 exercise files
for i in {1..5}; do
  FILE_NUM="0$i"
  cat > "$TOPIC_PATH/exercise-$FILE_NUM.js" << 'TEMPLATE'
import chalk from 'chalk';

// Date: __DATE__
// Exercise __NUM__: [Brief description]

console.log(chalk.bold('\n📂 Running: __TOPIC_PATH__/exercise-__FILE_NUM__.js'));
console.log(chalk.gray('─'.repeat(50)));

// =============================
// Layer 1: Basic Implementation
// =============================
console.log(chalk.green.bold('\n🟢 Layer 1: Basic Implementation'));
console.log(chalk.green('─'.repeat(60) + '\n'));

// ? Write the simplest solution that works




// =============================
// Layer 2: Improved Version
// =============================
console.log(chalk.yellow.bold('\n🟡 Layer 2: Improved Version'));
console.log(chalk.yellow('─'.repeat(60) + '\n'));

// ? Refactor for better readability or add error handling




// =============================
// Layer 3: Optimized Solution
// =============================
console.log(chalk.blue.bold('\n🔵 Layer 3: Optimized Solution'));
console.log(chalk.blue('─'.repeat(60) + '\n'));

// ? Focus on performance or advanced patterns




// =============================
// Layer 4: Production-Ready
// =============================
console.log(chalk.magenta.bold('\n🟣 Layer 4: Production-Ready'));
console.log(chalk.magenta('─'.repeat(60) + '\n'));

// ? Add full error handling, edge cases, documentation




console.log(chalk.green.bold('\n✅ Exercise complete!'));

// ============================================
//! 📝 NOTES
// ============================================
//* What I learned:
// -

//* What was confusing:
// -

//* Key differences between layers:
// - Layer 1 vs 2:
// - Layer 2 vs 3:
// - Layer 3 vs 4:
TEMPLATE

  sed -i '' "s|__DATE__|$CURRENT_DATE|g" "$TOPIC_PATH/exercise-$FILE_NUM.js"
  sed -i '' "s|__NUM__|$i|g" "$TOPIC_PATH/exercise-$FILE_NUM.js"
  sed -i '' "s|__FILE_NUM__|$FILE_NUM|g" "$TOPIC_PATH/exercise-$FILE_NUM.js"
  sed -i '' "s|__TOPIC_PATH__|$TOPIC_PATH|g" "$TOPIC_PATH/exercise-$FILE_NUM.js"

  # Add to imports list
  IMPORTS_TO_ADD="${IMPORTS_TO_ADD}// import './$TOPIC_PATH/exercise-$FILE_NUM.js';\n"
done

# Create mini project file
cat > "$TOPIC_PATH/mini-project.js" << 'TEMPLATE'
import chalk from 'chalk';

// Date: __DATE__
// Mini Project: [Project name from AI]

console.log(chalk.bold('\n📂 Running: __TOPIC_PATH__/mini-project.js'));
console.log(chalk.gray('─'.repeat(50)));

// ============================================
//! 🎯 PROJECT GOAL
// ============================================
// [Describe what you're building]


// =============================
// Layer 1: MVP (Minimum Viable Product)
// =============================
console.log(chalk.green.bold('\n🟢 Layer 1: MVP'));
console.log(chalk.green('─'.repeat(60) + '\n'));

// TODO: Get it working with basic functionality




// =============================
// Layer 2: Enhanced Features
// =============================
console.log(chalk.yellow.bold('\n🟡 Layer 2: Enhanced Features'));
console.log(chalk.yellow('─'.repeat(60) + '\n'));

// TODO: Add more features and better UX




// =============================
// Layer 3: Advanced Implementation
// =============================
console.log(chalk.blue.bold('\n🔵 Layer 3: Advanced Implementation'));
console.log(chalk.blue('─'.repeat(60) + '\n'));

// TODO: Use advanced patterns, optimize performance




// =============================
// Layer 4: Professional Grade
// =============================
console.log(chalk.magenta.bold('\n🟣 Layer 4: Professional Grade'));
console.log(chalk.magenta('─'.repeat(60) + '\n'));

// TODO: Complete error handling, testing, documentation




console.log(chalk.cyan.bold('\n🎉 Mini project complete!'));

// ============================================
//! 📝 REFLECTION
// ============================================
//* What I learned by building this:
// -

//* What I'd improve:
// -

//* What I want to explore next:
// -

//* Evolution through layers:
// - Layer 1 → 2:
// - Layer 2 → 3:
// - Layer 3 → 4:
TEMPLATE

sed -i '' "s|__DATE__|$CURRENT_DATE|g" "$TOPIC_PATH/mini-project.js"
sed -i '' "s|__TOPIC_PATH__|$TOPIC_PATH|g" "$TOPIC_PATH/mini-project.js"

# Add mini-project to imports list
IMPORTS_TO_ADD="${IMPORTS_TO_ADD}// import './$TOPIC_PATH/mini-project.js';\n"

# Add imports to index.js
# Find the line with "IMPORT MODULES HERE" and add imports after it
if [ -f "index.js" ]; then
  # Create a temporary marker
  MARKER="// ──────────────────────────────────────"

  # Find the import section and add new imports
  awk -v imports="$IMPORTS_TO_ADD" -v marker="$MARKER" '
    /IMPORT MODULES HERE/ {
      print
      print ""
      print "// '" $TOPIC_NAME "' exercises"
      printf "%s", imports
      next
    }
    { print }
  ' index.js > index.js.tmp && mv index.js.tmp index.js

  echo ""
  echo "✅ Added imports to index.js"
fi

echo ""
echo "✅ Created $TOPIC_PATH with README, 5 exercises, and mini-project!"
echo ""
echo "📁 Structure:"
echo "   $TOPIC_PATH/"
echo "   ├── README.md"
echo "   ├── exercise-01.js"
echo "   ├── exercise-02.js"
echo "   ├── exercise-03.js"
echo "   ├── exercise-04.js"
echo "   ├── exercise-05.js"
echo "   └── mini-project.js"
echo ""
echo "🚀 Next steps:"
echo "   1. Use Raycast snippet: ,practice"
echo "   2. Paste exercises into $TOPIC_PATH/README.md"
echo "   3. Use './switch.sh' to select which file to test"
echo "   4. Complete exercises 1-5 (all 4 layers)"
echo "   5. Get mini-project idea from AI"
echo "   6. Build it in mini-project.js (all 4 layers)"
echo "   7. Move to next topic!"
echo ""
echo "💡 Layer Strategy:"
echo "   🟢 Layer 1: Basic/Toy code - just make it work"
echo "   🟡 Layer 2: Improved - refactor for clarity"
echo "   🔵 Layer 3: Optimized - focus on performance"
echo "   🟣 Layer 4: Production - bulletproof with edge cases"
echo ""
echo "⚡ Quick commands:"
echo "   npm start              # Start nodemon (auto-reload)"
echo "   ./switch.sh            # Interactive file selector"
echo "   ./switch.sh topicName  # Filter by topic"
echo "   ./switch.sh $TOPIC_PATH/exercise-01.js  # Direct test"
echo ""
