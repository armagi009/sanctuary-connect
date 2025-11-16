# Sanctuary Connect

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/armagi009/sanctuary-connect)

> A holistic platform for discovering and connecting with verified practitioners for spirituality, meditation, and healing services.

Sanctuary Connect is a holistic digital platform designed to foster authentic, transformative connections between spiritual practitioners and seekers. It serves as a trusted ecosystem for discovering, booking, and experiencing a wide range of healing and meditation services. The platform moves beyond a simple transactional marketplace by emphasizing practitioner authenticity, community engagement, and a sacred user experience.

## Key Features

*   **In-Depth Practitioner Profiles:** Structured yet expressive profiles showcasing modalities, philosophies, and verified credentials.
*   **Secure Session Management:** Integrated, high-quality video calling, encrypted booking, and secure post-session resource sharing.
*   **Advanced Discovery Engine:** A powerful search to filter practitioners by modality, philosophy, price, and certifications.
*   **Trust & Verification System:** A robust system for verifying practitioner credentials to build seeker confidence.
*   **Community & Content Hub:** A space for practitioners to share articles, guided meditations, and host group events.

## Technology Stack

*   **Frontend:** React, Vite, React Router, Tailwind CSS, shadcn/ui
*   **State Management:** Zustand (Client-side), TanStack React Query (Server-state)
*   **Backend:** Hono on Cloudflare Workers
*   **Storage:** Cloudflare Durable Objects
*   **Tooling:** TypeScript, Bun, Wrangler CLI

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   [Bun](https://bun.sh/) installed on your machine.
*   [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) for interacting with the Cloudflare platform.

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone <repository-url>
    cd sanctuary_connect
    ```

2.  **Install dependencies:**
    This project uses Bun as the package manager.
    ```sh
    bun install
    ```

## Development

### Running Locally

To start the development server, which includes both the Vite frontend and the Hono backend worker, run:

```sh
bun run dev
```

This will start the application, typically on `http://localhost:3000`. The frontend will hot-reload on changes, and the worker will restart automatically.

### Project Structure

*   `src/`: Contains the React frontend application code.
    *   `pages/`: Top-level page components.
    *   `components/`: Reusable UI components.
    *   `lib/`: Utility functions and API client.
*   `worker/`: Contains the Hono backend code running on Cloudflare Workers.
    *   `index.ts`: The worker entrypoint.
    *   `user-routes.ts`: Application-specific API routes.
    *   `entities.ts`: Data models and logic for interacting with Durable Objects.
*   `shared/`: Contains TypeScript types shared between the frontend and backend.

### API Development

API endpoints are defined in `worker/user-routes.ts` using the Hono framework. Data persistence is handled through entity classes in `worker/entities.ts`, which abstract interactions with the `GlobalDurableObject`. Ensure type safety by defining and using shared types from the `shared/` directory.

## Deployment

This project is configured for seamless deployment to Cloudflare Pages and Workers.

1.  **Build the project:**
    This command bundles the frontend and worker code for production.
    ```sh
    bun run build
    ```

2.  **Deploy to Cloudflare:**
    This command deploys your application using the Wrangler CLI.
    ```sh
    bun run deploy
    ```

Alternatively, you can deploy directly from your GitHub repository using the button below.

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/armagi009/sanctuary-connect)