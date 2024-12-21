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
- PostgreSQL - Relational database
  - Perfect for structured data like apartment listings

### Infrastructure
- Docker
  - Consistent development environment
  - Easy deployment across different platforms

## API Endpoints
The backend is exposed at `http://localhost:8000`.

The backend provides the following REST API endpoints:

### GET Endpoints
- `/check-server` - Health check endpoint to verify server status
- `/apartments` - Retrieve all apartment listings
- `/apartments/:id` - Get details of a specific apartment by ID
- `/wipe-apartments` - Development endpoint to clear all apartments (use with caution)

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
    - `image` (files, optional) - Zero or more image files for the apartment
  - Handles multiple image uploads
  - Validates all required fields before creation

### DELETE Endpoints
- `/apartments/:id` - Delete a specific apartment by ID

## Setup and Usage

### Prerequisites
- Docker and Docker Compose installed on your system
- Copy `.env.example` to `.env`

### Running the Application
Execute the following command in the root directory:

```bash
docker compose up
```

Or to enusre that no dangling images or unused cache layers or dangling volumes remain :

```bash
docker compose up --build -d && docker system prune -f && docker volume prune -f
```

This will:
- Build and start both the frontend and backend services
- Set up the necessary database connections
- Install all required dependencies

The setup includes:
- Hot-reloading for both frontend and backend development
- Persistent PostgreSQL data storage

 Once the services are running, you can access the main page on `http://localhost:3000` where you'll find:

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

## Future Features

The following features are planned for future releases:

- Dark Mode Toggle

- Google Maps Integration
  - Visual representation of apartment locations
  - Quick access to directions

- GitHub Workflows
  - Automated linting pipeline
  - CI/CD pipeline with:
    - Deployment to DigitalOcean Docker droplet
    - Cloudflare DNS records management

    OR

    - Google Cloud Compute Engine
      - Browser-based SSH access through Cloud Console
      - No manual public/private key setup required only google account access

- Production Configuration
  - Optimized Dockerfiles for production builds
  - Production-ready docker-compose
  - Dynamic environment variables:
    - API endpoints configured via ENV
    - Automatic host detection for fetch requests
