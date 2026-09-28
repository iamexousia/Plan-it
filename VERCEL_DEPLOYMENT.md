# Deploy Plan-it to Vercel

Plan-it is configured as a Vite PWA with `vercel.json`. Vercel will install dependencies with pnpm, run the production checks and build, and publish `dist/client`.

## Git-based deployment

1. Push this project to a GitHub, GitLab, or Bitbucket repository.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Leave the detected framework as **Vite**. The build command and output directory are already supplied by `vercel.json`.
4. Deploy. No environment variables are required for the current offline-first version.

## CLI deployment

From the project directory, run:

```sh
pnpm dlx vercel
```

After checking the preview deployment, publish it to production with:

```sh
pnpm dlx vercel --prod
```

Vercel will ask you to sign in and select or create the destination project. Do not commit the generated `.vercel` directory.

## Post-deployment checks

- Open the HTTPS production URL and create a task.
- Reload and confirm the task remains available.
- Install the PWA from the browser's install menu.
- Open it once while online, then switch offline and confirm the Today screen and saved tasks still work.
- Confirm `/manifest.webmanifest` and `/sw.js` return HTTP 200.

Tasks are currently stored per device in IndexedDB. They do not sync between devices or user accounts yet.
