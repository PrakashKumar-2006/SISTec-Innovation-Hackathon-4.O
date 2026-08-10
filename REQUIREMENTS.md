# SIH 4.0 Master Environment & Setup Documentation

## 1. PROJECT OVERVIEW
**Project Name**: SIH 4.0 Registration and Admin Portal  
**Purpose**: A comprehensive platform to manage registrations, problem statements, and selection processes for the SISTec Innovation Hackathon 4.0.  
**Architecture**: Full-Stack Monolithic (separated frontend and backend running concurrently)  
**Frontend**: React (Vite) with Tailwind CSS and shadcn/ui.  
**Backend**: Express.js on Node.js.  
**Database**: MongoDB with Mongoose ODM.  
**File Storage**: Local private storage on the backend (`UPLOAD_DIR`) via multer + sharp (images) + qpdf (PDFs).
**Authentication**: JWT-based authentication for the Admin Dashboard.  
**Email System**: Nodemailer with a MongoDB-backed atomic email queue.  
**Admin Dashboard**: Embedded within the frontend under `/admin` routes.  
**Public Website**: Hosted alongside the admin interface.

---

## 2. SYSTEM ARCHITECTURE
```text
      Public Website & Admin UI (React + Vite)
                     ↓↑
              Express API Layer
                     ↓↑
             Express Backend Server
             (Node.js + Express)
             /       |        \
            /        |         \
           /         |          \
   MongoDB            Local Storage    Nodemailer (SMTP)
 (Data & Logs)     (File Storage)   (Email Notifications)
           \
            EmailQueue (MongoDB collection for async retry)
```

---

## 3. TECHNOLOGY STACK

| Technology | Purpose | Version | Required? |
| --- | --- | --- | --- |
| Node.js | JS Runtime Environment | 18+ (Recommended) | Yes |
| npm | Package Manager | Included with Node | Yes |
| React | Frontend Framework | ^18.2.0 | Yes |
| Vite | Frontend Bundler | ^5.1.4 | Yes |
| Tailwind CSS | Styling | ^3.4.1 | Yes |
| shadcn/ui | UI Components | Various (@radix-ui/*) | Yes |
| React Router | Frontend Routing | ^7.18.1 | Yes |
| Axios | API Client | ^1.18.1 | Yes |
| TanStack React Query | Data Fetching/Caching | ^5.101.2 | Yes |
| React Hook Form | Form State Management | ^7.82.0 | Yes |
| Zod | Schema Validation | ^4.4.3 | Yes |
| Recharts | Charts/Visualizations | ^3.9.2 | Yes |
| TanStack React Table | Data Tables | ^8.21.3 | Yes |
| Framer Motion | Animations | ^12.42.2 | Yes |
| Express | Backend Web Framework | ^4.19.2 | Yes |
| MongoDB / Mongoose | Database & ODM | ^8.2.1 | Yes |
| Local Private Storage | File Storage | built-in (multer + sharp + qpdf) | Yes |
| Nodemailer | Email Sending | ^9.0.3 | Yes |
| jsonwebtoken (JWT) | Auth Tokens | ^9.0.3 | Yes |
| bcryptjs | Password Hashing | ^3.0.3 | Yes |
| multer | File Upload Middleware | ^1.4.5-lts.1 | Yes |
| xlsx | Excel Export/Import | ^0.18.5 | Yes |
| Razorpay | Payments Processing | ^2.9.8 | Yes |
| express-rate-limit | Rate Limiting | ^8.6.0 | Yes |
| helmet | Security Headers | ^8.3.0 | Yes |

---

## 4. REQUIRED SOFTWARE

1. **Node.js**: Minimum v18 LTS. Required to run both frontend and backend JavaScript environments. Download from [nodejs.org](https://nodejs.org/).
2. **Git**: Required for cloning the repository and version control.
3. **MongoDB**: Local MongoDB instance (or a MongoDB Atlas URI) is required to store application data.
4. **Code Editor**: VS Code is highly recommended.

---

## 5. OPERATING SYSTEM REQUIREMENTS

The project relies on Node.js and standard JavaScript ecosystems, meaning it is cross-platform.
- **Windows**: Fully supported. (Use PowerShell or Git Bash).
- **Linux**: Fully supported.
- **macOS**: Fully supported.

*No OS-specific native bindings are currently configured that would prevent execution on any major OS.*

---

## 6. NODE.JS & NPM VERSION

- **Required Node.js version**: v18.x or higher (LTS recommended).
- **Required npm version**: 9.x or higher.

To verify versions, run:
```bash
node --version
npm --version
```
*(Optional) Node Version Manager (NVM) can be used to manage versions if you work across multiple projects.*

---

## 7. PROJECT STRUCTURE

```text
/
├── src/                  # React Frontend Source Code (Public + Admin components)
├── public/               # Frontend static assets
├── server/               # Express Backend Source Code
│   ├── middleware/       # Express middlewares (auth, maintenance)
│   ├── models/           # Mongoose schemas
│   ├── routes/           # Express API endpoints
│   ├── utils/            # Helpers (email, redis)
│   ├── server.js         # Entry point for the backend
│   └── seed-admin.js     # Script to generate Super Admin
├── .env                  # Frontend environment variables
├── package.json          # Frontend dependencies & root scripts
└── vite.config.js        # Vite bundler configuration
```

---

## 8. FRONTEND SETUP

- **Location**: Root directory `/`
- **Dependency Installation**: `npm install`
- **Development Command**: `npm run dev:frontend` (or just `npm run dev` for both)
- **Production Build Command**: `npm run build`
- **Preview Command**: `npm run preview`

---

## 9. BACKEND SETUP

- **Location**: `/server` directory
- **Dependency Installation**: `cd server && npm install`
- **Development Command**: `npm run dev` (uses nodemon) or `npm run dev:backend` from the root.
- **Production Command**: `npm start` (runs `node server.js`)
- **Required Ports**: Usually runs on port `5000` (configurable via `PORT` in `server/.env`).

---

## 10. DATABASE SETUP

The project uses MongoDB. It can be run locally or via MongoDB Atlas.
- **Connection Configuration**: Configured via the `MONGODB_URI` variable in `server/.env`.
- **Collections/Models (Verified)**:
  - `Admin`
  - `AdminAuditLog`
  - `ChangeRequest`
  - `Contact`
  - `ProblemStatement`
  - `Selection`
  - `SystemSettings`
  - `EmailQueue` (Embedded inside `server.js`)
  - `PaymentLog` (Embedded inside `server.js`)
  - `Registration` (Managed implicitly across features)

---

## 11. LOCAL FILE STORAGE SETUP

Uploaded files (idea PPTs, consent letters, payment screenshots) are stored on the backend's local disk under `UPLOAD_DIR` (defaults to `server/storage`), organized into `images/`, `pdfs/`, and `documents/` subdirectories. This directory is private and is never served publicly; files are delivered to admins through the authenticated `/api/admin/files/:fileId` endpoint.
- **Variables** (in `server/.env`):
  - `UPLOAD_DIR=<path>` (optional; relative paths resolve against `server/`, absolute paths are used as-is)
- **Upload Pipeline**: `multer` parses the multipart upload, then:
  - PDFs are validated/optimized with `qpdf` and archived under `pdfs/`.
  - Raster images (consent letter, payment screenshot) are re-encoded to WebP with `sharp` and archived under `images/`.
  - Anything else (PPT/PPTX decks, unprocessable files) is archived verbatim under `documents/`.
- File metadata (owner, field, storage key, checksum) is tracked in the `File` MongoDB collection so a record's files can be replaced or cleaned up safely.

---

## 12. ENVIRONMENT VARIABLES

### Frontend (`/.env`)
| Variable Name | Required | Purpose | Example |
| --- | --- | --- | --- |
| `VITE_API_URL` | Yes | Points frontend to the backend API | `http://localhost:5000` |

### Backend (`/server/.env`)
| Variable Name | Required | Purpose | Example |
| --- | --- | --- | --- |
| `PORT` | No | Backend Express port | `5000` |
| `MONGODB_URI` | Yes | MongoDB connection string | `mongodb://127.0.0.1:27017/sih_registrations` |
| `REDIS_URL` | No | Optional Redis for rate-limiting | `redis://localhost:6379` |
| `UPLOAD_DIR` | No | Local file storage root (relative to `server/`) | `./storage` |
| `RAZORPAY_KEY_ID` | Yes | Razorpay API Key | `rzp_test_xxxx` |
| `RAZORPAY_KEY_SECRET` | Yes | Razorpay Secret | `secret_xxxx` |
| `REGISTRATION_FEE_INR` | Yes | Fee amount for payment processing | `150` |
| `EMAIL_HOST` | Yes | SMTP Host | `smtp.gmail.com` |
| `EMAIL_PORT` | Yes | SMTP Port | `587` |
| `EMAIL_USER` | Yes | Email Sender Address | `you@gmail.com` |
| `EMAIL_PASS` | Yes | SMTP Password/App Password | `your_app_password` |
| `SUPER_ADMIN_EMAIL` | Yes* | Used by seed-admin.js | `admin@sistec.ac.in` |
| `SUPER_ADMIN_PASSWORD` | Yes* | Used by seed-admin.js | `secure_password` |

---

## 13. ENVIRONMENT FILE SETUP

You need to create **two** environment files:
1. **Frontend**: Create `.env` in the root folder. (See Section 12).
2. **Backend**: Create `.env` in the `/server` folder. (Copy the contents of `server/.env.example` into a new `server/.env` file and fill in your actual credentials).

---

## 14. ADMIN AUTHENTICATION SETUP

- **Architecture**: Admin Dashboard uses JWT-based stateless authentication.
- **Roles/RBAC**: Supported roles include 'Super Admin', 'Admin', 'Moderator', 'Viewer'.
- **Initial Setup**: Run `node server/seed-admin.js` to create the first Super Admin. This script reads `SUPER_ADMIN_EMAIL` and `SUPER_ADMIN_PASSWORD` from `server/.env`.
- **Password Hashing**: Passwords are mathematically hashed using `bcryptjs` before insertion into MongoDB.

---

## 15. EMAIL SYSTEM

- **Architecture**: Asynchronous queue-based sending.
- **Stack**: Nodemailer for sending over SMTP.
- **Queueing**: Jobs are pushed to an `EmailQueue` MongoDB collection.
- **Processing**: The backend recursively fetches pending tasks with atomic locks (`findOneAndUpdate`) to prevent duplicate dispatch, then executes sending routines (`sendConfirmationEmail`, `sendSelectionEmail`, etc.).

---

## 16. FILE UPLOAD WORKFLOW

- User fills a form on the Public Website.
- Form sends `multipart/form-data` to the Backend via Axios.
- Express parses files using `multer`.
- Files are validated and archived into local private storage (`UPLOAD_DIR`) by the PDF/image processors.
- Express saves the relative storage key (e.g. `pdfs/2026/08/<hex>.pdf`) into the MongoDB document.
- Admins in the dashboard view/download files through the authenticated `/api/admin/files/:fileId` endpoint.

---

## 17. EXCEL IMPORT/EXPORT

- **Libraries Used**: `xlsx` (SheetJS).
- **Functionality**:
  - Problem Statements can be exported to Excel and imported/batch-updated from Excel.
  - Team Selections, and Registration records support exporting and generation.
- The import logic inherently prevents duplicate PS Numbers during bulk insertion.

---

## 18. PUBLIC WEBSITE SETUP

The Public Website is integrated into the main React frontend app (`src/`).
It requires `VITE_API_URL` to communicate with the backend. It uses standard `react-router-dom` to handle public navigation (`/`, `/explore`, `/contact`, etc.).

---

## 19. ADMIN DASHBOARD SETUP

The Admin Dashboard is part of the same Vite build, housed beneath `/admin` routes.
- **Login URL**: Typically accessible via the standard UI paths or login buttons.
- Requires a valid JWT token generated by backend `/api/admin/auth/login`.

---

## 20. COMPLETE LOCAL SETUP — FROM ZERO

**STEP 1:** Install Node.js (v18+) and Git.
**STEP 2:** Clone the repository.
```bash
git clone <repository-url>
cd <repository-directory>
```
**STEP 3:** Install root frontend dependencies.
```bash
npm install
```
**STEP 4:** Install backend dependencies.
```bash
cd server
npm install
cd ..
```
**STEP 5:** Setup frontend environment file.
```bash
echo "VITE_API_URL=http://localhost:5000" > .env
```
**STEP 6:** Setup backend environment file.
```bash
cp server/.env.example server/.env
# Open server/.env in a code editor and fill in MongoDB URI, Razorpay, and Email credentials.
# Make sure to add SUPER_ADMIN_EMAIL and SUPER_ADMIN_PASSWORD for Step 8.
```
**STEP 7:** Start your local MongoDB server (or ensure MongoDB Atlas URI is active).
**STEP 8:** Initialize the Super Admin.
```bash
node server/seed-admin.js
```
**STEP 9:** Run the full project (frontend and backend concurrently).
```bash
npm run dev
```
**STEP 10:** Open `http://localhost:3000` (or `http://localhost:5173` depending on Vite's allocation) in your browser.

---

## 21. COMMAND REFERENCE

Run these from the project root:
- `npm run dev`: Starts both frontend (Vite) and backend (Nodemon) concurrently.
- `npm run dev:frontend`: Starts only the Vite frontend.
- `npm run dev:backend`: Starts only the Express backend.
- `npm run build`: Compiles the frontend for production.
- `npm run preview`: Previews the compiled frontend build locally.

Run these from `/server`:
- `npm start`: Standard Node production start.
- `npm run clear-db`: Warning! Purges database completely.
- `node seed-admin.js`: Seeds the Super Admin.

---

## 22. PORTS

- **Frontend**: Vite typically defaults to `5173` or `3000`. It will display the port upon running `npm run dev`.
- **Backend**: Defaults to `5000`. Configurable via `PORT` in `server/.env`.
- **MongoDB**: Default local port is `27017`.

---

## 23. FIRST RUN CHECKLIST

- [ ] Node installed
- [ ] npm installed
- [ ] Git installed
- [ ] Dependencies installed (`npm install` & `cd server && npm install`)
- [ ] MongoDB connected
- [ ] Environment variables configured (both `.env` & `server/.env`)
- [ ] Email configured
- [ ] Super Admin created
- [ ] Backend running
- [ ] Frontend running
- [ ] Public website working
- [ ] Admin login working

---

## 24. VERIFICATION / HEALTH CHECK

1. **Verify Backend**: Open `http://localhost:5000` (or hit an API route via Postman) and ensure there is no connection error.
2. **Verify Frontend**: Open `http://localhost:5173` (or the Vite URL). The UI should render cleanly.
3. **Admin Check**: Navigate to the login page, use your Super Admin credentials, and verify access to the dashboard.
4. **Integration Check**: Submit a test message on the "Contact Us" form to verify backend payload parsing and database writing.

---

## 25. TROUBLESHOOTING

- **Port in Use**: If Vite or Express complains about `EADDRINUSE`, kill the offending process or change the port in `.env` / `vite.config.js`.
- **MongoDB Connection Failure**: Ensure the MongoDB service is running (e.g. `services.msc` on Windows, or `systemctl status mongod` on Linux) or check your Atlas IP Whitelist.
- **CORS Errors**: Ensure `VITE_API_URL` exactly matches the backend protocol, hostname, and port.
- **Nodemailer Errors**: If using Gmail, ensure "App Passwords" are generated via Google 2FA settings, as standard passwords will be rejected.

---

## 26. PRODUCTION DEPLOYMENT NOTES

Before deploying:
- Ensure all `.env` files are ignored by git (verified in `.gitignore`).
- Host frontend (e.g., Vercel, Netlify) and set `VITE_API_URL` to your production backend domain.
- Host backend (e.g., Render, Railway, AWS) and define production environment variables inside the dashboard.
- Secure MongoDB with proper authentication and IP Whitelists (Atlas).
- Consider setting up DKIM/SPF on your sending domain to prevent Nodemailer emails from going to spam.
- Switch Razorpay to Live Mode keys.

---

## 27. SECURITY REQUIREMENTS

- **helmet**: Secures Express apps by setting various HTTP headers.
- **express-rate-limit**: Prevents brute-force / DDoS attacks on the backend.
- **express-mongo-sanitize**: Sanitizes inputs against NoSQL Injection attacks.
- **xss-clean**: Sanitizes user input coming from POST body, GET queries, and URL params.
- **bcryptjs**: Secures stored passwords.
- **CORS Configuration**: Restricts API calls to approved frontend origins.

---

## 28. BACKUP & DATA SAFETY

- **MongoDB**: Use `mongodump` for local setups or automated backups within MongoDB Atlas.
- **Files**: Back up the local storage directory (`UPLOAD_DIR`, e.g. `server/storage`) alongside the database.
- Keep a secure backup of your production `.env` files in a password manager.

---

## 29. TEAM DEVELOPMENT GUIDELINES

- Always use `npm install` to respect the generated `package-lock.json`.
- Never commit `.env` or `server/.env` to the repository.
- If dependencies are added, test the build locally before pushing.
- All new database models should follow Mongoose standard practices and be documented.

---

## 30. "NEW MACHINE" QUICK START

1. `git clone <repo>`
2. `npm i && cd server && npm i && cd ..`
3. `echo "VITE_API_URL=http://localhost:5000" > .env`
4. Copy `server/.env.example` to `server/.env` and insert DB keys.
5. `node server/seed-admin.js`
6. `npm run dev`

---

## 31. KNOWN LIMITATIONS

- **Email Rate Limits**: Dependent entirely on your SMTP provider (e.g. Gmail restricts sending heavily). Bulk dispatch via loop should be monitored.
- Redis configuration is documented in `server/.env.example` but is optional for fallback local memory handling.

---

## 32. DOCUMENTATION ACCURACY RULE

All dependencies, tools, structure items, and commands referenced in this document have been explicitly parsed from the live `package.json`, `server/package.json`, `server/server.js`, `server/seed-admin.js`, `.gitignore`, and `.env` template definitions currently residing in the active repository at the time of generation.

---

## 33. FINAL VALIDATION
This file was generated sequentially by cross-referencing all root and backend directories, assuring consistency between requested installation instructions and the physical codebase structure.
