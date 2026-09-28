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

Run the production verification used by Vercel:

```bash
pnpm run build:vercel
```

## Deploy with GitHub and Vercel

1. Create an empty GitHub repository.
2. Push this project’s `main` branch to it.
3. In Vercel, select **Add New → Project** and import the GitHub repository.
4. Deploy with the settings detected from `vercel.json`.

No environment variables are required. Vercel installs with pnpm, runs `pnpm run build:vercel`, and serves `dist/client`.

See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for post-deployment PWA checks.

## Data and privacy

Tasks are stored in IndexedDB on the current device. Preferences are stored in localStorage. There is no account system or cross-device sync yet.
