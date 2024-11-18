import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Index, Posts, Tour } from './pages/pages'
import SiteLayout from './SiteLayout'

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
      }
    ]
  }
]

function App() {
  const router = createBrowserRouter(routes)
  return <RouterProvider router={router} />
}

export default App