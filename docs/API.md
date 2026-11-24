# ExamFlow API
Base URL: `http://localhost:5000/api`

## Authentication
- `POST /auth/register` — create student/faculty account
- `POST /auth/login` — returns access + refresh tokens
- `POST /auth/refresh` — rotate refresh token
- `POST /auth/logout` — revoke refresh token
- `GET /auth/me` — current user

Send `Authorization: Bearer <accessToken>` for protected routes.

## Questions (admin/faculty)
- `GET /questions?subject=&topic=&difficulty=&page=1&limit=12`
- `POST /questions` — prompt, options[{key,text}], correctKey, subject, topic, difficulty, defaultMarks, negativeMarks
- `PATCH /questions/:id`
- `DELETE /questions/:id` — archives question

Student-facing exam APIs never return answer keys.

## Examinations
- `GET /exams` — role-filtered list
- `POST /exams` — title, questionIds, durationMinutes, startsAt, endsAt, totalMarks, assignedSections/assignedStudents, randomizeQuestions, negativeMarking
- `GET /exams/:id`
- `PATCH /exams/:id`, `DELETE /exams/:id` — faculty/admin
- `POST /exams/:id/start` — student starts eligible exam
- `GET /exams/:id/results` — faculty/admin
- `POST /exams/:id/publish` — release results

## Attempts
- `PATCH /attempts/:attemptId/answer` — `{questionId, selectedKey}`
- `POST /attempts/:attemptId/submit` — server evaluates all answers
- `GET /attempts/mine/results` — student results (hidden until published)

## Analytics
- `GET /analytics/overview` — aggregation-based KPIs and section performance
- `GET /analytics/exams/:id/questions` — question-level accuracy

## Socket.IO events
Client emits `exam:join` with `{examId}`. Authorized clients should join only after their API access is verified. Server emits `attempt:started`, `attempt:submitted`, `exam:created`, and `result:published`.
