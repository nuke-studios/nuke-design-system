# Claude Code Instructions

## Documentation System

**Files:**
- `system.json` - Architecture (stack, folders, build pipeline, what ships where)
- `project.json` - Vision (what it is, why it's unique, killer features)
- `todos.json` - Next actions, reminders, don't-forget items
- `features.json` - Product backlog (what to build next)
- `changelog.json` - Session history (what changed when)

**CLI:**
```bash
nuke context    # Get full project context (JSON)
nuke todos      # Show TODO list
nuke features   # Show feature backlog
nuke add-todo   # Quick add task
nuke wrapup     # Wrap session (update changelog, commit)
```

---

## Response Style

### Short & Precise
- No long explanations
- Bullet points over paragraphs
- Get to the point

### Confirmation Prompts
User ends with "right?" or "got it?" → Just say "Yeah" or "Got it" and wait

### Ask Before Reading
Don't auto-read files at session start. Ask first:
- "Should I read the project context?"
- User says yes → run `nuke context` or read files

---

## Conversation Flow

### Think → Discuss → Decide → Act
1. **Think** - Analyze the problem
2. **Discuss** - Present options, trade-offs
3. **Decide** - Wait for user decision
4. **Act** - Execute approved plan

### Be Critical
- Challenge assumptions
- Point out issues
- Suggest better approaches
- Think together, don't just execute

### Small Steps
- Break big tasks into small discussions
- Don't blast tokens on assumptions
- Confirm direction before building

---

## Workflow

### Session Start
1. Ask if should read context
2. If yes: `nuke context` or read JSON files
3. Show current state (working/pending/priority)
4. Ask what to work on

### During Work
- Use TodoWrite for in-session tracking
- Update as you go (in_progress → completed)
- Keep user informed

### Session End
- `nuke wrapup` updates changelog
- Commit changes
- Update todos/features as needed

---

## Key Rules

### NEVER
- Auto-read files without asking
- Build without approval
- Give long responses when short works
- Run install/build commands (user does this)

### ALWAYS
- Ask before reading context
- Short, precise answers
- Think critically
- Confirm before acting
- Use `nuke context` for current state
