# 📚 BookNook – Online Library Management System

**BookNook** is a modern online library management platform where users can explore books, borrow their favorite titles, and manage their borrowed books. It provides a simple and user-friendly experience for managing a digital library.

## 🌐 Live Website

- **Live Demo:** [Add Your Vercel URL]
- **Client Repository:** [Add Your Client GitHub URL]
- **Server Repository:** [Add Your Server GitHub URL]

## ✨ Key Features

- 🔐 **Authentication System** – Secure registration and login with Google authentication.
- 📖 **Browse Books** – Explore all available books in an organized layout.
- 🔍 **Book Details** – View detailed information about each book.
- ➕ **Add New Books** – Authenticated users can add books to the library.
- ✏️ **Manage Books** – Update and manage books added by the logged-in user.
- 📚 **Borrow Books** – Borrow available books with a selected return date.
- 🔄 **Return Books** – Return borrowed books easily.
- 📋 **My Borrows** – View borrowed books, borrowing dates, and return dates.
- 🔒 **Protected Routes** – Restrict private pages to authenticated users.
- 📱 **Responsive Design** – Optimized for desktop, tablet, and mobile devices.
- 🔔 **Toast Notifications** – Get instant feedback for important actions.

## 🛠️ Technologies Used

### Frontend

- Next.js
- React
- JavaScript
- Tailwind CSS
- shadcn/ui
- Better Auth
- Sonner
- React hot toast

### Backend

- Node.js
- Express.js
- MongoDB
- JSON Web Token (JWT)
- JOSE
- CORS

## 📂 Project Structure

```text
BookNook/
│
├── client/
│   ├── public/
│   └── src/
│       ├── app/
│       ├── components/
│       ├── lib/
│       └── ...
│
└── server/
    ├── index.js
    ├── package.json
    └── .env
```

## ⚙️ Installation & Setup

### 1. Clone the repositories

```bash
git clone YOUR_CLIENT_REPOSITORY_URL
git clone YOUR_SERVER_REPOSITORY_URL
```

### 2. Setup the Client

```bash
cd client
npm install
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
BETTER_AUTH_SECRET=your_secret_key
BETTER_AUTH_URL=http://localhost:3000
MONGODB_URI=your_mongodb_connection_string
```

Start the development server:

```bash
npm run dev
```

### 3. Setup the Server

```bash
cd server
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
```

Start the backend server:

```bash
npm run dev
```

## 🗄️ Database

**Database:** MongoDB

**Collections:**

- `books` – Stores book information.
- `borrows` – Stores borrowing records.

## 🔐 Security

- Authentication using Better Auth.
- JWT-based API request verification.
- Protected frontend routes.
- Environment variables for sensitive configuration.
- Server-side validation for API requests.

## 🎯 Project Purpose

BookNook was developed as a practical full-stack web development project to demonstrate modern frontend development, backend API development, database integration, authentication, and CRUD operations.

## 👩‍💻 Developer

**Rubina Akter**

Full-Stack Web Developer

---

⭐ If you find this project useful, consider giving it a star!
