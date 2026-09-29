# Deploy Plan-it to Netlify

1. Push the contents of this folder to GitHub.
2. In Netlify, choose **Add new project → Import an existing project**.
3. Choose the Plan-it GitHub repository.
4. Netlify will detect `netlify.toml` automatically.
5. Confirm the build command is `pnpm run build:netlify` and the publish directory is `dist/client`.
6. Select **Deploy**.

No environment variables are required. After deployment, verify that `/manifest.webmanifest` and `/sw.js` load and that the installed PWA works offline.
