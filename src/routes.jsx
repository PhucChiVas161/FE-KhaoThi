import { useState } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import Cookies from 'js-cookie';

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
import ForgotChangePassword from './components/User/ForgotChangePassword';
import PostponeExam from './pages/PostponeExamPage/PostponeExam';

export default function Router() {
  const [isLoggedIn, setIsLoggedIn] = useState(Cookies.get('token'));

  const routes = useRoutes([
    { path: 'Index', element: <LandingPage /> },
    {
      path: 'Login',
      element: (
        <LoginPage
          onLogin={() => {
            setIsLoggedIn(true);
          }}
        />
      ),
    },
    {
      path: 'Dashboard',
      element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/Login" />,
      children: [
        {
          element: <Navigate to={'/Dashboard/Post' || '/Index'} />,
          index: true,
        },
        // { path: 'app', element: <DashboardAppPage /> },
        { path: 'Post', element: <PostPage /> },
        { path: 'Recheck', element: <PhucKhao /> },
        { path: 'UsersManagement', element: <UserPage /> },
        { path: 'RecheckManagement', element: <QuanLyPhucKhao /> },
        { path: 'ExamDeferralManagement', element: <PostponeExam /> },
        { path: 'PostManagement', element: <PostPageAdmin /> },
        { path: 'NotificationManagement', element: <Notification /> },
      ],
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/Index" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
    {
      path: 'change/password/*',
      element: <ForgotChangePassword />,
    },
  ]);

  return routes;
}
