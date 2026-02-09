<!-- markdownlint-disable -->
<div align="center">

<img src="https://img.shields.io/badge/Pagyn-AI%20Powered%20eBook%20Platform-6C63FF?style=for-the-badge&logo=bookstack&logoColor=white" alt="Pagyn Banner" />

# 📖 Pagyn

### *AI-Powered eBook Creation & Management Platform*

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Express](https://img.shields.io/badge/Express-5-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-9-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-AI-4285F4?style=flat-square&logo=google&logoColor=white)](https://ai.google.dev/)
[![License](https://img.shields.io/badge/License-Apache_2.0-D22128?style=flat-square&logo=apache&logoColor=white)](LICENSE)

<br />

**Pagyn** is a full-stack web application that empowers writers and content creators to write, manage, and export eBooks — with the help of **AI-powered content generation** using Google Gemini.

[Getting Started](#-getting-started) · [Features](#-features) · [Tech Stack](#-tech-stack) · [API Reference](#-api-reference) · [License](#-license)

</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 📝 Book Authoring
- Create and manage multiple eBooks
- Rich Markdown editor with **live preview**
- Chapter-based book organization
- Drag-and-drop chapter reordering
- Word & character count tracking
- Fullscreen writing mode

</td>
<td width="50%">

### 🤖 AI-Powered Generation
- **Outline generation** — auto-generate chapter titles & descriptions from a topic
- **Chapter content generation** — AI writes full 1500–2000 word chapters
- 6 writing style presets:
  - 📘 Informative & Storytelling
  - 🎨 Creative & Descriptive
  - 💼 Professional & Formal
  - 🎓 Academic & Analytical
  - 😄 Humorous & Engaging
  - ✏️ Simple & Direct

</td>
</tr>
<tr>
<td width="50%">

### 📤 Export Options
- **PDF** export with styled formatting & cover art
- **DOCX** export with full Markdown-to-Word conversion (headings, lists, bold/italic, custom fonts)

</td>
<td width="50%">

### 🔐 Auth & User Management
- Secure JWT-based authentication
- User registration & login
- Profile management (username, avatar)
- Protected routes & ownership validation

</td>
</tr>
<tr>
<td width="50%">

### 📚 Reading View
- Clean, distraction-free book reader
- Chapter sidebar navigation
- Adjustable font size (14px–36px)
- Previous / Next chapter navigation

</td>
<td width="50%">

### 🎨 Modern UI/UX
- Responsive design with Tailwind CSS
- Toast notifications for feedback
- Confirmation modals for destructive actions
- Custom cover art upload (JPEG, PNG, GIF)

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

<table>
<tr>
<th align="center">Layer</th>
<th align="center">Technology</th>
</tr>
<tr>
<td><strong>Frontend</strong></td>
<td>
  <img src="https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Vite_7-646CFF?style=flat-square&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Tailwind_CSS_4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />
  <img src="https://img.shields.io/badge/React_Router_7-CA4245?style=flat-square&logo=reactrouter&logoColor=white" />
</td>
</tr>
<tr>
<td><strong>Backend</strong></td>
<td>
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white" />
  <img src="https://img.shields.io/badge/Express_5-000000?style=flat-square&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/Mongoose_9-880000?style=flat-square&logo=mongoose&logoColor=white" />
</td>
</tr>
<tr>
<td><strong>Database</strong></td>
<td>
  <img src="https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white" />
</td>
</tr>
<tr>
<td><strong>AI</strong></td>
<td>
  <img src="https://img.shields.io/badge/Google_Gemini-4285F4?style=flat-square&logo=google&logoColor=white" />
  (gemini-2.5-flash-lite & gemini-2.0-flash)
</td>
</tr>
<tr>
<td><strong>Auth</strong></td>
<td>
  <img src="https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white" />
  <img src="https://img.shields.io/badge/bcrypt-003A70?style=flat-square&logo=letsencrypt&logoColor=white" />
</td>
</tr>
<tr>
<td><strong>Export</strong></td>
<td>
  <img src="https://img.shields.io/badge/PDFKit-FF0000?style=flat-square&logo=adobeacrobatreader&logoColor=white" />
  <img src="https://img.shields.io/badge/docx-2B579A?style=flat-square&logo=microsoftword&logoColor=white" />
</td>
</tr>
<tr>
<td><strong>Other</strong></td>
<td>
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=flat-square&logo=axios&logoColor=white" />
  <img src="https://img.shields.io/badge/Lucide_Icons-F56040?style=flat-square&logo=lucide&logoColor=white" />
  <img src="https://img.shields.io/badge/dnd--kit-6C63FF?style=flat-square" />
  <img src="https://img.shields.io/badge/Multer-FF6F00?style=flat-square" />
</td>
</tr>
</table>

---

## 📁 Project Structure

```
Pagyn/
├── client/                     # React frontend (Vite)
│   ├── public/                 # Static assets
│   └── src/
│       ├── components/
│       │   ├── auth/           # Route protection
│       │   ├── cards/          # BookCard display
│       │   ├── editor/         # Book & chapter editing
│       │   ├── home/           # Landing page sections
│       │   ├── layout/         # Navbar, dashboard layout
│       │   ├── modals/         # Create, delete, AI modals
│       │   ├── ui/             # Reusable UI primitives
│       │   └── view/           # Book reading view
│       ├── context/            # Auth context provider
│       ├── pages/              # Route-level page components
│       └── utils/              # API config, helpers
│
├── server/                     # Express backend
│   ├── config/                 # Database connection
│   ├── controllers/            # Route handlers
│   ├── middlewares/             # Auth & upload middleware
│   ├── models/                 # Mongoose schemas
│   ├── routes/                 # API route definitions
│   ├── services/               # Business logic layer
│   └── uploads/                # User-uploaded cover art
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

| Requirement | Version |
|---|---|
| **Node.js** | v18+ |
| **MongoDB** | v6+ (local or Atlas) |
| **Google AI API Key** | [Get one here](https://aistudio.google.com/apikey) |

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Dilyannn/Pagyn.git
cd Pagyn
```

### 2️⃣ Setup the Server

```bash
cd server
npm install
```

Create a `.env` file inside the `server/` directory:

```env
PORT=5000
JWT_SECRET=your_jwt_secret_here
GEMINI_API_KEY=your_google_gemini_api_key
```

> **Note:** MongoDB defaults to `mongodb://localhost:27017/pagyn`. Update `server/config/db.js` if using a different connection string.

### 3️⃣ Setup the Client

```bash
cd ../client
npm install
```

Create a `.env` file inside the `client/` directory:

```env
VITE_API_BASE_URL=http://localhost:5000
```

### 4️⃣ Run the Application

Start both services in separate terminals:

```bash
# Terminal 1 — Backend
cd server
npm run dev

# Terminal 2 — Frontend
cd client
npm run dev
```

| Service | URL |
|---|---|
| 🖥️ Frontend | `http://localhost:5173` |
| ⚙️ Backend API | `http://localhost:5000` |

---

## 📡 API Reference

### 🔑 Authentication

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register a new user | ❌ |
| `POST` | `/api/auth/login` | Login & get JWT token | ❌ |
| `GET` | `/api/auth/profile` | Get current user profile | ✅ |
| `PUT` | `/api/auth/profile` | Update profile (username/password) | ✅ |

### 📚 Books

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/books` | Create a new book | ✅ |
| `GET` | `/api/books` | Get all user's books | ✅ |
| `GET` | `/api/books/:id` | Get book by ID | ✅ |
| `PUT` | `/api/books/:id` | Update book & chapters | ✅ |
| `DELETE` | `/api/books/:id` | Delete a book | ✅ |
| `PUT` | `/api/books/:id/cover` | Upload cover art | ✅ |

### 🤖 AI Generation

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `POST` | `/api/ai/generate-outline` | Generate book outline (chapters) | ✅ |
| `POST` | `/api/ai/generate-chapter-content` | Generate chapter content | ✅ |

### 📤 Export

| Method | Endpoint | Description | Auth |
|---|---|---|---|
| `GET` | `/api/export/pdf/:bookId` | Export book as PDF | ✅ |
| `GET` | `/api/export/docx/:bookId` | Export book as DOCX | ✅ |

> **Auth ✅** = Requires `Authorization: Bearer <token>` header

---

## 🗄️ Data Models

### User

```
┌──────────────────────────────────────┐
│              User                    │
├──────────────────────────────────────┤
│  username    : String  (unique)      │
│  email       : String  (unique)      │
│  password    : String  (hashed)      │
│  avatar      : String               │
│  isPro       : Boolean              │
│  createdAt   : Date                 │
│  updatedAt   : Date                 │
└──────────────────────────────────────┘
```

### Book & Chapter

```
┌──────────────────────────────────────┐
│              Book                    │
├──────────────────────────────────────┤
│  userId      : ObjectId → User      │
│  title       : String               │
│  subtitle    : String               │
│  author      : String               │
│  coverArt    : String               │
│  description : String               │
│  status      : "draft" | "published"│
│  chapters    : [Chapter]            │
│  createdAt   : Date                 │
│  updatedAt   : Date                 │
├──────────────────────────────────────┤
│         Chapter (embedded)           │
├──────────────────────────────────────┤
│  title       : String               │
│  description : String               │
│  content     : String (Markdown)    │
└──────────────────────────────────────┘
```

---

## 🔒 Environment Variables

| Variable | Location | Description |
|---|---|---|
| `PORT` | `server/.env` | Server port (default: `5000`) |
| `JWT_SECRET` | `server/.env` | Secret key for signing JWT tokens |
| `GEMINI_API_KEY` | `server/.env` | Google Gemini API key for AI features |
| `VITE_API_BASE_URL` | `client/.env` | Backend API base URL |

---

## 📄 License

This project is licensed under the **Apache License 2.0** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Made with ❤️ by [Dilyannn](https://github.com/Dilyannn)

<img src="https://img.shields.io/badge/Built_with-React_%2B_Express_%2B_Gemini_AI-6C63FF?style=for-the-badge" />

</div>
