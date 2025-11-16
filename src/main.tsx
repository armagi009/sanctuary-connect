import '@/lib/errorReporter';
import { enableMapSet } from "immer";
enableMapSet();
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import '@/index.css'
import { App } from '@/App';
import { HomePage } from '@/pages/HomePage';
import { DiscoveryPage } from '@/pages/DiscoveryPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { LoginPage } from '@/pages/LoginPage';
import { SignUpPage } from '@/pages/SignUpPage';
import { DashboardPage } from '@/pages/DashboardPage';
import { CommunityPage } from '@/pages/CommunityPage';
import { ProtectedRoute } from '@/components/ProtectedRoute';
import { BookingPage } from '@/pages/BookingPage';
import { ArticlePage } from '@/pages/ArticlePage';
import { PractitionerDashboardPage } from '@/pages/PractitionerDashboardPage';
import { SessionPage } from '@/pages/SessionPage';
import { PractitionerApplicationPage } from '@/pages/PractitionerApplicationPage';
import { BridgePage } from '@/pages/BridgePage';
const queryClient = new QueryClient();
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "discover", element: <DiscoveryPage /> },
      { path: "practitioners/:id", element: <ProfilePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "signup", element: <SignUpPage /> },
      { path: "community", element: <CommunityPage /> },
      { path: "community/:articleId", element: <ArticlePage /> },
      { path: "apply", element: <PractitionerApplicationPage /> },
      { path: "bridge", element: <BridgePage /> },
      {
        element: <ProtectedRoute />,
        children: [
          { path: "dashboard", element: <DashboardPage /> },
          { path: "practitioner-dashboard", element: <PractitionerDashboardPage /> },
          { path: "book/:practitionerId", element: <BookingPage /> },
          { path: "session/:sessionId", element: <SessionPage /> },
        ]
      },
    ],
  },
]);
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ErrorBoundary>
  </StrictMode>,
)