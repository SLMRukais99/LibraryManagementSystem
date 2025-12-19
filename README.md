# Library Management System

The Library Management System is a full-stack web application that allows users to manage books in a library. Users can perform CRUD (Create, Read, Update, Delete) operations such as adding books, viewing existing books, updating details, and deleting records.

---

## System Overview

This application consists of:

- Backend API built with .NET 8, Entity Framework Core, and SQLite
- Frontend application built with React, TypeScript, and Tailwind CSS

---

## Features

- Create book records
- View all books
- Update book details
- Delete book records
- Responsive user interface
- RESTful API communication

---

## Tech Stack

### Backend
- .NET 8 Web API
- C#
- SQLite
- Entity Framework Core

### Frontend
- React
- TypeScript
- Tailwind CSS
- Axios

---

## Prerequisites

Make sure the following are installed:

### Backend
- .NET 8 SDK

### Frontend
- Node.js (v20 or later)
- npm

### Optional
- Git

---

## Clone the Repository

```bash
git clone https://github.com/SLMRukais99/LibraryManagementSystem.git
cd LibraryManagementSystem
```

---

## Backend Setup Instructions

Navigate to the backend folder:

```bash
cd LibraryAPI
```

Restore NuGet packages:

```bash
dotnet restore
```

Create the SQLite database using Entity Framework:

```bash
dotnet ef database update
```

Run the backend server:

```bash
dotnet run
```

Backend API will be available at:

```text
https://localhost:7184
```

---

## Handling CORS (Cross-Origin Resource Sharing)

If the frontend runs on:

```text
http://localhost:5173
```

and the backend runs on:

```text
https://localhost:7184
```

you must configure CORS in the backend.

### Configure CORS in Program.cs

Add the following code in `Program.cs`:

```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});


```

---

## Frontend Setup Instructions

Open a new terminal and navigate to the frontend folder:

```bash
cd ../LibraryManagementFrontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Frontend application will be available at:

```text
http://localhost:5173
```

---

## Author

Rukais  
Full Stack Developer

---

## License

This project is for learning and demonstration purposes only.
