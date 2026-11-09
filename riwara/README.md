# RIWARA — The Art of Luxury

Status: **foundation phase only.** See `docs/STATUS.md` for what exists and what does not.

## Setup
1. `npm install` (generates `package-lock.json` — commit it)
2. Copy `.env.example` to `.env` and fill in values (never commit `.env`)
3. `npx prisma migrate dev --name init` (creates the first migration from `prisma/schema.prisma`)
4. `npm run db:seed`
5. `npm run admin:create` (set `ADMIN_BOOTSTRAP_EMAIL` / `ADMIN_BOOTSTRAP_PASSWORD` first, then remove them)
6. `npm run dev`
