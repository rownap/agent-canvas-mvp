# AgentCanvas Web

Next.js dashboard and marketing site for AgentCanvas.

## Getting Started

```bash
npm ci
cp .env.example .env.local
npm run dev
```

The app runs on [http://localhost:5005](http://localhost:5005).

## Environment

Use `.env.example` as the template:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=replace_with_your_supabase_anon_key
NEXT_PUBLIC_API_URL=http://localhost:3001
```

## Checks

```bash
npm run lint
npm run build
```

## Notes

The marketing site builds without real Supabase credentials for portfolio/demo review. Login and dashboard data require a real Supabase project.

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
