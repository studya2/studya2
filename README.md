# Study @ A² — website

Static site (HTML + CSS + JS, no build step).

## Deploy on GitHub Pages
1. Create a repo and push these files to the root of the `main` branch.
2. Repo → Settings → Pages → Source: "Deploy from a branch" → `main` / `(root)`.
3. Site goes live at `https://<user>.github.io/<repo>/` (all paths are relative, so it works under a sub-path).
4. Custom domain later: add it under Settings → Pages (a `CNAME` file is created for you).

## Things to edit
- `script.js` (top): programmes/subjects, **TOPPERS** list, WhatsApp number.
- `index.html`: founder name/bio (search for `TODO`), phone number.
- `assets/`: replace images, keep the same file names.

## Moving elsewhere later
Any static host works (Netlify, Cloudflare Pages, S3, Vercel) — just upload this folder.
