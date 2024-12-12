# Task Management App

## Overview
The Task Management App is a simple yet powerful application designed to help users manage their tasks efficiently. It allows users to add, view, edit, and delete tasks, along with features like pagination, form validation, and status toggling. The app is built using React, TypeScript, Ant Design, and Express.js with MongoDB for the backend.

---

## Features
- **Add Tasks**: A form to add tasks with fields for Title, Priority, Due Date, and Status.
- **Task List**: View all tasks in a paginated table.
- **Edit/Delete Tasks**: Update or remove tasks using the provided actions.
- **API Integration**: REST API endpoints to handle tasks (GET, POST, PUT, DELETE).
- **Validation**: Ensures required fields are filled.
- **Notifications**: Displays success/error messages.

---

## Prerequisites
- Node.js (>= 14.x)
- MongoDB (local or cloud instance)
- npm or yarn

---

## Technologies Used
### Frontend
- React.js (with TypeScript)
- Tailwind (CSS)
- Ant Design (UI Components)
- Axios (API Calls)

### Backend
- Express.js
- MongoDB with Mongoose
- dotenv (Environment Variables)

---

## Setup Instructions

### Clone the Repository
```bash
# Clone the repo
https://github.com/theutkarshdev/scizers-technologies-task.git
cd scizers-technologies-task
```

### Backend Setup
1. Navigate to the backend folder:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file by copying `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your MongoDB connection string and port:
   ```plaintext
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/task-manager
   ```

5. Start the backend server:
   ```bash
   npm run start
   ```
   The server will run on `http://localhost:5000`.

### Frontend Setup
1. Navigate to the frontend folder:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file by copying `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your backend API base URL:
   ```plaintext
   REACT_APP_API_BASE_URL=http://localhost:5000/api
   ```

5. Start the frontend development server:
   ```bash
   npm start
   ```
   The app will be accessible at `http://localhost:5173`.

---

## Usage
1. Open the app in your browser (`http://localhost:5173`).
2. Add a new task using the form.
3. View the list of tasks in the table.
4. Use the Edit/Delete buttons to modify or remove tasks.
5. Paginate through tasks if there are multiple pages.

---

## API Endpoints
### Base URL
`http://localhost:5000/api`

| Method | Endpoint       | Description            |
|--------|----------------|------------------------|
| GET    | `/tasks`       | Fetch all tasks        |
| POST   | `/tasks`       | Add a new task         |
| PUT    | `/tasks/:id`   | Update a task          |
| DELETE | `/tasks/:id`   | Delete a task          |

---

## Additional Notes
- Ensure MongoDB is running locally or provide a valid connection string.
- Customize the Ant Design theme if necessary.
- Use `npm run build` to create a production build of the frontend.

