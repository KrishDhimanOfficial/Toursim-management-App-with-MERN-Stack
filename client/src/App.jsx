import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Index, Posts, Tour, SinglePost } from './pages/pages'
import SiteLayout from './SiteLayout'
import Layout from './Layout'

const routes = [
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
      }
    ]
  }
]

function App() {
  const router = createBrowserRouter(routes)
  return <RouterProvider router={router} />
}

export default App