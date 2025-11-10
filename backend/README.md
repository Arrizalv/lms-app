# LMS Backend (for local XAMPP MySQL)

This small Express backend provides basic signup/login endpoints backed by a MySQL database (use XAMPP's MySQL / phpMyAdmin).

Setup:

1. Copy `.env.example` to `.env` and fill DB credentials (match your XAMPP MySQL settings).
2. Run `npm install` in the `backend` folder.
3. Run `npm start`.

Endpoints:
- POST /api/auth/signup  { email, password, role }
- POST /api/auth/login   { email, password }

Notes:
- This is a minimal example to get you started. Add validation, HTTPS, and stronger security for production.
