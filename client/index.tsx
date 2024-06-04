import ReactDOM from 'react-dom/client'
import React, { useState } from 'react'
import App from './components/App.tsx'
import Home from './components/Home.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Options from './components/Options/Options.tsx'
import About from './components/About/About.tsx'

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
        path: '/options',
        element: <Options />,
      },
      {
        path: '/about',
        element: <About />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('app')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
