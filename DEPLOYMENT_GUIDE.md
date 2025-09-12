# 🚀 GitHub Pages Deployment Guide

Your React application needs to be **built** before it can run on GitHub Pages. Here are your options:

## 🎯 Quick Decision Guide

| Option                 | Best For                         | Effort | Risk   |
| ---------------------- | -------------------------------- | ------ | ------ |
| **Replace Everything** | Fresh start, modern site only    | Medium | Medium |
| **Keep Both Versions** | Safety first, gradual transition | Low    | Low    |
| **GitHub Actions**     | Automated deployment             | High   | Low    |

---

## Option 1: 🔄 Replace with Modern Version (Recommended)

**Perfect if:** You want to fully modernize and don't need the old site.

### Steps:

1. **Build and deploy:**

   ```bash
   npm run deploy
   ```

2. **Commit and push:**

   ```bash
   git add .
   git commit -m "Deploy modern React application"
   git push origin main
   ```

3. **Your site will be live at:** `https://yourusername.github.io/`

### ✅ What this does:

- Builds your React app into static files
- Backs up your original files to `backup-original-site/`
- Copies built files to root for GitHub Pages
- Creates necessary files for client-side routing

---

## Option 2: 🛡️ Keep Both Versions (Safest)

**Perfect if:** You want to keep your original site as backup.

### Steps:

1. **Setup dual deployment:**

   ```bash
   node setup-dual-deployment.js
   ```

2. **Choose your approach:**

   **A) Landing page (recommended):**

   - Rename `version-selector.html` to `index.html`
   - Users can choose between classic and modern versions

   **B) Keep original as main:**

   - Keep your original `index.html`
   - Modern version available at `/modern/`

3. **Commit and push:**
   ```bash
   git add .
   git commit -m "Add modern React version alongside original"
   git push origin main
   ```

### 🌐 URLs:

- **Main site:** `https://yourusername.github.io/`
- **Modern version:** `https://yourusername.github.io/modern/`
- **Classic version:** `https://yourusername.github.io/classic/`

---

## Option 3: ⚡ GitHub Actions (Automated)

**Perfect if:** You want automatic deployment when you push code.

### Steps:

1. **Enable GitHub Pages with Actions:**

   - Go to your repository settings
   - Navigate to Pages
   - Select "GitHub Actions" as source

2. **Push the workflow:**

   ```bash
   git add .github/workflows/deploy.yml
   git commit -m "Add GitHub Actions deployment"
   git push origin main
   ```

3. **Future deployments:**
   - Just push code to main branch
   - GitHub automatically builds and deploys

### ✅ Benefits:

- Automatic deployment on every push
- No manual build steps
- Professional CI/CD workflow

---

## 🔧 Current Development vs Production

### **Development (npm run dev)**

- Runs on `http://localhost:3000`
- Hot reloading, TypeScript compilation
- All modern features work

### **Production (GitHub Pages)**

- Static files served directly
- Must be built first (`npm run build`)
- All videos and features preserved

---

## 🎥 Video Considerations

Your videos are handled automatically:

- **Development:** Videos served from `/public/Video_Source/`
- **Production:** Videos copied to build output
- **Size:** 109 videos may take time to upload to GitHub
- **Alternative:** Consider using video hosting (YouTube, Vimeo) for faster loading

---

## 🚨 Important Notes

### **Before Deployment:**

1. **Test locally first:**

   ```bash
   npm run build
   npm run preview
   ```

2. **Check all videos work:**

   - Visit `http://localhost:4173/videos`
   - Ensure videos load properly

3. **Verify navigation:**
   - Test all pages and links
   - Check mobile responsiveness

### **After Deployment:**

1. **GitHub Pages may take 5-10 minutes** to update
2. **Clear browser cache** if you don't see changes
3. **Check browser console** for any errors

---

## 🛠️ Troubleshooting

### **Videos not loading?**

- Check file paths are correct
- Ensure videos are in `/public/Video_Source/`
- Verify GitHub repository size limits

### **Routing issues?**

- Ensure `.nojekyll` file exists
- Check `404.html` is created
- Verify client-side routing setup

### **Build errors?**

- Run `npm run lint` to check for issues
- Ensure all TypeScript errors are resolved
- Check browser console for runtime errors

---

## 📋 Quick Commands

```bash
# Build and deploy (Option 1)
npm run deploy

# Setup dual versions (Option 2)
node setup-dual-deployment.js

# Test production build locally
npm run build && npm run preview

# Check for issues
npm run lint
```

---

## 🎉 Ready to Deploy?

Choose your preferred option above and follow the steps. Your modern React portfolio with video integration will be live on GitHub Pages!

**Need help?** Check the browser console for error messages or refer to the troubleshooting section above.
