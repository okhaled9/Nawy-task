# Nawy

A web application for managing apartment listings.

## Technologies

### Frontend
- Next.js - React framework for production
- NextUI - Modern component library
- Tailwind CSS - Utility-first CSS framework
- Prettier - Code formatter for consistent styling

### Backend
- Fastify - Fast and lightweight web framework
  - Fastify Multipart - Plugin for handling file uploads
  - Fastify Static - Plugin for serving static images
  - Fastify CORS - Plugin for Cross-Origin Resource Sharing
- Drizzle ORM - High-performance TypeScript ORM
  - Type-safe
  - Intuitive schema creation and query building
  - High level database migrations
  - Superior performance compared to other ORMs

## API Endpoints

The backend provides the following REST API endpoints:

### GET Endpoints
- `/check` - Health check endpoint to verify server status
- `/apartments` - Retrieve all apartment listings
- `/apartments/:id` - Get details of a specific apartment by ID

### POST Endpoints
- `/apartments` - Create a new apartment listing
  - Accepts multipart form data with the following required fields:
    - `title` (string) - Apartment listing title, max 255 characters
    - `address` (string) - Location address, max 255 characters
    - `area` (number) - Apartment area in square meters
    - `price` (number) - Apartment price
    - `unitnumber` (string) - Unit identifier, max 50 characters
    - `project` (string) - Project developer name, max 255 characters
    - `description` (string, optional) - Detailed apartment description
    - `images` (files, optional) - Zero or more image files for the apartment
  - Handles multiple image uploads
  - Validates all required fields before creation

### DELETE Endpoints
- `/apartments/:id` - Delete a specific apartment by ID
- `/wipe-apartments` - Development endpoint to clear all apartments (use with caution)

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

And the backend is also exposed at `http://localhost:8000`.
