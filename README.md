# Plan-it

Plan-it is a responsive, offline-capable desktop PWA for task and schedule planning, built with React, TypeScript, and Vite. It adapts to tablets and phones without a simulated device frame.

## Features

- Date-based Today and Upcoming views
- Scheduled and anytime tasks
- Progress tracking and subtasks
- Personal, Work, and Shopping lists
- Search across tasks, notes, and subtasks
- Offline persistence with IndexedDB
- Installable PWA with a service worker
- Local profile preferences and JSON backup export

## Local development

Requirements: Node.js 22 and pnpm 11.

```bash
pnpm install --frozen-lockfile
pnpm dev
```

Run the production verification used by Netlify:

```bash
pnpm run build:netlify
```

## Deploy with GitHub and Netlify

1. Create an empty GitHub repository.
2. Push this project’s `main` branch to it.
3. In Netlify, select **Add new project → Import an existing project** and choose the GitHub repository.
4. Deploy with the settings detected from `netlify.toml`.

No environment variables are required. Netlify installs with pnpm, runs `pnpm run build:netlify`, and serves `dist/client`.

See [NETLIFY_DEPLOYMENT.md](./NETLIFY_DEPLOYMENT.md) for deployment steps and post-deployment PWA checks.

## Data and privacy

Tasks are stored in IndexedDB on the current device. Preferences are stored in localStorage. There is no account system or cross-device sync yet.
