# 📝 NoteVault - Personal Notes App with Tags (MERN Stack)

A modern full-stack MERN application for managing personal notes with rich tagging, color coding, search, pinning, and favorites.

[![Deploy to Render](https://render.com/images/deploy-to-render-button.svg)](https://render.com/deploy?repo=https://github.com/N-SAI-VENKATA-TEJA/personal-notes-mern)

---

## 🌟 Key Features

- **🏷️ Tag Management**:
  - Add multiple custom tags per note using dynamic interactive pills.
  - Sidebar tag browser displaying real-time note counts per tag.
  - Tag filtering with one click.
  - Tag auto-suggestions from previously created tags.

- **📌 Organization & Hierarchy**:
  - **Pin to Top**: Keep critical notes pinned in a dedicated prominent section.
  - **Favorites**: Star your most loved notes and filter by favorites.
  - **Sort**: Sort notes by Newest first, Oldest first, or Alphabetical (Title A-Z).

- **🔍 Instant Search**:
  - Real-time search across titles, note content, and tags.
  - Clear search with single-click reset.

- **🎨 Color Labels**:
  - 10 curated color themes for visual classification.
  - Clean card headers with color accents.

- **💎 Modern Aesthetic**:
  - Sleek dark theme with glassmorphism header & sidebar.
  - Micro-animations, responsive layout, and mobile-friendly drawer menu.
  - Toast notifications for user feedback.

---

## 🚀 Live Deployment on Render (Step-by-Step)

The project includes [`render.yaml`](./render.yaml) preconfigured for zero-setup deployment.

### Option A: 1-Click Blueprint Deploy
1. Click the button below:  
   👉 **[Deploy to Render](https://render.com/deploy?repo=https://github.com/N-SAI-VENKATA-TEJA/personal-notes-mern)**
2. Sign in to your Render account.
3. Render will detect `render.yaml` automatically.
4. Click **Apply** / **Deploy**. Your service will be live at:
   `https://personal-notes-vault.onrender.com` (or your chosen sub-domain).

### Option B: Manual Web Service Setup
1. Go to [Render Dashboard](https://dashboard.render.com/) > **New +** > **Web Service**.
2. Connect repository: `N-SAI-VENKATA-TEJA/personal-notes-mern`.
3. Configure settings:
   - **Name**: `personal-notes-vault` (gives you `personal-notes-vault.onrender.com`)
   - **Environment**: `Node`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
4. Add Environment Variables:
   - `NODE_ENV`: `production`
   - `MONGO_URI`: `mongodb+srv://saivenkatanakkina_db_user:FSsScvC1vcJLcnZT@cluster0.dhn8pck.mongodb.net/personal_notes_app?retryWrites=true&w=majority`
5. Click **Create Web Service**.

---

## 🛠️ Technology Stack

- **Frontend**: React 18, React Icons, React Toastify, Vanilla CSS design system.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB Atlas with Mongoose ODM & Text indexes.
- **Deployment**: Render Web Service (unified monolithic build serving API + SPA).

---

## 💻 Local Development

```bash
# Clone the repository
git clone https://github.com/N-SAI-VENKATA-TEJA/personal-notes-mern.git
cd personal-notes-mern

# Install root dependencies
npm install

# Install client dependencies
cd client && npm install && cd ..

# Start in development mode (Express on :5000 + React on :3000)
npm run dev

# Or build and run production bundle
npm run build
npm start
```
