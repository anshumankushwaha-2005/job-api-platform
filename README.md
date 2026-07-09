# Job API Platform

A full-stack job aggregator: users register/log in, search jobs across multiple
sources (Indeed, TechFetch, Infosys, Capgemini, Randstad) in one query, and
track the jobs they've applied to.

## Stack
- **Client:** React 18 + Vite, React Router
- **Server:** Node.js + Express, MongoDB (Mongoose), JWT auth

## Project Structure
```
job-api-platform/
├── client/     # React frontend
└── server/     # Express backend
```

## Getting Started

### 1. Server
```bash
cd server
cp .env.example .env   # fill in MONGO_URI and JWT_SECRET at minimum
npm install
npm run dev             # starts on http://localhost:5000
```

### 2. Client
```bash
cd client
npm install
npm run dev              # starts on http://localhost:5173
```

The Vite dev server proxies `/api` requests to `http://localhost:5000`, so no
CORS config is needed in development.

## Job Source Services
Each service in `server/services/` (`indeedService.js`, `techfetchService.js`,
`infosysService.js`, `capgeminiService.js`, `randstadService.js`) is written to
call the real provider's API when the matching `*_API_KEY` environment
variable is set. **Without a key, each service returns realistic mock data**
so you can build and test the full flow before signing up for any external
API access. Swap in real endpoints/params in each service file as you get
credentials for each provider.

## Core Features
- **Auth:** register/login with hashed passwords (bcrypt) and JWT sessions
- **Job Search:** aggregates results from all (or selected) sources in parallel
- **Apply Tracking:** records applications per user, prevents duplicate applies,
  and lets you update status (applied → interviewing → offer/rejected)

## API Overview
| Method | Route | Description |
|---|---|---|
| POST | /api/auth/register | Create an account |
| POST | /api/auth/login | Log in, get JWT |
| GET | /api/auth/me | Get current user (auth required) |
| GET | /api/jobs/search?q=&location=&sources= | Search jobs (auth required) |
| POST | /api/apply | Apply to a job (auth required) |
| GET | /api/apply | List your applications (auth required) |
| PATCH | /api/apply/:id/status | Update application status (auth required) |

## Next Steps
- Add real API credentials for each job source as you obtain them
- Add pagination/rate limiting on job search
- Add password reset / email verification flows
- Deploy: e.g. server on Render/Railway, client on Vercel/Netlify, MongoDB Atlas for the DB
