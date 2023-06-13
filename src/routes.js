import { useState } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';

// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import PostPage from './pages/PostPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import DashboardAppPage from './pages/DashboardAppPage';
import LandingPage from './pages/LandingPage/index';
import PostPageAdmin from './pages/PostPageAdmin';
import QuanLyPhucKhao from './pages/QuanLyPhucKhao';
import PhucKhao from './pages/PhucKhao';
import Notification from './pages/Notification';
import UserPage from './pages/UserPage/UserPage';

export default function Router() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const routes = useRoutes([
    { path: 'index', element: <LandingPage /> },
    {
      path: 'login',
      element: (
        <LoginPage
          onLogin={() => {
            setIsLoggedIn(true);
          }}
        />
      ),
    },
    {
      path: 'dashboard',
      element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { element: <Navigate to="/dashboard/post" />, index: true },
        // { path: 'user', element: <UserPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'post', element: <PostPage /> },
        { path: 'postadm', element: <PostPageAdmin /> },
        { path: 'quanlyphuckhao', element: <QuanLyPhucKhao /> },
        { path: 'phuckhao', element: <PhucKhao /> },
        { path: 'notification', element: <Notification /> },
      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/index" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
