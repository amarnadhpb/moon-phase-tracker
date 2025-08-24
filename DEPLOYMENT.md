# 🚀 Deployment Guide - Moon Phase Tracker

This guide will help you deploy your Moon Phase Tracker to GitHub Pages.

## 📋 Pre-Deployment Checklist

- [ ] ✅ Project builds successfully (`npm run build`)
- [ ] ✅ All files are committed to git
- [ ] ✅ GitHub repository is created
- [ ] ✅ GitHub Pages is enabled in repository settings

## 🔧 Step-by-Step Deployment

### 1. Create GitHub Repository

1. Go to [GitHub](https://github.com) and click "New repository"
2. Name it: `moon-phase-tracker`
3. Make it **Public** (required for GitHub Pages)
4. Don't initialize with README (we already have one)
5. Click "Create repository"

### 2. Push Your Code

```bash
# Initialize git (if not already done)
git init

# Add your GitHub repository as remote
git remote add origin https://github.com/amarnadhpb/moon-phase-tracker.git

# Add all files
git add .

# Commit changes
git commit -m "Initial commit: Moon Phase Tracker with meteor animations"

# Push to main branch
git push -u origin main
```

### 3. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **Deploy from a branch**
5. Choose **gh-pages** branch
6. Click **Save**

### 4. Deploy to GitHub Pages

```bash
# Install gh-pages if not already installed
npm install --save-dev gh-pages

# Deploy
npm run deploy
```

### 5. Verify Deployment

- Wait 2-5 minutes for deployment to complete
- Visit: `https://amarnadhpb.github.io/moon-phase-tracker/`
- Check that all features work:
  - ✅ Moon phase display
  - ✅ Meteor animations
  - ✅ Star field
  - ✅ Responsive design

## 🔄 Continuous Deployment

The project includes GitHub Actions for automatic deployment:

- **Workflow file**: `.github/workflows/deploy.yml`
- **Trigger**: Every push to `main` branch
- **Automatic**: No manual deployment needed after setup

## 🐛 Troubleshooting

### Build Errors
```bash
# Clear dependencies and reinstall
rm -rf node_modules package-lock.json
npm install

# Try building again
npm run build
```

### Deployment Issues
- Check GitHub Actions tab for error logs
- Ensure repository is public
- Verify GitHub Pages is enabled
- Check branch name matches workflow configuration

### Page Not Loading
- Wait 5-10 minutes for initial deployment
- Check GitHub Pages settings
- Verify repository name matches homepage URL in package.json

## 📱 Testing

After deployment, test on:
- [ ] Desktop browsers (Chrome, Firefox, Safari, Edge)
- [ ] Mobile devices (iOS Safari, Chrome Mobile)
- [ ] Different screen sizes
- [ ] All interactive features

## 🌟 Success!

Your Moon Phase Tracker is now live at:
**https://amarnadhpb.github.io/moon-phase-tracker/**

Share it with the world! 🌙✨
