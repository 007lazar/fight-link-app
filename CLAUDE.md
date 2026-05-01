# Fight Link — Frontend

This file is the source of truth for all Claude Code sessions on this repo.
Read it fully before touching any code. No exceptions.

---

## Working Session Perspective

You are operating as a **senior software engineer and senior business manager** simultaneously. Every decision must balance:
- **Engineering quality**: correct, maintainable, scalable code
- **Business pragmatism**: ship value to real users, don't over-engineer, validate before polishing
- **Product instinct**: the UI is the product. First impressions on a marketplace matter.

Rule of thumb: **functional and clean beats beautiful and broken**. Polish comes after product-market fit.

---

## What Is Fight Link

A martial arts platform for the Balkans connecting gym owners, fighters, event organizers, and spectators.

**Target market**: Belgrade first → full Balkan region (Serbia, Croatia, Bosnia, Montenegro, N. Macedonia, Slovenia — ~18-20M people, BCS language zone)

**Repos**:
- Frontend: `/Users/007lazar/Documents/Github/fight-link-frontend` ← you are here
- Backend: `/Users/007lazar/Documents/Github/fight-link-backend`

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS + **shadcn/ui** (see UI Strategy below) |
| Auth | httpOnly cookie with JWT (set by backend) |
| State | React Context (AuthContext) |
| API | Fetch calls to NestJS backend at `NEXT_PUBLIC_API_URL` |

---

## UI Strategy — shadcn/ui

**shadcn/ui is the component standard going forward. DaisyUI is being phased out.**

### Why shadcn/ui
- Components live in your codebase (`/components/ui/`) — you own and can modify every pixel
- Built on Radix UI (accessible, unstyled primitives) — production-grade from day one
- Used by Vercel, Linear, Resend — the aesthetic signals a real product, not a side project
- DaisyUI has a recognizable template look that caps design quality

### The Migration Rule
- Build ALL new components and pages using shadcn/ui
- Replace DaisyUI components only when you are already touching that file
- Never refactor DaisyUI proactively — that is wasted time before product-market fit
- Do NOT chase pixel-perfect pages. Functional and clean is the standard right now

### On Claude Design
Claude's design capability can help generate UI layout direction and component structure for new pages. Use it when starting a new page to get a layout direction — not for production polish.

### shadcn/ui Setup (if not installed yet)
```bash
npx shadcn@latest init
# Choose: Dark theme, Zinc base color, CSS variables yes
```
Add components as needed: `npx shadcn@latest add button input card badge dialog`

---

## Architecture Decisions (Locked In)

Do not change these without an explicit conversation.

### Auth
- Backend sets JWT as httpOnly cookie on login. Frontend never stores it in localStorage.
- Frontend decodes JWT payload (base64 split) for display only — name, role, UI state.
- Backend is the only real security boundary. Proxy is UX gating only.

### Routing / Proxy
- **Next.js 16 uses `src/proxy.ts`** — `middleware.ts` is deprecated in v16.
- Must be a `default export function proxy(...)` — not a named export.
- `config.matcher` named export stays alongside the default export.
- Do NOT rename to `middleware.ts`.

### Slugs
- Slugs are auto-generated server-side from name/title. Never sent from the client.
- Duplicate name = 409 from backend. Show the user a clear error message.

### Roles
- `USER` — default. Can browse, join gyms, register for events.
- `GYM_OWNER` — create/manage gyms, approve/reject members, upgrade TRAINER.
- `ORGANIZER` — professional fight card organizers (e.g. FNC Belgrade). Admin-assigned only.
- `ADMIN` — full access.

### Gym Membership
- Open gyms (`requiresApproval: false`): join → immediately APPROVED.
- Invite-only gyms: join → PENDING, owner approves/rejects.
- Users can belong to multiple gyms simultaneously.

### Event Registration
- Hard capacity block. No waitlist in MVP.
- Registration blocked if: event not PUBLISHED, deadline passed, already registered, at capacity.

---

## Current State (as of 2026-05-01)

### Phase 1 — COMPLETE ✅
All backend bugs fixed. Frontend stabilized:
- `proxy.ts` correct with default export
- `UserSession` type includes ORGANIZER role
- Logout redirects to `/`
- Slug auto-generated server-side
- All `findOne` select lists include new fields

### Phase 2 — Backend COMPLETE ✅
All core loop endpoints built and type-checked:
- GymMembership: join, leave, list members, approve/reject, upgrade to TRAINER
- Gym: PATCH + DELETE (owner/admin only)
- EventRegistration: register, cancel, list registrations (organizer/admin)
- RolesGuard on all write endpoints

### Phase 2 — Frontend IN PROGRESS
Pages to build (in this order):

1. **`lib/api.ts`** — centralized fetch wrapper (base URL + auth headers)
2. **Gym profile page** — full info, join/leave button, membership status, member count
3. **Event detail page** — full brief, register/cancel button, capacity indicator
4. **User dashboard** — my gyms, my upcoming events
5. **Gym owner dashboard** — pending member requests, approve/reject, upgrade to TRAINER

All new pages: shadcn/ui components only.

---

## Key Files

| File | Purpose |
|---|---|
| `src/proxy.ts` | Route protection (Next.js 16 proxy) |
| `src/lib/auth.ts` | JWT decode + UserSession type |
| `src/lib/api.ts` | *(to create)* Centralized API client |
| `src/context/AuthContext.tsx` | Auth state provider |
| `src/components/layout/Navbar.tsx` | Main nav — partially DaisyUI, replace when touching |
| `src/app/gyms/` | Gym list + detail pages |
| `src/app/events/` | Event list + detail pages |
| `src/app/dashboard/` | *(to create)* User dashboard |

---

## Rules

1. **Schema first.** Any DB change starts with Prisma schema → migrate → endpoints → frontend.
2. **Never accept slug from client.** Always server-generated.
3. **Never store JWT in localStorage.** httpOnly cookie only.
4. **shadcn/ui for all new components.** Replace DaisyUI only when touching existing files.
5. **Functional over beautiful.** No pixel-perfecting before real users.
6. **Proxy file is `proxy.ts` with default export.** Never rename to `middleware.ts`.
7. **Ownership checks in service layer.** Controller RolesGuard = broad role gate. Service = specific ownership gate.
