# URL Shortener Platform

A full-stack URL shortening platform with custom slugs, QR code generation, expiration handling, and detailed click analytics.

Frontend is built with React and Tailwind CSS.  
Backend is built with Node.js, Express, and MongoDB.

---

## Features

- Short URL generation  
- Custom user-defined slugs  
- Automatic redirection  
- QR code generation for every short link  
- Link expiration handling  
- Click analytics (device, country, referrer, timestamps)  
- Secure routes with JWT authentication  
- Analytics dashboard for each link  
- Modular React architecture with reusable components and hooks  

---

## Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS
- React Router
- React Hook Form + Zod
- Axios
- Recharts
- Lucide Icons

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- QRCode library
- Custom middleware & services

### Deployment
- Frontend: Vercel  
- Backend: Render  

---

## System Architecture

Client (React)  
→ REST API (Express)  
→ MongoDB Database  
→ Analytics & QR services  

---

## Core Modules

### Backend
- Auth system (JWT)
- Link management (create, delete, expire)
- Redirection service
- Analytics tracking
- QR generation endpoint

### Frontend
- Home (link creation + recent links)
- Dashboard / Analytics view
- Link details page
- QR modal system
- Custom hooks for link handling

---

## Environment Variables

### Backend
```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
BASE_URL=https://your-backend-domain
