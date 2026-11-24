# Architecture and security notes

- Express controllers orchestrate requests; services contain evaluation/audit logic; Mongoose models define persistence.
- Access tokens are short-lived. Refresh tokens are rotated and only SHA-256 hashes are persisted.
- Passwords use bcrypt cost 12. Helmet, CORS, JSON body limits, request logging and auth rate limiting are enabled.
- Role middleware enforces admin/faculty/student boundaries. Ownership checks prevent faculty from editing other faculty's content.
- Student question reads explicitly exclude `correctKey` and `explanation`. Exam detail for students omits question IDs.
- Attempt start checks assignment, exam window and attempt count. The deadline is the earlier of duration expiry and exam close. Every answer write validates question membership and option key. Scores are computed only on the server.
- Compound indexes support common exam/attempt queries. Analytics use MongoDB aggregation pipelines with `$lookup`, `$unwind`, `$group`, and `$project`.
- Audit events capture question/exam/attempt lifecycle actions.

## Production hardening before deployment
Add email verification, password reset, CSRF protection if moving tokens to cookies, stronger per-route rate limits, pagination caps, audit retention policy, automated integration tests, and a job/worker to auto-submit abandoned attempts at deadline. Restrict Socket.IO room joins using authenticated socket middleware and role/assignment checks before exposing monitoring in production.
