# Bazar Dor (বাজার দর)

A Bangla web app for checking daily market prices of essential goods such as rice, lentils, oil, vegetables, fish, meat, eggs and spices. Users can browse prices by category, see market-wise price details for each product, and sign in with email/password, Google or GitHub.

**Live demo:** https://b14-a7-bazar-dor-x2ym.vercel.app

## Features

- Home page with a hero section, "prices went up" and "prices went down" sections, and a full product list
- Live price ticker (marquee) showing today's price and percentage change
- Category pages with sorting (default, price low to high, price high to low, biggest rise, biggest fall)
- Product details page with a price summary (lowest, highest, average) and a market-wise price table
- Authentication with [Better Auth](https://www.better-auth.com): email/password, Google and GitHub
- Profile page to view account info and update your name
- Toast notifications for sign in, sign up, sign out, profile update and validation errors
- Skeleton loaders, custom 404 page and loading page
- Fully responsive layout, all text and numbers in Bangla

## Tech Stack

| Area | Technology |
| --- | --- |
| Framework | Next.js (App Router, TypeScript) |
| Styling | Tailwind CSS |
| Authentication | Better Auth |
| Database | MongoDB (Atlas) |
| Notifications | Sonner |
| Ticker | react-marquee-text |
| Data | Bazardor REST API |
| Deployment | Vercel |

## Pages

| Route | Description |
| --- | --- |
| `/` | Home: hero, price up, price down, all products |
| `/category/[slug]` | Products of one category with sorting |
| `/product/[slug]` | Product details and market-wise prices |
| `/sign-in` | Sign in (email/password, Google, GitHub) |
| `/sign-up` | Create an account |
| `/profile` | Account info and name update (login required) |

## Project Structure

```
src/
├── app/
│   ├── api/auth/[...all]/route.ts   # Better Auth route handler
│   ├── category/[slug]/page.tsx
│   ├── product/[slug]/page.tsx
│   ├── profile/page.tsx
│   ├── sign-in/page.tsx
│   ├── sign-up/page.tsx
│   ├── layout.tsx                   # Header, Marquee, Footer, Toaster
│   ├── page.tsx                     # Home page
│   ├── loading.tsx
│   └── not-found.tsx
├── components/
│   ├── Header.tsx
│   ├── Marquee.tsx
│   ├── Footer.tsx
│   ├── MainNews.tsx                 # Hero + "price up" section
│   ├── PriceDown.tsx
│   ├── AllProducts.tsx
│   ├── CategoryProducts.tsx
│   └── ProductCard.tsx
└── lib/
    ├── auth.ts                      # Better Auth server config
    ├── auth-client.ts               # Better Auth client
    └── products.ts                  # API helpers and types
```

## API

Product data comes from the Bazardor API:

```
https://api.api-store.workers.dev/api/bazardor
```

| Endpoint | Description |
| --- | --- |
| `/products` | All products (33 items) |
| `/products?category=chal` | Products of a category |
| `/products?slug=miniket-chal` | A single product |
| `/categories` | All categories (8 items) |

Each product contains: `id`, `slug`, `nameBn`, `category`, `unit`, `image`, `today`, `yesterday`, `lastWeek`, `lastMonth`, `change { dir, pct }` and `markets[]` (market, division, min, max).

## Getting Started

### 1. Clone and install

```bash
git clone <your-repo-url>
cd a7-bazar-dor
npm install
```

### 2. Environment variables

Create a `.env.local` file in the project root:

```env
MONGODB_URI=your_mongodb_connection_string
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=a_long_random_string

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
```

### 3. Run the development server

```bash
npm run dev
```

Open http://localhost:3000.

### 4. Build for production

```bash
npm run build
npm start
```

## OAuth Setup

### Google

1. Open [Google Cloud Console](https://console.cloud.google.com), go to **APIs & Services → Credentials** and create an **OAuth client ID** (Web application).
2. Add these **Authorized JavaScript origins**:
   - `http://localhost:3000`
   - `https://your-vercel-domain.vercel.app`
3. Add these **Authorized redirect URIs**:
   - `http://localhost:3000/api/auth/callback/google`
   - `https://your-vercel-domain.vercel.app/api/auth/callback/google`
4. While the OAuth consent screen is in **Testing** mode, add your Gmail address under **Test users**.

### GitHub

1. Go to **GitHub → Settings → Developer settings → OAuth Apps → New OAuth App**.
2. Set the **Authorization callback URL** to `http://localhost:3000/api/auth/callback/github` (and the Vercel URL for production).

## Deployment (Vercel)

1. Push the project to GitHub and import it in Vercel.
2. Add all environment variables from `.env.local` in **Settings → Environment Variables**. Set `BETTER_AUTH_URL` to your Vercel domain (with `https://`, no trailing slash).
3. In MongoDB Atlas, open **Network Access** and allow access from `0.0.0.0/0` so Vercel can connect.
4. Redeploy after changing any environment variable.

## Notes

- Email verification is turned off, so users can sign in right after signing up.
- If an email/password account already exists with the same email as a Google/GitHub account, account linking is enabled for both providers.
- Prices are indicative and may vary depending on market conditions.

## Author

Akiba, Department of Computer and Communication Engineering, Patuakhali Science and Technology University (PSTU).
