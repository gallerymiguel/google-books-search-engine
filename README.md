
# Google Books Search Engine

## Description

This is a full-stack application that allows users to search for books using the Google Books API and save their favorite books to a personalized account. It is built using the MERN stack (MongoDB, Express.js, React, and Node.js) and has been refactored to use a GraphQL API powered by Apollo Server. The application supports user authentication to save and manage books securely.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Deployment](#deployment)
- [Screenshots](#screenshots)
- [License](#license)

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm
- MongoDB Atlas account

### Steps
1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```bash
   cd book-search-engine
   ```
3. Install dependencies for both the server and client:
   ```bash
   cd server && npm install
   cd ../client && npm install
   ```
4. Create a `.env` file in the `server` directory with the following:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/googlebooks
   JWT_SECRET_KEY=mysecretkey
   ```
5. Build the server and client:
   ```bash
   cd server && npm run build
   cd ../client && npm run build
   ```

6. Start the application:
   ```bash
   npm run start:dev
   ```
   This will start both the server and client in development mode.

## Usage

1. **Sign Up/Login**:
   - Create an account by signing up.
   - Log in using your email and password.

2. **Search for Books**:
   - Enter a search term in the search bar on the homepage.
   - View a list of books matching your search query.

3. **Save Books**:
   - Save books to your personal account by clicking "Save This Book!"
   - Saved books are stored in your account and can be accessed later.

4. **Manage Saved Books**:
   - Navigate to the "Saved Books" page to view your collection.
   - Remove books from your saved list by clicking "Delete this Book!"

## Features
- User authentication with JWT for secure access.
- Search for books using the Google Books API.
- Save and manage books in a personalized account.
- Responsive design for a seamless experience on all devices.

## Technologies Used
- **Frontend**:
  - React.js
  - Bootstrap
  - Apollo Client
- **Backend**:
  - Node.js
  - Express.js
  - Apollo Server
  - GraphQL
  - MongoDB Atlas

## Deployment

The application is deployed and accessible at:
- **Link**: [Render](https://google-books-search-engine-friontend.onrender.com/)


## Screenshots

### Homepage
![Homepage Screenshot](/client/public/Homepage.png)

### Search Results
![Search Results Screenshot](/client/public/SearchResults.png)

### Saved Books Page
![Saved Books Screenshot](/client/public/SavedBooks.png)

## License

This project is licensed under the MIT License.
