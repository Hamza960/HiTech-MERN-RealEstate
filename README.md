# HiTech – Real Estate Listings & Client Management (MERN)

A full-stack MERN application implementing the assessment requirements for a real estate platform with a Public Portal and an Agent Dashboard (CMS).

**Stack:** MongoDB, Express, React (Vite), Node.js, Redux Toolkit (RTK Query), Tailwind CSS.

## Features (MVP)

### Public Portal
- Paginated property listings
- Powerful filter/search: price range, location, type (sale/rent), bedrooms, bathrooms, area, amenities
- Property details page with image gallery
- Inquiry form creates a Client lead

### Agent Dashboard (CMS)
- CRUD for properties (add, edit, archive/unarchive, delete)
- Filter/search properties
- Manage client inquiries (list, mark processed)
- Schedule and track viewings: status (scheduled/completed/no-show) and notes

### Technical Notes
- Centralized state via Redux Toolkit + RTK Query
- MongoDB indexes for performance (supports 10k+ listings)
- Aggregation pipelines for filter/search
- Clean separation of frontend/backend
- Modular controllers/services
- Seed script and sample data

> No authentication, no third-party integrations, and placeholder image handling per non-requirements.

## Getting Started

### Prerequisites
- Node.js 18+
- MongoDB running locally (or Atlas)

### 1) Backend
```bash
cd backend
cp .env.example .env   # edit values if needed
npm install
npm run dev            # starts server on http://localhost:5000
npm run seed           # optional: seed sample data
```
The backend serves at `http://localhost:5000` and exposes REST endpoints under `/api`.

### 2) Frontend
```bash
cd frontend
npm install
npm run dev            # starts Vite on http://localhost:5173
```

### 3) Environment & CORS
- Frontend expects API base URL in `frontend/.env` (`VITE_API_BASE=http://localhost:5000/api`).
- Backend CORS is enabled for local dev.

## Scripts
- **backend**: `dev`, `start`, `seed`, `lint`
- **frontend**: `dev`, `build`, `preview`, `lint`

## Screenshots / Demo
- Add your screenshots or screen recording links here.

## Assumptions & Decisions
- No auth; all agent actions are open (as per spec).
- Image hosting simplified: image URLs stored as strings. Use placeholders if none provided.
- Locations are simple strings; advanced geo search not required.
- Viewings link Client + Property by IDs.

## Future Improvements
- Authentication/roles
- Drag-and-drop image uploads and optimization
- Map integration (Leaflet)
- Real-time chat (socket.io) between client and agent
- i18n with react-intl or i18next
- Advanced analytics and reporting

## Time Spent & Tools
- Scaffolding + coding + documentation
- Tools: Node, Vite, RTK Query, Tailwind, ESLint/Prettier

## Project Structure
```
hitech-realestate-mern/
  backend/
    src/
      config/
      models/
      controllers/
      routes/
      services/
      middleware/
      utils/
      seed/
  frontend/
    src/
      app/
      components/
      features/
      pages/
      routes/
      styles/
      lib/
```

---
Generated on 2025-08-19 19:18:48
