# Prashant Maskar — Portfolio

Interactive portfolio of **Prashant Maskar** (Senior Software Engineer, Pune, India). Built with React 19, TypeScript, Tailwind CSS, Three.js (Spatial Earth Node), Canvas 2D audio synthesis, and interactive case study explorers.

---

## 🚀 Deploying to GitHub Pages

This repository is pre-configured for automated deployment to **GitHub Pages** using **GitHub Actions**.

### Option A: Automated GitHub Actions Deployment (Recommended)

1. **Push this repository to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit of Prashant Maskar portfolio"
   git branch -M main
   git remote add origin https://github.com/prashantmaskar93/<your-repo-name>.git
   git push -u origin main
   ```

2. **Enable GitHub Pages in your Repository Settings**:
   - Go to your repository on GitHub.
   - Click on **Settings** → **Pages** (under the "Code and automation" section in the left sidebar).
   - Under **Build and deployment** → **Source**, select **GitHub Actions**.

3. **Automatic Deployment**:
   - As soon as you push to `main`, the included workflow in `.github/workflows/deploy.yml` will automatically build and publish your site!
   - Your site will be live at: `https://prashantmaskar93.github.io/<your-repo-name>/`

### 🌐 Optional: Connecting your Custom Domain (`prashantmaskar.tech`)

If you want to serve it directly from your custom domain:
1. In your GitHub repository, go to **Settings** → **Pages**.
2. Under **Custom domain**, enter: `prashantmaskar.tech`.
3. Click **Save** and check **Enforce HTTPS**.
4. In your DNS provider (e.g. Cloudflare, GoDaddy, Namecheap), add:
   - **Apex domain (A records)** pointing to GitHub Pages IP addresses:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - Or a **CNAME record** for `www`:
     ```
     prashantmaskar93.github.io
     ```

---

## 🛠️ Local Development

```bash
# Install dependencies
npm install

# Start local dev server (port 3000)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```
