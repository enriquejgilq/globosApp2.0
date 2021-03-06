/* eslint-disable */
import { Navigate,Outlet } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardApp from './pages/DashboardApp';
import Products from './pages/Products';
import Blog from './pages/Blog';
import User from './pages/User';
import NotFound from './pages/Page404';
import Category from './pages/Category';

// ----------------------------------------------------------------------

const routes = (isLoggedIn) => [
    {
      path: '/',
      element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { path: '/app', element: <DashboardApp /> },
        { path: '/user', element: <User /> },
        { path: '/products', element: <Products /> },
        { path: '/blog', element: <Blog /> },
        { path: '/category', element: <Category /> },
        { path: '/404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
        { path: '/', element: <Navigate to="/app" replace  /> },

      
      ]
    },
    {
      path: '/',
      element: !isLoggedIn ? <LogoOnlyLayout /> : <Navigate to="/app" />,
//  element: <LogoOnlyLayout />,
      children: [
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '/404', element: <NotFound /> },
        { path: '/', element: <Navigate to="/login" /> },
        { path: '*', element: <Navigate to="/404" /> }
      ]
    },
  
   { path: '*', element: <Navigate to="/404" replace /> }
  ];

  export default routes;
  