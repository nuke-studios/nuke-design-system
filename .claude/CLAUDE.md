# Nuke Docs

At the start of each session, run:

```bash
nuke-docs start
```

This loads full project context including:
- Project identity and stack
- System architecture and file structure
- All current tasks
- AI workflow guidelines

After loading context, you'll have everything needed to assist with the project.

## Before ending the session

Before closing or when the user indicates they're done, run:

```bash
nuke-docs end
```

This syncs all changes back to .nuke/ files.
