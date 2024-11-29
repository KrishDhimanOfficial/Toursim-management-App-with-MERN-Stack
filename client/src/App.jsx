import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Index, Posts, Tour, SinglePost, CategoryPosts } from './pages/pages'
import { Login, Signup, ForgotPassword } from './components/componets'
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
      }
    ]
  }
]

function App() {
  const router = createBrowserRouter(routes)
  return <RouterProvider router={router} />
}

export default App