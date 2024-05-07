import React, { useState } from 'react'
import '../main.css'

function App() {
  const [inputValue, setInputValue] = useState('')
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }

  return (
    <div>
      <h1>Turbo Typer</h1>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={handleChange}
          placeholder="Type something here..."
          className="input-box"
        />
      </div>
      <div></div>
    </div>
  )
}

export default App
