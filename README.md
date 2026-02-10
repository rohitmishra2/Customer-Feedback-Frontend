🌐 Customer Feedback Management System – Frontend

Wipro Preskilling Capstone Project

This repository contains the Angular frontend for the Customer Feedback Management System. The application is designed to allow users to interact with products by submitting feedback, while providing administrators with a secure, role-based interface to manage products and review user sentiments.

✨ Features

👤 User Experience

Secure Registration & Login: User-friendly onboarding process.

Submit Feedback:

Select products from a dynamic list.

Provide a rating (1–5 stars).

Write detailed comments.

JWT Authentication: Secure session management.

🛠 Admin Dashboard

Secure Access: Protected login specifically for administrators.

Feedback Management: View all submitted feedback in a comprehensive list.

Filtering: Quickly filter user feedback based on ratings.

Product Management: Full CRUD capabilities (Add, Update, and Soft-Delete products).

RBAC: Strict Role-Based Access Control ensuring data security.

🧰 Tech Stack

Component

Technology

Framework

Angular (Standalone Components)

Styling

Bootstrap 5 + Custom CSS

Forms

Reactive Forms

Routing

Angular Router

State/API

HttpClient & Observables

Security

JWT Token via HTTP Interceptor

🔐 Authentication & Security

The application implements robust security measures:

JWT Storage: Tokens are securely stored in localStorage upon login.

Route Protection:

AuthGuard: Protects general authenticated routes.

AdminGuard: Restricts access to admin-specific pages.

API Security: An HTTP Interceptor automatically attaches the Bearer token to all outgoing API requests.

🚀 Getting Started

Follow these instructions to set up the project locally.

Prerequisites

Node.js: v18+ (Recommended)

Angular CLI: v17+

Backend: Ensure the Spring Boot API is running.

🔧 Installation

Clone the repository (if you haven't already):

git clone <repository-url>
cd <project-folder>


Install Dependencies:

npm install


▶️ Run Development Server

Launch the application:

ng serve


Open your browser and navigate to:
http://localhost:4200

The app will automatically reload if you change any of the source files.

🔄 Backend Integration

This frontend acts as a client for the Spring Boot backend.

Expected Backend Base URL:

http://localhost:8085/api


⚠️ Note: Ensure the backend service is running on port 8085 before attempting to log in or submit feedback.

🧪 Sample Functional Flow

User Registration: A new user registers and logs in.

Feedback Submission: The user selects a product, rates it, and adds a comment.

Admin Access: An admin logs into the dashboard.

Review: Admin views the new feedback and filters by low/high ratings.

Management: Admin adds a new product or updates an existing one.

🏗 Build & Test

Build for Production

To generate build artifacts for deployment:

ng build


Artifacts will be stored in the dist/ directory.

Unit Tests

Run unit tests via Karma:

ng test


End-to-End Tests

Run e2e tests:

ng e2e


📁 Project Structure

src/
 ├── app/
 │   ├── pages/          # Login, Register, User Feedback, Admin Dashboard
 │   ├── services/       # Auth, Feedback, Product services
 │   ├── guards/         # AuthGuard, AdminGuard
 │   ├── interceptors/   # JWT Interceptor
 │   ├── layout/         # Navbar & Footer components
 │   └── app.routes.ts   # Main routing configuration
 └── assets/             # Static images and global styles
