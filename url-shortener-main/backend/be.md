##  ROUTES STRUCTURE

### 🧭 1. `authRoutes.js`

**Purpose:** Handle user authentication (JWT-based)

* `POST /api/auth/register` → Register new user
* `POST /api/auth/login` → Login user
* `GET /api/auth/me` → Get current user (verify token)

---

### 🔗 2. `linkRoutes.js`

**Purpose:** Handle creation and management of shortened URLs

* `POST /api/links` → Create new short URL (with optional custom slug or expiry)
* `GET /api/links` → Get all URLs of the logged-in user
* `GET /api/links/:id` → Get details of a single URL
* `DELETE /api/links/:id` → Delete a URL
* `PATCH /api/links/:id` → Update expiry date or destination URL

---

### 📊 3. `analyticsRoutes.js`

**Purpose:** Fetch analytics related to clicks, referrers, and devices

* `GET /api/analytics/:linkId` → Get analytics summary (clicks, referrers, device breakdown)
* `GET /api/analytics/:linkId/daily` → Get click trend (chart data over time)

---

### 🧾 4. `qrRoutes.js`

**Purpose:** Generate and fetch QR codes for shortened URLs

* `GET /api/qr/:slug` → Generate QR code (PNG/SVG base64 format)

---

### 🚀 5. `redirectRoutes.js`

**Purpose:** Handle redirection and record analytics automatically

* `GET /:slug` → Redirect to full URL, track click, device, and referrer

---

## 🧱 DATABASE MODELS

---

### 👤 **User Model**

**Collection:** `users`

| Field       | Type   | Description           |
| ----------- | ------ | --------------------- |
| `name`      | String | Optional display name |
| `email`     | String | User email (unique)   |
| `password`  | String | Hashed password       |
| `createdAt` | Date   | Auto-set on creation  |

---

### 🔗 **Link Model**

**Collection:** `links`

| Field        | Type                 | Description                           |
| ------------ | -------------------- | ------------------------------------- |
| `userId`     | ObjectId (ref: User) | Owner of the link                     |
| `fullUrl`    | String               | Original long URL                     |
| `shortUrl`   | String               | Generated short URL (base + slug)     |
| `slug`       | String               | Custom or auto-generated unique slug  |
| `clicks`     | Number               | Total click count                     |
| `expiryDate` | Date (optional)      | When the link should expire           |
| `isExpired`  | Boolean              | Auto-set if current date > expiryDate |
| `createdAt`  | Date                 | Auto-set on creation                  |

---

### 🧮 **Click Model**

**Collection:** `clicks`

| Field        | Type                 | Description                         |
| ------------ | -------------------- | ----------------------------------- |
| `linkId`     | ObjectId (ref: Link) | Associated short link               |
| `timestamp`  | Date                 | When the click occurred             |
| `referer`    | String               | Source website (if any)             |
| `deviceType` | String               | Desktop / Mobile / Tablet           |
| `browser`    | String               | Browser info (Chrome, Safari, etc.) |
| `country`    | String               | Detected via IP lookup              |
| `ipHash`     | String               | Hashed IP for privacy               |

---

## 🧠 RELATIONSHIPS

* **User → Link** → One-to-Many (a user can have multiple short links)
* **Link → Click** → One-to-Many (a link can have multiple click records)

