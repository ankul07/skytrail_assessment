# SkyTrail

SkyTrail is a full-stack web application featuring basic user authentication and private routes. It uses React with Vite for the frontend and a custom-built Express/Node.js server template for the backend. The app displays user information, fetches country data from the [Rest Countries API](https://restcountries.com/), and presents each country as a blog post with detailed information.

## Features

- **User Authentication**
  - Register and login with JWT-based authentication.
  - Private routes that restrict access to certain pages (e.g., the countries page) unless the user is authenticated.
- **Country Blog Posts**
  - Fetches and displays country data from the [Rest Countries API](https://restcountries.com/).
  - Shows detailed information for each country in a blog-like format.
- **Styling & Icons**
  - Styled with Tailwind CSS.
  - Uses lucide-react for icons.
- **Database**
  - User data is stored in MongoDB Atlas.
- **Custom Backend**
  - The backend is built using a custom server template that was developed in-house using Express and Node.js.

## Tech Stack

- **Frontend:** React (Vite), Tailwind CSS, lucide-react
- **Backend:** Express, Node.js, MongoDB (via Mongoose)
- **Authentication:** JWT (JSON Web Token) for access token management

## Prerequisites

- [Node.js and npm](https://nodejs.org/) installed
- A MongoDB Atlas account with a configured cluster
- Git (optional, for version control)

## Setup Instructions

### 1. Clone the Repository

Open your terminal and run:

```bash
git clone https://github.com/your-username/skytrail.git
cd skytrail
```
