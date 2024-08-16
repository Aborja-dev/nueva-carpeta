import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css'
import './styles/pico.css'

import LoginPage from './pages/login/page';
import RegisterPage from './pages/register/page';
import DashboardPage from './pages/dashboard/page';
import MainLayout from './common/layouts/main_layout';
import { mainLoader } from './pages/loader';
import { dashboardLoader } from './pages/dashboard/loader';
import { proposalDetailLoader } from './pages/detail/loader';
import DetailPage from './pages/detail/page';
const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/register',
    element: <RegisterPage />
  },
  {
    path: '/',
    element: <MainLayout />,
    loader: mainLoader,
    children: [
      {
        path: '',
        loader: dashboardLoader,
        element: <DashboardPage />
      },
      {
        path: '/detail/:id',
        loader: proposalDetailLoader,
        element: <DetailPage />
      }
    ]
  }
]);
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
