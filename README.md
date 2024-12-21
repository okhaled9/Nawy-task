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

Each apartment card displayed is clickable and redirects to a detailed view page where you can:
- View an image gallery of the apartment
- See all apartment details and specifications
- Delete the apartment listing if needed

The application features a fully responsive design:
- The navigation bar adapts to different screen sizes
- Images automatically resize to maintain proper proportions
- The apartment grid layout dynamically adjusts its column count based on screen width
  - For best demonstration of the responsive grid, create at least 5 apartment records and try resizing your browser window

The application will be accessible at `http://localhost:3000` after the Docker containers are up and running.
