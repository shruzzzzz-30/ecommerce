# 🛒 E-Commerce Web Application

A **Full-Stack E-Commerce Platform** built using **Node.js, Express, MongoDB, and React (TypeScript)**.  
This project enables users to browse products, add them to cart, and manage their accounts — while admins can manage products and orders through a secure backend.

---

## 🚀 Tech Stack

### 🖥️ Frontend
- **React 19 + TypeScript**
- **Vite** for fast development and bundling
- **Material UI (MUI)** for responsive, modern UI components
- **React Router v7** for navigation
- **React Hot Toast** for notifications
- **Joi** for frontend validation

### ⚙️ Backend
- **Node.js + Express (TypeScript)**
- **MongoDB + Mongoose** for database
- **JWT (jsonwebtoken)** for authentication
- **bcrypt** for password hashing
- **Express Validator** for request validation
- **dotenv** for environment management
- **CORS** for secure API access
- **Nodemon** and **ts-node** for development

---

## 🧩 Features

### 👤 User Features
- User registration and login (JWT-based)
- View product catalog and details
- Add to cart and manage orders
- Secure authentication & session management
- Responsive and interactive UI

### 🛍️ Admin Features
- Add, update, and delete products
- Manage users and orders
- View analytics (optional future enhancement)

### 🔒 Security
- Password hashing with bcrypt
- JWT-based access tokens
- Input validation and sanitization

---

## 🗂️ Project Structure

ecommerce/
│
├── backend/
│ ├── src/
│ │ ├── controllers/
│ │ ├── models/
│ │ ├── routes/
│ │ ├── middleware/
│ │ └── server.ts
│ ├── package.json
│ ├── tsconfig.json
│ └── .env
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── context/
│ │ └── main.tsx
│ ├── package.json
│ ├── vite.config.ts
│ └── tsconfig.json
│
└── README.md

yaml
Copy code

---

## ⚡ Getting Started

### 🧰 Prerequisites
Make sure you have installed:
- [Node.js](https://nodejs.org/) (v18+)
- [MongoDB](https://www.mongodb.com/)
- npm or yarn

---

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/shruzzzzz-30/ecommerce.git
cd ecommerce
2️⃣ Setup the Backend
bash
Copy code
cd backend
npm install
Create a .env file inside /backend:

env
Copy code
PORT=5000
MONGO_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_secret_key
Run backend:

bash
Copy code
npm run dev
The server will start at 👉 http://localhost:5000

3️⃣ Setup the Frontend
bash
Copy code
cd ../frontend
npm install
npm run dev
Open 👉 http://localhost:5173

🔌 API Endpoints (Sample)
Method	Endpoint	Description	Access
POST	/api/auth/register	Register a new user	Public
POST	/api/auth/login	Login and get JWT token	Public
GET	/api/products	Fetch all products	Public
POST	/api/products	Add a new product	Admin
PUT	/api/products/:id	Update product details	Admin
DELETE	/api/products/:id	Delete a product	Admin
POST	/api/orders	Create new order	Private
GET	/api/orders/:id	View order details	Private

🧠 Future Enhancements
Payment gateway integration (Stripe/PayPal)

Product search and filter

Wishlist feature

Inventory management

Email notifications

Admin dashboard with analytics

## 🖼️ Project Screenshots

### 🏠 Home Page
![Home Page](https://github.com/shruzzzzz-30/ecommerce/blob/main/Screenshot%20(464).png?raw=true)

### 🛍️ Product Listing
![Product Listing](
https://github.com/shruzzzzz-30/ecommerce/blob/main/Screenshot%20(465).png?raw=true)


![Cart Page](https://github.com/shruzzzzz-30/ecommerce/blob/main/Screenshot%20(466).png?raw=true)



![Cart Page](https://github.com/shruzzzzz-30/ecommerce/blob/main/Screenshot%20(467).png?raw=true)


![login Page](https://github.com/shruzzzzz-30/ecommerce/blob/main/Screenshot%20(468).png?raw=true)


🧑‍💻 Author
👩‍💻 Shruthi M
Full-Stack Developer | JavaScript | TypeScript | React | Node.js
🔗 GitHub Profile

📜 License
This project is licensed under the ISC License.
