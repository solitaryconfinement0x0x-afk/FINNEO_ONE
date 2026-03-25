# FinNeo AI Full-Stack System

This project is a production-ready full-stack application for financial advisory.

## 📁 Project Structure
- `/frontend`: React + Vite + TypeScript (Neo-Brutalist UI)
- `/backend`: Node.js + Express + TypeScript + Prisma
- `docker-compose.yml`: Orchestration for backend and PostgreSQL

## 🚀 Quick Start (Docker)

1. **Clone the repository** (you are already here).
2. **Create a `.env` file** in the root based on `backend/.env.example`.
3. **Run with Docker Compose**:
   ```bash
   docker-compose up --build
   ```

## 🛠 Local Development

### Backend Setup
1. `cd backend`
2. `npm install`
3. Setup your `.env` with a local PostgreSQL URL.
4. `npm run prisma:generate`
5. `npm run prisma:migrate`
6. `npm run dev`

### Frontend Setup
1. `cd frontend`
2. `npm install`
3. `npm run dev`

## 📡 API Endpoints

### Auth
- `POST /api/auth/register` - Create new user
- `POST /api/auth/login` - Get JWT token
- `GET /api/auth/me` - Get current user profile

### Profile
- `GET /api/profile` - Get financial persona
- `POST /api/profile` - Set initial profile
- `PUT /api/profile` - Update profile

### Transactions
- `GET /api/transactions` - List all transactions
- `POST /api/transactions` - Add new transaction
- `DELETE /api/transactions/:id` - Remove transaction

## 🔐 Security
- JWT-based authentication stored in `localStorage` on the client.
- Password hashing using `bcrypt`.
- Protected routes on the backend.
- Global centralized error handling.
