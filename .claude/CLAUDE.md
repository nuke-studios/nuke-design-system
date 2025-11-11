# Claude Instructions (Universal)

**This file is the same for ALL projects. Never change it. Copy as-is.**

---

## MANDATORY Workflow

### 1. Read Project Files
**ALWAYS start by reading:**
1. `.claude/PROJECT.md` - What is this project? Tech stack, patterns, commands
2. `.claude/TODO.md` - What's done vs pending

### 2. Show Current State
Display clearly:
```
✅ WORKING: [what's done]
⏸️ PENDING: [what needs to be built]
🎯 PRIORITY: [most important next feature]
```

### 3. Ask What to Work On

**Use AskUserQuestion to present options** based on project areas from PROJECT.md.

Example:
```
Question: "Which area should we work on?"
Header: "Work Area"
Options: [Studio - Admin UI, Backend - API, Demo/Fresh Start, Release Build]
```

**🛑 STOP. Wait for user to choose.**

### 4. Define ONE Feature
Ask: "Which ONE specific feature should I build?"

Be specific:
- ✅ "User login form with validation"
- ❌ "Build the whole auth system" (too broad)

**🛑 STOP. Wait for user to pick ONE feature.**

### 5. Show Plan (3-5 Bullets ONLY!)

**Keep it SHORT. No essays. Just the key decisions.**

Format:
```
Building [feature]:
- [Key decision 1: component/service/location]
- [Key decision 2: data approach]
- [Key decision 3: UI/styling approach]
- [Key decision 4: any library/pattern choice]
🛑 Approved?
```

Example:
```
Building Collection List:
- New page component (pages/collection-list/)
- Fetch with resource() API
- Display with @for + theme vars
- Pagination (10 per page)
🛑 Approved?
```

**Use AskUserQuestion for approval:**
```
Question: "Is this plan approved?"
Header: "Approval"
Options:
  - "Approved" → Proceed to TodoWrite and coding
  - "Needs changes" → Discuss modifications
  - "Different approach" → Explore alternatives
```

If "Other" selected, user provides specific feedback.

**🛑 STOP. Wait for user approval.**

### 6. Create TodoWrite Tasks (After Approval)
Once approved, create detailed TodoWrite task breakdown:
- List ALL steps needed
- Reference patterns from PROJECT.md
- Show which files will be created/modified

### 7. Build (ONLY After Approval)
- Build ONLY the approved feature
- Follow patterns from PROJECT.md
- Mark tasks in_progress → completed as you go
- If blocked, STOP and ask

### 8. Test (USER MUST TEST)
- Tell user: **"Feature built. Please test it."**
- Wait for feedback
- Fix bugs they find
- **Do NOT commit until user confirms it works**

**🛑 STOP. Wait for user confirmation.**

### 9. Document & Commit
Only when user says it works:
1. Commit with clear message
2. Update TODO.md (move feature from pending to done)
3. **Use AskUserQuestion for next steps:**
```
Question: "What would you like to do next?"
Header: "Next Step"
Options:
  - "Build next feature" → Continue development
  - "Refine current feature" → Make improvements
  - "Take a break" → Pause work
  - "Switch project area" → Work on different area
```

---

## CLI Command Boundaries (CRITICAL)

**🚨 The user runs ALL CLI commands. You ONLY write code.**

### BEFORE Suggesting ANY Command - MANDATORY CHECKLIST

**STOP. Check PROJECT.md FIRST:**
- [ ] Is this Angular CLI or NX workspace?
- [ ] What's the documented command prefix? (`ng` vs `nx`)
- [ ] Does this command match the Commands section in PROJECT.md?

**If you haven't checked PROJECT.md before suggesting a command, YOU'RE DOING IT WRONG.**

### This Project Uses: ANGULAR CLI (NOT NX)

**Generator Commands:**
- ✅ CORRECT: `ng g @spartan-ng/cli:ui select`
- ✅ CORRECT: `ng g component my-component`
- ❌ WRONG: `npx nx g @spartan-ng/cli:ui select`
- ❌ WRONG: `nx g component my-component`

**DO NOT assume NX. DO NOT improvise commands. CHECK PROJECT.MD FIRST.**

### Commands USER Runs (NEVER run these yourself):
- `npm install` / `npm uninstall` - Package management
- `ng g` / Angular CLI generators - Code generation
- `npm start` / `npm run dev` - Frontend dev servers
- `./stark serve` / `go run` - Backend servers
- `go build` - Building binaries
- Process management (starting/stopping servers)

### What YOU Do Instead:
1. **Check PROJECT.md for correct command syntax**
2. **Tell the user what command to run**
   - ✅ "Please run: `ng g @spartan-ng/cli:ui select`"
   - ✅ "Run `npm install lucide-angular` to add icons"
   - ✅ "Start the backend with `./stark serve`"

3. **Wait for user confirmation**
   - User runs the command
   - User tells you it's done or pastes output
   - Then you proceed with code changes

4. **Save tokens**
   - Don't waste time in loops checking command output
   - Don't kill/restart processes
   - Let user manage their environment

### Exception: Read-Only Commands
You CAN run these (they don't change state):
- `git status` / `git diff` / `git log`
- `ls` / `pwd` (checking directory structure)
- `cat` / reading files (though prefer Read tool)
- Test runners (if explicitly approved)

**Why this matters:**
- Saves tokens (no waiting/polling loops)
- User controls their environment
- Clearer separation of responsibilities
- Faster workflow
- **Prevents telling user wrong commands for their setup**

---

## User Interaction Pattern

### When to Use AskUserQuestion Tool

Use the `AskUserQuestion` tool for ALL structured choice-based interactions:

✅ **Use AskUserQuestion when:**
- Presenting work area options (Step 3)
- Asking for plan approval (Step 5)
- Offering implementation alternatives
- Library vs. custom build decisions
- Next steps after feature completion
- Handling workflow interruptions

❌ **Don't use AskUserQuestion when:**
- Asking open-ended questions ("What should this feature do?")
- Requesting specific technical details
- Debugging or clarifying requirements
- User provides free-form input

### Tool Usage Guidelines

- Present 2-4 clear, mutually exclusive options
- Include "Other" option (automatically available)
- Use concise headers (max 12 chars)
- Provide context in option descriptions
- Set multiSelect: true only when choices aren't mutually exclusive

### Common Patterns

**Work area selection:**
```
Question: "Which area should we work on?"
Header: "Work Area"
Options: [Frontend, Backend, Database, Testing, Documentation]
```

**Plan approval:**
```
Question: "Is this plan approved?"
Header: "Approval"
Options: ["Approved", "Needs changes", "Different approach"]
```

**Library decision:**
```
Question: "Should I use [library] for this feature?"
Header: "Approach"
Options: ["Use [library]", "Build custom"]
Include trade-offs in descriptions
```

---

## Core Rules (NEVER BREAK THESE)

### Plan-First Approach
**ALWAYS show the 3-5 bullet plan BEFORE any coding.**

This catches crucial decisions:
- "Wait, should we use a design system for this?"
- "Use [pattern X] not [pattern Y]!"
- "Maybe there's a library for this?"

Even for small features! 3-5 bullets. Get approval. Then code.

### NEVER:
❌ Start coding without approval
❌ Build multiple features at once
❌ Skip user testing before commit
❌ Commit broken code
❌ Add "improvements" not in the plan
❌ Chase rabbit holes
❌ Create documentation files unless explicitly requested
❌ Get "excited" and run wild
❌ Run CLI install/generate commands (npm install, nx generate, etc.) - **ASK USER TO RUN THESE**
❌ Start/stop backend servers - **USER MANAGES THESE**
❌ Start/stop frontend dev servers - **USER MANAGES THESE**
❌ Kill processes unnecessarily

### ALWAYS:
✅ Read PROJECT.md + TODO.md first (every session)
✅ Show current state
✅ Ask which ONE feature to build
✅ Show 3-5 bullet plan
✅ Get approval before coding
✅ Update TodoWrite as you work (one task in_progress at a time)
✅ User tests before commit
✅ Update TODO.md after commit
✅ Stay disciplined and focused
✅ **Tell user what CLI commands to run** (don't run them yourself)

**ONE feature at a time = Progress**

---

## Development Cycle

**IDEA → DESIGN → DEFINE → CODE → TEST → UPDATE DOCS**

1. **IDEA** - What are we building? (from user or TODO.md)
2. **DESIGN** - How should it work? What's the user experience?
3. **DEFINE** - Break it down into tasks (TodoWrite)
4. **CODE** - Implement following patterns from PROJECT.md
5. **TEST** - User tests
6. **UPDATE DOCS** - Update TODO.md

---

## Decision Framework

### Size Assessment
**Is this a small or large feature?**

**Small features** (1-2 files, <50 lines):
- ✅ Just add it and test
- ✅ Use existing patterns
- ✅ No need for external libs

**Large features** (3+ files, complex logic):
- ✅ Use Plan Mode first (`Shift+Tab` twice)
- ✅ Create detailed task breakdown
- ✅ Consider libraries/tools

### Library Decision
**Should we use a library for this?**

**Use a library when:**
- ✅ Complex problem
- ✅ Industry-standard solution exists
- ✅ Would take 100+ lines to build ourselves
- ✅ We want consistent behavior

**Don't use a library when:**
- ❌ Simple problem
- ❌ Adds bloat for tiny feature
- ❌ We can do it in <50 lines
- ❌ Creates unnecessary dependency

**Use AskUserQuestion:**
```
Question: "Should I use [library] for this feature?"
Header: "Approach"
Options:
  - "Use [library]" → Install and integrate (explain benefits)
  - "Build custom" → Implement ourselves (explain simplicity)
```

Include trade-offs in option descriptions.

---

## Plan Mode (For Complex Features)

For multi-step implementations that touch many files:

**Activate Plan Mode:** Press `Shift+Tab` twice → `⏸ plan mode on`

1. Analyze codebase (read-only)
2. Create detailed strategy
3. Iterate with user
4. Exit Plan Mode (`Shift+Tab`)
5. Execute approved plan

Use for: complex refactoring, multi-file features, exploring unfamiliar code.

---

## Handling Quick Requests

**"Remember to add X feature later"** → Add to TODO.md immediately
**"Make a note about Y"** → Add to TODO.md notes section
**"Switch to [area]"** → Start workflow again for new area
**Mid-feature interruption** → **Use AskUserQuestion:**
```
Question: "How should we handle this request?"
Header: "Interruption"
Options:
  - "Finish current feature first" → Complete in-progress work
  - "Switch to new request now" → Context switch immediately
  - "Add to TODO and continue" → Track for later
```

**Everything gets tracked in TODO.md. Nothing gets lost.**

---

## Why These Rules Exist

Without this discipline:
- We build 10 things at once → nothing gets finished
- We chase bugs for hours → waste time
- We lose track → forget requirements
- We create documentation sprawl → confusion

**Follow the workflow. Every time. No exceptions.**

🎯 **ONE feature at a time = Progress**
