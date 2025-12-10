#!/bin/bash
# Usage: ./setup-topic.sh modules/events

TOPIC_PATH=$1

if [ -z "$TOPIC_PATH" ]; then
  echo "❌ Please provide a topic path"
  echo "Usage: ./setup-topic.sh modules/events"
  exit 1
fi

TOPIC_NAME=$(basename "$TOPIC_PATH")
CURRENT_DATE=$(date +"%B %d, %Y")

mkdir -p "$TOPIC_PATH"

cat > "$TOPIC_PATH/README.md" << 'TEMPLATE'
# __TOPIC_NAME__

**Date:** __DATE__

---

## Exercises
<!-- Paste your exercises here from AI -->

---

## Quick Reference
```javascript
// Common methods/patterns
```

---

## Mini Tutorials
<!-- Your notes, explanations, gotchas go here -->

---

## Progress
- [ ] Exercise 1
- [ ] Exercise 2
- [ ] Exercise 3
- [ ] Exercise 4
- [ ] Exercise 5
- [ ] Exercise 6
- [ ] Exercise 7
TEMPLATE

sed -i '' "s|__TOPIC_NAME__|$TOPIC_NAME|g" "$TOPIC_PATH/README.md"
sed -i '' "s|__DATE__|$CURRENT_DATE|g" "$TOPIC_PATH/README.md"

for i in {1..7}; do
  if [ $i -lt 10 ]; then
    FILE_NUM="0$i"
  else
    FILE_NUM="$i"
  fi

  cat > "$TOPIC_PATH/exercise-$FILE_NUM.js" << 'TEMPLATE'
// Date: __DATE__
// Exercise __NUM__: [Brief description]

console.log('\n📂 Running: __TOPIC_PATH__/exercise-__FILE_NUM__.js');
console.log('─'.repeat(50));

// ============================================
//! ✅ WORKING SOLUTION
// ============================================


















console.log('\n\n\n✅ Exercise complete!');

// ============================================
//! 📝 REFACTORING NOTES
// ============================================
//* What I learned:
// -
//
//* What I'd change if I came back:
// -
//
//* Questions I still have:
// -


// ============================================
//? 📈 Mini Tutorials 📖
// ============================================







TEMPLATE

  sed -i '' "s|__DATE__|$CURRENT_DATE|g" "$TOPIC_PATH/exercise-$FILE_NUM.js"
  sed -i '' "s|__NUM__|$i|g" "$TOPIC_PATH/exercise-$FILE_NUM.js"
  sed -i '' "s|__FILE_NUM__|$FILE_NUM|g" "$TOPIC_PATH/exercise-$FILE_NUM.js"
  sed -i '' "s|__TOPIC_PATH__|$TOPIC_PATH|g" "$TOPIC_PATH/exercise-$FILE_NUM.js"
done

echo "✅ Created $TOPIC_PATH with README and 7 exercise files!"
echo "📁 Structure:"
echo "   $TOPIC_PATH/"
echo "   ├── README.md"
echo "   ├── exercise-01.js"
echo "   ├── exercise-02.js"
echo "   ├── exercise-03.js"
echo "   ├── exercise-04.js"
echo "   ├── exercise-05.js"
echo "   ├── exercise-06.js"
echo "   └── exercise-07.js"
