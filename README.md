# NINOO App

Premium Next.js workshop platform for services, bookings, repair tracking, blog publishing, shop management, and admin control.

## Local Development

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Backend Status

The app is now wired for a live Supabase backend through the route layer at `src/app/api/backend/collections/[key]/route.ts`.

Current behavior:

- If Supabase env vars are present, shared data is read from and written to Supabase.
- If Supabase env vars are missing, the app falls back to the local browser cache so development can continue.
- Customer cart, pinned items, and simple shop reminders remain browser-local by design.

Shared backend collections now cover:

- services
- blogs
- products
- tracking entries
- booking replies
- bookings
- admin users
- admin history
- shop orders

## Make The Backend Live

### 1. Create a Supabase project

Create a new project in Supabase and wait for the database to finish provisioning.

### 2. Run the schema

Open the SQL editor in Supabase and run the contents of `supabase/schema.sql`.

This creates the `app_collections` table used by the app.

### 3. Add environment variables

Create a local `.env.local` file based on `.env.example` and set:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Notes:

- The current route layer uses `SUPABASE_SERVICE_ROLE_KEY` on the server.
- Keep the service role key secret and only use it in server environments.

### 4. Restart the app

After adding env vars:

```bash
npm run dev
```

At that point, shared content and admin actions will go to Supabase instead of local fallback storage.

### 5. Deploy on Vercel

When you deploy, add the same environment variables in Vercel project settings.

Recommended deployment flow:

1. Push the repo to GitHub.
2. Import the project into Vercel.
3. Add the three Supabase env vars.
4. Redeploy.

## Important Limitation Right Now

Blog and product images are still stored as uploaded data URLs from the client editor. That works, but the next backend step should be moving images into Supabase Storage and saving only the file URL in the database.

## Recommended Next Backend Step

After Supabase env vars are live, the best next move is:

1. Move blog and shop image uploads to Supabase Storage.
2. Replace email reply placeholders with a real mail service.
3. Add protected server-side admin auth instead of client-only demo auth.
