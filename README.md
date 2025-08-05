
# JWT Auth Demo (Angular + .NET Core + SQL Server)

This project demonstrates a full-stack JWT authentication implementation using:

- ✅ Angular (frontend)
- ✅ .NET Core Web API (backend)
- ✅ SQL Server (database)

## 🔐 Features

- User registration and login
- JWT-based authentication
- Role-based access
- Token storage in local storage
- Secure API access using JWT
- Auto-expiration handling (with 60-second token timeout)

## 🛠️ Technologies Used

### Backend (.NET Core)

- ASP.NET Core Web API
- Entity Framework Core
- JWT Authentication
- SQL Server

### Frontend (Angular)

- Angular 16+
- HTTP Interceptor for JWT token
- Reactive Forms
- Angular Routing

---

## 🧑‍💻 How to Run the Project

### Backend Setup

1. Open the `JwtAuthDemo` backend project in Visual Studio.
2. Update the connection string in `appsettings.json`:
   ```json
   "ConnectionStrings": {
     "DefaultConnection": "Server=YOUR_SERVER;Database=JwtDemoDb;Trusted_Connection=True;"
   }
   ```
3. Apply Migrations:
   ```bash
   dotnet ef database update
   ```
4. Run the project:
   ```bash
   dotnet run
   ```
   The API will run at: `https://localhost:7125`

### Frontend Setup (Angular)

1. Open the Angular project folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the app:
   ```bash
   ng serve
   ```
4. Navigate to: `http://localhost:4200`

---

## 📂 API Endpoints

| Endpoint                | Method | Description           | Auth Required |
|------------------------|--------|------------------------|----------------|
| `/api/auth/register`   | POST   | Register a new user    | ❌             |
| `/api/auth/login`      | POST   | Login and get token    | ❌             |
| `/api/user/getallusers`| GET    | Get all users (secured)| ✅             |

---

## 🧪 Token Expiry

- Token expires in **60 seconds**.
- After expiry, the API returns `401 Unauthorized`.
- Angular handles this with an HTTP interceptor.

---

## 📸 Screenshots

> Add your UI screenshots here (Login, Register, User List, etc.)
<img width="1361" height="655" alt="image" src="https://github.com/user-attachments/assets/049d75dd-48af-4aa1-bc69-cc9dd2eac28b" />
<img width="1572" height="794" alt="image" src="https://github.com/user-attachments/assets/bea98ff5-f969-4e18-9742-a72da94f3436" />
<img width="1559" height="757" alt="image" src="https://github.com/user-attachments/assets/51c501ea-9fab-40d2-8298-dde2644ffc38" />


---

## 📦 Folder Structure

```
/JwtAuthDemo      -> Backend (ASP.NET Core)
/jwt-auth-ui      -> Frontend (Angular)
/README.md
```

---

## 📃 License

This project is for learning/demo purposes. No license applied.

---

## 🙋‍♂️ Author

**Chirag Vora**  
Experienced in Angular + .NET Core  + SQL Server
From Gujarat, India

---
