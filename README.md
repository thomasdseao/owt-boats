<div align="center">

# OWT Boats 🚤

</div>

<div align="center">
  <img src="/frontend/src/assets/img/logo.png" alt="Owt Boats Logo" width="200">
</div>

<div align="center">
  <img src="https://img.shields.io/badge/Angular-16.2.0-blue">
  <img src="https://img.shields.io/badge/Spring%20Boot-3.1.4-brightgreen">
  <img src="https://img.shields.io/badge/Docker-Supported-blue">
  <img src="https://img.shields.io/badge/MySQL-Database-orange">
</div>

---

**OWT Boats is your all-in-one boat management system.** Featuring user authentication, along with CRUD capabilities for boat management.

## 📝 Table of Contents

- [Technologies](#-technologies)
- [Getting Started](#-getting-started)
- [Features](#-features)
- [Database](#-database)
- [API Documentation](#-api-documentation)
- [Known Issues](#-known-issues)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🛠 Technologies

### 🌐 Frontend
- Angular 16.2.0
- TailwindCSS

### 🎛 Backend (REST API)
- Spring Boot 3.1.4
  - Spring Data JPA
  - Lombok
  - Spring Security
  - DevTools
  - JsonWebToken
  - ModelMapper
  - Spring Doc

---

## 🚀 Getting Started

### Prerequisites
- Docker

### 🔑 Default User for Authentication
- 📧 `example@email.com` / 🔒 `password`
- 📧 `example2@email.com` / 🔒 `password`

### 🐳 Running with Docker
To start the application, simply navigate to the project root and execute:

```bash
make up
```

⚠️ Docker Issue on macOS
If you're running a specific Docker version on macOS, you may face issues with Node (NPM). To resolve this, please follow the steps below:

Navigate to Docker Preferences.
Change the file sharing implementation from VirtioFS to gRPC FUSE.
Disable the Virtualization Framework.

🔗 Track this issue on Docker's GitHub repository : https://github.com/docker/for-mac/issues/6824

---

## 🌐 Accessing the Application

### Web Application
The web application can be accessed at: [http://127.0.0.1:1337](http://127.0.0.1:1337)

---

## 🎯 Features
- Secure User Authentication
- Ownership-based Boat Management (CRUD)
## 🗃 Database
This project uses MySQL for data storage.

## 📚 API Documentation
Explore the API documentation through Swagger UI : http://127.0.0.1:1338/swagger-ui/index.html

