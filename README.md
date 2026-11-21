# Senitel Trustlock

Senitel Trustlock is a frontend prototype for communication risk analysis and action-bound authorization. It presents a marketing site, a product dashboard demo, and a capability guide for reviewing media, identity, intent, and authorization as separate signals.

## Features

- **Landing page** — product overview, Trustlock capabilities, authorization approach, and links into the product.
- **Dashboard demo** — example risk queue, activity log, signal monitors, policies, and authorization views.
- **Documentation** — capability guides covering forensics, Indian speech intelligence, intent and coercion, action-bound capsules, dual-key authorization, verifiable evidence, and identity versus authority.
- **Responsive layouts** — landing, dashboard, and documentation views adapt to narrow screens.

The current project is a client-side demo. It does not connect to a backend or perform real communication analysis or financial actions.

## Requirements

- Node.js and npm

## Run locally

```bash
npm install
npm run dev
```

Vite prints the local development URL in the terminal. By default, it is `http://localhost:5173`.

## Available scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Create a production build in `dist/`. |
| `npm run preview` | Serve the production build locally. Run `npm run build` first. |

## Routes

| Path | Page |
| --- | --- |
| `/` | Senitel landing page |
| `/dashboard` | Trustlock dashboard demo |
| `/docs` | Trustlock capability documentation |

The app selects a page from the browser pathname in `src/main.jsx`. When deploying to static hosting, configure the host to serve `index.html` for these paths so direct visits and refreshes work.

## Project structure

```text
public/
  assets/             Landing page portrait images
  favicon.png         Senitel fingerprint tab icon
  favicon.ico         Browser-compatible fingerprint tab icon
src/
  App.jsx             Landing page
  Dashboard.jsx       Dashboard demo
  Docs.jsx            Capability documentation
  styles.css          Shared and landing page styles
  dashboard.css       Dashboard styles
  docs.css            Documentation styles
  main.jsx            React entry point and route selection
index.html            HTML shell and page metadata
design.md             Visual design reference
```

## Tech stack

- React 18
- Vite 5
- Lucide React icons
- CSS

