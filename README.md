# Shikan Pastries

A modern React + Vite single-page application for a pastry shop landing experience. The app includes Home, Gallery, and Order pages with a polished UI built using Tailwind CSS, Radix UI components, and React Query.

## Features

- Responsive landing page for bakery products
- Gallery and collection pages
- Order form flow
- Reusable UI components in `src/components/shikan`
- Local development with Vite

## Prerequisites

- Node.js (LTS recommended)
- npm

## Quick Start

1. Clone the repository.
2. Change into the project folder:

   ```bash
   cd shikan-pastries
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open the local app in your browser at the URL shown by Vite.

## Scripts

- `npm run dev` - start the Vite development server
- `npm run build` - build the production app
- `npm run preview` - preview the production build locally
- `npm run lint` - run ESLint
- `npm run lint:fix` - run ESLint and automatically fix fixable issues
- `npm run typecheck` - run TypeScript type checking via `jsconfig.json`

## Environment Variables

This project does not require environment variables for the core UI, but you may add `.env.local` if you need custom deployment values or integrations.

Example:

```env
VITE_BASE44_APP_ID=your_app_id
VITE_BASE44_APP_BASE_URL=https://your-app-base-url
```

## Project Structure

- `src/main.jsx` - app entry point
- `src/App.jsx` - main application shell
- `src/pages/` - page views (`Home`, `Gallery`, `Order`)
- `src/components/shikan/` - site-specific sections and layout components
- `src/components/ui/` - shared UI primitives
- `src/lib/` - utilities such as `query-client.js`
- `src/index.css` - global styles

## Deployment

Deploy using your preferred static hosting provider or the Base44 Builder if you are using that platform. Push changes to the repo and publish from your hosting dashboard.

## Notes

- Built with React 18, Vite, Tailwind CSS, and Radix UI.
- Uses `@tanstack/react-query` for data fetching patterns.
- Includes modern styling and animation utilities.

## Resources

- Vite: https://vitejs.dev/
- React: https://reactjs.org/
- Tailwind CSS: https://tailwindcss.com/
- Radix UI: https://www.radix-ui.com/

