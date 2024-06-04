import Navbar from './Navbar/Navbar'
import '../main.css'
import { Outlet, useOutletContext } from 'react-router-dom'
import React from 'react'

function App() {
  const [data, setData] = React.useState('hello')
  return (
    <div className="container">
      <Navbar />
      <Outlet context={{ data, setData }} />
    </div>
  )
}

export default App

export function useData() {
  return useOutletContext()
}
