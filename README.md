# Toomio Backend

## Description

This repository contains the backend for the Toomio social media application. It is built using a modular monolithic architecture, providing a robust and scalable foundation for the Toomio platform.

## API Endpoints

The Toomio backend provides the following main endpoints:

- `/auth`: Handles user authentication and registration
  - POST `/register`: Register a new user
  - POST `/login`: Authenticate a user
  - POST `/change-password`: Change user password
  - POST `/forgot-password`: Initiate password reset
  - POST `/confirm-password`: Confirm password reset
  - GET `/search-users`: Search for users

- `/posts`: Manages social media posts
  - POST `/`: Create a new post
  - PUT `/edit/:smPostId`: Update an existing post
  - DELETE `/:smPostId`: Delete a post
  - PUT `/likepost`: Like a post
  - PUT `/commentpost`: Comment on a post
  - GET `/:smPostId/likes/count`: Get like count for a post
  - GET `/:smPostId/comments/count`: Get comment count for a post
  - GET `/:smPostId/comments`: Get comments for a post
  - GET `/user/:userEmail`: Get posts by a specific user

- `/journeys`: Handles user journeys
  - POST `/`: Create a new journey
  - PUT `/:journeyId`: Update an existing journey
  - DELETE `/:journeyId`: Delete a journey
  - GET `/user/:userEmail`: Get journeys for a specific user

- `/users`: Manages user-related operations
  - PUT `/follow`: Follow another user
  - GET `/:email/followers-count`: Get follower count for a user
  - GET `/:email/following-count`: Get following count for a user

- `/feed`: Retrieves user feed
  - GET `/`: Get the feed for the authenticated user

- `/notifications`: Manages user notifications
  - GET `/`: Get notifications for the authenticated user

Each endpoint is designed to handle specific functionalities of the Toomio social media platform, providing the APIs for the frontend application.

## Environment Variables

Before running the application, make sure to set up the following environment variables in a `.env` file:

```
MONGODB_URI= MongoDB connection string
AWS_ACCESS_KEY_ID= AWS access key for authentication
AWS_SECRET_ACCESS_KEY= AWS secret key for authentication
AWS_REGION= AWS region where your resources are located
AWS_COGNITO_USER_POOL_ID= Cognito User Pool ID for user management
AWS_COGNITO_CLIENT_ID= Cognito Client ID for the application
AWS_COGNITO_AUTHORITY= Base URL for Cognito authentication
AWS_SQS_URL= Base URL for Amazon SQS queue
```

## Running the Application

To run the Toomio backend, follow these steps:

1. Install dependencies:
   ```
   npm install
   ```

2. Build the application:
   ```
   npm run build
   ```

3. Start the server:
   ```
   npm run start
   ```

## Deployment

The Toomio backend is deployed and accessible at https://api.toomio.com