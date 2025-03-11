# Task Manager

## Description
Task Manager is a simple web application built with **React 19** and **React Router**. It allows users to create, update, delete, and manage tasks efficiently.

## Features
- **Create, Update, and Delete Tasks**
- **Mark Tasks as Completed**
- **Change Task Status**
- **Fast Navigation with React Router**
- **Responsive UI with Bootstrap**

## Technologies Used
- **React 19**
- **React Router** for navigation
- **Axios** for API requests
- **Bootstrap** for styling
- **Node.js & Express (Backend)**

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/yourusername/task-manager.git
   cd task-manager
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm run dev
   ```

## API Endpoints
| Method | Endpoint                         | Description          |
|--------|----------------------------------|----------------------|
| GET    | `/todolist`                      | Get all tasks        |
| GET    | `/todolist/:id`                  | Get task by ID       |
| POST   | `/todolist`                      | Create a new task    |
| PUT    | `/todolist/update/:id`           | Update a task        |
| DELETE | `/todolist/:id`                  | Delete a task        |
| GET    | `/changeStatusTaskAsync/:id`     | Change task status   |

## Usage
- **Create a new task** by filling the form and clicking "Add Task".
- **Edit a task** by clicking the "Edit" button.
- **Delete a task** by clicking the "Delete" button.
- **Change task status** using the "Alter" button.

