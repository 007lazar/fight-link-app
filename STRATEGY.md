# FightLink — Strategy & Product Charter

This document is the north-star context for the FightLink project. Both the backend and frontend repos reference it. Read it fully before making any non-trivial product or architectural decision.

It is updated by the founder, not by Claude Code. Claude Code may quote from it but never silently overwrites it. When the strategy changes, append to the **Decision Log** at the bottom rather than rewriting history.

---

## 1. What FightLink Is

A martial arts platform for the Balkans (Serbia, Croatia, BiH, Montenegro, North Macedonia, Slovenia — ~18-20M people in the BCS language zone, ~25-30M including Albanian-speaking markets long-term).

The vision: **one place for everything martial arts in the region.** Find a gym, find an event, see what classes are happening, eventually buy tickets and book training. Today, this is fragmented across Instagram, Viber groups, WhatsApp, paper schedules, and word of mouth.

### Core users

- **Athletes / fighters / hobbyists** — find gyms, see schedules, attend classes, follow events. Default `USER` role.
- **Gym owners** — list and manage their gym, approve members, run trainers, eventually receive bookings and payments. `GYM_OWNER` role.
- **Trainers** — run classes within a gym. `TRAINER` role at a specific gym (per-membership, not global).
- **Event organizers** — promoters running fight cards, seminars, opens. `ORGANIZER` role, admin-assigned only.
- **Platform admins** — internal. `ADMIN` role.

### What makes FightLink different from Google Maps + Eventbrite + Mindbody

- **Vertical focus.** A combat-sports-only platform signals to fighters and gyms that this is *for them*. Generic platforms don't.
- **Multi-gym membership as a first-class concept.** Real fighters train at 2–4 places (BJJ at one, striking at another, S&C at a third). No mainstream fitness platform handles this well.
- **Regional events tied to gyms.** Fight cards, opens, and seminars surfaced alongside the gyms hosting or affiliated with them.
- **Language and cultural fit.** Serbian / Croatian / Bosnian first. Cyrillic + Latin support. Discipline names match local usage.

---

## 2. The MVP Strategy — Two Co-Equal Pillars

FightLink is not a directory. It's the operating layer for combat sports in the region. Two co-equal pillars define the MVP:

**Pillar 1 — Discovery.** Find every gym and every fight in your city. Search by discipline, distance, city. Verified profiles with real photos, real schedules, real contact info. This is what gets athletes through the door.

**Pillar 2 — Gym operations.** A gym owner runs their week from FightLink: weekly recurring class schedule, member roster, group and private session bookings, eventually attendance and analytics. This is what makes a gym claim its profile and keep it alive.

### Why both, not one

The alternatives (discovery-first, ops-first) were considered and rejected. Discovery without ops is a static directory — gyms list once, never update, listings rot. Ops without discovery is yet another scheduling tool with no inbound demand. Together they're a feedback loop: users find gyms via discovery, owners get a real reason to claim and maintain their listing because they run their ops on it, and the live ops data (real schedules, real upcoming classes) makes the discovery experience richer than any directory could be.

The all-in-one regional hub is the brand promise, and that requires both pillars to ship together. Phase 3 must deliver both before public launch.

### What "comprehensive Phase 3" means concretely

Before any public launch:

- 100% of MMA, BJJ, kickboxing, and Muay Thai gyms in Belgrade listed (estimated 30-50 gyms).
- Every active Belgrade-region fight card and open mat for the next 60 days.
- At least 5 of those gyms claimed and verified.
- **At least 2 of those gyms running their real weekly schedule through the platform.**

If we launch with empty pages or with ops features no real gym is using, we lose users we cannot get back.

---

## 3. What We Are Explicitly NOT Doing (and Why)

**Community chat / messaging.** Removed from MVP scope. Viber and WhatsApp own this in the Balkans and are entrenched at the gym-group level. We won't displace them, and a half-built chat is worse than no chat. The `ChatMessage` model and routes are deprecated and must be removed in the next migration. May revisit in a different form later (training-partner matching, event-specific threads) but not as generic gym chat.

**Native mobile apps.** Web/PWA first. Native iOS and Android come only after we have a single city working and enough usage to justify the cost.

**International expansion.** Balkan only until we have one country humming. Western Europe, Russia, MENA — distant.

**Stripe in v1.** Stripe's Serbian onboarding is still painful as of 2026. Payments are deferred until at least one gym wants to take ticket money on the platform. When that day comes, the decision is between Monri / AllSecure (Serbian-friendly) and routing through an EU entity for Stripe access.

**Trainer marketplaces / freelance booking.** Trainers are tied to gyms. We are not building a Fiverr for fight coaches.

**Sparring / training-partner matching.** Possible future feature, deliberately deferred.

---

## 4. Roles & Permissions Model

(See backend `CLAUDE.md` for code-level enforcement details.)

| Role | Granted by | Can do |
|---|---|---|
| `USER` | Default on register | Browse, join gyms, register for events |
| `GYM_OWNER` | Self-elected on register OR upgraded by admin | Create + manage own gyms, approve/reject members, upgrade members to TRAINER |
| `ORGANIZER` | Admin-assigned only | Create + manage events |
| `ADMIN` | Internal | Everything, including assigning ORGANIZER and verifying gyms |

**Membership role (per gym, separate from global role):**

| Per-gym role | Granted by | Can do |
|---|---|---|
| `MEMBER` | Self-join (auto-approved or owner-approved) | View gym schedule, book/register for sessions |
| `TRAINER` | Gym owner upgrade | Create training sessions, manage attendance, run classes |

A user can be a TRAINER at gym A and a MEMBER at gym B simultaneously.

---

## 5. Phased Roadmap

### Phase 1 — Foundation ✅
Auth, basic CRUD, role system, schema. Done.

### Phase 2 — Core Loop ✅
Gym/event CRUD, memberships, registrations, ownership enforcement. Backend done. Frontend in progress.

### Phase 3 — Two Pillars + Validation (CURRENT)

**Goal: a polished, populated, claim-able regional directory in Belgrade *with at least 2 gyms running their real weekly ops on the platform.***

In priority order:

1. **Tech-debt cleanup sprint** — remove `ChatMessage`, move `slugify` to a shared util, fix the events controller to delegate ownership to the service, add global ValidationPipe, helmet, throttler, fix JWT cookie/Bearer mismatch. (See backend `CLAUDE.md`.)
2. **Discipline taxonomy** — replace free-text `discipline` with controlled vocabulary. Many-to-many `Gym ↔ Discipline` (gyms offer multiple). This must land **before** any gym seeding, or your data is dirty from day one.
3. **Geo search** — PostGIS index on `lat/lng`, `gyms within X km` endpoint and UI.
4. **Search & filter UI** — by city, discipline, verified-only, distance.
5. **Map view** for gym list, list view as primary on mobile.
6. **Gym claim flow** — admin seeds unclaimed gyms with placeholder owner; real owners can request claim. Must be low-friction (target: <24h approval).
7. **Admin panel** — verify gyms, assign ORGANIZER role, transfer gym ownership on claim approval, review claim queue.
8. **GymMedia CRUD** — gym galleries (photos plus one or two videos).
9. **RecurringSchedule CRUD** (ops pillar) — gym owner / trainer defines weekly schedule.
10. **TrainingSession + SessionBooking** (ops pillar) — lazy-materialized session calendar, member booking flow, trainer-role workflow. **No cron job.**
11. **Manual seeding** — 30-50 Belgrade gyms with public info, plus design-partner gym(s) fully wired up with real ops.

**Non-goals for Phase 3**: payments, chat, push notifications, native mobile, multi-language UI, private 1-on-1 session booking (group recurring sessions only).

### Phase 4 — Monetization & Operations
- Payments / ticketing (provider TBD based on entity setup)
- Push and email notifications
- Pagination + full-text search at scale
- Multi-currency display
- Featured listings (paid placement for gyms)
- Private 1-on-1 session booking + paid private sessions

### Phase 5 — Differentiation
- One genuine AI feature (training-partner matching by weight/style/experience? AI camp scheduler for competing fighters?)
- Health-data integration (Apple Health, Whoop, Garmin)
- Multi-language UI (Serbian, English, eventually Croatian/Bosnian variants)
- Native mobile apps if PWA hits a ceiling

---

## 6. Monetization Plan (Deferred but Mapped)

Currently free for all parties. Not monetizing until:
1. We have at least 50 claimed-and-verified gyms in a single city, AND
2. We have at least one gym actively pushing real schedules and ticket sales through the platform.

When we do monetize, the order is:

**First (Phase 4)** — Ticket commission (5-10%) on event ticket sales. Lowest friction, easiest to justify ("we sold this ticket for you").

**Second (Phase 4-5)** — B2B SaaS for gyms, freemium. Free tier: listing + members + basic schedule. Paid tier (€20-40/mo): private bookings, attendance tracking, member analytics, ticket-commission waiver. Note: with the two-pillar model, this becomes the natural monetization path because gyms are *already running their ops on FightLink*. Upgrading to paid is just unlocking more of what they're already using.

**Third (Phase 5)** — Featured listings (paid placement), discipline-filter sponsorships (gear brands like Tatami, Hayabusa).

**Never** — selling user data. Charging fighters to find a gym.

---

## 7. Trust & Verification

A marketplace dies the moment users stop trusting it. Three trust mechanisms:

1. **Manual gym seeding.** Admin (founder) manually creates the first ~30-50 gyms based on public info. Quality controlled, not user-generated.
2. **Claim flow.** Real gym owners can claim their listing. Admin verifies (phone call to the gym, check Instagram/business registration in APR for Serbia). With the two-pillar model, the claim flow is critical-path: only claimed gyms can run ops, and ops is half the value.
3. **Verified badge** (`Gym.verified`). Visible signal. Only set after manual verification.

**Self-registration as `GYM_OWNER` is allowed** but a self-registered gym is `verified: false` until admin checks it. Unverified gyms are searchable but show a clear "unverified" indicator and rank below verified ones.

---

## 8. Risks & Mitigations

| Risk | Mitigation |
|---|---|
| Cold start: empty platform on launch | Manual seeding 30-50 gyms before any marketing |
| **No design partner means no ops pillar can launch** | Active gym outreach is now critical-path, not parallel-track. At least 2 partner gyms running real ops are required for MVP. |
| Solo founder burnout from two-pillar scope | Strict scope discipline — Phase 3 is bounded; ops features are deliberately minimal (recurring schedule + group booking only, no private 1-on-1 in MVP) |
| Stripe / payments stuck on entity setup | Defer payments entirely until needed; explore Monri |
| Generic "yet another listings site" perception | Vertical focus, MMA-native UX, regional events, ops as a real differentiator |
| Gym owners refuse to engage with another tool | Free, low-touch claim flow; the ops pillar gives them a concrete reason to engage that a directory does not |
| Fake / spam gym listings | Manual seeding, claim flow, verification badge |
| Discipline data fragmentation (MMA / mma / ММА) | Controlled vocabulary in Phase 3 (must land before seeding) |
| Founder is also a USER but cannot test as a fighter without a gym | Recruit one Belgrade gym as a "design partner" before launch — your own gym ideally |

---

## 9. Definition of "MVP Launch"

We can publicly launch when:

- ✅ 30+ Belgrade gyms listed with photos and basic info
- ✅ At least 5 claimed and verified
- ✅ **At least 2 of those gyms running their real weekly schedule through FightLink**
- ✅ Working geo + discipline + city search
- ✅ At least one upcoming event listed for the next 30 days
- ✅ Mobile web works smoothly (real phone test, not laptop emulator)
- ✅ Auth, claim flow, and admin panel functional
- ✅ Tech-debt items from Phase 3 cleanup done

We do NOT need before launch:

- Payments
- Chat
- Push notifications
- Multi-language UI
- Private 1-on-1 session booking (group recurring schedule + member booking is enough for MVP)

---

## 10. Decision Log

A running log of meaningful product/architecture decisions. **Append-only.** Do not delete entries.

- **2026-05-03** — Discovery-first MVP (vs gym-ops-first wedge). Founder's call.
- **2026-05-03** — Chat module dropped from scope. Reason: Viber/WhatsApp dominance, low ROI.
- **2026-05-03** — Native mobile deferred until web/PWA validates demand.
- **2026-05-03** — Stripe replaced with "decide later." Payments deferred until a gym requests them.
- **2026-05-03** — Lazy materialization confirmed as the approach for recurring sessions when that module is built (no cron job).
- **2026-05-03** — Discipline upgraded to controlled vocabulary (Phase 3). Must land before seeding.
- **2026-05-03** — Manual seeding of 30-50 Belgrade gyms identified as launch prerequisite.
- **2026-05-03** — **MVP repositioned from "discovery-first" to "two co-equal pillars: discovery + gym operations."** Ops moves from "Phase 3 last, partner-driven" to core Phase 3 priority. `RecurringSchedule` + `TrainingSession` + `SessionBooking` are now MVP-blocking. Launch criteria expanded to require ≥2 gyms running real ops on the platform. Design partner search becomes critical-path. Private 1-on-1 booking deferred to Phase 4 to keep ops scope bounded.

