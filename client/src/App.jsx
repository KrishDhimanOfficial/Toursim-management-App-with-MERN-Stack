import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Index } from './pages/pages'
import SiteLayout from './SiteLayout'

const routes = [
  {
    path: '/',
    element: <SiteLayout />,
    children: [
      {
        path: '/',
        element: <Index />
      }
    ]
  }
]

function App() {
  const router = createBrowserRouter(routes)
  return <RouterProvider router={router} />
}

export default App