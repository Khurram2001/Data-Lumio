# DataLumio

AI-powered, no-code data analysis platform for qualitative and quantitative research. Upload spreadsheets, PDFs, survey files, and research documents — then clean, analyze, visualize, and export insights without writing code.

**Live site:** [https://datalumio.co](https://datalumio.co)

---

## Overview

DataLumio helps researchers, students, analysts, and business teams turn raw data into clear, presentation-ready outputs. The platform combines AI-assisted workflows for document analysis, structured data processing, dashboards, and reporting in a single workspace.

This repository contains the **frontend web application** — a React single-page app that connects to the DataLumio backend API for authentication, file processing, AI analysis, and subscription management.

---

## Features

### Data Analysis

- **Qualitative Analysis** — Upload PDF and DOC/DOCX files; run Open Insight (exploratory) or Predefined Insight (prompt + theme-guided) analysis; download structured reports.
- **Quantitative Analysis** — Upload XLSX and CSV files; generate statistical summaries, charts, and reports with optional custom prompts.
- **PDF Analysis** — Chat with and analyze long PDF documents and research papers.
- **Data Cleaning** — Prepare messy spreadsheets by addressing duplicates, missing values, and inconsistent formats before analysis.
- **Data Visualization Dashboards** — Turn datasets into interactive charts, KPI cards, and dashboard views.
- **Data Integration** — Connect and work with files from supported sources (e.g. Google Drive).

### AI Workflows

- Document embedding and AI-powered report generation
- Theme extraction, pattern discovery, and plain-language summaries
- Export reports in DOCX and other supported formats

### User & Account

- Email/password registration with email verification
- Google Sign-In (Firebase Auth)
- Password reset
- Profile management, usage tracking, and account deletion
- In-app feedback and contact forms

### Subscriptions & Billing

- **Starter** — One-time payment for limited analyses
- **Pro** — Monthly or yearly subscription with higher limits
- **Enterprise** — Custom plans for teams and organizations
- Stripe-powered checkout, billing portal, payment history, and subscription cancellation

### Marketing Site

- Landing page, features, pricing, demo video, data security / privacy, and contact pages
- SEO-optimized pages with canonical URLs and meta tags
- Blog integration at [blog.datalumio.co](http://blog.datalumio.co/)

---

## Tech Stack

| Category | Technologies |
|----------|--------------|
| **Framework** | React 19, Vite 6 |
| **Routing** | React Router 7 |
| **State** | Redux Toolkit, Redux Persist |
| **UI** | Material UI 7, Tailwind CSS 4, Emotion, Styled Components |
| **HTTP** | Axios |
| **Auth** | Firebase Authentication (Google OAuth) |
| **Hosting** | Firebase Hosting |
| **Analytics** | Google Analytics (gtag) |
| **Payments** | Stripe (via backend API) |
| **Storage** | AWS S3 (via backend API) |
| **Other** | react-helmet-async, react-toastify, react-slick, moment.js |

---

## Project Structure

```
Data_Lumio/
├── public/                  # Static assets (robots.txt, sitemap.xml)
├── src/
│   ├── Components/          # Shared components (ContactUs, ScrollToTop, etc.)
│   ├── Repo/                # API client (Repo.js, Repository.js)
│   ├── assets/              # Images, icons, SVGs
│   ├── dashboard/           # Authenticated app
│   │   ├── analysis/        # Qualitative & quantitative analysis flows
│   │   ├── account-info/    # Profile, payment history
│   │   ├── subscription/    # Plans, checkout, billing
│   │   ├── welcome/         # Onboarding & analysis type selection
│   │   └── Layout/          # Dashboard shell & sidebar
│   ├── firebase/            # Firebase config & Google sign-in
│   ├── landing Page/        # Public marketing & auth pages
│   ├── layouts/             # Landing layout wrapper
│   ├── store/               # Redux store configuration
│   ├── App.jsx              # Routes & app shell
│   └── main.jsx             # Entry point
├── firebase.json            # Firebase Hosting config
├── .firebaserc              # Firebase project targets
├── vite.config.js
└── package.json
```

---

## Prerequisites

- **Node.js** 18+ (LTS recommended)
- **npm** or **Yarn** (project uses Yarn 4 as package manager)
- **Firebase CLI** (for deployment only)
- Access to the DataLumio backend API and Firebase project (for full functionality)

---

## Getting Started

### 1. Clone the repository

```bash
git clone <repository-url>
cd Data_Lumio
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Start the development server

```bash
npm run dev
# or
yarn dev
```

The app runs at **http://localhost:3000** (configured in `vite.config.js`).

### 4. Build for production

```bash
npm run build
# or
yarn build
```

Output is written to the `dist/` directory.

### 5. Preview production build locally

```bash
npm run preview
# or
yarn preview
```

---

## Available Scripts

| Script | Description |
|--------|-------------|
| `dev` | Start Vite dev server with HMR |
| `build` | Create optimized production build |
| `preview` | Serve the production build locally |
| `lint` | Run ESLint across the project |
| `deploy` | Build and deploy to Firebase Hosting |

---

## Deployment

The app is deployed to **Firebase Hosting**.

```bash
npm run deploy
# or
yarn deploy
```

This runs `vite build` and then `firebase deploy`.

Firebase hosting targets (see `.firebaserc` and `firebase.json`):

- **Production:** `data-lumio`
- **Test:** `datalumio-test34`

All routes are rewritten to `index.html` for client-side routing (SPA).

---

## Backend API

The frontend communicates with the DataLumio REST API. The base URL is configured in `src/Repo/Repository.js`:

```
https://api.urhja.com
```

### Key API Areas

| Area | Endpoints |
|------|-----------|
| **Auth** | `/signup`, `/login`, `/verification-email`, `/verify-code`, `/forgot-password` |
| **User** | `/get-user`, `/update-user`, `/delete-account` |
| **Files** | `/upload` |
| **Qualitative** | `/save-embeddings`, `/delete-embeddings`, `/generate-openinsight-report`, `/generate-predefinedinsight-report` |
| **Quantitative** | `/generate-quantitative-report`, `/generate-quantitative-predefined-report` |
| **Billing** | `/create-checkout-session`, `/create-portal-session`, `/cancel-subscription`, `/payment-history`, `/success` |
| **Support** | `/user-enquiry` |

---

## Application Routes

### Public (Landing)

| Route | Page |
|-------|------|
| `/` | Home |
| `/features` | Features |
| `/subscription-plan` | Pricing |
| `/demo` | Demo video |
| `/data-security` | Privacy & data security |
| `/contact-us` | Contact |
| `/login` | Login |
| `/signup` | Sign up |
| `/email-verification` | Email verification |
| `/reset-password` | Password reset |

### Authenticated (Dashboard)

| Route | Page |
|-------|------|
| `/welcome` | Welcome / onboarding |
| `/step-analysis` | Choose qualitative or quantitative analysis |
| `/analysis` | Qualitative analysis workflow |
| `/quantittive-upload-file` | Quantitative analysis workflow |
| `/subscription` | Subscription & billing |
| `/profile` | Account info & payment history |
| `/dashboard/contact-us` | Contact support |

---

## Configuration

### Firebase

Firebase is initialized in `src/firebase/firebase.js` for Google authentication and analytics. Update the Firebase config there when pointing to a different project.

### API Base URL

To point the app at a different backend, update `baseURL` in `src/Repo/Repository.js`.

### Stripe Lookup Keys

Subscription plan lookup keys are defined in `src/Repo/Repository.js`:

- `lumio-starter` / `lumio-starter-2` — Starter plans
- `lumio-pro-monthly` / `lumio-pro-yearly` — Pro plans

---

## Browser Support

Modern evergreen browsers (Chrome, Firefox, Safari, Edge). JavaScript must be enabled.

---

## License

Proprietary. All rights reserved.

---

## Links

- **Website:** [https://datalumio.co](https://datalumio.co)
- **Blog:** [http://blog.datalumio.co](http://blog.datalumio.co/)
