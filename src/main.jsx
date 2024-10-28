import { StrictMode } from 'react'; // Already imported StrictMode
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import AllPost from './components/pages/AllPost.jsx';
import { Provider } from 'react-redux';
import store from './store/store.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthLayout, Login, Signup } from './components/index.js';
import Home from './components/pages/Home.jsx';
import EditPost from './components/pages/EditPost.jsx';
import Post from './components/pages/Post.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/Login',
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: '/signup',
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },
      {
        path: '/add-post',
        element: (
          <AuthLayout authentication={true}>
            <AllPost />
          </AuthLayout>
        ),
      },
      {
        path: '/edit-post/:slug',
        element: (
          <AuthLayout authentication={true}>
            <EditPost />
          </AuthLayout>
        ),
      },
      {
        path: '/post/:slug',
        element: <Post />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode> {/* Use StrictMode directly */}
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode> 
);
