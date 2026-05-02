# 🐾 Product Requirements Document

## Pet Adoption Center Management System

> **Version:** 1.0 | **Status:** Active | **Last Updated:** April 2026
> 

---

# 1. Project Overview

## 1.1 What is this project?

A full-stack web application for managing a **pet adoption center**. The platform allows the public to browse animals available for adoption, and gives administrators a powerful dashboard to manage all animal records.

## 1.2 Core Goal

Build a clean, modern web app that:

- Shows the public which animals are available for adoption
- Gives the admin full CRUD control over all animal data
- Handles authentication so only the admin can access the dashboard

## 1.3 Two Main Surfaces

| Surface | Who Uses It | Purpose |
| --- | --- | --- |
| **Public Page** | Anyone (no login) | Browse adoptable animals, learn about the center |
| **Admin Dashboard** | Admin only (requires login) | Add, edit, delete, view all animals |

---

# 2. Tech Stack

## 2.1 Frontend

| Technology | Version | Purpose |
| --- | --- | --- |
| Next.js | 16 (App Router) | Page routing, SSR, React framework |
| React | 19 | Component-based UI rendering |
| Tailwind CSS | 4 | Utility-first styling — no custom CSS |
| shadcn/ui | Latest | Pre-built accessible UI components |
| Axios | Latest | HTTP client with JWT interceptor |
| React Hook Form | Latest | Form state + validation |
| Sonner | Latest | Lightweight toast notifications |

## 2.2 Backend

| Technology | Version | Purpose |
| --- | --- | --- |
| NestJS | 10 | Structured Node.js framework |
| TypeScript | 5 | Type safety across the entire backend |
| Passport.js + JWT | Latest | Authentication strategy |
| bcrypt | Latest | Password hashing (10 salt rounds) |
| class-validator | Latest | Validates incoming request bodies |

## 2.3 Database

| Technology | Version | Purpose |
| --- | --- | --- |
| PostgreSQL | 15 | Relational database |
| Prisma ORM | 5 | Type-safe DB client + migrations |

## 2.4 Architecture Decisions

| Decision | Reason |
| --- | --- |
| Next.js over plain React | Built-in routing, SSR, and App Router — production-grade out of the box |
| NestJS over Express | Enforces clean architecture: modules, controllers, services, guards |
| Prisma over raw SQL | Type-safe, readable queries; schema in one file; migrations automated |
| shadcn/ui over custom CSS | Professional UI components with zero design effort |
| JWT over sessions | Stateless — no server-side session storage needed; scales easily |

---

# 3. Design System

## 3.1 Color Palette (extracted from provided screenshots)

| Role | Color | Hex |
| --- | --- | --- |
| **Primary Warm** | Warm Orange | `#F97316` |
| **Secondary** | Soft Amber | `#FB923C` |
| **Background Light** | Cream / Peach | `#FEF3E2` |
| **Card Background** | Soft Orange-tinted White | `#FFF7ED` |
| **Success / Health** | Mint Green | `#86EFAC` |
| **Pending / Warning** | Soft Purple | `#C084FC` |
| **Dark Sidebar** | Deep Maroon/Brown | `#1C0A00` |
| **Text Primary** | Near-black | `#1A1A1A` |
| **Text Secondary** | Muted Gray | `#6B7280` |
| **White** | Pure white | `#FFFFFF` |

## 3.2 Typography

| Usage | Font | Style |
| --- | --- | --- |
| **Hero / Display** | Fredoka One or Nunito | Bold, rounded, friendly |
| **Body Text** | Plus Jakarta Sans | Clean, modern, readable |
| **Numbers / Stats** | DM Mono | Tabular, precise |
| **Labels / Badges** | Inter | Small, upper-case |

## 3.3 Component Style Rules

- Cards: `rounded-2xl` with soft shadow (`shadow-md`), warm-tinted backgrounds
- Buttons: `rounded-full` primary buttons in orange (`#F97316`), white ghost variants
- Status Badges: pill shape, color-coded (green = available, purple = pending, red = adopted)
- Icons: Lucide React icon set — paw prints, heart, calendar, stethoscope
- Sidebar: Deep dark background (`#1C0A00`) with white icons and orange active state
- Spacing: Generous padding — `p-6` on cards, `gap-4` between grid items

---

# 4. Database Schema

## 4.1 `Animal` Table (Core Entity)

```sql
model Animal {
  id          Int      @id @default(autoincrement())
  name        String   -- Animal's name (e.g. "Bella")
  species     String   -- "Dog", "Cat", "Bird", "Rabbit", "Other"
  breed       String?  -- Optional breed (e.g. "Golden Retriever")
  age         Int      -- Age in months
  gender      String   -- "Male" / "Female"
  color       String?  -- Primary coat/fur color
  weight      Float?   -- Weight in kg
  status      String   -- "Available", "Pending", "Adopted"
  description String?  -- Story / personality description
  imageUrl    String?  -- Photo URL
  healthNotes String?  -- Vaccination, health status notes
  arrivalDate DateTime @default(now())
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

## 4.2 `Admin` Table (Authentication)

```sql
model Admin {
  id           Int      @id @default(autoincrement())
  email        String   @unique
  passwordHash String
  name         String
  createdAt    DateTime @default(now())
}
```

---

# 5. API Endpoints

## 5.1 Public Endpoints (No Auth Required)

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/animals` | Get all available animals (status = Available) |
| `GET` | `/api/animals/:id` | Get single animal details |
| `GET` | `/api/animals?species=Dog` | Filter by species |
| `GET` | `/api/animals?search=bella` | Search by name |

## 5.2 Auth Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/auth/login` | Login with email + password → returns JWT |
| `POST` | `/api/auth/logout` | Invalidate token |
| `GET` | `/api/auth/me` | Get current admin profile |

## 5.3 Admin Endpoints (JWT Required)

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/admin/animals` | Get ALL animals (all statuses) |
| `POST` | `/api/admin/animals` | Create new animal |
| `PATCH` | `/api/admin/animals/:id` | Update animal |
| `DELETE` | `/api/admin/animals/:id` | Delete animal |
| `GET` | `/api/admin/stats` | Dashboard statistics |

## 5.4 Request/Response Examples

**POST /api/admin/animals — Create Animal**

```json
{
  "name": "Bella",
  "species": "Dog",
  "breed": "Golden Retriever",
  "age": 24,
  "gender": "Female",
  "color": "Golden",
  "weight": 18.5,
  "status": "Available",
  "description": "Bella is a friendly and energetic dog who loves children.",
  "healthNotes": "Vaccinated, dewormed, microchipped"
}
```

**GET /api/admin/stats — Dashboard Stats**

```json
{
  "totalAnimals": 45,
  "available": 28,
  "pending": 10,
  "adopted": 7,
  "newThisMonth": 5
}
```

---

# 6. Feature Specifications

## 6.1 Public Page — Features

### Hero Section

- Large headline: **"Find Your Perfect Companion"** with a warm orange accent word
- Subheadline: "Give a loving home to an animal that needs one"
- Two CTA buttons: **"Browse Animals"** (primary, orange) + **"About Us"** (ghost)
- Background: Soft peach/cream gradient with decorative paw print pattern
- Images: 3 circular pet photos arranged in a layered layout (inspired by Image 2)

### Animals Grid

- Display cards in a responsive grid: 3 cols desktop, 2 cols tablet, 1 col mobile
- Each card shows:
    - Animal photo (top, rounded corners)
    - Name + species badge
    - Age + gender pill
    - Status badge (Available = green, Pending = purple)
    - "Learn More" button
- Filter bar above grid: filter by Species (All / Dogs / Cats / Birds / Other)
- Search input: real-time search by name

### About Section

- Center mission statement
- 3 stat boxes: Total Animals Rescued, Adoptions This Year, Happy Families

## 6.2 Admin Login Page

- Clean centered card on dark background
- Email + Password fields
- Show/hide password toggle
- Error toast on invalid credentials (via Sonner)
- JWT stored in httpOnly cookie or localStorage
- Redirect to dashboard on success

## 6.3 Admin Dashboard — Overview

### Stats Cards Row (top)

4 cards showing:

- 🐾 Total Animals
- ✅ Available
- ⏳ Pending Adoption
- 🏠 Adopted This Month

Each card: colored icon, large number, trend indicator vs last month

### Quick Actions

- "+ Add New Animal" button — opens add form
- "Export CSV" button

## 6.4 Animals Table (Admin)

Columns:

| Column | Type | Notes |
| --- | --- | --- |
| Photo | Image | Small avatar thumbnail |
| Name | Text | Clickable → opens edit modal |
| Species | Badge | Color-coded |
| Breed | Text | Optional |
| Age | Text | "2 years 3 months" |
| Gender | Badge |  |
| Status | Badge | Color-coded pill |
| Health | Text | Short notes |
| Arrival Date | Date | Formatted |
| Actions | Buttons | Edit (pencil) + Delete (trash) icons |

Features:

- Sortable columns
- Search bar
- Filter by status + species
- Pagination (12 per page)
- Confirm dialog before delete

## 6.5 Add / Edit Animal Form

Fields:

| Field | Type | Required | Validation |
| --- | --- | --- | --- |
| Name | Text | ✅ | Min 2 chars |
| Species | Select | ✅ | Dog/Cat/Bird/Rabbit/Other |
| Breed | Text | ❌ | Optional |
| Age (months) | Number | ✅ | 0–300 |
| Gender | Radio | ✅ | Male/Female |
| Color | Text | ❌ | Optional |
| Weight (kg) | Number | ❌ | 0–200 |
| Status | Select | ✅ | Available/Pending/Adopted |
| Description | Textarea | ❌ | Max 500 chars |
| Health Notes | Textarea | ❌ | Vaccines, conditions |
| Photo | File Upload | ❌ | JPG/PNG, max 5MB |

Behavior:

- Validation with React Hook Form + class-validator
- Submit shows loading spinner
- Success: toast notification + table refresh
- Error: inline field errors

---

# 7. Authentication Flow

```
1. Admin visits /admin/login
2. Enters email + password
3. POST /api/auth/login
4. Backend: find admin by email → compare bcrypt hash → sign JWT
5. Frontend: store JWT → redirect to /admin/dashboard
6. All admin API calls: Authorization: Bearer <token>
7. Backend JWT Guard: verify token on every protected route
8. Token expiry: 24 hours
9. Logout: clear token → redirect to /admin/login
```

---

# 8. Project Structure

## 8.1 Frontend (Next.js)

```
src/
├── app/
│   ├── page.tsx                  # Public homepage
│   ├── admin/
│   │   ├── login/page.tsx        # Admin login
│   │   ├── dashboard/page.tsx    # Dashboard overview
│   │   └── animals/
│   │       ├── page.tsx          # Animals table
│   │       └── [id]/page.tsx     # Edit animal
├── components/
│   ├── ui/                       # shadcn components
│   ├── public/
│   │   ├── HeroSection.tsx
│   │   ├── AnimalCard.tsx
│   │   └── FilterBar.tsx
│   └── admin/
│       ├── StatsCard.tsx
│       ├── AnimalsTable.tsx
│       ├── AnimalForm.tsx
│       └── Sidebar.tsx
├── lib/
│   ├── api.ts                    # Axios instance
│   └── auth.ts                   # JWT helpers
└── types/
    └── animal.ts                 # TypeScript interfaces
```

## 8.2 Backend (NestJS)

```
src/
├── auth/
│   ├── auth.module.ts
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── jwt.guard.ts
├── animals/
│   ├── animals.module.ts
│   ├── animals.controller.ts
│   ├── animals.service.ts
│   └── dto/
│       ├── create-animal.dto.ts
│       └── update-animal.dto.ts
├── prisma/
│   └── prisma.service.ts
└── main.ts
```

---

# 9. AI Builder Prompt

> Copy the section below and give it directly to your AI coding assistant (Cursor, Windsurf, v0, etc.)
> 

---

## 🤖 PROMPT FOR AI BUILDER

```
Build a full-stack Pet Adoption Center web application with the following specifications:

## TECH STACK
- Frontend: Next.js 16 (App Router), React 19, Tailwind CSS 4, shadcn/ui, Axios, React Hook Form, Sonner
- Backend: NestJS 10, TypeScript 5, Passport.js + JWT, bcrypt, class-validator
- Database: PostgreSQL 15 + Prisma ORM 5

## DESIGN SYSTEM
Color palette:
- Primary Orange: #F97316
- Background: #FEF3E2 (cream/peach)
- Card bg: #FFF7ED
- Sidebar dark: #1C0A00
- Success: #86EFAC
- Pending: #C084FC

Typography:
- Display: Fredoka One (rounded, friendly)
- Body: Plus Jakarta Sans
- Numbers: DM Mono

Style:
- Cards: rounded-2xl, shadow-md
- Buttons: rounded-full
- Status badges: pill-shaped, color-coded
- Icons: Lucide React (paw, heart, calendar icons)

## DATABASE SCHEMA (Prisma)

model Animal {
  id          Int      @id @default(autoincrement())
  name        String
  species     String   // Dog, Cat, Bird, Rabbit, Other
  breed       String?
  age         Int      // in months
  gender      String   // Male / Female
  color       String?
  weight      Float?
  status      String   // Available, Pending, Adopted
  description String?
  imageUrl    String?
  healthNotes String?
  arrivalDate DateTime @default(now())
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Admin {
  id           Int      @id @default(autoincrement())
  email        String   @unique
  passwordHash String
  name         String
  createdAt    DateTime @default(now())
}

## PAGES TO BUILD

### 1. Public Homepage (/ )
- Hero section with headline "Find Your Perfect Companion"
- Warm peach/cream gradient background with decorative paw patterns
- 3 circular overlapping pet images
- CTA buttons: "Browse Animals" + "About Us"
- Animals grid (3 cols → 2 → 1 responsive)
- Each animal card shows: photo, name, species badge, age, gender, status badge, "Learn More" button
- Filter bar: All / Dogs / Cats / Birds / Other
- Real-time search by name
- About section with 3 stats

### 2. Admin Login (/admin/login)
- Centered card on dark background
- Email + password fields with React Hook Form
- Show/hide password toggle
- POST /api/auth/login → store JWT → redirect to dashboard
- Error toast via Sonner

### 3. Admin Dashboard (/admin/dashboard)
- Dark sidebar (#1C0A00) with: Dashboard, Animals, Settings, Logout
- Orange active state on sidebar items
- Top stats row: Total Animals, Available, Pending, Adopted (4 cards)
- Animals data table with columns:
  photo | name | species | breed | age | gender | status | health notes | arrival date | actions
- Search bar + filter by status + filter by species
- Sortable columns, pagination (12/page)
- "+ Add Animal" button → opens modal form
- Edit (pencil icon) + Delete (trash icon) per row
- Confirm dialog before delete
- All forms use React Hook Form with validation
- Success/error feedback via Sonner toasts

## API STRUCTURE (NestJS)

Public (no auth):
- GET /api/animals — list available animals (with ?species= and ?search= filters)
- GET /api/animals/:id

Auth:
- POST /api/auth/login → { email, password } → JWT token
- GET /api/auth/me → admin profile (JWT required)

Admin (JWT guard required):
- GET /api/admin/animals — all animals
- POST /api/admin/animals — create
- PATCH /api/admin/animals/:id — update
- DELETE /api/admin/animals/:id — delete
- GET /api/admin/stats — { total, available, pending, adopted, newThisMonth }

## FORM FIELDS (Add/Edit Animal)
name (required, min 2), species (required, select), breed (optional),
age in months (required, number), gender (required, radio Male/Female),
color (optional), weight kg (optional, decimal), status (required, select),
description (optional, textarea max 500), healthNotes (optional, textarea),
photo upload (optional, jpg/png max 5MB)

## AUTH FLOW
1. Login → POST /api/auth/login
2. Store JWT in localStorage
3. Axios interceptor adds Authorization: Bearer <token> to all requests
4. JWT Guard on all /admin routes
5. Token expires: 24h
6. Logout: clear localStorage + redirect to /admin/login

## EXTRA FEATURES (bonus points)
- Dark sidebar with smooth transitions
- Loading skeletons on data fetch
- Empty state illustration when no animals found
- Mobile-responsive admin table (horizontal scroll)
- Optimistic UI updates on delete
```

---

# 10. Acceptance Criteria

## Must Have (Grade-Critical)

- [ ]  Public page shows animals from database
- [ ]  Admin can log in with email + password
- [ ]  Admin can add a new animal (all required fields validated)
- [ ]  Admin can edit an existing animal
- [ ]  Admin can delete an animal (with confirmation)
- [ ]  JWT protects all admin routes
- [ ]  Data persists in PostgreSQL via Prisma
- [ ]  Responsive design (mobile + desktop)

## Nice to Have (Extra Credit)

- [ ]  Image upload for animal photos
- [ ]  Filter + search on public page
- [ ]  Dashboard stats cards
- [ ]  Export to CSV
- [ ]  Loading states and empty states
- [ ]  Toast notifications (Sonner)

---

# 11. Environment Variables

```
# Backend (.env)
DATABASE_URL="postgresql://user:password@localhost:5432/petadoption"
JWT_SECRET="your-super-secret-jwt-key-min-32-chars"
JWT_EXPIRES_IN="24h"
PORT=3001

# Frontend (.env.local)
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

---

> **Note for developer:** Start with the Prisma schema and run migrations first. Then build the NestJS auth module, then animals CRUD. Finally build the Next.js frontend starting with the admin dashboard, then the public page.
>