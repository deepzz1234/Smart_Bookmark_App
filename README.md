# 🔖 Smart Bookmark Manager

A full-stack bookmark management application that allows users to securely sign in using Google, save personal bookmarks, and experience real-time synchronization across multiple tabs.

🚀 **Live Demo:** https://your-vercel-url.vercel.app  
📂 **GitHub Repository:** https://github.com/your-username/your-repo-name

---

## 📌 Project Overview

This application was built as part of an assignment to demonstrate authentication, database security, realtime data handling, and deployment using modern full-stack technologies.

The app allows users to:

- Sign up and log in using **Google OAuth only**
- Add bookmarks (URL + title)
- View **only their own bookmarks**
- See **real-time updates across multiple tabs**
- Delete their own bookmarks

All data is securely stored and protected using Supabase Row Level Security.

---

## ✨ Features

- 🔐 Google Authentication (Supabase Auth)
- ➕ Add new bookmarks
- 👤 Private user-specific data
- ⚡ Real-time sync between tabs
- 🗑 Delete bookmarks
- 📋 Copy link to clipboard
- ⏳ Loading state handling
- 🎨 Responsive modern UI with Tailwind CSS
- ☁️ Deployed on Vercel

---

## 🏗 Tech Stack

**Frontend**
- Next.js (App Router)
- React

**Backend / BaaS**
- Supabase
  - Authentication
  - PostgreSQL Database
  - Realtime subscriptions

**Styling**
- Tailwind CSS

**Deployment**
- Vercel

---

## 🧠 Application Flow

1. User logs in using Google OAuth
2. Supabase returns authenticated session
3. User adds a bookmark
4. Bookmark is stored with the user's `user_id`
5. Realtime listener updates UI instantly across tabs
6. Row Level Security ensures privacy

---

## 🗄 Database Schema

### Table: `bookmarks`

| Column      | Type      |
|------------|-----------|
| id         | uuid      |
| user_id    | uuid      |
| title      | text      |
| url        | text      |
| created_at | timestamp |

---

## 🔐 Security – Row Level Security (RLS)

Enabled RLS to ensure:

- Users can view only their own bookmarks
- Users can insert their own bookmarks
- Users can delete only their own bookmarks

This guarantees complete data isolation between users.

---

## ⚙️ Local Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/your-repo-name
cd your-repo-name

npm install
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
npm run dev


---

---

# 🚧 Challenges Faced & How I Solved Them

While building this project, I ran into several real-world issues related to React state management, Supabase realtime behavior, authentication handling, and UI layering.  
Also, this was my **first time working with Supabase**, so I had to understand its authentication flow, Row Level Security policies, and realtime subscriptions from scratch.  
This made the learning curve steep but very rewarding.

---

## 1️⃣ Getting started with Supabase (new technology for me)

**Challenge:**  
I had not used Supabase before, so concepts like:

- Google OAuth setup  
- Realtime channels  
- Row Level Security (RLS)  
- Using Supabase with Next.js App Router  

were completely new to me.

**How I overcame it:**  
- Carefully followed the documentation  
- Experimented with small test queries  
- Debugged authentication and database behavior step by step  

By the end of the project, I became comfortable with integrating authentication, database operations, and realtime updates using Supabase.

---

## 2️⃣ Configuring Google OAuth in Google Cloud Console

**Challenge:**  
Setting up Google login required configuration in the Google Cloud Console, which was new to me.

**Issues I faced:**
- Understanding how OAuth consent screen works  
- Choosing the correct user type  
- Adding authorized redirect URIs  
- Matching Supabase callback URL correctly  

A small mismatch in the redirect URL caused the login to fail.

**How I solved it:**  
- Created OAuth credentials in Google Cloud Console  
- Configured the OAuth consent screen properly  
- Added the Supabase redirect URL in the authorized URIs  
- Tested the authentication flow step by step  

After this, Google login worked seamlessly.

---

## 3️⃣ Realtime updates were inconsistent across multiple tabs

**What happened:**  
When I opened the app in two tabs and added a bookmark in one tab, it didn’t always show up in the other tab immediately.

**Why it happened:**  
Although Supabase Realtime was enabled, my component state was not re-fetching data properly after database changes.

**How I fixed it:**  
- Properly configured the Supabase realtime channel  
- Triggered a controlled re-fetch after insert and delete actions  
- Used a refresh key pattern to force synchronization  

This made the updates appear instantly in all open tabs.

---

## 4️⃣ Bookmarks were visible between users (data privacy issue)

**What happened:**  
Initially, logged-in users were able to see bookmarks that didn’t belong to them.

**Why it happened:**  
Row Level Security was not enabled.

**How I fixed it:**  
- Enabled RLS on the bookmarks table  
- Added policies using:

```sql
auth.uid() = user_id
