# Food-Delivery
# 🍔 Food Delivery App

A full-stack food delivery platform built with **Vite + React**, **Node.js**, **Express**, and **MongoDB**. Includes user authentication, cart functionality, order placement, and an admin panel for uploading items.

## 📁 Project Structure

Food-Delivery/ ├── backend/ → Node.js + Express server │ ├── uploads/ → Auto-created folder for storing uploaded images │ └── server.js ├── frontend/ → Vite + React client │ ├── src/ │ │ ├── assets/ → Place your images/icons here │ │ └── App.jsx ├── admin/ → Vite + React admin panel │ ├── src/ │ │ └── App.jsx

## ⚙️ Setup Instructions

### 1. Clone the Repository
``bash
git clone https://github.com/Rosi87g/Food-Delivery.git
cd Food-Delivery

2. Install Dependencies

3.⚡ Vite + React Configuration
Initialize frontend/admin with Vite:

npm create vite@latest
Framework: React
Variant: JavaScript
Set custom ports in vite.config.js:

js
// vite.config.js
export default {
  server: {
    port: 5200, // Change to your preferred port
  },
};

Repeat for both frontend and admin.

🔗 Connecting Frontend to Backend
Update API URLs in frontend/src/StoreContext.jsx or App.jsx:

const url = "http://localhost:5000"; // Replace with your backend port

🗂️ Backend Uploads Folder
The uploads/ folder is auto-created in backend/ when the server starts. It stores images uploaded via the admin panel.

🧑‍💼 Admin Panel
Used for uploading food items. Ensure the backend is running before starting the admin panel.

🖥️ Local Development
Start servers with:

bash
# Backend
cd backend
npm run server

# Frontend
cd frontend
npm run dev

# Admin Panel
cd admin
npm run dev

Stripe Payment Integration
1. Install Stripe Dependencies
Backend
bash
npm install stripe
Frontend
bash
npm install @stripe/react-stripe-js @stripe/stripe-js
2. Setup Checkout
Backend: Create a /create-checkout-session route to handle Stripe sessions.

Frontend: Use Stripe’s useStripe and useElements hooks to trigger checkout.

🔐 Make sure to use your Stripe secret key in the backend and publishable key in the frontend.

<img width="1911" height="824" alt="image" src="https://github.com/user-attachments/assets/7df98834-a1da-4d6d-a0e0-f3494b3144f6" />

<img width="1902" height="824" alt="image" src="https://github.com/user-attachments/assets/9ef81f23-5937-4239-ab7a-0b6791755e14" />

<img width="1901" height="815" alt="image" src="https://github.com/user-attachments/assets/e0cb1634-3a6e-4892-ac77-7bc5370eebaf" />

<img width="1895" height="831" alt="image" src="https://github.com/user-attachments/assets/112dca27-de5e-41d0-a2ee-9f9334b6cee1" />

<img width="1893" height="830" alt="image" src="https://github.com/user-attachments/assets/42f4e492-0f3c-4a3b-8684-1a2e4aadeec3" />

<img width="1901" height="816" alt="image" src="https://github.com/user-attachments/assets/bcc409c6-df9c-49b7-b19b-50ee77812ee4" />

<img width="1903" height="801" alt="image" src="https://github.com/user-attachments/assets/65c09fd1-ef24-44c2-8bbd-e97514495006" />

<img width="1903" height="779" alt="image" src="https://github.com/user-attachments/assets/10e3fe6d-4337-403b-8966-70b46f616fab" />

Let me know if you want this saved as a `.md` file or need help uploading it to your repo. I can also help you add screenshots, badges, or deployment instructions next!

