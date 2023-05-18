import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import LandingPage from './pages/LandingPage/index';
import PostForm from './components/PostForm/PostForm';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/index',
      element: <LandingPage />,
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/blog" />, index: true },
        { path: 'blog', element: <BlogPage /> },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage /> },
        { path: 'products', element: <ProductsPage /> },
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
    {
      path: '/PostForm',
      element: <PostForm />,
    }
  ]);

  return routes;
}
