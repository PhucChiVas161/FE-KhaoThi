import Cookies from 'js-cookie';
import { lazy, Suspense, useState } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const LoginPage = lazy(() => import('src/pages/login'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const IndexPage = lazy(() => import('src/pages/app'));
export const LandingPage = lazy(() => import('src/pages/LandingPage'));
// export const Notification = lazy(() => import('src/pages/Notification'));
export const UserPage = lazy(() => import('src/pages/UserPage/UserPage'));
export const ForgotChangePassword = lazy(() => import('src/components/User/ForgotChangePassword'));
export const PostponeManagement = lazy(
  () => import('src/pages/PostponeExamPage/PostponeManagement')
);
export const Postpone = lazy(() => import('src/pages/PostponeExamPage/Postpone'));
export const ReCheck = lazy(() => import('src/pages/ReCheck/ReCheck'));
export const ReCheckManagement = lazy(() => import('src/pages/ReCheck/ReCheckManagement'));
export const CourseManagement = lazy(() => import('src/pages/Course/CourseManagement'));

export default function Router() {
  const [isLoggedIn, setIsLoggedIn] = useState(Cookies.get('token'));

  const routes = useRoutes([
    { path: '/', element: <IndexPage /> },
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
      element: isLoggedIn ? (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ) : (
        <Navigate to="/login" />
      ),
      children: [
        { index: true, element: <Navigate to="/dashboard/welcome" /> },
        { path: 'welcome', element: <IndexPage /> },
        { path: 'recheck', element: <ReCheck /> },
        { path: 'postpone', element: <Postpone /> },
        { path: 'users-management', element: <UserPage /> },
        { path: 'recheck-management', element: <ReCheckManagement /> },
        { path: 'postpone-management', element: <PostponeManagement /> },
        // { path: 'notification-management', element: <Notification /> },
        { path: 'course-management', element: <CourseManagement /> },
      ],
    },
    {
      path: 'change/password/*',
      element: <ForgotChangePassword />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
