import Navbar from './Navbar/Navbar'
import '../main.css'
import { Outlet, useOutletContext } from 'react-router-dom'
import React, { useEffect } from 'react'
import words from '../default.json'

function App() {
  const [data, setData] = React.useState(() => {
    const cachedData = localStorage.getItem('cachedData')
    return cachedData ? JSON.parse(cachedData) : words
  })

  useEffect(() => {
    const cachedData = localStorage.getItem('cachedData')
    if (cachedData) {
      setData(JSON.parse(cachedData))
    }
  }, [])

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
