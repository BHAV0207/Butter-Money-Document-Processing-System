---

## **📄 Document Processing System (Butter Money Loan Application)**
This is a **full-stack document processing system** that allows users to **upload, process, and generate loan agreements**. The system supports:
✅ **User authentication (Register/Login with JWT)**  
✅ **Secure file upload & storage (PDF/DOCX processing)**  
✅ **Extracting text and tables from PDFs**  
✅ **Generating personalized loan agreements**  
✅ **Downloading loan agreements as PDFs**  
✅ **Responsive UI with Tailwind CSS and animations with Framer Motion**  

---

## **🚀 Features**

### **Backend (Node.js + Express + MongoDB)**

- **Authentication System** (JWT-based, Secure Login/Register)
- **File Upload Handling** (Multer for PDF/DOCX file uploads)
- **PDF Text & Table Extraction** (Using `pdf-parse`)
- **Loan Agreement Processing** (Dynamic template replacement)
- **PDF Generation** (Using `pdfkit`)
- **Download Loan Agreements** (File storage and serving)
- **Role-Based Access Control** (Only logged-in users can upload/process documents)

### **Frontend (React + TypeScript + Tailwind)**

- **User Authentication UI** (Login/Register with Token Storage)
- **File Upload & Preview** (Drag-and-drop with progress indicators)
- **Loan Agreement Form** (Auto-filling user details)
- **Download PDF** (Dynamically generated agreements)
- **Animations & Transitions** (Framer Motion for smooth UI)

---

## **🛠️ Tech Stack**

| Technology               | Usage                                |
| ------------------------ | ------------------------------------ |
| **Node.js**              | Backend Server                       |
| **Express.js**           | API Development                      |
| **MongoDB**              | Database for User & Document Storage |
| **Multer**               | File Upload Handling                 |
| **pdf-parse**            | Extracting Text & Tables from PDFs   |
| **pdfkit**               | Generating PDFs dynamically          |
| **React.js**             | Frontend                             |
| **TypeScript**           | Type Safety in Frontend              |
| **Axios**                | API Requests                         |
| **Tailwind CSS**         | Styling                              |
| **Framer Motion**        | Smooth Animations                    |
| **JWT (JSON Web Token)** | Secure Authentication                |

---

## **📂 Project Structure**

```
document-processing-system/
│── backend/
│   ├── controllers/       # API logic (Auth, PDF processing, Loan agreements)
│   ├── models/            # Database models (User, LoanAgreement, Document)
│   ├── routes/            # API routes (Auth, Documents, Loan)
│   ├── middlewares/       # Authentication Middleware
│   ├── config/            # Database Connection
│   ├── uploads/           # Uploaded files directory
│   ├── app.js             # Main Express server entry
│   ├── package.json       # Backend dependencies
│
│── frontend/
│   ├── src/
│   │   ├── api/           # API calls (Auth, Documents, Loan)
│   │   ├── components/    # UI Components (Navbar, FileUpload, PdfViewer)
│   │   ├── pages/         # React Pages (Login, Dashboard, LoanAgreement)
│   │   ├── context/       # Auth Context Provider
│   │   ├── App.tsx        # Main App Component
│   │   ├── main.tsx       # Entry point for React
│   ├── package.json       # Frontend dependencies
│
│── README.md              # Project Documentation
```

---

## **💻 Installation & Setup**

### **1️⃣ Clone the Repository**

```sh
git clone https://github.com/your-username/document-processing-system.git
cd document-processing-system
```

### **2️⃣ Setup Backend**

#### **Navigate to backend folder**

```sh
cd backend
```

#### **Install dependencies**

```sh
npm install
```

#### **Create `.env` file in backend/**

```ini
PORT=5000
MONGO_URI=mongodb://localhost:27017/butter_money
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d
```

#### **Run the backend server**

```sh
npm run dev
```

_Backend will run at_ **`https://butter-money-document-processing-system-1.onrender.com`** 🚀

---

### **3️⃣ Setup Frontend**

#### **Navigate to frontend folder**

```sh
cd ../frontend
```

#### **Install dependencies**

```sh
npm install
```

#### **Run the frontend**

```sh
npm run dev
```

_Frontend will run at_ **`http://localhost:5173`** 🚀

---

## **📜 API Endpoints**

### **🔑 Authentication APIs**

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| `POST` | `/api/auth/register` | Register a new user |
| `POST` | `/api/auth/login`    | User login          |
| `POST` | `/api/auth/logout`   | Logout user         |

### **📄 File Upload & Processing APIs**

| Method | Endpoint                 | Description                    |
| ------ | ------------------------ | ------------------------------ |
| `POST` | `/api/documents/upload`  | Upload a PDF/DOCX file         |
| `POST` | `/api/documents/extract` | Extract text/tables from a PDF |

### **📑 Loan Agreement APIs**

| Method | Endpoint                       | Description                              |
| ------ | ------------------------------ | ---------------------------------------- |
| `POST` | `/api/loan/template`           | Add a loan agreement template            |
| `POST` | `/api/loan/generate`           | Generate a loan agreement with user data |
| `GET`  | `/api/loan/download/:filename` | Download generated loan agreement        |

---

## **🎨 Frontend Pages & Features**

| Page              | Features                              |
| ----------------- | ------------------------------------- |
| `/` (Login)       | User login                            |
| `/register`       | User registration                     |
| `/dashboard`      | Upload & extract text from PDFs       |
| `/loan-agreement` | Generate and download loan agreements |

---

## **🔍 Debugging & Troubleshooting**

### **Backend Issues**

1️⃣ **MongoDB not connecting?**  
Ensure MongoDB is running locally or update `MONGO_URI` in `.env`:

```sh
mongod
```

2️⃣ **CORS Issues?**  
Ensure CORS is enabled in `backend/app.js`:

```javascript
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["Authorization", "Content-Type"],
  })
);
```

3️⃣ **File Not Found on Download?**  
Check if the generated file exists in `backend/uploads/`.

---

## **🚀 Deployment**

### **Backend Deployment on Render/Vercel**

1️⃣ **Push to GitHub**:

```sh
git push origin main
```

2️⃣ Deploy backend on **Render** or **Vercel**.

### **Frontend Deployment on Netlify**

1️⃣ **Build the frontend**

```sh
npm run build
```

2️⃣ **Deploy `dist/` folder to Netlify**.
