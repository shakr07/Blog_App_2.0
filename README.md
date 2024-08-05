# Project Title

A brief description of what this project does and who it's for.

## How to Start the Project

### Frontend

1. Open the terminal
2. Run `📋 npm i`
3. Run `📋 npm start`

### Backend

1. Open a new terminal
2. Navigate to the backend directory with `📋 cd backend`
3. Run `📋 npm i`
4. Run `📋 npm start`

## Important

- Initially, JWT Auth was used, but due to an error in establishing protected routes, the Context API is now used. When login is successful, all routes are accessible to the respective components.
- An admin profile is necessary for management, but it was not created.

## Login and Sign Up

- The application accepts username, email, and password.
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
 
