import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Index, Posts, Tour, SinglePost, CategoryPosts, SingleTour, CheckOut, Success, Failure } from './pages/pages'
import { Login, Signup, ForgotPassword, ErrorBoundary } from './components/componets'
import SiteLayout from './SiteLayout'
import Layout from './Layout'

const routes = [
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/forgot/password',
    element: <ForgotPassword />
  },
  {
    path: '/',
    element: <SiteLayout />,
    children: [
      {
        path: '/',
        element: <Index />
      },
      {
        path: '/posts',
        element: <Posts />
      },
      {
        path: '/tours',
        element: <Tour />
      },
    ]
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/post/:post_slug',
        element: <SinglePost />
      },
      {
        path: '/posts/:category',
        element: <CategoryPosts />
      },
      {
        path: '/tour/:tour_slug',
        element: <SingleTour />
      },
      {
        path: '/checkout/:tour_slug',
        element:
          <ErrorBoundary>
            <CheckOut />
          </ErrorBoundary>
      },
      {
        path: '/success',
        element: <Success />
      },
      {
        path: '/cancel',
        element: <Failure />
      }
    ]
  }
]

function App() {
  const router = createBrowserRouter(routes, {
    future: {
      v7_relativeSplatPath: true,
      v7_startTransition: true,
      v7_fetcherPersist: true,
      v7_normalizeFormMethod: true,
      v7_partialHydration: true,
      v7_skipActionStatusRevalidation: true,
    }
  })
  return <RouterProvider router={router} />
}

export default App