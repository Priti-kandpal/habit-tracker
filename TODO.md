# Deployment Fix TODO

- [x] Edit package.json: Downgrade eslint to ^8.57.0
- [x] Clean install: rmdir /s node_modules && del package-lock.json && npm install
- [x] Test: npm run lint && npm run build && npm run preview
- [ ] Commit/push for auto-redeploy on Netlify/Vercel

