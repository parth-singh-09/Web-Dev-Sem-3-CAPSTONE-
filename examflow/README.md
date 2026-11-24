# ExamFlow — Online Examination & Assessment Management System

A full-stack capstone starter with a polished React dashboard and a secure Express/MongoDB API. Roles: administrator, faculty and student. Includes question bank, exam scheduling, server-timed attempts, automatic MCQ evaluation, result release, analytics aggregation and Socket.IO event hooks.

## Requirements
- Node.js 20+
- MongoDB 6+ (local or Atlas)

## Setup
1. Copy `.env.example` to `server/.env` and update `MONGO_URI`, JWT secrets and `CLIENT_URL`. Both JWT secrets should be unique random strings of at least 32 characters.
2. Install dependencies:
   ```bash
   npm install
   npm --prefix server install
   npm --prefix client install
   ```
3. Seed demo accounts (optional):
   ```bash
   npm --prefix server run seed
   ```
4. Start API + frontend from the project root:
   ```bash
   npm run dev
   ```
5. Open http://localhost:5173. API health: http://localhost:5000/api/health

## Demo accounts
All seeded demo accounts use password `ExamFlow@123`:
- Admin: `admin@examflow.dev`
- Faculty: `faculty@examflow.dev`
- Student: `student@examflow.dev` (section CSE-A)

Change demo credentials and secrets before any public deployment.

## First workflow
1. Sign in as faculty and add MCQ questions in Question bank.
2. Create an examination; choose the questions, set the availability window and assign section `CSE-A`.
3. Sign in as student in another browser/private window and open Examinations.
4. Start the exam during its availability window, answer and submit.
5. Sign in as faculty to view results and publish them; students can then see scores.

## Frontend
React 18 + Vite + React Router + Axios + Recharts-ready analytics components + Lucide icons. Responsive dashboard, role-aware navigation, exam/question management modals, student attempt interface and sign-in/register screens.

## Backend
Express + Mongoose + JWT + bcrypt + Zod + Socket.IO. See [API documentation](docs/API.md) and [architecture/security notes](docs/ARCHITECTURE.md).

## Important implementation notes
- This is a complete educational capstone foundation, not a production-certified examination service. See the production hardening checklist in `docs/ARCHITECTURE.md`.
- The live socket event hooks are included; secure authenticated room-join authorization should be added before exposing faculty monitoring in production.
- Auto-submission is enforced when a student submits after the deadline; a production deployment should also run a scheduled worker to finalize attempts if a browser closes and no submit request arrives.
- Refresh token rotation is implemented at the API level. The included client keeps tokens in localStorage for straightforward local testing; use secure HttpOnly cookies for a production browser deployment.
