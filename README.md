Local Market - Backend Express

## Description

This repository contains the backend implementation for the Local Market application. The backend utilizes JSON Web Token (JWT) for authentication, MongoDB as the database, and Express for handling HTTP requests.

## Deployment
The project is deployed to Render. Can be accessed via:

https://project-3-local-market-express.onrender.com

The Client of this Local Market is deployed to Render, and can be accessed on this link:

https://project-3-local-market-react.onrender.com

![The screenshot of our local market app](landing-page.png "a title")
![The screenshot of our local market app](listings.png "a title")

## Features

- All the routes are protected , and only requests with a valid token from a signed in user is passed to the corresponding route
- `/signup` and `/signin` with `POST` method is to sign in and sign up a new user
- `GET` to `/sign-token` and `POST` to `/verify-token` are to sign and verify a recieved token
- `GET` to `/:userId` will give the Profile of a User
- `/listings`: Supports all CRUD operations for listings
- `/listings/:id`: Supports all CRUD operations for a specific listing
- `/listings/:listingId/bids`: Using `POST` to create a new BID for a specific listing

## Technologies:
- Node.js
- Express.js
- MongoDB
- JSON Web Token (JWT)
- Mongoose
- bcrypt
- dotenv
- Render
- cors


## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/manijehshirzadeh/project-3-local-market-express.git
   cd project-3-local-market-express
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

    Set up environment variables:

   - Create a `.env` file in the root directory.
   - Add the following environment variables to the `.env` file:
     ```env
     MONGODB_URI=<connection-string-to-mongo-db>
     JWT_SECRET=your_jwt_secret
     ```

3. Start the application:
   ```bash
   npx nodemon
   ```

4. Visit `localhost:3000`

##  Contributors
- Manijeh Shirzadeh https://github.com/manijehshirzadeh 
- Parisa Naeim https://github.com/parisa-naeim

## Next Steps:
- Adding review functionality for listings
- Adding Like functionality for bids or listings

