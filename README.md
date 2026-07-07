# Ryam Aesthetics — Frontend

Modern, responsive spa booking website for Ryam Aesthetics, a luxury spa and wellness business in Nigeria. Built with React, TypeScript, and Vite.

---

## Live Site

**[ryamaesthetics.com](https://ryamaesthetics.com)**

---

## Tech Stack

- **Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS v3
- **Animations:** Framer Motion
- **Data Fetching:** TanStack Query (React Query)
- **Routing:** React Router v6
- **HTTP Client:** Axios
- **Icons:** Lucide React + React Icons
- **SEO:** react-helmet-async
- **Image Optimization:** Cloudinary
- **Deployment:** Vercel

---

## Project Structure

```
client/
├── public/
│   ├── logo.jpeg              # Brand logo
│   ├── hero-video.mp4         # Homepage hero video
│   ├── home-img.jpeg          # About section image
│   ├── sitemap.xml            # SEO sitemap
│   └── robots.txt             # Search engine directives
├── src/
│   ├── components/
│   │   ├── Navbar.tsx         # Navigation with mobile drawer
│   │   ├── Footer.tsx         # Footer with contact info
│   │   └── ScrollToTop.tsx    # Scroll to top on navigation
│   ├── hooks/
│   │   └── useTypewriter.ts   # Typewriter animation hook
│   ├── pages/
│   │   ├── Home.tsx           # Homepage
│   │   ├── Services.tsx       # Services listing with filters
│   │   ├── BookAppointment.tsx # Booking form
│   │   ├── About.tsx          # About page
│   │   ├── Contact.tsx        # Contact page
│   │   ├── PrivacyPolicy.tsx  # Privacy policy
│   │   ├── NotFound.tsx       # 404 page
│   │   └── admin/
│   │       ├── AdminLogin.tsx        # Admin login
│   │       ├── AdminAppointments.tsx # Appointments dashboard
│   │       └── AdminServices.tsx     # Services management
│   ├── services/
│   │   └── api.ts             # All API call functions
│   ├── types/
│   │   └── index.ts           # TypeScript interfaces
│   ├── utils/
│   │   └── cloudinary.ts      # Cloudinary image optimization
│   ├── App.tsx                # Router and layout
│   ├── main.tsx               # App entry point
│   └── index.css              # Global styles
├── .env.local                 # Environment variables (not committed)
├── vercel.json                # Vercel SPA routing config
├── tailwind.config.js         # Tailwind configuration
├── vite.config.ts             # Vite configuration
└── tsconfig.json              # TypeScript configuration
```

---

## Pages

| Page | Route | Description |
|------|-------|-------------|
| Home | `/` | Hero video, services preview, mission & vision, CTA |
| Services | `/services` | All 26 services with category filtering |
| Book Appointment | `/book` | Multi-service booking form |
| About | `/about` | Brand story and values |
| Contact | `/contact` | Contact details, map, contact form |
| Privacy Policy | `/privacy` | Privacy policy |
| 404 | `/*` | Custom not found page |
| Admin Login | `/admin/login` | Protected admin login |
| Admin Appointments | `/admin/appointments` | View and manage appointments |
| Admin Services | `/admin/services` | CRUD for services |

---

## Environment Variables

Create a `.env.local` file in the root of the client directory:

```env
VITE_API_URL=https://your-render-backend-url.onrender.com/api
```

In development, leave `VITE_API_URL` empty — the Vite proxy forwards requests to `localhost:5000` automatically.

---

## Getting Started

### Prerequisites
- Node.js v22+
- Backend server running (see backend repository)

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/ryam-aesthetics-client.git

# Navigate to the project
cd ryam-aesthetics-client

# Install dependencies
npm install

# Start development server
npm run dev
```

The app runs on `http://localhost:3000`.

### Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build locally
```

---

## Key Features

### Public Site
- Full screen hero video with typewriter animation on page load
- Services page with category filter tabs (Facials, Waxing, Brows, Massage Therapy)
- Multi-service booking form — customers can select multiple services
- Automatic scroll to top on page navigation
- Dark mode with localStorage persistence
- Fully responsive — mobile first design
- Horizontal scroll service preview on mobile

### Admin Dashboard
- Protected routes — JWT authentication required
- View all appointments with status filtering (pending, confirmed, cancelled)
- Confirm or cancel appointments from the dashboard
- Full service management — add, edit, deactivate services
- Toast notifications for all actions
- Confirmation dialog before deactivating services

### Performance
- Cloudinary image optimization — `f_auto,q_auto,w_{size}` transformations
- Lazy loading on all images below the fold
- TanStack Query caching — 5 minute stale time
- Vite code splitting and tree shaking

### SEO
- react-helmet-async for page-specific meta tags
- Open Graph tags for WhatsApp and social media previews
- sitemap.xml submitted to Google Search Console
- robots.txt blocking admin routes from crawlers

---

## Design System

### Colors
| Name | Hex | Usage |
|------|-----|-------|
| Gold | `#B8962E` | Primary accent, buttons, highlights |
| Gold Light | `#D4AF5A` | Hover states |
| Gold Dark | `#8B6F1E` | Active states |
| Cream Light | `#FAF9F7` | Page background |
| Cream | `#F2EDE6` | Section backgrounds |
| Spa Text | `#1A1A1A` | Primary text, dark sections |
| Spa Muted | `#6B6560` | Secondary text |

### Typography
| Font | Usage |
|------|-------|
| Bodoni Moda | Brand name display |
| Cormorant Garamond | Headings and serif text |
| DM Sans | Body text and UI elements |

---

## Deployment

Deployed on **Vercel**.

The `vercel.json` file configures SPA routing so all routes serve `index.html`:

```json
{
  "rewrites": [
    {
      "source": "/((?!api/.*).*)",
      "destination": "/index.html"
    }
  ]
}
```

---

## Author

Built by Faustina
