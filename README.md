


# Express.js Backend Application
This is a simple backend application built using Express.js for user authentication (login and registration) with password hashing using bcrypt. The application connects to a MongoDB database to store users and posts. After logging in or registering, users can create, edit, and delete their own posts.

# Features
**1. User Registration:**  Users can register with their email and password.

**2. Password Hashing**: Passwords are securely stored as hashed strings using bcrypt.

**3. User Login:** Registered users can log in with their credentials.

**4. CRUD Operations:** Authenticated users can:
                
- Create a post.

- Edit their post.

- Delete their post.

**5. Frontend:** The frontend is built using EJS templates for rendering the views.

# Technologies Used

***. Backend:*** Node.js with Express.js.

***. Database:*** MongoDB with Mongoose

***. Password Hashing:*** bcrypt

***. Frontend:*** EJS templating engine

***. Session Management:*** express-session

# Endpoints
### Public Endpoints
**1. GET /:** Home page.

**2. GET /login:** Login page.

**3. POST /login:** Handles login.

**4. GET /register:** Registration page.

**5. POST /register:** Handles user registration.

# Protected Endpoints (after login)
**1. GET /dashboard:** User dashboard.

**2. GET /posts:** Displays all posts for the authenticated user.

**3. POST /posts/create:** Creates a new post.

**4. POST /posts/edit/:id:** Edits an existing post.

**5. DELETE /posts/delete/:id:** Deletes a post

# File Structure

├── /config

│   └── mongoose-connection.js  # MongoDB connection setup

├── /controllers

│   ├── authController.js       # Handles login, registration, and authentication

│   └── postController.js       # Handles post creation, editing, and deletion

├── /models

│   ├── userModel.js            # User schema for MongoDB

│   └── postModel.js            # Post schema for MongoDB

├── /routes

│   ├── authRoutes.js           # Routes for login and registration

│   └── postRoutes.js           # Routes for post-related actions (create, edit, delete)

├── /views

│   ├── login.ejs               # EJS template for login page

│   ├── register.ejs            # EJS template for registration page

│   ├── dashboard.ejs           # EJS template for user dashboard

│   └── posts.ejs               # EJS template for showing posts

├── app.js                      # Main application entry point

├── package.json

└── .env                        # Environment variables
 


# Usage

***1. Registration:*** Navigate to /register to create a new account. Passwords are hashed using bcrypt before being saved to the MongoDB database.

***2. Login:*** Use the /login page to authenticate and gain access to your dashboard.

***3. Post Management:*** Once logged in, users can create, edit, and delete posts from their dashboard.

# Security
***~*** Passwords are hashed using bcrypt for secure storage in the database.

***~*** Sessions are managed using express-session to ensure users stay authenticated.

## Tech Stack

**Client:** EJS,TailwindCSS

**Server:** Node, Express, Mongodb, JWT


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`MONGO_URL`


## Screenshots

![App Screenshot](https://via.placeholder.com/468x300?text=App+Screenshot+Here)


## Feedback

If you have any feedback, please reach out to us at ankitbisht9837@gmail.com

