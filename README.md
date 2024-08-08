# Project overview
## Important

- Initially, JWT Auth was used, but due to an error in establishing protected routes, the Context API is now used. When login is successful, all routes are accessible to the respective components. I got stuck and messed up the code, which is why I deleted the main branch and created a new branch named "completed."
- An admin profile is necessary for management, but I forgot to create one.
- I also forgot to add the functionality for editing the user profile.
# Blog App 2.0

## Overview

Blog App 2.0 is a full-stack application allowing users to create, edit, delete, and interact with blog posts. The project uses a Node.js backend and a React frontend, with bcrypt for password hashing and JWT authentication (replaced by Context API due to issues).

## Features

- **User Authentication**: Sign up and log in with a username, email, and password. Passwords are hashed using bcrypt for security.
- **Blog Management**:
  - **Create**: Any user can create a blog post. The blog post requires an author, title, tag, and description.
  - **Update and Delete**: Users can edit or delete their own posts. The username must match the author name for these actions to be performed.
  - **Like/Dislike**: Users can like a post, and toggling the like will convert it to a dislike.
- **Profile Management**: Users can manage their profiles (Note: Profile editing functionality was intended but not implemented).
- **Admin Management**: Admin profile management was intended but not implemented.
- **Routing**: Context API is used for managing routes post-login.

## Installation

### Frontend

1. Open the terminal.
2. Run for frontend:
   ```sh
   npm i
   npm run start start
   
### backend

1. Open the terminal.
2. Run for frontend:
   ```sh
   cd backend
   npm i
   nodemon index.js

## Login and Sign Up

- The application accepts a username, email, and password.
- Bcrypt is used for password verification and confidentiality.
- Users must log in before accessing the blog.

## Create

- Any user can create a blog post.
- The blog post requires an author, title, tag, and description.

## Update and Delete

- Users can edit, delete, or update their own blog posts.
- The username must match the author name for these actions to be performed.
- Note: There was a mistake where the author name should be automatically assigned from the logged-in user to prevent posting under another name.

## Like

- A user can like a post once. Pressing like again will convert it to dislike.

## Logout

- Logging out will clear the local storage and navigate to the login page.

## Installation

1. Clone the repo:
   ```sh
   📋 git clone  https://github.com/shakr07/Blog_App_2.0.git
