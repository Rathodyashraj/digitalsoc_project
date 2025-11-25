# Quick Deploy Guide 🚀

## Recommended: Deploy to Vercel (5 minutes)

### Step 1: Push to GitHub
```bash
cd digitalsoc_project
git init
git add .
git commit -m "Ready to deploy"
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) → Sign in with GitHub
2. Click **"Add New Project"**
3. Import your repository
4. Add environment variable: `VITE_GEMINI_API_KEY` = `your_api_key`
5. Click **"Deploy"**
6. Done! 🎉 Your site is live

**That's it!** Every time you push to GitHub, Vercel automatically deploys.

---

## Alternative: GitHub Pages

1. Push code to GitHub (same as Step 1 above)
2. Go to repo **Settings** → **Secrets** → Add `VITE_GEMINI_API_KEY`
3. Go to **Settings** → **Pages** → Source: **GitHub Actions**
4. Push again to trigger deployment

---

## Get Your Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with Google
3. Click "Create API Key"
4. Copy the key and use it in Vercel/GitHub Secrets

---

## Need Help?

See `DEPLOYMENT.md` for detailed instructions and troubleshooting.

