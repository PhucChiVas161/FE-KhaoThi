import { useState } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
import Cookies from 'js-cookie';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import WelcomePage from './pages/WelcomePage';
import LandingPage from './pages/LandingPage/index';
import Notification from './pages/Notification/Notification';
import UserPage from './pages/UserPage/UserPage';
import ForgotChangePassword from './components/User/ForgotChangePassword';
import PostponeManagement from './pages/PostponeExamPage/PostponeManagement';
import Postpone from './pages/PostponeExamPage/Postpone';
import ReCheck from './pages/ReCheck/ReCheck';
import ReCheckManagement from './pages/ReCheck/ReCheckManagement';
import CourseManagement from './pages/Course/CourseManagement';
import Statistic from './pages/Statistic/Statistic';
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
          element: <Navigate to={'/Dashboard/Welcome' || '/Index'} />,
          index: true,
        },
        { path: 'Welcome', element: <WelcomePage /> },
        { path: 'Recheck', element: <ReCheck /> },
        { path: 'Postpone', element: <Postpone /> },
        { path: 'UsersManagement', element: <UserPage /> },
        { path: 'RecheckManagement', element: <ReCheckManagement /> },
        { path: 'PostponeManagement', element: <PostponeManagement /> },
        { path: 'NotificationManagement', element: <Notification /> },
        { path: 'CourseManagement', element: <CourseManagement /> },
        { path: 'Statistic', element: <Statistic /> },
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
