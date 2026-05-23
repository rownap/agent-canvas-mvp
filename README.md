# AgentCanvas

AI media generation infrastructure for autonomous agents.

AgentCanvas is an API-first rendering platform that lets AI agents and workflow tools generate branded images and videos from structured data. It combines a Next.js dashboard with a Fastify rendering API, Remotion templates, queue-based jobs, and cloud storage.

## What It Does

- Generates branded social images and short videos from API payloads.
- Provides a visual dashboard for templates, billing, and render history.
- Uses Remotion for deterministic video/image composition.
- Supports async rendering jobs with Redis/BullMQ.
- Integrates with Supabase, Stripe, OpenAI/Gemini, Replicate, and S3-compatible storage.

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
npm install
cp .env.example .env
npm run dev
```

### Frontend

```bash
cd apps/web
npm install
npm run dev
```

## Environment

The API requires server-side credentials for Supabase, Stripe, AI providers, Redis, and storage. Use `apps/api/.env.example` as the template and keep real values only in local or deployment environment variables.

## Status

MVP / public beta architecture. The current repository is suitable as a portfolio case study and technical foundation; production deployments must rotate secrets, configure provider accounts, and run the build/test checklist before launch.

## Security

Do not commit `.env` files, admin scripts with credentials, service-role keys, or production provider secrets. See [SECURITY.md](./SECURITY.md).
