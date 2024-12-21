# Nawy

A web application for managing and searching apartment listings.

## Setup and Usage

To run the project for the first time, execute the following command in the root directory:

```bash
docker compose up
```

This will:
- Build and start both the frontend and backend services
- Set up the necessary database connections
- Install all required dependencies

 Once the services are running, you can access the main page where you'll find:

- An "Add Apartment" button to create new apartment listings
- Search fields to filter apartments based on different criteria
  - Each search field operates independently
  - Fields will turn red individually if no matches are found for that specific criteria
  - This provides immediate visual feedback on which search parameters are too restrictive

The application will be accessible at `http://localhost:3000` after the Docker containers are up and running.
