import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Devices from './Devices'
import HomePage from './HomePage'
import NotFound from './NotFound'

const router = createBrowserRouter([
  {
    path: "/controller",
    element: <Devices />,
    errorElement: <NotFound />,
  },
  {
    path: "/",
    element: <HomePage />,
    errorElement: <NotFound />,
  },
]);

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);