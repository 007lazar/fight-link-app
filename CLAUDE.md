# FightLink — Frontend (CLAUDE.md)

This file is the source of truth for frontend engineering decisions. Read fully before touching code. Strategic and product context lives in **`STRATEGY.md`** (top-level) — read that first.

---

## Working Session Perspective

Operate as a **senior frontend engineer with product instinct**:

- **Engineering quality** — type-safe, accessible, maintainable
- **Product instinct** — the UI is the product. Marketplace first impressions matter.
- **Pragmatism** — functional and clean beats beautiful and broken. Polish comes after product-market fit.

---

## Tech Stack (Locked)

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS + **shadcn/ui** (DaisyUI being phased out) |
| Auth | httpOnly cookie set by backend, read in Server Actions |
| State | React Context (`AuthContext`) — minimal, only for auth |
| Data fetching | Server Components + Server Actions (preferred); fetch-based `lib/api.ts` for client components |
| Icons | `lucide-react` (with shadcn) |

---

## Architecture Principles

### Auth

- Backend sets JWT as httpOnly cookie via Server Action on login/register.
- Frontend never stores tokens in localStorage.
- JWT payload decoded (base64 split) for **display only** — name, role, UI state. Never trusted for security.
- Backend is the only real security boundary. Proxy is UX gating only.

### Routing & Proxy

- Next.js 16 uses `src/proxy.ts` (NOT `middleware.ts` — deprecated in v16).
- Must be a `default export function proxy(...)`, not a named export.
- `config.matcher` named export stays alongside the default.

### UI Strategy — shadcn/ui

- All new components and pages use shadcn/ui.
- Replace DaisyUI components only when already touching that file.
- Never refactor DaisyUI proactively.
- Components live in `/components/ui/` — owned, modifiable, tracked in git.
- Used by Vercel, Linear, Resend — the aesthetic signals a real product, not a side project.

### Data Fetching Pattern

- **Read** = Server Component fetching directly from the backend with the cookie forwarded as `Authorization` header.
- **Mutation** = Server Action calling the backend, then `revalidatePath()` or `redirect()`.
- **Client-only fetch** (rare) = goes through `lib/api.ts` wrapper that handles auth, base URL, and error normalization.
- Never call the backend from a client component without going through `lib/api.ts`.

### Slugs

- Display-only on the frontend. Never derived or modified client-side.
- A duplicate-name 409 from the backend means: show the user a clear error and let them pick a different name.

---

## Roles & Routing

| Role | Access |
|---|---|
| Logged out | `/`, `/gyms`, `/events`, `/login`, `/register`, `/about` |
| `USER` | All public + `/dashboard` |
| `GYM_OWNER` | All USER + `/dashboard/gyms/manage` |
| `ORGANIZER` | All USER + `/dashboard/events/manage` |
| `ADMIN` | Everything + `/admin/*` |

Proxy enforces logged-in/logged-out redirects and the ADMIN check on `/admin/*`. All other role enforcement is via UI gating + backend response.

---

## Current State (as of 2026-05-05)

### Phase 1 ✅
Auth, layout, base routing, navbar, login/register flows.

### Phase 2 ✅
All Phase 2 pages and infrastructure are built on branch `feature/ui-pages`:

- **`lib/api.ts`** — centralized fetch wrapper exists. Reads `token` cookie, forwards as `Authorization: Bearer` header.
- **Gym profile page** (`/gyms/[slug]`) — join/leave, membership status.
- **Event detail page** (`/events/[slug]`) — register/cancel button.
- **User dashboard** (`/profile`) — my gyms, my events, my memberships, my gym ownership.
- **Gym owner dashboard** — pending member requests, approve/reject (`PATCH /gyms/:slug/members/:userId`).

All new pages use shadcn/ui. No new DaisyUI.

### Phase 3 Frontend — Upcoming

> **Two co-equal tracks** per `STRATEGY.md` Decision Log 2026-05-03 (two-pillar MVP repositioning). Both pillars must ship before public launch — discovery without ops is a static directory, ops without discovery has no inbound demand.

**Discovery pillar:**
- **Search / filter UI** — by city, discipline, distance, verified-only. Mobile-first; URL-driven filter state.
- **Map view** for gym list (Leaflet recommended for free + simple; Mapbox GL if richer styling needed).
- **Mobile-first polish** of search and gym profile (this is where most of the audience will land first — real phone test, not laptop emulator).
- **Gym claim flow UI** — "claim this listing" CTA + claim status states (none / pending / approved / rejected).

**Ops pillar (MVP-blocking — required for launch):**
- **RecurringSchedule editor** (`/dashboard/gyms/manage/[slug]/schedule`) — gym owner / TRAINER defines weekly classes (day, time, discipline, capacity).
- **Gym calendar / week view** (public on `/gyms/[slug]`) — upcoming sessions for ~14 days, sourced from lazy-materialized `TrainingSession` rows.
- **Member booking flow** — book a class from the gym calendar; see and cancel bookings from the user dashboard.
- **Trainer dashboard** (`/dashboard/trainer`) — TRAINER role users see classes they're assigned to and the member roster per session.

**Cross-cutting:**
- **Admin panel** (`/admin/*`) — verify gyms, assign ORGANIZER, transfer ownership, review claim requests.
- **Empty states and loading states everywhere.** A list page that shows blank while fetching is a broken page.

---

## `lib/api.ts` Spec (Built — see `src/lib/api.ts`)

A single wrapper used by all server-side calls (Server Components, Server Actions). Reads the cookie, forwards as Bearer header, normalizes errors.

```ts
// src/lib/api.ts
import { cookies } from 'next/headers';

const API_URL = process.env.API_URL ?? process.env.NEXT_PUBLIC_API_URL!;

type FetchOpts = Omit<RequestInit, 'body'> & { json?: unknown };

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

export async function api<T = unknown>(path: string, opts: FetchOpts = {}): Promise<T> {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...opts.headers,
  };

  const res = await fetch(`${API_URL}${path}`, {
    ...opts,
    headers,
    body: opts.json !== undefined ? JSON.stringify(opts.json) : undefined,
    cache: opts.cache ?? 'no-store',
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new ApiError(
      res.status,
      Array.isArray(err.message) ? err.message.join(', ') : err.message ?? 'Request failed',
    );
  }
  return res.status === 204 ? (undefined as T) : ((await res.json()) as T);
}
```

Usage:

```ts
// Server Component
const gyms = await api<Gym[]>('/gyms');

// Server Action
await api('/gyms', { method: 'POST', json: { name, description } });
```

For client components: expose a Next.js Route Handler (`/api/proxy/...`) that internally calls `api()`. Client never talks directly to the backend.

---

## Page Patterns

### List page (e.g., `/gyms`)
- Server Component fetches via `api()`.
- Suspense boundary with skeleton fallback.
- Empty state with clear CTA ("Be the first to add your gym").
- Filter/search (Phase 3) is a client island that updates URL search params.

### Detail page (e.g., `/gyms/[slug]`)
- Server Component fetches by slug.
- 404 if not found.
- Action buttons (join/leave, edit) are client islands that call Server Actions.
- Pending member badge if membership status is PENDING.

### Form pages
- Server Actions for all mutations.
- `useFormState` + `useFormStatus` for inline error display.
- Disable submit while pending.
- Success → `redirect()` to detail page.

---

## Hard Rules (Never Violate)

1. **No JWT in localStorage.** httpOnly cookie only.
2. **shadcn/ui for all new components.** No new DaisyUI.
3. **Proxy file is `proxy.ts`** with default export. Never rename to `middleware.ts`.
4. **No business logic in components.** Components render and dispatch. Logic lives in Server Actions or `lib/`.
5. **Never trust the JWT payload for authorization.** Display only. Backend is the security boundary.
6. **No pixel-perfecting before product-market fit.** Functional > beautiful.
7. **Always handle the loading and empty state.** Blank screen during fetch = broken page.
8. **Always handle 401** — clear the cookie via logout action, redirect to login.
9. **Never accept slug from URL into a write endpoint without validation.** Pass it through; let the backend resolve.
10. **Mobile first.** Every page must work on a 375px viewport before being considered done.

---

## When in Doubt

1. Read **`STRATEGY.md`** for product context.
2. Read backend **`CLAUDE.md`** for auth/data flow.
3. Check `Navbar.tsx` for the auth-aware UI pattern.
4. Check `features/auth/actions/auth.ts` for the cookie set/clear pattern.
5. Ask the founder. Do not guess.

