## 💻 FRONTEND STRUCTURE (React + Tailwind + Recharts)

### 📁 Folder Structure

```
frontend/
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── CreateLinkForm.jsx
│   │   ├── LinkCard.jsx
│   │   ├── AnalyticsChart.jsx
│   │   ├── DevicePieChart.jsx
│   │   ├── QRModal.jsx
│   │   └── ProtectedRoute.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Dashboard.jsx
│   │   ├── LinkDetails.jsx
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── hooks/
│   │   └── useAuth.js
│   └── utils/
│       └── api.js
```

---

## 🧭 FRONTEND ROUTES (React Router)

| Path         | Page        | Description                         |
| ------------ | ----------- | ----------------------------------- |
| `/`          | Home        | Public page to shorten links        |
| `/login`     | Login       | User login                          |
| `/register`  | Register    | User registration                   |
| `/dashboard` | Dashboard   | User’s list of created links        |
| `/link/:id`  | LinkDetails | Analytics for a specific short link |

---

## 🧱 PAGES

### 🏠 1. **Home.jsx**

**Purpose:** Public landing page for quick shortening

**Features:**

* Input for long URL and optional custom slug
* Button → Generate short link
* Displays generated short URL + QR code
* “Login to view analytics” message if not logged in

---

### 🔑 2. **Login.jsx**

**Purpose:** User authentication

**Features:**

* Form fields: Email, Password
* On submit → `POST /api/auth/login`
* Save JWT token to localStorage
* Redirect to `/dashboard`

---

### 📝 3. **Register.jsx**

**Purpose:** New user registration

**Features:**

* Form fields: Email, Password, Confirm Password
* On submit → `POST /api/auth/register`
* Show success or error message
* Redirect to `/login`

---

### 📋 4. **Dashboard.jsx**

**Purpose:** Display all links for the logged-in user

**Features:**

* Fetch from `GET /api/links`
* Show list/table of links with:

  * Short URL
  * Original URL
  * Click count
  * Expiry date
  * Created at
* Buttons:

  * “+ Create New Link” → open `CreateLinkForm` modal
  * “View Analytics” → `/link/:id`
  * “Delete” → `DELETE /api/links/:id`

---

### 📊 5. **LinkDetails.jsx**

**Purpose:** Detailed analytics for a short link

**Features:**

* Fetch analytics via:

  * `GET /api/analytics/:id`
  * `GET /api/analytics/:id/daily`
* Show:

  * Line chart (clicks over time)
  * Pie chart (device breakdown)
  * Referrer table (top 10)
  * QR code preview
  * Short URL copy button
  * Expiry info

---

## 🧩 COMPONENTS

### 🧭 **Navbar.jsx**

* Shows logo + nav links
* If logged in → Dashboard, Logout
* If not logged in → Login, Register

---

### ➕ **CreateLinkForm.jsx**

* Fields:

  * Target URL
  * Custom slug (optional)
  * Expiry date (optional)
* On submit → `POST /api/links`
* Displays generated short URL + QR code after creation

---

### 🪪 **LinkCard.jsx**

* Displays each link inside Dashboard
* Shows stats (clicks, expiry, date)
* Buttons for analytics, QR, delete

---

### 📈 **AnalyticsChart.jsx**

* Uses **Recharts LineChart**
* Displays clicks over time

---

### 🥧 **DevicePieChart.jsx**

* Uses **Recharts PieChart**
* Shows breakdown of devices (Mobile, Desktop, Tablet)

---

### 🔳 **QRModal.jsx**

* Modal that shows the QR code of a link
* Option to download QR as image

---

### 🔐 **ProtectedRoute.jsx**

* Wraps around private routes
* Checks if user token exists
* Redirects to `/login` if not authenticated

---

## 🧠 CONTEXT & HOOKS

### 🧩 **AuthContext.jsx**

* Provides global state for authentication
* Stores user info + token
* Handles login/logout
* Syncs with `localStorage`

---

### ⚙️ **useAuth.js**

* Custom hook to access auth state easily:

  ```js
  const { user, login, logout } = useAuth();
  ```

---

## 🔧 UTILITIES

### 🌐 **api.js**

* Axios instance setup with:

  * Base URL (`process.env.VITE_API_URL`)
  * Interceptor to attach JWT token to headers
  * Handles 401 errors globally

---

## 🎨 TAILWIND SETUP

* `index.css` includes Tailwind base, components, and utilities
* Common classes used:

  * `bg-gray-100`, `text-gray-800`, `rounded-xl`, `shadow-md`
  * Reusable button styles like:

    ```html
    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">Create</button>
    ```

---

## 🔚 FRONTEND SUMMARY CHECKLIST

✅ **Pages:**
☑️ Home
☑️ Login
☑️ Register
☑️ Dashboard
☑️ LinkDetails

✅ **Components:**
☑️ Navbar
☑️ CreateLinkForm
☑️ LinkCard
☑️ AnalyticsChart
☑️ DevicePieChart
☑️ QRModal
☑️ ProtectedRoute

✅ **Logic:**
☑️ JWT-based AuthContext
☑️ Axios API setup
☑️ Recharts for visual analytics
☑️ Tailwind for styling


Below is **exactly what goes inside each folder** in your React frontend for your URL shortener SaaS project.
No code dump — only what files you need and what each file is responsible for.

---

# ✅ **1. `src/api/` — API Layer (all axios requests)**

This folder contains **functions that call your backend APIs**.
Each file corresponds to a backend feature.

### **Files inside `/api`**

```
api/
 ├── auth.js
 ├── links.js
 ├── analytics.js
 └── axiosInstance.js
```

### **What each file does**

#### **🔥 `axiosInstance.js`**

Contains a pre-configured axios client:

* baseURL set to `import.meta.env.VITE_API_URL`
* interceptors for JWT token

#### **🔥 `auth.js`**

Functions for:

* login
* register
* logout

#### **🔥 `links.js`**

Functions for:

* create short link
* get all links of user
* update link
* delete link
* get one link with QR + analytics

#### **🔥 `analytics.js`**

Functions for:

* fetch analytics list
* fetch stats for charts
* fetch device breakdown
* fetch referers

---

# ✅ **2. `src/hooks/` — Reusable logic hooks**

This folder contains **custom hooks**.

### **Files inside `/hooks`**

```
hooks/
 ├── useAuth.js
 ├── useFetch.js
 └── useTheme.js
```

### **What each hook does**

#### **🔥 `useAuth.js`**

Handles:

* get logged-in user
* save token
* logout function
* check if authenticated
* auto-redirect on invalid token

Used inside protected pages.

#### **🔥 `useFetch.js`**

Generic hook:

* loading
* error
* data
* refetch function

Used in pages like:

* Dashboard
* LinkDetails

#### **🔥 `useTheme.js`**

Handles:

* dark/light mode
* saving theme in localStorage

---

# ✅ **3. `src/utils/` — Helper utilities**

Utility folder for functions used everywhere.

### **Files inside `/utils`**

```
utils/
 ├── validateUrl.js
 ├── copyToClipboard.js
 ├── formatDate.js
 ├── formatNumber.js
 ├── parseDeviceIcon.js
 └── env.js
```

### **What each file does**

#### **🔥 `validateUrl.js`**

Checks:

* valid URL format
* starts with http/https

Used before calling API.

#### **🔥 `copyToClipboard.js`**

Utility to copy short URL.

#### **🔥 `formatDate.js`**

Formats timestamps for tables:

* `DD MMM YYYY`
* `2 hours ago`

#### **🔥 `formatNumber.js`**

Prettifies analytics numbers:

* 10340 → “10.3K”
* 1000000 → “1M”

#### **🔥 `parseDeviceIcon.js`**

Given:

```
"mobile"
```

returns:

```
<MobileIcon />
```

For Analytics page UI.

#### **🔥 `env.js`**

Reads environment variables safely:

```
export const API_URL = import.meta.env.VITE_API_URL;
```

---

# Summary Table

| Folder   | Purpose                               |
| -------- | ------------------------------------- |
| `/api`   | Handles all backend requests (axios)  |
| `/hooks` | Logic helpers like auth, fetch, theme |
| `/utils` | Reusable helper functions             |

---

If you want next, I can generate:
**1) The full `api/axiosInstance.js` file**
**2) The complete `auth.js`, `links.js`, `analytics.js`**
**3) The full folder structure ready to copy-paste**

Tell me which you want next.
