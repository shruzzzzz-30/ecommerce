# 🛍️ E-Commerce Web Application

A full-stack **E-Commerce Platform** built with **React (Vite + TypeScript)** for the frontend and **Node.js + Express + MongoDB (Mongoose)** for the backend.  
It provides complete functionality for user authentication, product management, and a secure shopping experience.

---

## 🖼️ Project Screenshots

### 🏠 Home Page  
![Home Page](https://github.com/shruzzzzz-30/ecommerce/blob/main/Screenshot%20(464).png?raw=true)

### 🛍️ Product Listing  
![Product Listing](https://github.com/shruzzzzz-30/ecommerce/blob/main/Screenshot%20(465).png?raw=true)

### 🛒 Cart Page  
![Cart Page](https://github.com/shruzzzzz-30/ecommerce/blob/main/Screenshot%20(466).png?raw=true)

### 🧾 Order Summary  
![Order Summary](https://github.com/shruzzzzz-30/ecommerce/blob/main/Screenshot%20(467).png?raw=true)

### 🔐 Login Page  
![Login Page](https://github.com/shruzzzzz-30/ecommerce/blob/main/Screenshot%20(468).png?raw=true)


## 🚀 Tech Stack

### 🖥️ Frontend
- ⚛️ React 19 (with TypeScript)
- ⚡ Vite
- 🎨 Material UI (MUI)
- 🔄 React Router DOM
- 🔔 React Hot Toast
- ✅ Joi for validation

### ⚙️ Backend
- 🟢 Node.js + Express
- 🍃 MongoDB with Mongoose
- 🔐 JWT Authentication
- 🔒 bcrypt for password hashing
- 🌿 dotenv for environment variables
- ✅ express-validator for request validation
- 🔗 CORS for secure communication

---

## 📁 Folder Structure

ecommerce/
├── backend/
│ ├── src/
│ │ ├── controllers/
│ │ ├── models/
│ │ ├── routes/
│ │ ├── middlewares/
│ │ └── server.ts
│ ├── .env
│ └── package.json
│
├── frontend/
│ ├── src/
│ │ ├── components/
│ │ ├── pages/
│ │ ├── assets/
│ │ └── App.tsx
│ ├── vite.config.ts
│ └── package.json
│
└── README.md

yaml
Copy code

---

## ⚡ Installation & Setup

### 1️⃣ Clone Repository
```bash
git clone https://github.com/shruzzzzz-30/ecommerce.git
cd ecommerce
2️⃣ Backend Setup
bash
Copy code
cd backend
npm install
npm run dev
Create a .env file in the backend/ directory:

ini
Copy code
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
3️⃣ Frontend Setup
bash
Copy code
cd frontend
npm install
npm run dev
Visit: 👉 http://localhost:5173

🌟 Core Features
🔐 User Authentication (Signup/Login via JWT)

🛒 Product Management (Add/Edit/Delete)

❤️ Add to Cart / Remove from Cart

🧾 Checkout Summary

🧍‍♀️ Profile Management

🛍️ Admin Dashboard

💬 Toast Notifications

📱 Responsive UI (Material UI + Flex Layouts)

🧠 Future Enhancements
💳 Payment Gateway (Razorpay / Stripe)

🔍 Product Search & Filter

🗂️ Order Tracking

🌟 Product Reviews & Ratings

📊 Admin Analytics Dashboard

🧑‍💻 Author
Shruthi M
💻 GitHub
📧 (Add email or portfolio link if you’d like)

🪪 License
This project is licensed under the ISC License.

⭐ How to Contribute
Fork this repository

Create your feature branch

bash
Copy code
git checkout -b feature-name
Commit changes

bash
Copy code
git commit -m "Added feature"
Push your branch

bash
Copy code
git push origin feature-name
Create a Pull Request 🚀


