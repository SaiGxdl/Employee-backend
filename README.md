# Conference Backend — Employee & Task Management API

> Minimal, deployable Node.js + Express backend for managing Employees and Tasks.  
> Ready for deployment to Render and connected to MongoDB Atlas.

---

## 🔧 Quick setup (local)

Prerequisites:
- Node.js 18+ installed
- npm available
- MongoDB Atlas cluster (or local MongoDB) with connection string

1. Clone repo
```bash
git clone https://github.com/SaiGxdl/Employee-backend.git
cd Employee-backend
````

2. Install dependencies

```bash
npm ci
```

3. Create environment file

* Copy `.env.example` to `.env` and update `MONGODB_URI`:

```bash
cp .env.example .env
# then edit .env and paste your MongoDB Atlas connection string
```

4. Seed sample data (optional — creates employees & tasks)

```bash
npm run seed
```

5. Start in development

```bash
npm run dev
```

6. Health check
   Open in browser or run:

```bash
curl http://localhost:4000/health
```

---

## 🧭 API summary

Base: `http://localhost:4000` (or `https://<your-render-url>` in production)

### Employees

* `POST   /api/employees` — create employee
* `GET    /api/employees` — list employees (optional `?q=` search)
* `GET    /api/employees/:id` — get employee
* `PUT    /api/employees/:id` — update employee
* `DELETE /api/employees/:id` — delete employee

### Tasks

* `POST   /api/tasks` — create task
* `GET    /api/tasks` — list tasks (supports `?status=` and `?assignedTo=`)
* `GET    /api/tasks/:id` — get task
* `PUT    /api/tasks/:id` — update task
* `DELETE /api/tasks/:id` — delete task

See `docs/api.md` for full request/response examples (if included).

---

## 🧰 Tech stack

* **Runtime:** Node.js (ES Modules)
* **Framework:** Express
* **Database:** MongoDB (Mongoose) — recommended: MongoDB Atlas
* **Validation:** Joi
* **Dev tools:** nodemon, eslint
* **Logging:** morgan (console logs)
* **Hosting / Deployment:** Render (or any Node hosting that supports environment variables)

---

## 📁 Project structure

```
conference-backend/
├─ src/
│  ├─ config/        # DB connection
│  ├─ controllers/   # route handlers
│  ├─ models/        # mongoose schemas
│  ├─ routes/        # express routers
│  ├─ validators/    # Joi validators
│  ├─ seed/          # seed script
│  └─ server.js
├─ .env.example
├─ package.json
└─ README.md
```

---

## 📸 Screenshots & short recording

To show the API working in your portfolio, add:

* A screenshot of `curl http://localhost:4000/health` or the Render URL health check


**Where to put assets in your repo:**

```
/health.png
/employee.png
/load task.png

```

**Recommended tools**

* Screenshots: Windows Snipping Tool / macOS Screenshot (Cmd+Shift+4)
* Recordings: OBS Studio (free) or QuickTime (macOS)
* Compress video to under 25–50MB for easy upload.

---

## ✅ Assumptions & decisions

* Data is seeded via `src/seed/seed.js` and expects `MONGODB_URI` in `.env`.
* No authentication implemented (public API) — suitable for assessment/demo. Add JWT auth as a bonus.
* Using MongoDB Atlas (SRV connection) is recommended to avoid IP whitelist issues.
* No Docker included per requirements; Render will run `npm start`.

---

## ✨ Bonus features implemented

* Seed script that generates hundreds of realistic mock employees and tasks.
* `index.html` minimal demo UI included at repo root to visualize API responses.
* Validation with Joi for strict payload checking.
* Ready-to-run `npm run seed` and `npm run dev` scripts.

---

## 🛠 Deploy to Render (short)

1. Push repo to GitHub.
2. Create a **Web Service** in Render and connect to the GitHub repo.
3. Build Command: `npm ci`
   Start Command: `npm start`
4. Add Environment Variables in Render dashboard: `MONGODB_URI` (Atlas URI)
5. Deploy — open `https://<your-service>.onrender.com/health`

---

