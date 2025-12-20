# backend-labs

Small backend experiments, APIs, and practice modules using Node.js, Express, databases, authentication, and backend fundamentals.

This repo is my sandbox for learning backend development. It includes small focused experiments, REST API practice, database interactions, and backend concepts built while learning:

- Node.js & Express
- REST APIs
- Authentication (JWT, sessions)
- MongoDB / PostgreSQL
- Middleware
- Error handling
- Backend architecture basics

Each folder is a small, self-contained experiment, not a full application. This helps me practice backend concepts consistently as I learn.

---

## My Learning Workflow

### 1. Create a new topic folder
```bash
./setup-topic.sh modules/events
```

### 2. Get exercises from AI
Use this prompt with any AI:
```
I just learned about [topic] in Node.js.
Give me 5-7 small, focused practice exercises.
Only provide exercise descriptions - NO solutions yet.
```

### 3. Solve exercises
- Open `modules/events/exercise-01.js`
- Write ONE working solution
- Document when/why you'd refactor it

### 4. Track progress
- Update `modules/events/README.md` as you go
- Check off exercises when complete
- Add gotchas when you hit problems

### 5. Apply to projects
- After 2-3 topics, build something real
- Update "Applied In Projects" section
- This connects learning → building

---

## Quick Start Commands

### Week 1-2: Core Modules
```bash
./setup-topic.sh modules/events
./setup-topic.sh modules/fs
./setup-topic.sh modules/path
./setup-topic.sh modules/http
./setup-topic.sh modules/buffer
./setup-topic.sh modules/stream
```

### Week 3-4: Async & APIs
```bash
./setup-topic.sh concepts/promises
./setup-topic.sh frameworks/express
./setup-topic.sh api/rest-api
./setup-topic.sh frameworks/middleware
./setup-topic.sh concepts/error-handling
```

### Week 5-6: Database & Auth
```bash
./setup-topic.sh databases/mongodb
./setup-topic.sh auth/jwt
./setup-topic.sh auth/bcrypt
./setup-topic.sh validation/validation
```

### Week 7-8: Advanced
```bash
./setup-topic.sh realtime/websockets
./setup-topic.sh testing/testing
./setup-topic.sh tools/logging
./setup-topic.sh devops/deployment
```

---

## All Available Topics

<details>
<summary>Click to expand full topic list</summary>
```bash
# Core Modules
./setup-topic.sh modules/events
./setup-topic.sh modules/fs
./setup-topic.sh modules/path
./setup-topic.sh modules/http
./setup-topic.sh modules/https
./setup-topic.sh modules/url
./setup-topic.sh modules/querystring
./setup-topic.sh modules/buffer
./setup-topic.sh modules/stream
./setup-topic.sh modules/util
./setup-topic.sh modules/os
./setup-topic.sh modules/process
./setup-topic.sh modules/child_process

# Networking & Communication
./setup-topic.sh networking/net
./setup-topic.sh networking/dgram
./setup-topic.sh networking/dns
./setup-topic.sh networking/tls
./setup-topic.sh networking/websocket

# Crypto & Security
./setup-topic.sh security/crypto
./setup-topic.sh security/zlib

# Async
./setup-topic.sh async/timers
./setup-topic.sh async/async-hooks
./setup-topic.sh async/promises
./setup-topic.sh async/worker-threads

# File System
./setup-topic.sh filesystem/fs-promises
./setup-topic.sh filesystem/readline
./setup-topic.sh filesystem/file-upload

# Databases
./setup-topic.sh databases/mongodb
./setup-topic.sh databases/postgresql
./setup-topic.sh databases/redis
./setup-topic.sh databases/sqlite

# Web Frameworks
./setup-topic.sh frameworks/express
./setup-topic.sh frameworks/middleware
./setup-topic.sh frameworks/routing
./setup-topic.sh api/rest-api
./setup-topic.sh api/graphql
./setup-topic.sh realtime/websockets

# Authentication
./setup-topic.sh auth/jwt
./setup-topic.sh auth/bcrypt
./setup-topic.sh auth/passport
./setup-topic.sh auth/oauth
./setup-topic.sh auth/cors
./setup-topic.sh auth/helmet

# Testing
./setup-topic.sh testing/jest
./setup-topic.sh testing/mocha
./setup-topic.sh testing/supertest

# Advanced
./setup-topic.sh concepts/error-handling
./setup-topic.sh tools/logging
./setup-topic.sh concepts/environment-vars
./setup-topic.sh tools/debugging
./setup-topic.sh optimization/performance
./setup-topic.sh scaling/clustering
./setup-topic.sh optimization/caching
./setup-topic.sh security/rate-limiting
./setup-topic.sh validation/validation

# File Processing
./setup-topic.sh file-processing/csv
./setup-topic.sh file-processing/json
./setup-topic.sh file-processing/xml
./setup-topic.sh file-processing/streaming
./setup-topic.sh file-processing/images

# Communication
./setup-topic.sh communication/nodemailer
./setup-topic.sh communication/email
./setup-topic.sh communication/notifications

# Templates
./setup-topic.sh templates/ejs
./setup-topic.sh templates/pug
./setup-topic.sh templates/handlebars

# Real-time
./setup-topic.sh realtime/socket-io
./setup-topic.sh realtime/sse
./setup-topic.sh realtime/pub-sub

# API Development
./setup-topic.sh api/design
./setup-topic.sh api/versioning
./setup-topic.sh api/documentation
./setup-topic.sh api/swagger

# DevOps
./setup-topic.sh devops/docker
./setup-topic.sh devops/pm2
./setup-topic.sh devops/nginx
./setup-topic.sh devops/deployment

# Modern Node
./setup-topic.sh modern/esm-modules
./setup-topic.sh modern/top-level-await
./setup-topic.sh modern/fetch-api
```

</details>

---

## Folder Structure
```
backend-labs/
├── setup-topic.sh          # Script to create new topics
├── README.md               # This file
│
├── modules/                # Core Node.js modules
│   ├── events/
│   │   ├── README.md       # Exercises + notes
│   │   ├── exercise-01.js
│   │   └── exercise-02.js
│   └── fs/
│
├── databases/              # Database topics
│   └── mongodb/
│
├── auth/                   # Authentication topics
│   └── jwt/
│
└── projects/               # Real projects (separate folder)
    └── devlog-cli/
```

---

## Need More Exercises?

Just create them manually:
```bash
touch modules/events/exercise-06.js
touch modules/events/exercise-07.js
```

Copy the template from an existing exercise if needed.


# Day 1: Start new topic
./setup-topic.sh modules/events
git add modules/events/
git commit -m "feat: initialize events module learning structure"
## Git Commit Messages

### 1. When Starting a New Topic

```bash
# Simple version
git commit -m "feat: add events module exercises setup"

# Detailed version
git commit -m "feat: initialize events module learning structure

- Created 7 exercise files for events module
- Set up README with exercise descriptions
- Ready to start practicing EventEmitter concepts"
```

**Pattern:**
```bash
git commit -m "feat: initialize [topic-name] learning structure"
```

---

### 2. After Completing Each Exercise

```bash
# Exercise 1-2 (Fundamentals)
git commit -m "learn: complete events exercise 01 - basic EventEmitter"
git commit -m "learn: complete events exercise 02 - multiple listeners"

# Exercise 3-5 (Real-world)
git commit -m "learn: complete events exercise 03 - event with parameters"
git commit -m "learn: complete events exercise 04 - remove listener pattern"
git commit -m "learn: complete events exercise 05 - once-only listener"

# Exercise 6-7 (Edge cases)
git commit -m "learn: complete events exercise 06 - error handling in listeners"
git commit -m "learn: complete events exercise 07 - memory leak prevention"
```

**Pattern:**
```bash
git commit -m "learn: complete [topic] exercise [NN] - [brief description]"
```

---

### 3. When Updating Notes/README

```bash
# Adding quick reference
git commit -m "docs: add events quick reference and gotchas"

# After finishing all exercises
git commit -m "docs: finalize events module notes and mini-tutorials"
```

---

### 4. Complete Workflow Example

```bash
# Day 1: Start new topic
./setup-topic.sh modules/events
./switch.sh topicName
git add modules/events/
git commit -m "feat: initialize events module learning structure"

# Complete Exercise 1
# ... write code ...
git add modules/events/exercise-01.js
git commit -m "learn: complete events exercise 01 - basic EventEmitter"

# Complete Exercise 2
# ... write code ...
git add modules/events/exercise-02.js
git commit -m "learn: complete events exercise 02 - multiple listeners"

# Update README with notes
git add modules/events/README.md
git commit -m "docs: add events quick reference and key patterns"

# Complete remaining exercises
git add modules/events/exercise-03.js
git commit -m "learn: complete events exercise 03 - parameterized events"

git add modules/events/exercise-04.js
git commit -m "learn: complete events exercise 04 - listener removal"

git add modules/events/exercise-05.js
git commit -m "learn: complete events exercise 05 - once listener pattern"

git add modules/events/exercise-06.js
git commit -m "learn: complete events exercise 06 - error handling"

git add modules/events/exercise-07.js
git commit -m "learn: complete events exercise 07 - prevent memory leaks"

# Final documentation
git add modules/events/README.md
git commit -m "docs: finalize events module with mini-tutorials"

# Push when topic is complete
git push origin main
```

---

## Commit Message Prefixes

```bash
feat:   # New topic setup
learn:  # Completed exercise
docs:   # Updated README/notes
fix:    # Fixed a bug in exercise
refactor: # Improved existing solution
```

---

## One-Line Quick Reference

```bash
# Start topic
git commit -m "feat: initialize [topic] learning structure"

# Each exercise
git commit -m "learn: complete [topic] exercise [N] - [what it does]"

# Update notes
git commit -m "docs: add [topic] quick reference and notes"
```

---

## Pro Tip: Batch Commits (Alternative Approach)

If you don't want to commit after every single exercise:

```bash
# Complete all 7 exercises first, then:
git add modules/events/
git commit -m "learn: complete all events module exercises (1-7)

Completed:
- Ex 1-2: Fundamentals (basic EventEmitter, multiple listeners)
- Ex 3-5: Real-world (parameters, removal, once pattern)
- Ex 6-7: Edge cases (error handling, memory leaks)

Updated README with quick reference and mini-tutorials"
```

**Choose based on your style:**
- **Commit per exercise** = Better history, see progress step-by-step
- **Batch commit** = Cleaner history, less commit noise

---



<!-- === MAIN HEADING - Bold Blue -->
<!-- --- Sub Heading - Bold Cyan -->
<!-- ... Minor Heading - Light Blue -->

<!-- * Key point - green -->
<!-- ! CRITICAL - bold red -->
<!-- ? Question - purple italic -->
<!-- ^ footnote - gray italic -->
<!-- @ Example - gold -->

<!-- + Addition - bright green -->
<!-- - Removal - dark red -->
<!-- $ Code - orange -->
<!-- % Bug - magenta -->
<!-- & Related - purple -->
<!-- ~ WIP - cyan -->
<!-- = Formula - dark gold -->
<!-- > Output - olive -->

<!-- todo Action item -->



### For above colors i am using vs Code colorful comments extension and code is below

```json
"colorful-comments.tags": [
    {
      "tag": "===",
      "color": "#0066CC",
      "strikethrough": false,
      "backgroundColor": "transparent",
      "bold": true,
      "italic": false
    },
    {
      "tag": "---",
      "color": "#00A3CC",
      "strikethrough": false,
      "backgroundColor": "transparent",
      "bold": true,
      "italic": false
    },
    {
      "tag": "...",
      "color": "#4A90E2",
      "strikethrough": false,
      "backgroundColor": "transparent",
      "bold": false,
      "italic": false
    },
    {
      "tag": "*",
      "color": "#1FA73F",
      "strikethrough": false,
      "backgroundColor": "transparent",
      "bold": false,
      "italic": false
    },
    {
      "tag": "!",
      "color": "#FF2D00",
      "strikethrough": false,
      "backgroundColor": "transparent",
      "bold": true,
      "italic": false
    },
    {
      "tag": "?",
      "color": "#7D3C98",
      "strikethrough": false,
      "backgroundColor": "transparent",
      "bold": false,
      "italic": true
    },
    {
      "tag": "@",
      "color": "#D68910",
      "strikethrough": false,
      "backgroundColor": "transparent",
      "bold": false,
      "italic": false
    },
    {
      "tag": "^",
      "color": "#474747",
      "strikethrough": false,
      "backgroundColor": "transparent",
      "bold": false,
      "italic": true
    },
    {
      "tag": "todo",
      "color": "#FF8C00",
      "strikethrough": false,
      "backgroundColor": "transparent",
      "bold": false,
      "italic": false
    },
    {
      "tag": "+",
      "color": "#00B050",
      "strikethrough": false,
      "backgroundColor": "transparent",
      "bold": false,
      "italic": false
    },
    {
      "tag": "-",
      "color": "#C70039",
      "strikethrough": false,
      "backgroundColor": "transparent",
      "bold": false,
      "italic": false
    },
    {
      "tag": "//",
      "color": "#999999",
      "strikethrough": true,
      "backgroundColor": "transparent",
      "bold": false,
      "italic": false
    },
    {
      "tag": "$",
      "color": "#E67E22",
      "strikethrough": false,
      "backgroundColor": "transparent",
      "bold": false,
      "italic": false
    },
    {
      "tag": "%",
      "color": "#D4009E",
      "strikethrough": false,
      "backgroundColor": "transparent",
      "bold": false,
      "italic": false
    },
    {
      "tag": "&",
      "color": "#8A4FFF",
      "strikethrough": false,
      "backgroundColor": "transparent",
      "bold": false,
      "italic": false
    },
    {
      "tag": "~",
      "color": "#00CED1",
      "strikethrough": false,
      "backgroundColor": "transparent",
      "bold": false,
      "italic": false
    },
    {
      "tag": "=",
      "color": "#B8860B",
      "strikethrough": false,
      "backgroundColor": "transparent",
      "bold": false,
      "italic": false
    },
    {
      "tag": ">",
      "color": "#556B2F",
      "strikethrough": false,
      "backgroundColor": "transparent",
      "bold": false,
      "italic": false
    }
  ],
```
