import { createBrowserRouter } from "react-router-dom";
import Layout from "./views/Layout";
import Dashboard from "./views/Dashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
    ],
  },
]);
