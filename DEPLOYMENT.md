# Deployment Guide for Digital Soc Project

This guide explains how to deploy the Digital Soc website to **Vercel**.

## Prerequisites

1. A GitHub account
2. A Gemini API key (get it from [Google AI Studio](https://makersuite.google.com/app/apikey))
3. Your code pushed to a GitHub repository

## Environment Variables

The application requires the following environment variables:

- `VITE_GEMINI_API_KEY`: Your Google Gemini API key

⚠️ **Security Warning**: Since this is a Vite app, environment variables prefixed with `VITE_` are exposed to the client-side code. This means your `VITE_GEMINI_API_KEY` will be visible in the browser.

**Recommendations**:
- Use API rate limiting on your Gemini API key
- Set up domain restrictions in Google Cloud Console for your API key
- Consider using a backend proxy to hide the API key (recommended for production)

---

## Deploy to Vercel

Vercel is the best choice for this project because:
- ✅ Zero configuration needed
- ✅ Automatic SPA routing support
- ✅ Easy environment variable management
- ✅ Free tier with excellent performance
- ✅ Automatic deployments from GitHub
- ✅ Fast global CDN

### Step-by-Step Instructions:

#### 1. Push Your Code to GitHub

```bash
# If you haven't already, initialize git and push to GitHub
cd digitalsoc_project
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

#### 2. Deploy to Vercel

**Method A: Using Vercel Dashboard (Easiest)**

1. Go to [vercel.com](https://vercel.com) and sign up/login with GitHub
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Configure the project:
   - **Framework Preset**: Vite (should auto-detect)
   - **Root Directory**: `digitalsoc_project` (if your repo root is the parent folder)
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `dist` (auto-filled)
5. **Add Environment Variable**:
   - Click "Environment Variables"
   - Add: `VITE_GEMINI_API_KEY` = `your_actual_api_key_here`
6. Click **"Deploy"**
7. Wait 1-2 minutes for the build to complete
8. Your site will be live at `https://your-project-name.vercel.app`

**Method B: Using Vercel CLI**

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to your project
cd digitalsoc_project

# Deploy
vercel

# Follow the prompts:
# - Link to existing project? No (first time)
# - Project name? (choose a name)
# - Directory? ./ (or digitalsoc_project if in parent)
# - Override settings? No

# Add environment variable
vercel env add VITE_GEMINI_API_KEY
# Enter your API key when prompted

# Redeploy with environment variable
vercel --prod
```

#### 3. Automatic Deployments

- Every push to `main` branch automatically triggers a new deployment
- Preview deployments are created for pull requests
- You can see deployment status in the Vercel dashboard

#### 4. Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Click "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions
5. SSL certificate is automatically provisioned

---

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version (Vercel uses Node 20 by default)

### Environment Variables Not Working
- Ensure variable name starts with `VITE_`
- Redeploy after adding environment variables
- Check browser console for errors

### Routing Issues (404 on refresh)
- The `vercel.json` file handles this automatically
- If issues persist, check the rewrites configuration

### API Errors
- Verify your Gemini API key is correct
- Check API quota and rate limits
- Review browser console for specific error messages

---

## Updating Your Deployment

- Just push to GitHub - automatic deployment happens
- Or use `vercel --prod` from CLI

---

## Need Help?

- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **Vite Deployment Guide**: [vitejs.dev/guide/static-deploy](https://vitejs.dev/guide/static-deploy)
