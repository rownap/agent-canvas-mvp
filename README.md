# AgentCanvas

API-first media generation infrastructure for autonomous agents.

AgentCanvas turns structured data into branded social images and short videos. It combines a Next.js dashboard, a Fastify rendering API, Satori/Remotion templates, optional Redis/BullMQ jobs, Supabase auth/history, Stripe billing, and AI/provider integrations.

## What Works Today

- Branded PNG rendering through `POST /v1/render-direct`.
- Next.js marketing site, login screen, dashboard shell, template editor, billing UI, and render history views.
- Fastify API with schema validation, health check, direct rendering, template endpoints, checkout session endpoint, and optional async queue.
- Local/demo mode without Redis: the API starts cleanly and exposes `/health`; async jobs return a clear 503 until `REDIS_URL` is configured.
- Production-provider integrations are scaffolded, but require real Supabase, Stripe, Redis, AI, and storage credentials before launch.

## Repository Structure

```text
apps/
  api/   Fastify rendering API, Remotion renderer, queue workers
  web/   Next.js dashboard and marketing site
```

## Tech Stack

| Layer | Stack |
| --- | --- |
| Web app | Next.js, React, Tailwind CSS |
| API | Fastify, TypeScript, Zod |
| Rendering | Remotion, Satori, Resvg |
| Queue | BullMQ, Redis |
| Data/Auth | Supabase |
| Payments | Stripe |
| AI | OpenAI, Gemini, Replicate |
| Storage | S3-compatible storage / Cloudflare R2 |

## Quick Start

### Backend API

```bash
cd apps/api
npm ci
cp .env.example .env
npm run dev
```

Health check:

```bash
curl http://localhost:3001/health
```

Direct render smoke test:

```bash
curl -X POST http://localhost:3001/v1/render-direct \
  -H 'Content-Type: application/json' \
  -d '{"templateId":"SocialPost","data":{"title":"AgentCanvas smoke test","brandKit":{"colors":{"primary":"#2997FF","secondary":"#1D1D1F","background":"#FFFFFF"},"typography":{"headingFont":"Inter","bodyFont":"Inter"}}},"format":"png"}'
```

### Frontend

```bash
cd apps/web
npm ci
cp .env.example .env.local
npm run dev
```

## Environment

Use `apps/api/.env.example` and `apps/web/.env.example` as templates. Keep real provider credentials only in local or deployment environment variables.

`REDIS_URL` is optional for the direct-render demo. Set it when you want `/v1/render` and `/v1/jobs/:jobId` async queue behavior.

## Verification

Current public repo checks:

```bash
cd apps/api && npm ci && npm run build
cd apps/web && npm ci && npm run lint && npm run build
```

The repo is intentionally not marked as a hosted production app yet. It is a working technical foundation and portfolio case study; the next shipping step is connecting real provider accounts and deploying a public demo.

## Status

MVP / portfolio case study. The code now builds cleanly from a fresh clone, and the API can be smoke-tested locally without Redis. Production deployments must configure provider accounts, rotate any old exposed credentials, and run the verification checklist before launch.

## Security

Do not commit `.env` files, admin scripts with credentials, service-role keys, or production provider secrets. See [SECURITY.md](./SECURITY.md).
