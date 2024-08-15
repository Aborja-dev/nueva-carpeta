import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css'
import './styles/pico.css'
import App from './App';
import LoginPage from './pages/login/page';
import RegisterPage from './pages/register/page';
import DashboardPage from './pages/dashboard/page';
const router = createBrowserRouter([
  {
    path: "/",
    element: <DashboardPage/>,
  },
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <RegisterPage />
  }
]);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
